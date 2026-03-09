"""
Pipeline configuration — constants, URLs, file paths, and column definitions.
"""

import os

# =============================================================================
# DIRECTORY PATHS
# =============================================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
OUTPUT_DIR = os.path.join(BASE_DIR, "output_data")

NPPES_DATA_DIR = os.path.join(DATA_DIR, "nppes")
SAMHSA_DATA_DIR = os.path.join(DATA_DIR, "samhsa")
HRSA_DATA_DIR = os.path.join(DATA_DIR, "hrsa")
HPSA_DATA_DIR = os.path.join(DATA_DIR, "hpsa")

# Supabase seed SQL path (for offline UUID resolution)
SEED_SQL_PATH = os.path.join(
    BASE_DIR, "..", "supabase", "migrations",
    "20260306000002_provider_directory_v2_seed.sql"
)

# =============================================================================
# DOWNLOAD URLs
# =============================================================================

# NPPES Full Replacement Monthly NPI File
# CHECK the actual current filename at https://download.cms.gov/nppes/NPI_Files.html
# The URL changes monthly — update this to the latest.
NPPES_DOWNLOAD_URL = (
    "https://download.cms.gov/nppes/NPPES_Data_Dissemination_March_2026.zip"
)

# SAMHSA National Directory of Mental Health Treatment Facilities
# CHECK current link at https://www.samhsa.gov/data/data-we-collect/n-sumhss
SAMHSA_XLSX_URL = (
    "https://www.samhsa.gov/data/sites/default/files/reports/rpt44880/"
    "2024-National-Directory-of-MH-Treatment-Facilities.xlsx"
)

# FindTreatment.gov API fallback
SAMHSA_API_BASE = "https://findtreatment.gov/locator/exportResults"

# HRSA Health Center data — may require manual download
# Download page: https://data.hrsa.gov/data/download
HRSA_HC_DOWNLOAD_URL = "https://data.hrsa.gov/data/download?data=hc"

# =============================================================================
# PROCESSING CONFIG
# =============================================================================

CHUNK_SIZE = 100_000  # Rows per pandas chunk for NPPES processing
REQUEST_TIMEOUT = 60  # Seconds for HTTP requests
MAX_RETRIES = 3
RETRY_BACKOFF = 2  # Exponential backoff multiplier

# =============================================================================
# NPPES COLUMN NAMES
# The NPPES CSV has 329+ columns. We only read the ones we need.
# =============================================================================

NPPES_COLUMNS = [
    "NPI",
    "Entity Type Code",
    "Provider Organization Name (Legal Business Name)",
    "Provider Last Name (Legal Name)",
    "Provider First Name",
    "Provider Middle Name",
    "Provider Name Prefix Text",
    "Provider Name Suffix Text",
    "Provider Credential Text",
    "Provider First Line Business Practice Location Address",
    "Provider Second Line Business Practice Location Address",
    "Provider Business Practice Location Address City Name",
    "Provider Business Practice Location Address State Name",
    "Provider Business Practice Location Address Postal Code",
    "Provider Business Practice Location Address Country Code (If outside U.S.)",
    "Provider Business Practice Location Address Telephone Number",
    "Provider Business Practice Location Address Fax Number",
    "Provider Enumeration Date",
    "Last Update Date",
    "NPI Deactivation Date",
    "Provider Gender Code",
]

# Add taxonomy code columns 1-15 and their primary switches
for i in range(1, 16):
    NPPES_COLUMNS.append(f"Healthcare Provider Taxonomy Code_{i}")
    NPPES_COLUMNS.append(f"Healthcare Provider Primary Taxonomy Switch_{i}")

# =============================================================================
# US STATE CODES (for validation)
# =============================================================================

US_STATES = {
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
    "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
    "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
    "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
    "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
    "WY", "AS", "GU", "MP", "PR", "VI",
}

# State FIPS codes for SAMHSA API fallback
STATE_FIPS = {
    "AL": 1, "AK": 2, "AZ": 4, "AR": 5, "CA": 6, "CO": 8, "CT": 9,
    "DE": 10, "DC": 11, "FL": 12, "GA": 13, "HI": 15, "ID": 16,
    "IL": 17, "IN": 18, "IA": 19, "KS": 20, "KY": 21, "LA": 22,
    "ME": 23, "MD": 24, "MA": 25, "MI": 26, "MN": 27, "MS": 28,
    "MO": 29, "MT": 30, "NE": 31, "NV": 32, "NH": 33, "NJ": 34,
    "NM": 35, "NY": 36, "NC": 37, "ND": 38, "OH": 39, "OK": 40,
    "OR": 41, "PA": 42, "RI": 44, "SC": 45, "SD": 46, "TN": 47,
    "TX": 48, "UT": 49, "VT": 50, "VA": 51, "WA": 53, "WV": 54,
    "WI": 55, "WY": 56,
}

# =============================================================================
# DETERMINISTIC UUID NAMESPACE
# Used with uuid5 to generate reproducible IDs from source + key.
# =============================================================================

UUID_NAMESPACE = "b7e23ec2-9a52-4f8d-a0c1-6f4e8d3b2a19"

# =============================================================================
# OUTPUT CSV FILENAMES
# =============================================================================

OUTPUT_FILES = {
    "providers": "providers.csv",
    "locations": "provider_locations.csv",
    "specialties": "provider_specialties.csv",
    "languages": "provider_languages.csv",
    "insurance": "provider_insurance.csv",
    "shortage_areas": "shortage_areas.csv",
    "report": "pipeline_report.json",
    "schema": "schema.sql",
}
