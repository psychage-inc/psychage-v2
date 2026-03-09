"""
Taxonomy code mapping — NPPES taxonomy codes to provider types and specialties.

Ported and expanded from src/lib/providers/npiMappers.ts
"""

import pandas as pd

# =============================================================================
# MENTAL HEALTH TAXONOMY PREFIXES
# Any code starting with these prefixes is considered mental health.
# Ported from npiMappers.ts + expanded with additional codes.
# =============================================================================

MENTAL_HEALTH_TAXONOMY_PREFIXES = [
    "101Y",    # Counselor (all subtypes)
    "103T",    # Psychologist (all subtypes)
    "104100",  # Social Worker
    "1041C",   # Clinical Social Worker
    "1041S",   # School Social Worker
    "106H",    # Marriage & Family Therapist
    "106S",    # Behavior Technician
    "2084A",   # Addiction Medicine Psychiatry
    "2084B",   # Obesity/Bariatric Psychiatry
    "2084D",   # Diagnostic Neuroimaging Psychiatry
    "2084F",   # Forensic Psychiatry
    "2084H",   # Hospice/Palliative Medicine Psychiatry
    "2084N",   # Neurology Psychiatry overlap
    "2084P",   # Psychiatry (all subtypes)
    "2084S",   # Sports Medicine Psychiatry
    "2084V",   # Vascular Neurology Psychiatry overlap
    "225X",    # Occupational Therapist — Mental Health
    "364S",    # Clinical Nurse Specialist — Psychiatric/Mental Health
    "163W",    # Registered Nurse — Psychiatric/Mental Health
    "251S",    # Community/Behavioral Health
    "261Q",    # Clinic/Center (check subtypes for MH)
    "273R",    # Psychiatric Hospital
    "273Y",    # Rehabilitation Hospital — Psychiatric
    "283Q",    # Psychiatric Residential Treatment Facility
    "322D",    # Residential Treatment Facility — MH
]

# More precise matching for codes that need subtype filtering
EXACT_MENTAL_HEALTH_CODES = {
    "363LP0200X",  # NP — Psychiatric/Mental Health
    "363LP0808X",  # NP — Psychiatric/Mental Health
    "163WP0808X",  # RN — Psychiatric/Mental Health
    "163WP0809X",  # RN — Psychiatric/Mental Health (Child)
    "364SP0200X",  # CNS — Psychiatric/MH (Adult)
    "364SP0807X",  # CNS — Psychiatric/MH (Child)
    "364SP0808X",  # CNS — Psychiatric/MH
    "364SP0809X",  # CNS — Psychiatric/MH (Adult)
    "364SP0810X",  # CNS — Psychiatric/MH (Child)
    "364SP0811X",  # CNS — Psychiatric/MH (Lifespan)
    "225XM0800X",  # OT — Mental Health
    "251S00000X",  # Community/Behavioral Health
    "261QM0801X",  # Clinic — Mental Health (including Community)
    "261QM0850X",  # Clinic — Adult Mental Health
    "261QM0855X",  # Clinic — Adolescent/Children Mental Health
    "273R00000X",  # Psychiatric Hospital
    "273Y00000X",  # Rehabilitation Hospital, Psychiatric
    "283Q00000X",  # Psychiatric Residential Treatment Facility
    "322D00000X",  # Residential Treatment Facility — MH
}

# =============================================================================
# TAXONOMY PREFIX → PROVIDER TYPE SLUG
# Maps to the provider_types table slugs from seed SQL.
# =============================================================================

TAXONOMY_PREFIX_TO_TYPE = {
    "101Y": "counselor",
    "103T": "psychologist",
    "1041": "social_worker",
    "104100": "social_worker",
    "2084": "psychiatrist",
    "163W": "therapist",
    "364S": "therapist",
    "363L": "therapist",
    "106H": "therapist",
    "106S": "therapist",
    "225X": "therapist",
    "261Q": "clinic",
    "273R": "clinic",
    "273Y": "clinic",
    "283Q": "clinic",
    "322D": "clinic",
    "251S": "clinic",
}

# =============================================================================
# FULL TAXONOMY CODE → SPECIALTY SLUGS
# Maps specific 10-digit codes to specialty slugs from seed SQL.
# =============================================================================

TAXONOMY_TO_SPECIALTIES = {
    # Counselors
    "101YM0800X": [],                                    # Mental Health Counselor
    "101YP0001X": ["substance_use"],                     # Addiction Counselor
    "101YP1600X": [],                                    # Pastoral Counselor
    "101YS0200X": ["college_students"],                  # School Counselor
    "101YA0400X": [],                                    # Addiction (Substance Use Disorder)
    # Psychologists
    "103TC0700X": [],                                    # Clinical Psychologist
    "103T00000X": [],                                    # Psychologist (general)
    "103TP0814X": ["children", "adolescents"],           # Child Psychologist
    "103TP2701X": ["children", "adolescents"],           # Developmental Psychologist
    "103TP2700X": [],                                    # Psychoanalyst
    "103TF0000X": [],                                    # Family Psychologist
    "103TF0200X": ["ptsd", "trauma_focused"],            # Forensic Psychologist
    "103TH0004X": [],                                    # Health Psychologist
    "103TH0100X": [],                                    # Health Service Psychologist
    "103TR0400X": [],                                    # Rehabilitation Psychologist
    "103TS0200X": ["college_students"],                  # School Psychologist
    "103TA0400X": ["substance_use"],                     # Addiction Psychologist
    # Social Workers
    "1041C0700X": [],                                    # Clinical Social Worker
    "104100000X": [],                                    # Social Worker
    # Psychiatrists
    "2084P0800X": [],                                    # Psychiatry
    "2084P0802X": ["substance_use"],                     # Addiction Psychiatry
    "2084P0804X": ["children", "adolescents"],           # Child & Adolescent Psych
    "2084P0805X": ["elderly"],                           # Geriatric Psychiatry
    "2084F0202X": [],                                    # Forensic Psychiatry
    "2084A0401X": ["substance_use"],                     # Addiction Medicine
    "2084N0600X": [],                                    # Clinical Neurophysiology
    "2084B0002X": [],                                    # Obesity Medicine Psychiatry
    "2084D0003X": [],                                    # Diagnostic Neuroimaging
    "2084H0002X": [],                                    # Hospice Psychiatry
    "2084S0010X": [],                                    # Sports Medicine Psychiatry
    "2084S0012X": [],                                    # Sleep Medicine Psychiatry
    "2084V0102X": [],                                    # Vascular Neurology
    # Marriage & Family Therapist
    "106H00000X": ["couples", "families"],               # MFT
    # Psychiatric Nurses
    "364SP0808X": [],                                    # CNS Psych/MH
    "363LP0200X": [],                                    # NP Psych/MH
    "363LP0808X": [],                                    # NP Psych/MH
    "163WP0808X": [],                                    # RN Psych/MH
    "163WP0809X": ["children", "adolescents"],           # RN Psych/MH (Child)
    # OT
    "225XM0800X": [],                                    # OT — Mental Health
    # Facilities
    "251S00000X": [],                                    # Community/Behavioral Health
    "261QM0801X": [],                                    # Clinic — Mental Health
    "261QM0850X": ["adults"],                            # Clinic — Adult MH
    "261QM0855X": ["children", "adolescents"],           # Clinic — Adolescent/Children MH
    "273R00000X": [],                                    # Psychiatric Hospital
    "273Y00000X": [],                                    # Rehab Hospital Psychiatric
    "283Q00000X": ["residential_treatment"],             # Psych Residential Treatment
    "322D00000X": ["residential_treatment"],             # Residential Treatment MH
}


def is_mental_health_taxonomy(code: str) -> bool:
    """Check if a taxonomy code belongs to a mental health provider."""
    if not code or (isinstance(code, float) and pd.isna(code)):
        return False
    code = str(code).strip()
    if code in EXACT_MENTAL_HEALTH_CODES:
        return True
    for prefix in MENTAL_HEALTH_TAXONOMY_PREFIXES:
        if code.startswith(prefix):
            return True
    return False


def get_provider_type_slug(code: str) -> str:
    """Get the provider_type slug for a taxonomy code. Defaults to 'therapist'."""
    if not code:
        return "therapist"
    code = str(code).strip()
    # Try longest prefix first for specificity
    for prefix in sorted(TAXONOMY_PREFIX_TO_TYPE.keys(), key=len, reverse=True):
        if code.startswith(prefix):
            return TAXONOMY_PREFIX_TO_TYPE[prefix]
    return "therapist"


def get_specialty_slugs(code: str) -> list[str]:
    """Get specialty slugs for a specific taxonomy code."""
    if not code:
        return []
    code = str(code).strip()
    return TAXONOMY_TO_SPECIALTIES.get(code, [])


def get_entity_type(entity_code: str) -> str:
    """Map NPPES Entity Type Code to a string."""
    return "organization" if entity_code == "2" else "individual"
