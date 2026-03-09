"""
HRSA Health Center processor.

Downloads and processes HRSA Health Center Service Delivery Site data.
Filters to centers offering mental health services.
"""

import os
import uuid
import logging
from datetime import datetime, timezone

import pandas as pd

from config import HRSA_HC_DOWNLOAD_URL, HRSA_DATA_DIR, UUID_NAMESPACE
from sources.base import BaseSource, SourceStats

logger = logging.getLogger(__name__)

NAMESPACE_UUID = uuid.UUID(UUID_NAMESPACE)


def _hc_uuid(source_id: str) -> str:
    return str(uuid.uuid5(NAMESPACE_UUID, f"hrsa_hc:{source_id}"))


def _hc_loc_uuid(source_id: str) -> str:
    return str(uuid.uuid5(NAMESPACE_UUID, f"hrsa_hc_loc:{source_id}"))


# Keywords that indicate mental health services
MH_SERVICE_KEYWORDS = [
    "mental", "behavioral", "psychiatric", "psychology",
    "counseling", "substance", "addiction", "suicide",
    "crisis", "opioid", "mat",
]


class HRSAHealthCenterProcessor(BaseSource):
    """Processes HRSA Health Center data."""

    @property
    def source_name(self) -> str:
        return "hrsa_hc"

    def _load_data(self) -> pd.DataFrame | None:
        """Load HRSA HC data from file or download."""
        csv_path = os.path.join(self.data_dir, "hrsa_health_centers.csv")

        if os.path.exists(csv_path):
            logger.info(f"  HRSA HC CSV found: {csv_path}")
            return pd.read_csv(csv_path, dtype=str)

        # Try download
        success = self.download_file(
            HRSA_HC_DOWNLOAD_URL, csv_path, "HRSA Health Centers"
        )
        if success:
            try:
                return pd.read_csv(csv_path, dtype=str)
            except Exception as e:
                logger.warning(f"  Failed to parse downloaded file: {e}")
                # The download might return HTML instead of CSV
                os.remove(csv_path)

        logger.warning(
            "  HRSA Health Center data requires manual download:\n"
            "  1. Go to https://data.hrsa.gov/data/download\n"
            "  2. Under 'Health Centers', select "
            "'Health Center Service Delivery and Look-Alike Sites'\n"
            "  3. Download the CSV file\n"
            f"  4. Save it to: {csv_path}\n"
            "  5. Re-run the pipeline"
        )
        return None

    def _has_mh_services(self, row: pd.Series) -> bool:
        """Check if a health center offers mental health services."""
        # Check all text columns for mental health keywords
        for col in row.index:
            val = row.get(col)
            if val and not pd.isna(val):
                val_lower = str(val).lower()
                for keyword in MH_SERVICE_KEYWORDS:
                    if keyword in val_lower:
                        return True
        return False

    def process(self) -> SourceStats:
        logger.info("\n" + "=" * 60)
        logger.info("PHASE 3: HRSA HEALTH CENTERS")
        logger.info("=" * 60)

        df = self._load_data()
        if df is None or len(df) == 0:
            logger.warning("  No HRSA Health Center data available. Skipping.")
            return self.stats

        logger.info(f"  Loaded {len(df):,} health center records")
        logger.info(f"  Columns: {list(df.columns[:15])}")
        self.stats.raw_records = len(df)

        # All FQHCs are relevant as they provide mental health referrals,
        # but we try to filter to those with explicit MH services
        mh_df = df[df.apply(self._has_mh_services, axis=1)]
        if len(mh_df) == 0:
            # If no keyword matches, include all (FQHCs are mandated to serve MH)
            logger.info(
                "  No explicit MH keyword matches. Including all health centers "
                "(FQHCs are mandated to provide MH referrals)."
            )
            mh_df = df

        logger.info(f"  Mental health-relevant centers: {len(mh_df):,}")

        now_iso = datetime.now(timezone.utc).isoformat()
        clinic_uuid = self.lookups.provider_types.get("clinic", "")

        provider_rows = []
        location_rows = []
        insurance_rows = []

        # Common column name patterns in HRSA data
        def get_val(row, candidates):
            for c in candidates:
                for col in row.index:
                    if col.lower().replace(" ", "").replace("_", "") == \
                       c.lower().replace(" ", "").replace("_", ""):
                        val = row.get(col)
                        if val and not pd.isna(val):
                            return str(val).strip()
            return ""

        for _, row in mh_df.iterrows():
            source_id = get_val(row, [
                "HealthCenterNumber", "SiteID", "BHCMISOrgID",
                "Health Center Number", "Site ID", "BHCMIS Org ID",
                "GrantNumber", "Grant Number",
            ])
            if not source_id:
                # Generate from name
                source_id = get_val(row, [
                    "SiteName", "HealthCenterName", "Site Name",
                    "Health Center Name", "Name",
                ])

            if not source_id:
                self.stats.skipped += 1
                continue

            # Dedup against NPPES and SAMHSA
            name = get_val(row, [
                "SiteName", "Site Name", "HealthCenterName",
                "Health Center Name", "Name",
            ])
            if not name:
                self.stats.skipped += 1
                continue

            if self.limit and self.stats.providers_written >= self.limit:
                break

            provider_id = _hc_uuid(source_id)

            phone = self.clean_phone(get_val(row, [
                "SiteTelephoneNumber", "Site Telephone Number",
                "Phone", "Telephone",
            ]))
            website = get_val(row, [
                "SiteWebAddress", "Site Web Address", "Website", "URL",
            ]) or None

            city = get_val(row, ["SiteCity", "Site City", "City"])
            state = get_val(row, [
                "SiteStateAbbreviation", "Site State Abbreviation",
                "State", "StateAbbr",
            ])
            zip_code = get_val(row, [
                "SitePostalCode", "Site Postal Code", "ZipCode", "Zip",
            ])
            lat = get_val(row, [
                "GeocodingLatitude", "Geocoding Latitude", "Latitude", "Lat",
            ])
            lng = get_val(row, [
                "GeocodingLongitude", "Geocoding Longitude",
                "Longitude", "Lng", "Lon",
            ])
            addr1 = get_val(row, [
                "SiteAddress", "Site Address", "AddressLine1",
                "Address Line 1", "Address",
            ])

            if self.dry_run:
                logger.debug(f"    [DRY] {name} — {city}, {state}")
                self.stats.providers_written += 1
                continue

            provider_rows.append({
                "id": provider_id,
                "provider_type_id": clinic_uuid,
                "status": "seeded",
                "tier": "free",
                "source": "hrsa_hc",
                "display_name": name,
                "phone": phone,
                "website_url": website,
                "is_accepting_patients": True,
                "telehealth_available": False,
                "in_person_available": True,
                "facility_type": "Federally Qualified Health Center (FQHC)",
                "sliding_fee_scale": True,
                "practice_type": "fqhc",
                "practice_name": name,
                "data_last_synced_at": now_iso,
            })

            if addr1:
                location_rows.append({
                    "id": _hc_loc_uuid(source_id),
                    "provider_id": provider_id,
                    "address_line1": addr1,
                    "city": city or None,
                    "state_province": state or None,
                    "postal_code": self.clean_zip(zip_code),
                    "country_code": "US",
                    "latitude": float(lat) if lat else None,
                    "longitude": float(lng) if lng else None,
                    "is_primary": True,
                })

            # All FQHCs accept Medicare & Medicaid
            for ins_key in [
                "Medicare:Medicare Part B",
                "Medicaid:Medicaid",
                "Self-Pay:Sliding Scale Available",
            ]:
                ins_uuid = self.lookups.insurance_plans.get(ins_key)
                if ins_uuid:
                    insurance_rows.append({
                        "provider_id": provider_id,
                        "insurance_plan_id": ins_uuid,
                    })

        # Write output
        if not self.dry_run:
            self.stats.providers_written = self.writer.write_providers(provider_rows)
            self.stats.locations_written = self.writer.write_locations(location_rows)
            self.stats.insurance_written = self.writer.write_insurance(insurance_rows)
        else:
            self.stats.providers_written = len(provider_rows)

        self.stats.filtered_records = self.stats.providers_written

        logger.info(f"\n  HRSA HC Summary:")
        logger.info(f"    Raw records:         {self.stats.raw_records:,}")
        logger.info(f"    Health centers out:   {self.stats.providers_written:,}")
        logger.info(f"    Locations:            {self.stats.locations_written:,}")
        logger.info(f"    Insurance links:      {self.stats.insurance_written:,}")
        logger.info(f"    Skipped:              {self.stats.skipped:,}")

        return self.stats
