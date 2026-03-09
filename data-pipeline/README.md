# Psychage Provider Database Pipeline

Downloads, processes, and outputs clean CSV files from U.S. government public domain data sources for import into Supabase.

## Data Sources

| # | Source | Agency | Est. Records | Format |
|---|--------|--------|-------------|--------|
| 1 | NPPES NPI Registry | CMS (HHS) | 500K–700K mental health providers | CSV (~8GB) |
| 2 | SAMHSA Treatment Directory | SAMHSA (HHS) | ~13,000 MH facilities | XLSX/API |
| 3 | HRSA Health Centers | HRSA (HHS) | ~16,200 sites (filtered to MH) | CSV |
| 4 | HRSA HPSA Shortage Areas | HRSA (HHS) | ~6,500 MH shortage designations | CSV |

All data is U.S. federal government public domain (17 U.S.C. § 105).

## Setup

```bash
cd data-pipeline
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Usage

```bash
# Process all sources
python pipeline.py --all

# Process single source
python pipeline.py --source nppes
python pipeline.py --source samhsa

# Test with small dataset
python pipeline.py --all --limit 1000

# Dry run (no CSV output)
python pipeline.py --all --dry-run

# Validate existing CSVs
python pipeline.py --validate-only

# Use live Supabase lookups (for correct UUIDs)
python pipeline.py --all \
  --supabase-url "$VITE_SUPABASE_URL" \
  --supabase-key "$SUPABASE_SERVICE_ROLE_KEY"
```

## Output

CSVs in `output_data/` matching the normalized Supabase schema:

- `providers.csv` — All provider/facility records
- `provider_locations.csv` — Addresses with lat/lng
- `provider_specialties.csv` — Provider ↔ specialty junction
- `provider_languages.csv` — Provider ↔ language junction
- `provider_insurance.csv` — Provider ↔ insurance junction
- `shortage_areas.csv` — HPSA shortage area designations
- `pipeline_report.json` — Run statistics

## Requirements

- Python 3.10+
- 16GB free disk space (for NPPES file)
- 8GB RAM recommended

## Notes

- The NPPES download URL changes monthly. If download fails, manually get the file from https://download.cms.gov/nppes/NPI_Files.html
- SAMHSA and HRSA data may require manual download. The pipeline prints instructions if automatic download fails.
- For Supabase import, run the migration first: `supabase/migrations/20260309000001_pipeline_schema_additions.sql`
