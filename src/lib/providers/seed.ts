/**
 * NPI Seeding Script
 *
 * Queries the NPPES NPI Registry API for mental health providers
 * and inserts them into the Psychage provider directory.
 *
 * Usage: npx tsx src/lib/providers/seed.ts [--limit 500] [--dry-run]
 */

import { createClient } from '@supabase/supabase-js';
import { getProviderTypeSlug, isMentalHealthTaxonomy } from './npiMappers';

// ─── Config ───────────────────────────────────────────────────────────────────

const NPPES_API_BASE = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';
const BATCH_SIZE = 200; // NPPES max per request
const DEFAULT_LIMIT = 500;
const RATE_LIMIT_MS = 1200; // ~50 req/min to be polite

// NPPES taxonomy_description parameter requires TEXT descriptions, not codes.
// Each entry queries by substring match on taxonomy description.
// High-density descriptions (>90% MH): Psychologist, Psychiatry, Mental Health, Social Worker, Addiction
const SEED_TAXONOMY_DESCRIPTIONS = [
  'Psychologist',
  'Psychiatry',
  'Mental Health',
  'Social Worker',
  'Addiction',
  'Counselor',        // broad — many non-MH, but captures remaining counselors
  'Marriage',          // low MH density (~14%), but captures MFTs
  'Psychiatric',       // catches Psychiatric NPs
];

// Stop paginating a single description after this many records
const MAX_SKIP_PER_DESC = 4000;

// ─── Types ────────────────────────────────────────────────────────────────────

interface NPPESResult {
  result_count: number;
  results: NPPESRecord[];
}

interface NPPESRecord {
  number: number;
  enumeration_type: string;
  basic: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    credential?: string;
    sole_proprietor?: string;
    gender?: string;
    name_prefix?: string;
    name_suffix?: string;
    enumeration_date?: string;
    last_updated?: string;
    status?: string;
    organization_name?: string;
    authorized_official_first_name?: string;
    authorized_official_last_name?: string;
  };
  addresses: {
    country_code: string;
    country_name: string;
    address_purpose: string;
    address_type: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postal_code: string;
    telephone_number?: string;
    fax_number?: string;
  }[];
  taxonomies: {
    code: string;
    taxonomy_group?: string;
    desc: string;
    state?: string;
    license?: string;
    primary: boolean;
  }[];
  identifiers: unknown[];
  endpoints: unknown[];
  other_names: unknown[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchNPPESBatch(
  taxonomyDescription: string,
  skip: number
): Promise<NPPESResult> {
  const url = `${NPPES_API_BASE}&taxonomy_description=${encodeURIComponent(taxonomyDescription)}&limit=${BATCH_SIZE}&skip=${skip}&country_code=US&enumeration_type=NPI-1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NPPES API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<NPPESResult>;
}

function mapNPPESToInsert(record: NPPESRecord) {
  const basic = record.basic;
  const practiceAddr = record.addresses.find((a) => a.address_purpose === 'LOCATION') || record.addresses[0];
  const primaryTaxonomy = record.taxonomies.find((t) => t.primary) || record.taxonomies[0];

  if (!basic || !practiceAddr) return null;

  const isOrg = record.enumeration_type === 'NPI-2';
  const displayName = isOrg
    ? basic.organization_name || 'Unknown Organization'
    : `${basic.first_name || ''} ${basic.last_name || ''}`.trim() || 'Unknown Provider';

  return {
    provider: {
      npi_number: String(record.number),
      display_name: displayName,
      credentials_suffix: basic.credential || null,
      status: 'seeded' as const,
      tier: 'free' as const,
      source: 'npi_registry' as const,
      phone: practiceAddr.telephone_number?.replace(/[^\d+]/g, '') || null,
      is_accepting_patients: true,
      telehealth_available: false,
      in_person_available: true,
    },
    location: {
      address_line1: practiceAddr.address_1,
      address_line2: practiceAddr.address_2 || null,
      city: practiceAddr.city,
      state_province: practiceAddr.state,
      postal_code: practiceAddr.postal_code?.slice(0, 5),
      country_code: 'US',
      is_primary: true,
    },
    taxonomyCode: primaryTaxonomy?.code || null,
    taxonomyDesc: primaryTaxonomy?.desc || null,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : DEFAULT_LIMIT;

  console.log(`\n🏥 Psychage NPI Seeding Script`);
  console.log(`   Mode: ${dryRun ? 'DRY RUN' : 'LIVE INSERT'}`);
  console.log(`   Target: ${limit} providers\n`);

  // Initialize Supabase (use service role for inserts)
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch provider type mappings
  const { data: providerTypes } = await supabase
    .from('provider_types')
    .select('id, slug');

  const typeMap = new Map(
    (providerTypes || []).map((t: { id: string; slug: string }) => [t.slug, t.id])
  );

  // Track seen NPI numbers to avoid duplicates across taxonomy queries
  const seenNPIs = new Set<string>();

  let totalInserted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const description of SEED_TAXONOMY_DESCRIPTIONS) {
    if (totalInserted >= limit) break;

    console.log(`\n📋 Fetching: ${description}`);
    let skip = 0;
    let hasMore = true;

    while (hasMore && totalInserted < limit && skip < MAX_SKIP_PER_DESC) {
      try {
        const batch = await fetchNPPESBatch(description, skip);

        if (!batch.results || batch.results.length === 0) {
          hasMore = false;
          break;
        }

        console.log(`   Batch: ${batch.results.length} records (skip=${skip})`);

        // Map and filter the entire batch first
        const validRecords: { provider: Record<string, unknown>; location: Record<string, unknown> }[] = [];

        for (const record of batch.results) {
          if (totalInserted + validRecords.length >= limit) break;

          const mapped = mapNPPESToInsert(record);
          if (!mapped) {
            totalSkipped++;
            continue;
          }

          // Check for mental health taxonomy
          if (mapped.taxonomyCode && !isMentalHealthTaxonomy(mapped.taxonomyCode)) {
            totalSkipped++;
            continue;
          }

          // Skip duplicates within this run
          if (seenNPIs.has(mapped.provider.npi_number as string)) {
            totalSkipped++;
            continue;
          }
          seenNPIs.add(mapped.provider.npi_number as string);

          if (dryRun) {
            console.log(`   [DRY] ${mapped.provider.display_name} (NPI: ${mapped.provider.npi_number}) — ${mapped.location.city}, ${mapped.location.state_province}`);
            totalInserted++;
            continue;
          }

          const typeSlug = mapped.taxonomyCode
            ? getProviderTypeSlug(mapped.taxonomyCode)
            : 'therapist';
          const providerTypeId = typeMap.get(typeSlug) || typeMap.get('therapist');

          validRecords.push({
            provider: {
              ...mapped.provider,
              provider_type_id: providerTypeId || null,
            },
            location: mapped.location,
          });
        }

        if (dryRun || validRecords.length === 0) {
          skip += BATCH_SIZE;
          if (batch.results.length < BATCH_SIZE) hasMore = false;
          await sleep(RATE_LIMIT_MS);
          continue;
        }

        // Batch upsert providers (ignore conflicts on npi_number)
        const providerRows = validRecords.map((r) => r.provider);
        const { data: inserted, error: insertError } = await supabase
          .from('providers')
          .upsert(providerRows, { onConflict: 'npi_number', ignoreDuplicates: true })
          .select('id, npi_number');

        if (insertError) {
          console.error(`   ✗ Batch insert failed: ${insertError.message}`);
          totalErrors += validRecords.length;
        } else if (inserted && inserted.length > 0) {
          // Build NPI → ID map for location inserts
          const npiToId = new Map(
            inserted.map((p: { id: string; npi_number: string }) => [p.npi_number, p.id])
          );

          // Batch insert locations
          const locationRows = validRecords
            .filter((r) => npiToId.has(r.provider.npi_number as string))
            .map((r) => ({
              ...r.location,
              provider_id: npiToId.get(r.provider.npi_number as string),
            }));

          if (locationRows.length > 0) {
            const { error: locError } = await supabase
              .from('provider_locations')
              .insert(locationRows);

            if (locError) {
              console.error(`   ✗ Location batch failed: ${locError.message}`);
            }
          }

          totalInserted += inserted.length;
          const skippedInBatch = validRecords.length - inserted.length;
          totalSkipped += skippedInBatch;
          console.log(`   ✓ Inserted ${inserted.length} (total: ${totalInserted}/${limit})`);
        }

        skip += BATCH_SIZE;
        if (batch.results.length < BATCH_SIZE) {
          hasMore = false;
        }

        await sleep(RATE_LIMIT_MS);
      } catch (err) {
        console.error(`   ✗ Batch error: ${err}`);
        totalErrors++;
        hasMore = false;
      }
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ Seeding complete!`);
  console.log(`   Inserted: ${totalInserted}`);
  console.log(`   Skipped:  ${totalSkipped}`);
  console.log(`   Errors:   ${totalErrors}`);
  console.log(`${'─'.repeat(50)}\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
