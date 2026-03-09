"""
CSV writer for Supabase-importable output files.

Writes DataFrames to CSV with correct column names matching the
normalized Supabase schema. Supports append mode for chunked processing.
"""

import os
import csv
import json
from datetime import datetime, timezone

import pandas as pd

from config import OUTPUT_DIR, OUTPUT_FILES

# =============================================================================
# COLUMN DEFINITIONS — must match Supabase table schemas exactly
# =============================================================================

PROVIDERS_COLUMNS = [
    "id", "npi_number", "provider_type_id", "status", "tier", "source",
    "display_name", "credentials_suffix", "bio", "photo_url",
    "practice_name", "practice_type", "website_url", "phone", "email",
    "appointment_url", "is_accepting_patients", "telehealth_available",
    "in_person_available", "taxonomy_code", "taxonomy_description",
    "facility_type", "sliding_fee_scale", "emergency_services",
    "data_last_synced_at",
]

LOCATIONS_COLUMNS = [
    "id", "provider_id", "address_line1", "address_line2", "city",
    "state_province", "postal_code", "country_code", "latitude", "longitude",
    "is_primary",
]

SPECIALTIES_COLUMNS = [
    "provider_id", "specialty_id",
]

LANGUAGES_COLUMNS = [
    "provider_id", "language_id", "proficiency",
]

INSURANCE_COLUMNS = [
    "provider_id", "insurance_plan_id",
]

SHORTAGE_AREAS_COLUMNS = [
    "id", "hpsa_id", "designation_type", "discipline", "state_abbr",
    "county_name", "hpsa_name", "hpsa_score", "designation_date",
    "last_update_date", "latitude", "longitude",
]


class CSVWriter:
    """Manages output CSV files for the pipeline."""

    def __init__(self, output_dir: str | None = None):
        self.output_dir = output_dir or OUTPUT_DIR
        os.makedirs(self.output_dir, exist_ok=True)
        self._initialized: set[str] = set()

    def _get_path(self, key: str) -> str:
        return os.path.join(self.output_dir, OUTPUT_FILES[key])

    def _init_file(self, key: str, columns: list[str]) -> None:
        """Write CSV header if file hasn't been initialized yet."""
        if key not in self._initialized:
            path = self._get_path(key)
            with open(path, "w", newline="") as f:
                writer = csv.writer(f)
                writer.writerow(columns)
            self._initialized.add(key)

    def _append_rows(self, key: str, columns: list[str], rows: list[dict]) -> int:
        """Append rows to a CSV file. Returns number of rows written."""
        if not rows:
            return 0
        self._init_file(key, columns)
        path = self._get_path(key)
        with open(path, "a", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction="ignore")
            for row in rows:
                # Convert booleans to PostgreSQL-compatible format
                cleaned = {}
                for col in columns:
                    val = row.get(col)
                    if val is None or (isinstance(val, float) and pd.isna(val)):
                        cleaned[col] = ""
                    elif isinstance(val, bool):
                        cleaned[col] = "true" if val else "false"
                    else:
                        # Escape any embedded newlines or special chars
                        cleaned[col] = str(val).replace("\n", " ").replace("\r", "")
                writer.writerow(cleaned)
        return len(rows)

    def write_providers(self, rows: list[dict]) -> int:
        """Append provider rows to providers.csv."""
        return self._append_rows("providers", PROVIDERS_COLUMNS, rows)

    def write_locations(self, rows: list[dict]) -> int:
        """Append location rows to provider_locations.csv."""
        return self._append_rows("locations", LOCATIONS_COLUMNS, rows)

    def write_specialties(self, rows: list[dict]) -> int:
        """Append specialty junction rows to provider_specialties.csv."""
        return self._append_rows("specialties", SPECIALTIES_COLUMNS, rows)

    def write_languages(self, rows: list[dict]) -> int:
        """Append language junction rows to provider_languages.csv."""
        return self._append_rows("languages", LANGUAGES_COLUMNS, rows)

    def write_insurance(self, rows: list[dict]) -> int:
        """Append insurance junction rows to provider_insurance.csv."""
        return self._append_rows("insurance", INSURANCE_COLUMNS, rows)

    def write_shortage_areas(self, rows: list[dict]) -> int:
        """Append shortage area rows to shortage_areas.csv."""
        return self._append_rows("shortage_areas", SHORTAGE_AREAS_COLUMNS, rows)

    def reset(self) -> None:
        """Remove all output files and reset state."""
        for key in OUTPUT_FILES:
            path = self._get_path(key)
            if os.path.exists(path):
                os.remove(path)
        self._initialized.clear()

    def write_report(self, stats: dict) -> None:
        """Write pipeline run report as JSON."""
        stats["generated_at"] = datetime.now(timezone.utc).isoformat()
        path = self._get_path("report")
        with open(path, "w") as f:
            json.dump(stats, f, indent=2, default=str)

    def copy_schema_sql(self) -> None:
        """Copy the migration SQL to the output directory for reference."""
        migration_path = os.path.join(
            os.path.dirname(self.output_dir), "..", "supabase", "migrations",
            "20260309000001_pipeline_schema_additions.sql"
        )
        if os.path.exists(migration_path):
            import shutil
            shutil.copy2(migration_path, self._get_path("schema"))

    def get_file_sizes(self) -> dict[str, float]:
        """Get sizes of all output files in MB."""
        sizes = {}
        for key, filename in OUTPUT_FILES.items():
            path = os.path.join(self.output_dir, filename)
            if os.path.exists(path):
                sizes[filename] = os.path.getsize(path) / (1024 * 1024)
        return sizes
