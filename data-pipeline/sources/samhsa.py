"""
SAMHSA Treatment Directory processor.

Downloads mental health facility data from SAMHSA via:
1. XLSX bulk download (preferred)
2. FindTreatment.gov API (fallback)
"""

import os
import uuid
import logging
from datetime import datetime, timezone

import pandas as pd
import requests

from config import (
    SAMHSA_XLSX_URL, SAMHSA_API_BASE, SAMHSA_DATA_DIR,
    STATE_FIPS, REQUEST_TIMEOUT, UUID_NAMESPACE,
)
from sources.base import BaseSource, SourceStats

logger = logging.getLogger(__name__)

NAMESPACE_UUID = uuid.UUID(UUID_NAMESPACE)


def _facility_uuid(source_id: str) -> str:
    """Deterministic UUID for a SAMHSA facility."""
    return str(uuid.uuid5(NAMESPACE_UUID, f"samhsa:{source_id}"))


def _facility_loc_uuid(source_id: str) -> str:
    """Deterministic UUID for a SAMHSA facility location."""
    return str(uuid.uuid5(NAMESPACE_UUID, f"samhsa_loc:{source_id}"))


# SAMHSA service/category → specialty slug mapping
SAMHSA_SERVICE_TO_SPECIALTY = {
    "substance abuse": ["substance_use"],
    "substance use": ["substance_use"],
    "sa": ["substance_use"],
    "mental health": [],
    "mh": [],
    "detoxification": ["detoxification"],
    "detox": ["detoxification"],
    "residential": ["residential_treatment"],
    "hospital inpatient": ["residential_treatment"],
    "outpatient": [],
    "intensive outpatient": ["iop"],
    "partial hospitalization": ["php"],
    "co-occurring": ["dual_diagnosis"],
    "dual diagnosis": ["dual_diagnosis"],
    "medication-assisted": ["mat"],
    "mat": ["mat"],
    "crisis": ["crisis_intervention"],
    "trauma": ["ptsd", "trauma_focused"],
    "dui": ["substance_use", "court_ordered"],
    "criminal justice": ["criminal_justice"],
    "pregnant": ["pregnant_postpartum"],
}

# SAMHSA payment → insurance key mapping
SAMHSA_PAYMENT_TO_INSURANCE = {
    "medicare": "Medicare:Medicare Part B",
    "medicaid": "Medicaid:Medicaid",
    "tricare": "TRICARE:TRICARE",
    "sliding fee": "Self-Pay:Sliding Scale Available",
    "sliding scale": "Self-Pay:Sliding Scale Available",
    "self-pay": "Self-Pay:Self-Pay / Out of Network",
    "no payment accepted": "Self-Pay:Self-Pay / Out of Network",
}


class SAMHSAProcessor(BaseSource):
    """Processes SAMHSA mental health treatment facility data."""

    @property
    def source_name(self) -> str:
        return "samhsa"

    def _try_xlsx_download(self) -> pd.DataFrame | None:
        """Try to download the SAMHSA XLSX file."""
        xlsx_path = os.path.join(self.data_dir, "samhsa_mh_facilities.xlsx")

        if os.path.exists(xlsx_path):
            logger.info(f"  SAMHSA XLSX already exists: {xlsx_path}")
            try:
                return pd.read_excel(xlsx_path, dtype=str)
            except Exception as e:
                logger.warning(f"  Failed to read existing XLSX: {e}")

        success = self.download_file(
            SAMHSA_XLSX_URL, xlsx_path, "SAMHSA MH Facilities XLSX"
        )
        if success:
            try:
                df = pd.read_excel(xlsx_path, dtype=str)
                logger.info(f"  Loaded {len(df):,} records from XLSX")
                return df
            except Exception as e:
                logger.warning(f"  Failed to parse XLSX: {e}")
                os.remove(xlsx_path)

        return None

    def _try_api_fallback(self) -> pd.DataFrame | None:
        """Fallback: fetch facilities from FindTreatment.gov API state by state."""
        logger.info("  Falling back to FindTreatment.gov API...")
        all_facilities = []

        for state_abbr, state_id in STATE_FIPS.items():
            try:
                url = (
                    f"{SAMHSA_API_BASE}?"
                    f"sType=mh&limitType=0&limitValue={state_id}"
                    f"&pageSize=500&page=1"
                )
                resp = requests.get(url, timeout=REQUEST_TIMEOUT)
                if resp.status_code == 200:
                    data = resp.json()
                    rows = data.get("rows", data.get("results", []))
                    if isinstance(rows, list):
                        for row in rows:
                            row["_state_abbr"] = state_abbr
                        all_facilities.extend(rows)
                        logger.info(f"    {state_abbr}: {len(rows)} facilities")
                else:
                    logger.warning(f"    {state_abbr}: HTTP {resp.status_code}")
            except Exception as e:
                logger.warning(f"    {state_abbr}: Error — {e}")

        if all_facilities:
            return pd.DataFrame(all_facilities)
        return None

    def _detect_format(self, df: pd.DataFrame) -> str:
        """Detect whether the DataFrame is from XLSX or API format."""
        cols_lower = {c.lower() for c in df.columns}
        if "name1" in cols_lower or "facilityid" in cols_lower:
            return "xlsx"
        if "frid" in cols_lower or "_state_abbr" in cols_lower:
            return "api"
        # Try case-insensitive check
        if any("facility" in c.lower() for c in df.columns):
            return "xlsx"
        return "unknown"

    def _get_col(self, row: pd.Series, candidates: list[str]) -> str:
        """Get value from first matching column name (case-insensitive)."""
        for col in candidates:
            if col in row.index:
                val = row.get(col)
                if val and not pd.isna(val):
                    return str(val).strip()
        return ""

    def _extract_specialties(self, row: pd.Series) -> list[str]:
        """Extract specialty slugs from SAMHSA service/category fields."""
        slugs = set()
        # Check various service description fields
        for field in ["categoriesAll", "TypeFac", "services", "type_facility",
                      "ServiceSettings", "SpecialPrograms"]:
            val = self._get_col(row, [field, field.lower(), field.upper()])
            if val:
                val_lower = val.lower()
                for keyword, specs in SAMHSA_SERVICE_TO_SPECIALTY.items():
                    if keyword in val_lower:
                        slugs.update(specs)
        return list(slugs)

    def _extract_insurance_keys(self, row: pd.Series) -> list[str]:
        """Extract insurance plan keys from SAMHSA payment fields."""
        keys = []
        for field in ["PaymentMethods", "payment", "Payment",
                      "AcceptedPayments"]:
            val = self._get_col(row, [field, field.lower()])
            if val:
                val_lower = val.lower()
                for keyword, ins_key in SAMHSA_PAYMENT_TO_INSURANCE.items():
                    if keyword in val_lower:
                        keys.append(ins_key)
        return list(set(keys))

    def process(self) -> SourceStats:
        logger.info("\n" + "=" * 60)
        logger.info("PHASE 2: SAMHSA TREATMENT DIRECTORY")
        logger.info("=" * 60)

        # Try XLSX first, then API
        df = self._try_xlsx_download()
        if df is None:
            df = self._try_api_fallback()
        if df is None or len(df) == 0:
            logger.error(
                "  Could not load SAMHSA data from XLSX or API.\n"
                "  Please manually download from:\n"
                "  https://www.samhsa.gov/data/data-we-collect/n-sumhss\n"
                f"  Save XLSX to: {self.data_dir}/samhsa_mh_facilities.xlsx"
            )
            return self.stats

        fmt = self._detect_format(df)
        logger.info(f"  Detected format: {fmt}")
        logger.info(f"  Columns: {list(df.columns[:15])}")
        self.stats.raw_records = len(df)

        now_iso = datetime.now(timezone.utc).isoformat()
        clinic_uuid = self.lookups.provider_types.get("clinic", "")
        crisis_uuid = self.lookups.provider_types.get("crisis_service", "")

        provider_rows = []
        location_rows = []
        specialty_rows = []
        insurance_rows = []

        for _, row in df.iterrows():
            # Extract facility ID
            source_id = self._get_col(row, [
                "FacilityID", "facilityid", "frid", "id", "ID",
            ])
            if not source_id:
                # Generate from name + address
                name = self._get_col(row, ["Name1", "name1", "FacilityName", "name"])
                addr = self._get_col(row, ["Street1", "street1", "address1"])
                source_id = f"{name}|{addr}"

            # Check NPI-based dedup
            npi = self._get_col(row, ["NPI", "npi", "npi_number"])
            if npi and npi in self.seen_npis:
                self.stats.skipped += 1
                continue

            facility_name = self._get_col(row, [
                "Name1", "name1", "FacilityName", "name", "Name",
            ])
            if not facility_name:
                self.stats.skipped += 1
                continue

            if self.limit and self.stats.providers_written >= self.limit:
                break

            provider_id = _facility_uuid(source_id)

            # Determine if crisis service
            services_text = self._get_col(row, [
                "categoriesAll", "services", "ServiceSettings",
            ]).lower()
            is_crisis = "crisis" in services_text or "emergency" in services_text
            has_emergency = (
                "emergency" in services_text
                or self._get_col(row, [
                    "EmergencyServices", "emergency_services", "ES",
                ]).lower() in ("yes", "true", "1")
            )

            type_uuid = crisis_uuid if is_crisis else clinic_uuid
            if not type_uuid:
                type_uuid = clinic_uuid or ""

            # Sliding fee scale
            payment_text = self._get_col(row, [
                "PaymentMethods", "payment", "AcceptedPayments",
            ]).lower()
            sliding = "sliding" in payment_text

            # Facility type
            facility_type = self._get_col(row, [
                "TypeFac", "typeFac", "type_facility", "FacilityType",
            ]) or "Mental Health Facility"

            phone = self.clean_phone(
                self._get_col(row, ["Phone", "phone", "Telephone"])
            )
            website = self._get_col(row, ["Website", "website", "WebAddress"]) or None

            city = self._get_col(row, ["City", "city"])
            state = self._get_col(row, ["State", "state", "_state_abbr"])
            zip_code = self._get_col(row, ["Zip", "zip", "ZipCode"])

            if self.dry_run:
                logger.debug(f"    [DRY] {facility_name} — {city}, {state}")
                self.stats.providers_written += 1
                continue

            provider_rows.append({
                "id": provider_id,
                "npi_number": npi if npi else None,
                "provider_type_id": type_uuid,
                "status": "seeded",
                "tier": "free",
                "source": "samhsa",
                "display_name": facility_name,
                "phone": phone,
                "website_url": website,
                "is_accepting_patients": True,
                "telehealth_available": False,
                "in_person_available": True,
                "facility_type": facility_type,
                "sliding_fee_scale": sliding,
                "emergency_services": has_emergency,
                "practice_type": "outpatient",
                "practice_name": facility_name,
                "data_last_synced_at": now_iso,
            })

            # Track NPI if present
            if npi:
                self.seen_npis.add(npi)

            # Location
            addr1 = self._get_col(row, ["Street1", "street1", "Address", "address1"])
            addr2 = self._get_col(row, ["Street2", "street2", "address2"])
            lat = self._get_col(row, ["Latitude", "latitude", "lat"])
            lng = self._get_col(row, ["Longitude", "longitude", "lng", "lon"])

            location_rows.append({
                "id": _facility_loc_uuid(source_id),
                "provider_id": provider_id,
                "address_line1": addr1 or None,
                "address_line2": addr2 or None,
                "city": city or None,
                "state_province": state or None,
                "postal_code": self.clean_zip(zip_code),
                "country_code": "US",
                "latitude": float(lat) if lat else None,
                "longitude": float(lng) if lng else None,
                "is_primary": True,
            })

            # Specialties
            spec_slugs = self._extract_specialties(row)
            for slug in spec_slugs:
                spec_uuid = self.lookups.specialties.get(slug)
                if spec_uuid:
                    specialty_rows.append({
                        "provider_id": provider_id,
                        "specialty_id": spec_uuid,
                    })

            # Insurance
            ins_keys = self._extract_insurance_keys(row)
            for key in ins_keys:
                ins_uuid = self.lookups.insurance_plans.get(key)
                if ins_uuid:
                    insurance_rows.append({
                        "provider_id": provider_id,
                        "insurance_plan_id": ins_uuid,
                    })

        # Write output
        if not self.dry_run:
            self.stats.providers_written = self.writer.write_providers(provider_rows)
            self.stats.locations_written = self.writer.write_locations(location_rows)
            self.stats.specialties_written = self.writer.write_specialties(
                specialty_rows
            )
            self.stats.insurance_written = self.writer.write_insurance(insurance_rows)
        else:
            self.stats.providers_written = len(provider_rows)

        self.stats.filtered_records = self.stats.providers_written

        logger.info(f"\n  SAMHSA Summary:")
        logger.info(f"    Raw records:       {self.stats.raw_records:,}")
        logger.info(f"    Facilities output: {self.stats.providers_written:,}")
        logger.info(f"    Locations:         {self.stats.locations_written:,}")
        logger.info(f"    Specialty links:   {self.stats.specialties_written:,}")
        logger.info(f"    Insurance links:   {self.stats.insurance_written:,}")
        logger.info(f"    Skipped (NPI dup): {self.stats.skipped:,}")

        return self.stats
