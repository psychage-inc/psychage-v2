/**
 * Bulk NPI Seeding Script — State-by-State Provider Import
 *
 * Queries the NPPES NPI Registry API for mental health providers
 * by state, in priority order (FL → NY → major states).
 * Designed to safely import 100,000–200,000 providers.
 *
 * Usage:
 *   npx tsx src/lib/providers/seed-bulk.ts                     # Default: 200k target
 *   npx tsx src/lib/providers/seed-bulk.ts --limit 50000       # Custom target
 *   npx tsx src/lib/providers/seed-bulk.ts --states FL,NY      # Specific states only
 *   npx tsx src/lib/providers/seed-bulk.ts --dry-run            # Preview without inserting
 *   npx tsx src/lib/providers/seed-bulk.ts --resume             # Skip states already seeded
 *
 * Environment:
 *   SUPABASE_URL or VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getProviderTypeSlug, isMentalHealthTaxonomy } from './npiMappers';

// Load .env file manually (no dotenv dependency needed)
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env not found — rely on existing env vars
  }
}
loadEnv();

// ─── Config ───────────────────────────────────────────────────────────────────

const NPPES_API_BASE = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';
const BATCH_SIZE = 200; // NPPES max per request
const RATE_LIMIT_MS = 1200; // ~50 req/min to respect rate limits
const DEFAULT_LIMIT = 200_000;
const DB_BATCH_SIZE = 200; // Supabase upsert batch size
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;
const MAX_SKIP_PER_TAXONOMY = 800; // NPPES API hangs at high skip values — cap at 4 pages

// States ordered by priority: FL and NY first, then by mental health provider density
const STATE_PRIORITY: string[] = [
  // Priority 1 — Must-have
  'FL', 'NY',
  // Priority 2 — Largest MH provider pools
  'CA', 'TX', 'PA', 'IL', 'OH', 'MA', 'NJ',
  // Priority 3 — Major metro states
  'GA', 'NC', 'VA', 'WA', 'CO', 'MD', 'CT', 'MN', 'AZ', 'OR', 'MI',
  // Priority 4 — Fill remaining
  'WI', 'TN', 'MO', 'IN', 'SC', 'AL', 'LA', 'KY', 'OK', 'UT',
  'NV', 'NM', 'DC', 'HI', 'RI', 'DE', 'NH', 'VT', 'ME', 'MT',
  'WV', 'ID', 'NE', 'KS', 'AR', 'MS', 'IA', 'ND', 'SD', 'WY', 'AK',
];

// Taxonomy descriptions that match mental health providers
const TAXONOMY_DESCRIPTIONS = [
  'Psychologist',
  'Psychiatry',
  'Mental Health',
  'Social Worker',
  'Addiction',
  'Counselor',
  'Marriage',
  'Psychiatric',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface NPPESResult {
  resultcount: number;
  results: NPPESRecord[] | null;
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
}

interface ProviderInsert {
  provider: Record<string, unknown>;
  location: Record<string, unknown>;
}

interface StateProgress {
  state: string;
  fetched: number;
  inserted: number;
  skipped: number;
  errors: number;
  duration_ms: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

async function fetchWithRetry(
  url: string,
  retries = MAX_RETRIES,
): Promise<NPPESResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000); // 15s timeout
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.status === 429) {
        // Rate limited — wait and retry
        console.log(`   ⏳ Rate limited, waiting ${RETRY_DELAY_MS * attempt}ms (attempt ${attempt}/${retries})`);
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json() as NPPESResult;
    } catch (err) {
      if (attempt === retries) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`   ⚠ Fetch failed (attempt ${attempt}/${retries}): ${msg}`);
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  throw new Error('Exhausted retries');
}

async function fetchNPPESBatch(
  taxonomyDescription: string,
  state: string,
  skip: number,
): Promise<NPPESResult> {
  const url =
    `${NPPES_API_BASE}` +
    `&taxonomy_description=${encodeURIComponent(taxonomyDescription)}` +
    `&state=${encodeURIComponent(state)}` +
    `&limit=${BATCH_SIZE}` +
    `&skip=${skip}` +
    `&country_code=US` +
    `&enumeration_type=NPI-1`;

  return fetchWithRetry(url);
}

function mapNPPESToInsert(record: NPPESRecord): ProviderInsert | null {
  const basic = record.basic;
  const practiceAddr =
    record.addresses.find((a) => a.address_purpose === 'LOCATION') ||
    record.addresses[0];
  const primaryTaxonomy =
    record.taxonomies.find((t) => t.primary) || record.taxonomies[0];

  if (!basic || !practiceAddr) return null;

  // Filter to mental health taxonomies
  if (primaryTaxonomy?.code && !isMentalHealthTaxonomy(primaryTaxonomy.code)) {
    return null;
  }

  const isOrg = record.enumeration_type === 'NPI-2';
  const displayName = isOrg
    ? basic.organization_name || 'Unknown Organization'
    : `${basic.first_name || ''} ${basic.last_name || ''}`.trim() ||
      'Unknown Provider';

  const typeSlug = primaryTaxonomy?.code
    ? getProviderTypeSlug(primaryTaxonomy.code)
    : 'therapist';

  return {
    provider: {
      npi_number: String(record.number),
      display_name: displayName,
      credentials_suffix: basic.credential || null,
      status: 'seeded',
      tier: 'free',
      source: 'npi_registry',
      phone: practiceAddr.telephone_number?.replace(/[^\d+]/g, '') || null,
      is_accepting_patients: true,
      telehealth_available: false,
      in_person_available: true,
      _type_slug: typeSlug, // Temporary — resolved to UUID before insert
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
  };
}

// ─── Database Operations ──────────────────────────────────────────────────────

async function _getExistingNPICount(
  supabase: SupabaseClient,
  state: string,
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { count } = await supabase
    .from('providers')
    .select('id', { count: 'exact', head: true })
    .eq('source', 'npi_registry')
    .in('status', ['seeded', 'active', 'claimed', 'verified']);

  // State-specific count via join
  const { count: stateCount } = await supabase
    .from('provider_locations')
    .select('id', { count: 'exact', head: true })
    .eq('state_province', state)
    .eq('is_primary', true);

  return stateCount ?? 0;
}

async function batchUpsertProviders(
  supabase: SupabaseClient,
  records: ProviderInsert[],
  typeMap: Map<string, string>,
): Promise<{ inserted: number; locationErrors: number }> {
  let totalInserted = 0;
  let totalLocationErrors = 0;

  // Process in DB_BATCH_SIZE chunks
  for (let i = 0; i < records.length; i += DB_BATCH_SIZE) {
    const chunk = records.slice(i, i + DB_BATCH_SIZE);

    // Resolve type slugs to UUIDs
    const providerRows = chunk.map((r) => {
      const slug = r.provider._type_slug as string;
      const { _type_slug, ...rest } = r.provider;
      return {
        ...rest,
        provider_type_id: typeMap.get(slug) || typeMap.get('therapist') || null,
      };
    });

    const { data: inserted, error: insertError } = await supabase
      .from('providers')
      .upsert(providerRows, { onConflict: 'npi_number', ignoreDuplicates: true })
      .select('id, npi_number');

    if (insertError) {
      console.error(`   ✗ Provider batch insert failed: ${insertError.message}`);
      continue;
    }

    if (!inserted || inserted.length === 0) continue;

    totalInserted += inserted.length;

    // Build NPI → ID map for location inserts
    const npiToId = new Map(
      inserted.map((p: { id: string; npi_number: string }) => [p.npi_number, p.id]),
    );

    // Batch insert locations
    const locationRows = chunk
      .filter((r) => npiToId.has(r.provider.npi_number as string))
      .map((r) => ({
        ...r.location,
        provider_id: npiToId.get(r.provider.npi_number as string),
      }));

    if (locationRows.length > 0) {
      const { error: locError } = await supabase
        .from('provider_locations')
        .upsert(locationRows, {
          onConflict: 'provider_id,is_primary',
          ignoreDuplicates: true,
        });

      if (locError) {
        // Fallback: insert one by one to skip duplicates
        for (const loc of locationRows) {
          const { error } = await supabase
            .from('provider_locations')
            .insert(loc);
          if (error) totalLocationErrors++;
        }
      }
    }
  }

  return { inserted: totalInserted, locationErrors: totalLocationErrors };
}

// ─── State Seeder ─────────────────────────────────────────────────────────────

async function seedState(
  supabase: SupabaseClient,
  state: string,
  typeMap: Map<string, string>,
  seenNPIs: Set<string>,
  globalLimit: number,
  globalInserted: number,
  dryRun: boolean,
): Promise<StateProgress> {
  const startTime = Date.now();
  const progress: StateProgress = {
    state,
    fetched: 0,
    inserted: 0,
    skipped: 0,
    errors: 0,
    duration_ms: 0,
  };

  const stateLimit = globalLimit - globalInserted;
  if (stateLimit <= 0) return progress;

  const pendingRecords: ProviderInsert[] = [];
  // Track total valid records (pending + flushed) for accurate limit checking
  let validCount = 0;

  for (const description of TAXONOMY_DESCRIPTIONS) {
    if (validCount + globalInserted >= globalLimit) break;

    console.log(`   📋 ${description}`);
    let skip = 0;
    let hasMore = true;
    let consecutiveEmpty = 0;

    while (hasMore && validCount + globalInserted < globalLimit && skip <= MAX_SKIP_PER_TAXONOMY) {
      try {
        const batch = await fetchNPPESBatch(description, state, skip);

        if (!batch.results || batch.results.length === 0) {
          consecutiveEmpty++;
          if (consecutiveEmpty >= 2) {
            hasMore = false;
          }
          break;
        }

        consecutiveEmpty = 0;
        progress.fetched += batch.results.length;

        for (const record of batch.results) {
          if (validCount + globalInserted >= globalLimit) break;

          const npi = String(record.number);

          // Skip if already seen in this run
          if (seenNPIs.has(npi)) {
            progress.skipped++;
            continue;
          }

          const mapped = mapNPPESToInsert(record);
          if (!mapped) {
            progress.skipped++;
            continue;
          }

          seenNPIs.add(npi);
          validCount++;

          if (dryRun) {
            progress.inserted++;
            continue;
          }

          pendingRecords.push(mapped);

          // Flush to DB every batch
          if (pendingRecords.length >= DB_BATCH_SIZE) {
            const result = await batchUpsertProviders(supabase, pendingRecords, typeMap);
            progress.inserted += result.inserted;
            progress.errors += result.locationErrors;
            pendingRecords.length = 0;
          }
        }

        skip += BATCH_SIZE;
        if (batch.results.length < BATCH_SIZE) {
          hasMore = false;
        }

        await sleep(RATE_LIMIT_MS);
      } catch (err) {
        console.error(`   ✗ Error fetching ${description} in ${state}: ${err}`);
        progress.errors++;
        hasMore = false;
      }
    }
  }

  // Flush remaining records
  if (pendingRecords.length > 0 && !dryRun) {
    const result = await batchUpsertProviders(supabase, pendingRecords, typeMap);
    progress.inserted += result.inserted;
    progress.errors += result.locationErrors;
  }

  progress.duration_ms = Date.now() - startTime;
  return progress;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const resume = args.includes('--resume');

  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : DEFAULT_LIMIT;

  const statesIdx = args.indexOf('--states');
  const targetStates = statesIdx !== -1
    ? args[statesIdx + 1].split(',').map((s) => s.trim().toUpperCase())
    : STATE_PRIORITY;

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  🏥 Psychage Bulk NPI Seeding Script`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Mode:       ${dryRun ? '🔍 DRY RUN (no database writes)' : '📥 LIVE INSERT'}`);
  console.log(`  Target:     ${limit.toLocaleString()} providers`);
  console.log(`  States:     ${targetStates.length} (${targetStates.slice(0, 5).join(', ')}${targetStates.length > 5 ? '...' : ''})`);
  console.log(`  Resume:     ${resume ? 'Yes (skip populated states)' : 'No'}`);
  console.log(`${'═'.repeat(60)}\n`);

  // Initialize Supabase
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch provider type mappings
  const { data: providerTypes } = await supabase
    .from('provider_types')
    .select('id, slug');

  const typeMap = new Map(
    (providerTypes || []).map((t: { id: string; slug: string }) => [t.slug, t.id]),
  );

  if (typeMap.size === 0) {
    console.error('❌ No provider types found. Run the lookup seed migration first.');
    process.exit(1);
  }

  console.log(`  ✓ Loaded ${typeMap.size} provider types\n`);

  // Track global state
  const seenNPIs = new Set<string>();
  let totalInserted = 0;
  const stateResults: StateProgress[] = [];
  const globalStartTime = Date.now();

  // If resuming, load existing NPI numbers to avoid re-fetching
  if (resume && !dryRun) {
    console.log('  📊 Loading existing NPI numbers for resume...');
    let offset = 0;
    const pageSize = 10000;
    let hasMore = true;
    while (hasMore) {
      const { data } = await supabase
        .from('providers')
        .select('npi_number')
        .not('npi_number', 'is', null)
        .range(offset, offset + pageSize - 1);

      if (!data || data.length === 0) {
        hasMore = false;
      } else {
        for (const row of data) {
          if (row.npi_number) seenNPIs.add(row.npi_number);
        }
        offset += pageSize;
      }
    }
    console.log(`  ✓ Loaded ${seenNPIs.size.toLocaleString()} existing NPIs (will skip duplicates)\n`);
  }

  // Process each state
  for (const state of targetStates) {
    if (totalInserted >= limit) {
      console.log(`\n  🎯 Reached target of ${limit.toLocaleString()} NEW providers. Stopping.`);
      break;
    }

    const remaining = limit - totalInserted;
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`  📍 ${state} — Seeding (${totalInserted.toLocaleString()}/${limit.toLocaleString()} total, ${remaining.toLocaleString()} remaining)`);
    console.log(`${'─'.repeat(50)}`);

    const result = await seedState(
      supabase,
      state,
      typeMap,
      seenNPIs,
      limit,
      totalInserted,
      dryRun,
    );

    totalInserted += result.inserted;
    stateResults.push(result);

    console.log(
      `  ✓ ${state}: +${result.inserted.toLocaleString()} providers` +
        ` (${result.fetched.toLocaleString()} fetched, ${result.skipped.toLocaleString()} skipped` +
        `, ${result.errors} errors, ${formatDuration(result.duration_ms)})`,
    );
  }

  // Final summary
  const totalDuration = Date.now() - globalStartTime;
  const totalFetched = stateResults.reduce((s, r) => s + r.fetched, 0);
  const totalSkipped = stateResults.reduce((s, r) => s + r.skipped, 0);
  const totalErrors = stateResults.reduce((s, r) => s + r.errors, 0);

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ✅ Bulk Seeding Complete!`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Total Inserted:  ${totalInserted.toLocaleString()}`);
  console.log(`  Total Fetched:   ${totalFetched.toLocaleString()}`);
  console.log(`  Total Skipped:   ${totalSkipped.toLocaleString()}`);
  console.log(`  Total Errors:    ${totalErrors.toLocaleString()}`);
  console.log(`  Duration:        ${formatDuration(totalDuration)}`);
  console.log(`${'═'.repeat(60)}`);

  // Per-state breakdown
  console.log(`\n  State Breakdown:`);
  console.log(`  ${'State'.padEnd(8)} ${'Inserted'.padStart(10)} ${'Fetched'.padStart(10)} ${'Time'.padStart(10)}`);
  console.log(`  ${'─'.repeat(42)}`);
  for (const r of stateResults.filter((r) => r.inserted > 0)) {
    console.log(
      `  ${r.state.padEnd(8)} ${r.inserted.toLocaleString().padStart(10)} ${r.fetched.toLocaleString().padStart(10)} ${formatDuration(r.duration_ms).padStart(10)}`,
    );
  }
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
