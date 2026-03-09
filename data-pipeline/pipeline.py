#!/usr/bin/env python3
"""
Psychage Provider Database Pipeline

Downloads, processes, and outputs clean CSV files from U.S. government
data sources for import into Supabase (PostgreSQL).

Usage:
  python pipeline.py --all                    # Process all sources
  python pipeline.py --source nppes           # Process single source
  python pipeline.py --source samhsa          # Process SAMHSA only
  python pipeline.py --source hrsa_hc         # Process HRSA HC only
  python pipeline.py --source hrsa_hpsa       # Process HPSA only
  python pipeline.py --all --dry-run          # Validate without writing CSVs
  python pipeline.py --all --limit 1000       # Cap NPPES at 1000 providers
  python pipeline.py --validate-only          # Validate existing CSVs

Data sources (all U.S. federal government, public domain):
  1. NPPES NPI Registry (CMS) — 500K–700K individual MH providers
  2. SAMHSA Treatment Directory — ~13K mental health facilities
  3. HRSA Health Centers — ~16K FQHCs (filtered to MH services)
  4. HRSA HPSA Shortage Areas — ~6,500 MH shortage designations
"""

import os
import sys
import json
import time
import logging
import argparse
from datetime import datetime, timezone

# Add pipeline root to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import (
    OUTPUT_DIR, DATA_DIR, NPPES_DATA_DIR, SAMHSA_DATA_DIR,
    HRSA_DATA_DIR, HPSA_DATA_DIR, OUTPUT_FILES,
)
from mapping.lookups import resolve_lookups
from output.writer import CSVWriter
from sources.nppes import NPPESProcessor
from sources.samhsa import SAMHSAProcessor
from sources.hrsa_hc import HRSAHealthCenterProcessor
from sources.hrsa_hpsa import HRSAHPSAProcessor

logger = logging.getLogger("pipeline")


def setup_logging(verbose: bool = False) -> None:
    """Configure logging."""
    level = logging.DEBUG if verbose else logging.INFO
    fmt = "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
    handlers = [
        logging.StreamHandler(sys.stdout),
    ]

    # Also log to file if output dir exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    log_path = os.path.join(OUTPUT_DIR, "pipeline.log")
    handlers.append(logging.FileHandler(log_path, mode="w"))

    logging.basicConfig(level=level, format=fmt, handlers=handlers)


def validate_csvs() -> bool:
    """Run validation checks on existing output CSVs."""
    import pandas as pd

    logger.info("\n" + "=" * 60)
    logger.info("VALIDATION CHECKS")
    logger.info("=" * 60)

    errors = 0

    # Check providers.csv
    providers_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["providers"])
    if not os.path.exists(providers_path):
        logger.error("  providers.csv not found!")
        return False

    providers = pd.read_csv(providers_path, dtype=str)
    logger.info(f"\n  providers.csv: {len(providers):,} rows")

    # Check required fields
    empty_names = providers["display_name"].isna() | (
        providers["display_name"].str.strip() == ""
    )
    if empty_names.any():
        logger.error(f"    {empty_names.sum()} rows with empty display_name")
        errors += 1

    empty_types = providers["provider_type_id"].isna() | (
        providers["provider_type_id"].str.strip() == ""
    )
    if empty_types.any():
        logger.error(f"    {empty_types.sum()} rows with empty provider_type_id")
        errors += 1

    # Check NPI uniqueness
    npi_col = providers["npi_number"].dropna()
    npi_dupes = npi_col[npi_col.duplicated()]
    if len(npi_dupes) > 0:
        logger.error(f"    {len(npi_dupes)} duplicate NPI numbers!")
        errors += 1
    else:
        logger.info(f"    NPI uniqueness: OK ({len(npi_col):,} unique NPIs)")

    # Check UUID uniqueness
    id_dupes = providers["id"][providers["id"].duplicated()]
    if len(id_dupes) > 0:
        logger.error(f"    {len(id_dupes)} duplicate provider IDs!")
        errors += 1
    else:
        logger.info(f"    UUID uniqueness: OK")

    # Source distribution
    logger.info(f"\n    By source:")
    for source, count in providers["source"].value_counts().items():
        logger.info(f"      {source}: {count:,}")

    # Check locations
    locations_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["locations"])
    if os.path.exists(locations_path):
        locations = pd.read_csv(locations_path, dtype=str)
        logger.info(f"\n  provider_locations.csv: {len(locations):,} rows")

        # Check FK integrity
        loc_provider_ids = set(locations["provider_id"].dropna())
        provider_ids = set(providers["id"])
        orphan_locs = loc_provider_ids - provider_ids
        if orphan_locs:
            logger.error(
                f"    {len(orphan_locs)} locations reference non-existent providers!"
            )
            errors += 1
        else:
            logger.info(f"    FK integrity: OK")

        # State code validation
        from config import US_STATES
        states = locations["state_province"].dropna()
        invalid_states = states[~states.isin(US_STATES)]
        if len(invalid_states) > 0:
            logger.warning(
                f"    {len(invalid_states)} locations with non-standard state codes"
            )
            logger.warning(
                f"      Values: {invalid_states.unique()[:10]}"
            )

    # Check specialties
    specs_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["specialties"])
    if os.path.exists(specs_path):
        specs = pd.read_csv(specs_path, dtype=str)
        logger.info(f"\n  provider_specialties.csv: {len(specs):,} rows")

    # Check languages
    langs_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["languages"])
    if os.path.exists(langs_path):
        langs = pd.read_csv(langs_path, dtype=str)
        logger.info(f"  provider_languages.csv: {len(langs):,} rows")

    # Check insurance
    ins_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["insurance"])
    if os.path.exists(ins_path):
        ins = pd.read_csv(ins_path, dtype=str)
        logger.info(f"  provider_insurance.csv: {len(ins):,} rows")

    # Check shortage areas
    sa_path = os.path.join(OUTPUT_DIR, OUTPUT_FILES["shortage_areas"])
    if os.path.exists(sa_path):
        sa = pd.read_csv(sa_path, dtype=str)
        logger.info(f"  shortage_areas.csv: {len(sa):,} rows")

    if errors == 0:
        logger.info(f"\n  All validation checks passed!")
    else:
        logger.error(f"\n  {errors} validation error(s) found!")

    return errors == 0


def print_import_instructions() -> None:
    """Print Supabase import instructions."""
    print(f"\n{'=' * 60}")
    print("NEXT STEPS: IMPORT INTO SUPABASE")
    print("=" * 60)
    print("""
1. Run the migration SQL in Supabase SQL Editor:
   supabase/migrations/20260309000001_pipeline_schema_additions.sql

2. Import CSVs in dependency order:

   Option A — psql command line (recommended for large files):

   psql "$DATABASE_URL" << 'SQL'
   ALTER TABLE providers DISABLE TRIGGER ALL;
   ALTER TABLE provider_locations DISABLE TRIGGER ALL;
   ALTER TABLE provider_specialties DISABLE TRIGGER ALL;
   ALTER TABLE provider_languages DISABLE TRIGGER ALL;
   ALTER TABLE provider_insurance DISABLE TRIGGER ALL;
   SQL

   psql "$DATABASE_URL" -c "\\copy providers(id,npi_number,provider_type_id,status,tier,source,display_name,credentials_suffix,bio,photo_url,practice_name,practice_type,website_url,phone,email,appointment_url,is_accepting_patients,telehealth_available,in_person_available,taxonomy_code,taxonomy_description,facility_type,sliding_fee_scale,emergency_services,data_last_synced_at) FROM 'output_data/providers.csv' WITH CSV HEADER;"

   psql "$DATABASE_URL" -c "\\copy provider_locations(id,provider_id,address_line1,address_line2,city,state_province,postal_code,country_code,latitude,longitude,is_primary) FROM 'output_data/provider_locations.csv' WITH CSV HEADER;"

   psql "$DATABASE_URL" -c "\\copy provider_specialties(provider_id,specialty_id) FROM 'output_data/provider_specialties.csv' WITH CSV HEADER;"

   psql "$DATABASE_URL" -c "\\copy provider_languages(provider_id,language_id,proficiency) FROM 'output_data/provider_languages.csv' WITH CSV HEADER;"

   psql "$DATABASE_URL" -c "\\copy provider_insurance(provider_id,insurance_plan_id) FROM 'output_data/provider_insurance.csv' WITH CSV HEADER;"

   psql "$DATABASE_URL" << 'SQL'
   ALTER TABLE providers ENABLE TRIGGER ALL;
   ALTER TABLE provider_locations ENABLE TRIGGER ALL;
   ALTER TABLE provider_specialties ENABLE TRIGGER ALL;
   ALTER TABLE provider_languages ENABLE TRIGGER ALL;
   ALTER TABLE provider_insurance ENABLE TRIGGER ALL;
   SQL

   # If shortage areas CSV exists:
   psql "$DATABASE_URL" -c "\\copy shortage_areas(id,hpsa_id,designation_type,discipline,state_abbr,county_name,hpsa_name,hpsa_score,designation_date,last_update_date,latitude,longitude) FROM 'output_data/shortage_areas.csv' WITH CSV HEADER;"

   Option B — Supabase Dashboard:
   - Table Editor → providers → Import Data → Upload CSV
   - Note: 50MB file size limit. Split large files first.

3. Verify:
   SELECT source, count(*) FROM providers GROUP BY source;
   SELECT entity_type_counts FROM (
     SELECT provider_type_id, count(*) FROM providers GROUP BY provider_type_id
   ) sub;
""")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Psychage Provider Database Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--all", action="store_true",
        help="Process all data sources",
    )
    parser.add_argument(
        "--source", choices=["nppes", "samhsa", "hrsa_hc", "hrsa_hpsa"],
        help="Process a single data source",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Validate and count without writing CSVs",
    )
    parser.add_argument(
        "--limit", type=int, default=None,
        help="Maximum number of providers to process (useful for testing)",
    )
    parser.add_argument(
        "--validate-only", action="store_true",
        help="Run validation on existing output CSVs",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true",
        help="Enable verbose/debug logging",
    )
    parser.add_argument(
        "--supabase-url", type=str, default=None,
        help="Supabase URL for live lookup resolution",
    )
    parser.add_argument(
        "--supabase-key", type=str, default=None,
        help="Supabase service role key for live lookup resolution",
    )

    args = parser.parse_args()

    if not args.all and not args.source and not args.validate_only:
        parser.print_help()
        sys.exit(1)

    setup_logging(args.verbose)

    # Validation-only mode
    if args.validate_only:
        success = validate_csvs()
        sys.exit(0 if success else 1)

    # Banner
    logger.info("=" * 60)
    logger.info("  PSYCHAGE PROVIDER DATABASE PIPELINE")
    logger.info("=" * 60)
    logger.info(f"  Mode:    {'DRY RUN' if args.dry_run else 'LIVE'}")
    logger.info(f"  Sources: {'ALL' if args.all else args.source}")
    if args.limit:
        logger.info(f"  Limit:   {args.limit:,}")
    logger.info("")

    start_time = time.time()

    # Ensure data directories exist
    for d in [DATA_DIR, NPPES_DATA_DIR, SAMHSA_DATA_DIR, HRSA_DATA_DIR, HPSA_DATA_DIR]:
        os.makedirs(d, exist_ok=True)

    # Resolve lookup table UUIDs
    logger.info("Resolving lookup table UUIDs...")
    supabase_url = args.supabase_url or os.environ.get(
        "VITE_SUPABASE_URL", os.environ.get("SUPABASE_URL")
    )
    service_key = args.supabase_key or os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    lookups = resolve_lookups(supabase_url, service_key)

    # Initialize CSV writer
    writer = CSVWriter()
    if not args.dry_run:
        writer.reset()  # Start fresh

    # Shared NPI set for cross-source dedup
    seen_npis: set[str] = set()

    # Process sources
    sources_to_run = []
    if args.all:
        sources_to_run = ["nppes", "samhsa", "hrsa_hc", "hrsa_hpsa"]
    elif args.source:
        sources_to_run = [args.source]

    all_stats = []

    for source_name in sources_to_run:
        if source_name == "nppes":
            processor = NPPESProcessor(
                lookups=lookups, writer=writer, data_dir=NPPES_DATA_DIR,
                seen_npis=seen_npis, dry_run=args.dry_run, limit=args.limit,
            )
        elif source_name == "samhsa":
            processor = SAMHSAProcessor(
                lookups=lookups, writer=writer, data_dir=SAMHSA_DATA_DIR,
                seen_npis=seen_npis, dry_run=args.dry_run, limit=args.limit,
            )
        elif source_name == "hrsa_hc":
            processor = HRSAHealthCenterProcessor(
                lookups=lookups, writer=writer, data_dir=HRSA_DATA_DIR,
                seen_npis=seen_npis, dry_run=args.dry_run, limit=args.limit,
            )
        elif source_name == "hrsa_hpsa":
            processor = HRSAHPSAProcessor(
                lookups=lookups, writer=writer, data_dir=HPSA_DATA_DIR,
                seen_npis=seen_npis, dry_run=args.dry_run, limit=args.limit,
            )
        else:
            continue

        stats = processor.timed_process()
        all_stats.append(stats)

    # Final summary
    total_time = time.time() - start_time

    logger.info("\n" + "=" * 60)
    logger.info("PIPELINE COMPLETE")
    logger.info("=" * 60)

    total_providers = sum(s.providers_written for s in all_stats)
    total_locations = sum(s.locations_written for s in all_stats)
    total_specialties = sum(s.specialties_written for s in all_stats)
    total_languages = sum(s.languages_written for s in all_stats)
    total_insurance = sum(s.insurance_written for s in all_stats)

    logger.info(f"\n  Total providers:    {total_providers:,}")
    logger.info(f"  Total locations:    {total_locations:,}")
    logger.info(f"  Total specialties:  {total_specialties:,}")
    logger.info(f"  Total languages:    {total_languages:,}")
    logger.info(f"  Total insurance:    {total_insurance:,}")
    logger.info(f"  Total time:         {total_time:.1f}s")

    logger.info(f"\n  By source:")
    for stats in all_stats:
        logger.info(
            f"    {stats.source_name:12s}: {stats.providers_written:>8,} providers "
            f"({stats.duration_sec:.1f}s)"
        )

    # Write report
    if not args.dry_run:
        report = {
            "run_mode": "dry_run" if args.dry_run else "live",
            "limit": args.limit,
            "total_time_sec": round(total_time, 1),
            "totals": {
                "providers": total_providers,
                "locations": total_locations,
                "specialties": total_specialties,
                "languages": total_languages,
                "insurance": total_insurance,
            },
            "sources": {s.source_name: s.to_dict() for s in all_stats},
        }
        writer.write_report(report)
        writer.copy_schema_sql()

        # Print file sizes
        logger.info(f"\n  Output files:")
        for filename, size_mb in writer.get_file_sizes().items():
            logger.info(f"    {filename:40s} {size_mb:8.1f} MB")

    # Run validation
    if not args.dry_run and total_providers > 0:
        validate_csvs()

    # Print import instructions
    if not args.dry_run and total_providers > 0:
        print_import_instructions()


if __name__ == "__main__":
    main()
