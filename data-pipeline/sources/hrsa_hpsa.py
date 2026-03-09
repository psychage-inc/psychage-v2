"""
HRSA HPSA (Health Professional Shortage Area) processor.

Processes shortage area designation data for mental health.
This data goes into its own table (shortage_areas), not providers.
"""

import os
import uuid
import logging
from datetime import datetime, timezone

import pandas as pd

from config import HPSA_DATA_DIR, UUID_NAMESPACE
from sources.base import BaseSource, SourceStats

logger = logging.getLogger(__name__)

NAMESPACE_UUID = uuid.UUID(UUID_NAMESPACE)


def _hpsa_uuid(hpsa_id: str) -> str:
    return str(uuid.uuid5(NAMESPACE_UUID, f"hpsa:{hpsa_id}"))


# Designation type normalization
DESIGNATION_TYPE_MAP = {
    "geographic": "geographic",
    "geo": "geographic",
    "population": "population",
    "pop": "population",
    "facility": "facility",
    "fac": "facility",
}


class HRSAHPSAProcessor(BaseSource):
    """Processes HRSA HPSA shortage area data."""

    @property
    def source_name(self) -> str:
        return "hrsa_hpsa"

    def _load_data(self) -> pd.DataFrame | None:
        """Load HPSA CSV data."""
        csv_path = os.path.join(self.data_dir, "hpsa_mental_health.csv")

        if os.path.exists(csv_path):
            logger.info(f"  HPSA CSV found: {csv_path}")
            return pd.read_csv(csv_path, dtype=str)

        # Check for alternative filenames
        for pattern in ["hpsa*.csv", "HPSA*.csv", "shortage*.csv"]:
            import glob
            matches = glob.glob(os.path.join(self.data_dir, pattern))
            if matches:
                logger.info(f"  Found HPSA file: {matches[0]}")
                return pd.read_csv(matches[0], dtype=str)

        logger.warning(
            "  HPSA data requires manual download:\n"
            "  1. Go to https://data.hrsa.gov/tools/shortage-area\n"
            "  2. Select 'Mental Health' under Discipline Type\n"
            "  3. Download all results as CSV\n"
            f"  4. Save to: {csv_path}\n"
            "  5. Re-run the pipeline\n"
            "\n  This is supplementary data — the pipeline works without it."
        )
        return None

    def process(self) -> SourceStats:
        logger.info("\n" + "=" * 60)
        logger.info("PHASE 4: HRSA HPSA SHORTAGE AREAS")
        logger.info("=" * 60)

        df = self._load_data()
        if df is None or len(df) == 0:
            logger.info("  No HPSA data available. Skipping (supplementary).")
            return self.stats

        logger.info(f"  Loaded {len(df):,} HPSA records")
        logger.info(f"  Columns: {list(df.columns[:15])}")
        self.stats.raw_records = len(df)

        # Column name helper
        def get_val(row, candidates):
            for c in candidates:
                for col in row.index:
                    if c.lower().replace(" ", "").replace("_", "") in \
                       col.lower().replace(" ", "").replace("_", ""):
                        val = row.get(col)
                        if val and not pd.isna(val):
                            return str(val).strip()
            return ""

        # Filter to Mental Health discipline only
        discipline_col = None
        for col in df.columns:
            if "discipline" in col.lower() or "type" in col.lower():
                discipline_col = col
                break

        if discipline_col:
            mental_health_mask = df[discipline_col].str.lower().str.contains(
                "mental", na=False
            )
            df = df[mental_health_mask]
            logger.info(f"  After Mental Health filter: {len(df):,} records")

        shortage_rows = []

        for _, row in df.iterrows():
            hpsa_id = get_val(row, ["HPSAID", "SourceID", "HPSASourceID", "ID"])
            if not hpsa_id:
                self.stats.skipped += 1
                continue

            if self.limit and len(shortage_rows) >= self.limit:
                break

            # Designation type
            dtype_raw = get_val(row, [
                "HPSADesignationType", "DesignationType", "Type",
            ]).lower()
            designation_type = DESIGNATION_TYPE_MAP.get(dtype_raw, "geographic")

            hpsa_name = get_val(row, ["HPSAName", "Name", "AreaName"])
            state = get_val(row, [
                "CommonStateAbbreviation", "StateAbbreviation", "State",
            ])
            county = get_val(row, [
                "CommonCountyName", "CountyName", "County",
            ]) or None

            score_str = get_val(row, ["HPSAScore", "Score"])
            score = int(score_str) if score_str and score_str.isdigit() else None

            status = get_val(row, ["HPSAStatus", "Status"])
            desig_date = get_val(row, [
                "HPSADesignationDate", "DesignationDate",
            ]) or None
            update_date = get_val(row, [
                "HPSADesignationLastUpdateDate", "LastUpdateDate", "UpdateDate",
            ]) or None

            lat_str = get_val(row, ["Latitude", "Lat"])
            lng_str = get_val(row, ["Longitude", "Lng", "Lon"])

            if self.dry_run:
                logger.debug(f"    [DRY] {hpsa_name} — {state} (score: {score})")
                self.stats.providers_written += 1
                continue

            shortage_rows.append({
                "id": _hpsa_uuid(hpsa_id),
                "hpsa_id": hpsa_id,
                "designation_type": designation_type,
                "discipline": "mental_health",
                "state_abbr": state,
                "county_name": county,
                "hpsa_name": hpsa_name or f"HPSA {hpsa_id}",
                "hpsa_score": score,
                "designation_date": desig_date,
                "last_update_date": update_date,
                "latitude": float(lat_str) if lat_str else None,
                "longitude": float(lng_str) if lng_str else None,
            })

        # Write output
        if not self.dry_run:
            self.stats.providers_written = self.writer.write_shortage_areas(
                shortage_rows
            )

        self.stats.filtered_records = len(shortage_rows)

        logger.info(f"\n  HPSA Summary:")
        logger.info(f"    Raw records:       {self.stats.raw_records:,}")
        logger.info(f"    Shortage areas:    {len(shortage_rows):,}")
        logger.info(f"    Skipped:           {self.stats.skipped:,}")

        return self.stats
