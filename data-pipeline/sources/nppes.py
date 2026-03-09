"""
NPPES NPI Registry processor.

Downloads and processes the CMS NPPES bulk CSV file (~8GB unzipped).
Filters to mental health taxonomy codes and outputs normalized CSVs.
"""

import os
import uuid
import glob
import zipfile
import logging
from datetime import datetime, timezone

import pandas as pd

from config import (
    NPPES_DOWNLOAD_URL, NPPES_DATA_DIR, CHUNK_SIZE,
    NPPES_COLUMNS, US_STATES, UUID_NAMESPACE,
)
from mapping.taxonomy import (
    is_mental_health_taxonomy, get_provider_type_slug, get_specialty_slugs,
)
from sources.base import BaseSource, SourceStats

logger = logging.getLogger(__name__)

NAMESPACE_UUID = uuid.UUID(UUID_NAMESPACE)


def _provider_uuid(npi: str) -> str:
    """Deterministic UUID from NPI number."""
    return str(uuid.uuid5(NAMESPACE_UUID, f"npi:{npi}"))


def _location_uuid(npi: str) -> str:
    """Deterministic UUID for a provider's primary location."""
    return str(uuid.uuid5(NAMESPACE_UUID, f"npi_loc:{npi}"))


class NPPESProcessor(BaseSource):
    """Processes the NPPES NPI bulk CSV file."""

    @property
    def source_name(self) -> str:
        return "nppes"

    def _find_csv(self) -> str | None:
        """Find the main NPPES CSV in the data directory."""
        patterns = [
            os.path.join(self.data_dir, "npidata_pfile_*.csv"),
            os.path.join(self.data_dir, "npidata_*.csv"),
        ]
        for pattern in patterns:
            matches = glob.glob(pattern)
            if matches:
                # Return the largest file (the main data file)
                return max(matches, key=os.path.getsize)
        return None

    def _download_and_extract(self) -> str | None:
        """Download and extract the NPPES zip file. Returns path to CSV."""
        # Check if CSV already exists
        existing = self._find_csv()
        if existing:
            size_gb = os.path.getsize(existing) / (1024 ** 3)
            logger.info(f"  NPPES CSV already exists: {existing} ({size_gb:.1f} GB)")
            return existing

        # Download zip
        zip_path = os.path.join(self.data_dir, "nppes_full.zip")
        success = self.download_file(
            NPPES_DOWNLOAD_URL, zip_path, "NPPES full file (~700MB)"
        )
        if not success:
            logger.error(
                "  NPPES download failed. Please manually download from:\n"
                "  https://download.cms.gov/nppes/NPI_Files.html\n"
                f"  Extract the CSV to: {self.data_dir}/"
            )
            return None

        # Extract
        logger.info("  Extracting NPPES zip file...")
        try:
            with zipfile.ZipFile(zip_path, "r") as z:
                z.extractall(self.data_dir)
            logger.info("  Extraction complete.")
        except zipfile.BadZipFile:
            logger.error("  Downloaded file is not a valid zip. Try re-downloading.")
            os.remove(zip_path)
            return None

        return self._find_csv()

    def _get_primary_taxonomy(self, row: pd.Series) -> str:
        """Find the primary mental health taxonomy code from the row."""
        # First check for explicitly marked primary taxonomy
        for i in range(1, 16):
            switch_col = f"Healthcare Provider Primary Taxonomy Switch_{i}"
            tax_col = f"Healthcare Provider Taxonomy Code_{i}"
            if switch_col in row.index and row.get(switch_col) == "Y":
                code = row.get(tax_col, "")
                if code and not pd.isna(code) and is_mental_health_taxonomy(str(code)):
                    return str(code).strip()

        # Fallback: first mental health taxonomy found
        for i in range(1, 16):
            tax_col = f"Healthcare Provider Taxonomy Code_{i}"
            code = row.get(tax_col, "")
            if code and not pd.isna(code) and is_mental_health_taxonomy(str(code)):
                return str(code).strip()

        # Last resort: return first taxonomy code
        first = row.get("Healthcare Provider Taxonomy Code_1", "")
        return str(first).strip() if first and not pd.isna(first) else ""

    def _build_display_name(self, row: pd.Series) -> str:
        """Build display name from NPPES name fields."""
        entity_code = str(row.get("Entity Type Code", "1")).strip()

        if entity_code == "2":
            org = row.get("Provider Organization Name (Legal Business Name)", "")
            return str(org).strip() if org and not pd.isna(org) else ""

        parts = []
        for field in [
            "Provider First Name",
            "Provider Middle Name",
            "Provider Last Name (Legal Name)",
        ]:
            val = row.get(field, "")
            if val and not pd.isna(val):
                parts.append(str(val).strip())

        suffix = row.get("Provider Name Suffix Text", "")
        if suffix and not pd.isna(suffix):
            parts.append(str(suffix).strip())

        return " ".join(parts).strip()

    def _row_is_mental_health(self, row: pd.Series) -> bool:
        """Check if any taxonomy column has a mental health code."""
        for i in range(1, 16):
            col = f"Healthcare Provider Taxonomy Code_{i}"
            if col in row.index:
                code = row.get(col)
                if code and not pd.isna(code) and is_mental_health_taxonomy(str(code)):
                    return True
        return False

    def process(self) -> SourceStats:
        logger.info("\n" + "=" * 60)
        logger.info("PHASE 1: NPPES NPI REGISTRY")
        logger.info("=" * 60)

        # Download / find CSV
        csv_path = self._download_and_extract()
        if not csv_path:
            logger.error("  No NPPES CSV available. Skipping this source.")
            return self.stats

        # Validate columns exist
        logger.info(f"  Processing: {csv_path}")
        logger.info(f"  Chunk size: {CHUNK_SIZE:,} rows")

        # Determine which columns actually exist in the file
        sample = pd.read_csv(csv_path, nrows=0, dtype=str, encoding="utf-8")
        available_cols = [c for c in NPPES_COLUMNS if c in sample.columns]
        missing = set(NPPES_COLUMNS) - set(available_cols)
        if missing:
            logger.warning(f"  Missing columns (will be skipped): {missing}")

        now_iso = datetime.now(timezone.utc).isoformat()
        total_processed = 0
        total_matched = 0
        chunk_num = 0

        for chunk in pd.read_csv(
            csv_path,
            chunksize=CHUNK_SIZE,
            usecols=available_cols,
            dtype=str,
            low_memory=False,
            encoding="utf-8",
        ):
            chunk_num += 1
            total_processed += len(chunk)
            self.stats.raw_records = total_processed

            # Filter: mental health taxonomy in any of the 15 slots
            mask = chunk.apply(self._row_is_mental_health, axis=1)
            matched = chunk[mask].copy()

            if len(matched) == 0:
                logger.info(
                    f"  Chunk {chunk_num}: {len(chunk):,} rows, "
                    f"0 MH matches (total: {total_matched:,})"
                )
                continue

            # Filter: not deactivated
            deact_col = "NPI Deactivation Date"
            if deact_col in matched.columns:
                matched = matched[
                    matched[deact_col].isna() | (matched[deact_col] == "")
                ]

            # Filter: US only
            country_col = (
                "Provider Business Practice Location Address "
                "Country Code (If outside U.S.)"
            )
            if country_col in matched.columns:
                matched = matched[
                    matched[country_col].isna()
                    | (matched[country_col] == "")
                    | (matched[country_col] == "US")
                ]

            # Filter: valid state code
            state_col = "Provider Business Practice Location Address State Name"
            if state_col in matched.columns:
                matched = matched[
                    matched[state_col].isin(US_STATES)
                    | matched[state_col].isna()
                ]

            total_matched += len(matched)

            # Transform to output rows
            provider_rows = []
            location_rows = []
            specialty_rows = []
            language_rows = []

            for _, row in matched.iterrows():
                npi = str(row.get("NPI", "")).strip()
                if not npi or len(npi) != 10:
                    self.stats.skipped += 1
                    continue

                # Skip if already seen (dedup within run)
                if npi in self.seen_npis:
                    self.stats.skipped += 1
                    continue
                self.seen_npis.add(npi)

                # Check limit
                if self.limit and self.stats.providers_written >= self.limit:
                    break

                display_name = self._build_display_name(row)
                if not display_name:
                    self.stats.skipped += 1
                    continue

                primary_tax = self._get_primary_taxonomy(row)
                type_slug = get_provider_type_slug(primary_tax)
                type_uuid = self.lookups.provider_types.get(type_slug)

                if not type_uuid:
                    # Fallback to therapist
                    type_uuid = self.lookups.provider_types.get("therapist", "")
                    if not type_uuid:
                        self.stats.errors += 1
                        continue

                entity_code = str(row.get("Entity Type Code", "1")).strip()
                provider_id = _provider_uuid(npi)

                credentials = row.get("Provider Credential Text", "")
                credentials = (
                    str(credentials).strip()
                    if credentials and not pd.isna(credentials)
                    else None
                )

                phone = self.clean_phone(
                    row.get(
                        "Provider Business Practice Location Address "
                        "Telephone Number"
                    )
                )

                if self.dry_run:
                    city = row.get(
                        "Provider Business Practice Location Address City Name", ""
                    )
                    state = row.get(
                        "Provider Business Practice Location Address State Name", ""
                    )
                    logger.debug(
                        f"    [DRY] {display_name} (NPI: {npi}) — {city}, {state}"
                    )
                    self.stats.providers_written += 1
                    continue

                # Provider row
                provider_rows.append({
                    "id": provider_id,
                    "npi_number": npi,
                    "provider_type_id": type_uuid,
                    "status": "seeded",
                    "tier": "free",
                    "source": "npi_registry",
                    "display_name": display_name,
                    "credentials_suffix": credentials,
                    "phone": phone,
                    "is_accepting_patients": True,
                    "telehealth_available": False,
                    "in_person_available": True,
                    "taxonomy_code": primary_tax,
                    "taxonomy_description": get_provider_type_slug(primary_tax),
                    "data_last_synced_at": now_iso,
                    "practice_type": (
                        "clinic" if entity_code == "2" else None
                    ),
                    "practice_name": (
                        str(row.get(
                            "Provider Organization Name (Legal Business Name)", ""
                        )).strip() or None
                    ) if entity_code == "2" else None,
                })

                # Location row
                addr1 = row.get(
                    "Provider First Line Business Practice Location Address", ""
                )
                city = row.get(
                    "Provider Business Practice Location Address City Name", ""
                )
                state = row.get(
                    "Provider Business Practice Location Address State Name", ""
                )
                zip_code = row.get(
                    "Provider Business Practice Location Address Postal Code", ""
                )

                if addr1 and not pd.isna(addr1):
                    addr2 = row.get(
                        "Provider Second Line Business Practice Location Address", ""
                    )
                    location_rows.append({
                        "id": _location_uuid(npi),
                        "provider_id": provider_id,
                        "address_line1": str(addr1).strip(),
                        "address_line2": (
                            str(addr2).strip()
                            if addr2 and not pd.isna(addr2)
                            else None
                        ),
                        "city": str(city).strip() if city and not pd.isna(city) else None,
                        "state_province": (
                            str(state).strip() if state and not pd.isna(state) else None
                        ),
                        "postal_code": self.clean_zip(zip_code),
                        "country_code": "US",
                        "is_primary": True,
                    })

                # Specialty rows (from taxonomy mapping)
                specialty_slugs = get_specialty_slugs(primary_tax)
                for slug in specialty_slugs:
                    spec_uuid = self.lookups.specialties.get(slug)
                    if spec_uuid:
                        specialty_rows.append({
                            "provider_id": provider_id,
                            "specialty_id": spec_uuid,
                        })

                # Language row (default English — NPPES has no language data)
                en_uuid = self.lookups.languages.get("en")
                if en_uuid:
                    language_rows.append({
                        "provider_id": provider_id,
                        "language_id": en_uuid,
                        "proficiency": "fluent",
                    })

            # Write chunk output
            if not self.dry_run:
                self.stats.providers_written += self.writer.write_providers(
                    provider_rows
                )
                self.stats.locations_written += self.writer.write_locations(
                    location_rows
                )
                self.stats.specialties_written += self.writer.write_specialties(
                    specialty_rows
                )
                self.stats.languages_written += self.writer.write_languages(
                    language_rows
                )

            logger.info(
                f"  Chunk {chunk_num}: {len(chunk):,} rows, "
                f"{len(provider_rows):,} MH providers "
                f"(total: {self.stats.providers_written:,})"
            )

            # Check limit
            if self.limit and self.stats.providers_written >= self.limit:
                logger.info(f"  Reached limit of {self.limit:,} providers.")
                break

        self.stats.filtered_records = self.stats.providers_written

        logger.info(f"\n  NPPES Summary:")
        logger.info(f"    Raw records processed: {self.stats.raw_records:,}")
        logger.info(f"    Mental health matches: {self.stats.providers_written:,}")
        logger.info(f"    Locations written:     {self.stats.locations_written:,}")
        logger.info(f"    Specialty links:       {self.stats.specialties_written:,}")
        logger.info(f"    Skipped:               {self.stats.skipped:,}")
        logger.info(f"    Errors:                {self.stats.errors:,}")

        return self.stats
