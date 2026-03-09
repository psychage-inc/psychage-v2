"""
Lookup table UUID resolution.

Parses the Supabase seed SQL to extract slug → UUID mappings,
or connects to Supabase to fetch live UUIDs.

Since the seed SQL uses gen_random_uuid() and doesn't hardcode UUIDs,
we generate deterministic UUIDs from slugs for CSV output. These will
match during import if we use the same UUID generation strategy, OR
the import SQL can be adjusted to use the UUIDs we generate.

In practice, the best approach is to:
1. Run the migration & seed SQL first (creates real UUIDs)
2. Query Supabase for the actual UUIDs
3. Use those in the CSV output

For offline/disconnected operation, we use deterministic uuid5 from slugs.
"""

import os
import re
import uuid
from dataclasses import dataclass, field

from config import SEED_SQL_PATH, UUID_NAMESPACE

NAMESPACE_UUID = uuid.UUID(UUID_NAMESPACE)


@dataclass
class LookupTables:
    """Resolved lookup table mappings."""
    provider_types: dict[str, str] = field(default_factory=dict)   # slug → uuid
    specialties: dict[str, str] = field(default_factory=dict)      # slug → uuid
    languages: dict[str, str] = field(default_factory=dict)        # code → uuid
    insurance_plans: dict[str, str] = field(default_factory=dict)  # key → uuid
    cultural_competencies: dict[str, str] = field(default_factory=dict)  # slug → uuid


def _deterministic_uuid(table: str, key: str) -> str:
    """Generate a deterministic UUID from table name + key."""
    return str(uuid.uuid5(NAMESPACE_UUID, f"{table}:{key}"))


def resolve_from_supabase(supabase_url: str, service_key: str) -> LookupTables:
    """Fetch lookup UUIDs directly from Supabase (preferred method)."""
    try:
        from supabase import create_client
    except ImportError:
        raise ImportError(
            "supabase-py is required for live lookup resolution. "
            "Install with: pip install supabase"
        )

    client = create_client(supabase_url, service_key)
    lookups = LookupTables()

    # Provider types
    result = client.table("provider_types").select("id, slug").execute()
    for row in result.data:
        lookups.provider_types[row["slug"]] = row["id"]

    # Specialties
    result = client.table("specialties").select("id, slug").execute()
    for row in result.data:
        lookups.specialties[row["slug"]] = row["id"]

    # Languages
    result = client.table("languages_lookup").select("id, code").execute()
    for row in result.data:
        lookups.languages[row["code"]] = row["id"]

    # Insurance plans
    result = client.table("insurance_plans").select("id, name, carrier").execute()
    for row in result.data:
        key = f"{row['carrier']}:{row['name']}"
        lookups.insurance_plans[key] = row["id"]

    # Cultural competencies
    result = client.table("cultural_competencies").select("id, slug").execute()
    for row in result.data:
        lookups.cultural_competencies[row["slug"]] = row["id"]

    return lookups


def resolve_from_seed_sql(sql_path: str | None = None) -> LookupTables:
    """
    Parse the seed SQL to extract lookup slugs, then generate deterministic UUIDs.

    This is the offline fallback. The generated UUIDs will NOT match the ones
    in Supabase (which are random). After CSV import, you must either:
    - Use the Supabase-fetched UUIDs (preferred), or
    - Re-run with --supabase flag to get real UUIDs.
    """
    path = sql_path or SEED_SQL_PATH
    lookups = LookupTables()

    if not os.path.exists(path):
        print(f"  Warning: Seed SQL not found at {path}")
        print("  Generating deterministic UUIDs from known slugs...")
        return _generate_from_known_slugs()

    with open(path, "r") as f:
        sql = f.read()

    # Extract provider_types slugs
    # Pattern: ('slug', 'label', 'description', sort_order)
    pt_matches = re.findall(
        r"INSERT INTO public\.provider_types.*?VALUES\s*(.*?)ON CONFLICT",
        sql, re.DOTALL
    )
    for block in pt_matches:
        for m in re.finditer(r"\('(\w+)',\s*'", block):
            slug = m.group(1)
            lookups.provider_types[slug] = _deterministic_uuid("provider_types", slug)

    # Extract specialties slugs
    sp_matches = re.findall(
        r"INSERT INTO public\.specialties.*?VALUES\s*(.*?)ON CONFLICT",
        sql, re.DOTALL
    )
    for block in sp_matches:
        for m in re.finditer(r"\('(\w+)',\s*'", block):
            slug = m.group(1)
            lookups.specialties[slug] = _deterministic_uuid("specialties", slug)

    # Extract language codes
    lang_matches = re.findall(
        r"INSERT INTO public\.languages_lookup.*?VALUES\s*(.*?)ON CONFLICT",
        sql, re.DOTALL
    )
    for block in lang_matches:
        for m in re.finditer(r"\('(\w+)',\s*'", block):
            code = m.group(1)
            lookups.languages[code] = _deterministic_uuid("languages_lookup", code)

    # Extract insurance plan names
    ins_matches = re.findall(
        r"INSERT INTO public\.insurance_plans.*?VALUES\s*(.*?)ON CONFLICT",
        sql, re.DOTALL
    )
    for block in ins_matches:
        for m in re.finditer(r"\('([^']+)',\s*'([^']+)',\s*'([^']+)'\)", block):
            name, carrier, _ = m.groups()
            key = f"{carrier}:{name}"
            lookups.insurance_plans[key] = _deterministic_uuid("insurance_plans", key)

    # Extract cultural competency slugs
    cc_matches = re.findall(
        r"INSERT INTO public\.cultural_competencies.*?VALUES\s*(.*?)ON CONFLICT",
        sql, re.DOTALL
    )
    for block in cc_matches:
        for m in re.finditer(r"\('(\w+)',\s*'", block):
            slug = m.group(1)
            lookups.cultural_competencies[slug] = _deterministic_uuid(
                "cultural_competencies", slug
            )

    return lookups


def _generate_from_known_slugs() -> LookupTables:
    """Generate deterministic UUIDs from hardcoded known slugs."""
    lookups = LookupTables()

    # Provider types (from seed SQL)
    for slug in [
        "therapist", "psychologist", "psychiatrist", "counselor",
        "social_worker", "clinic", "support_group", "crisis_service",
    ]:
        lookups.provider_types[slug] = _deterministic_uuid("provider_types", slug)

    # Specialties — conditions
    for slug in [
        "anxiety", "depression", "ptsd", "bipolar_disorder", "ocd", "adhd",
        "eating_disorders", "schizophrenia", "personality_disorders",
        "substance_use", "grief_loss", "sleep_disorders", "autism_spectrum",
        "phobias", "panic_disorder", "adjustment_disorders", "social_anxiety",
        "cptsd", "dissociative_disorders", "body_dysmorphia", "dual_diagnosis",
    ]:
        lookups.specialties[slug] = _deterministic_uuid("specialties", slug)

    # Specialties — treatment approaches
    for slug in [
        "cbt", "dbt", "emdr", "psychodynamic", "humanistic", "family_systems",
        "art_therapy", "play_therapy", "group_therapy", "couples_therapy",
        "trauma_focused", "mindfulness_based", "acceptance_commitment",
        "motivational_interviewing", "solution_focused", "somatic", "narrative",
        "mat", "crisis_intervention", "detoxification", "residential_treatment",
        "iop", "php",
    ]:
        lookups.specialties[slug] = _deterministic_uuid("specialties", slug)

    # Specialties — populations
    for slug in [
        "children", "adolescents", "adults", "elderly", "couples", "families",
        "lgbtq", "veterans", "first_responders", "college_students", "perinatal",
        "men", "women", "court_ordered", "pregnant_postpartum",
        "homeless_services", "criminal_justice",
    ]:
        lookups.specialties[slug] = _deterministic_uuid("specialties", slug)

    # Languages
    for code in [
        "en", "es", "zh", "ar", "pt", "fr", "hi", "bn", "ru", "ja", "ko",
        "vi", "tl", "de", "it", "pl", "ht", "asl", "fa", "ur", "he", "tr",
        "th", "sw",
    ]:
        lookups.languages[code] = _deterministic_uuid("languages_lookup", code)

    # Insurance (key format: "Carrier:Plan Name")
    insurance_entries = [
        ("Aetna", "Aetna PPO"), ("Aetna", "Aetna HMO"), ("Aetna", "Aetna EAP"),
        ("Anthem / BCBS", "Anthem Blue Cross PPO"),
        ("Blue Cross Blue Shield", "Blue Cross Blue Shield PPO"),
        ("Cigna", "Cigna PPO"), ("Cigna", "Cigna HMO"),
        ("Humana", "Humana PPO"),
        ("Kaiser Permanente", "Kaiser Permanente"),
        ("UnitedHealthcare", "UnitedHealthcare PPO"),
        ("UnitedHealthcare", "Optum / UBH"),
        ("Medicare", "Medicare Part B"), ("Medicare", "Medicare Advantage"),
        ("Medicaid", "Medicaid"),
        ("TRICARE", "TRICARE"),
        ("Self-Pay", "Self-Pay / Out of Network"),
        ("Self-Pay", "Sliding Scale Available"),
    ]
    for carrier, name in insurance_entries:
        key = f"{carrier}:{name}"
        lookups.insurance_plans[key] = _deterministic_uuid("insurance_plans", key)

    return lookups


def resolve_lookups(
    supabase_url: str | None = None,
    service_key: str | None = None,
) -> LookupTables:
    """
    Resolve lookup table UUIDs. Tries Supabase first, falls back to seed SQL.
    """
    if supabase_url and service_key:
        try:
            print("  Resolving lookups from Supabase...")
            lookups = resolve_from_supabase(supabase_url, service_key)
            print(f"    Provider types: {len(lookups.provider_types)}")
            print(f"    Specialties:    {len(lookups.specialties)}")
            print(f"    Languages:      {len(lookups.languages)}")
            print(f"    Insurance:      {len(lookups.insurance_plans)}")
            return lookups
        except Exception as e:
            print(f"  Warning: Supabase lookup failed ({e}), falling back to seed SQL")

    print("  Resolving lookups from seed SQL...")
    lookups = resolve_from_seed_sql()
    print(f"    Provider types: {len(lookups.provider_types)}")
    print(f"    Specialties:    {len(lookups.specialties)}")
    print(f"    Languages:      {len(lookups.languages)}")
    print(f"    Insurance:      {len(lookups.insurance_plans)}")
    return lookups
