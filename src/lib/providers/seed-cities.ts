/**
 * City-Level NPI Seeding — Deep Provider Coverage for Top States
 *
 * The NPPES API caps at ~1,200 unique results per taxonomy+state query.
 * City-level queries unlock separate result pools, giving us comprehensive
 * coverage of every major metro area.
 *
 * Usage:
 *   npx tsx src/lib/providers/seed-cities.ts                          # All 5 states
 *   npx tsx src/lib/providers/seed-cities.ts --states FL              # Florida only
 *   npx tsx src/lib/providers/seed-cities.ts --states FL,CA           # FL + CA
 *   npx tsx src/lib/providers/seed-cities.ts --dry-run                # Preview only
 *   npx tsx src/lib/providers/seed-cities.ts --resume                 # Skip existing NPIs
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getProviderTypeSlug, isMentalHealthTaxonomy } from './npiMappers';

// ─── Load .env ───────────────────────────────────────────────────────────────

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
    // .env not found
  }
}
loadEnv();

// ─── Config ──────────────────────────────────────────────────────────────────

const NPPES_API_BASE = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';
const BATCH_SIZE = 200;
const RATE_LIMIT_MS = 1000;
const DB_BATCH_SIZE = 200;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;
const FETCH_TIMEOUT_MS = 15_000;
// NPPES API caps at ~1,200 unique results per query — stop after 7 pages (1,400)
const MAX_PAGES_PER_QUERY = 7;

// Taxonomy descriptions that produce 95%+ mental health hit rate
const TAXONOMY_DESCRIPTIONS = [
  'Counselor',
  'Psychologist',
  'Social Worker',
  'Psychiatry',
  'Addiction',
  'Mental Health',
  'Marriage',
  'Psychiatric',
];

// ─── State + City Data ───────────────────────────────────────────────────────

interface StateConfig {
  code: string;
  cities: string[];
}

const STATE_CITIES: StateConfig[] = [
  {
    code: 'FL',
    cities: [
      // Major metros
      'MIAMI', 'JACKSONVILLE', 'TAMPA', 'ORLANDO', 'ST PETERSBURG',
      'FORT LAUDERDALE', 'TALLAHASSEE', 'HIALEAH', 'PORT ST LUCIE',
      'CAPE CORAL', 'PEMBROKE PINES', 'HOLLYWOOD', 'GAINESVILLE',
      'MIRAMAR', 'CORAL SPRINGS', 'CLEARWATER', 'PALM BAY',
      'WEST PALM BEACH', 'LAKELAND', 'POMPANO BEACH',
      // Major suburbs + mid-size cities
      'BOCA RATON', 'DAVIE', 'PLANTATION', 'SUNRISE', 'DORAL',
      'PALM BEACH GARDENS', 'SARASOTA', 'NAPLES', 'FORT MYERS',
      'DELRAY BEACH', 'BOYNTON BEACH', 'JUPITER', 'COCONUT CREEK',
      'OCALA', 'DAYTONA BEACH', 'KISSIMMEE', 'SANFORD',
      'DEERFIELD BEACH', 'MELBOURNE', 'LARGO', 'MARGATE',
      'TAMARAC', 'WESTON', 'AVENTURA', 'WINTER PARK',
      'ALTAMONTE SPRINGS', 'BRANDON', 'RIVERVIEW', 'WESLEY CHAPEL',
      'WINTER GARDEN', 'APOPKA', 'OVIEDO', 'LAKE WORTH',
      'BONITA SPRINGS', 'STUART', 'VERO BEACH', 'PENSACOLA',
      'PANAMA CITY', 'DESTIN', 'BRADENTON', 'SPRING HILL',
      'LAND O LAKES', 'LUTZ', 'NEW PORT RICHEY', 'DUNEDIN',
    ],
  },
  {
    code: 'CA',
    cities: [
      // Major metros
      'LOS ANGELES', 'SAN FRANCISCO', 'SAN DIEGO', 'SAN JOSE',
      'SACRAMENTO', 'LONG BEACH', 'OAKLAND', 'FRESNO',
      'ANAHEIM', 'RIVERSIDE', 'SANTA ANA', 'IRVINE',
      'STOCKTON', 'BAKERSFIELD', 'MODESTO', 'FREMONT',
      'GLENDALE', 'HUNTINGTON BEACH', 'SANTA CLARITA', 'GARDEN GROVE',
      // Key suburbs + mid-size cities
      'PASADENA', 'TORRANCE', 'BURBANK', 'BERKELEY', 'PALO ALTO',
      'SANTA MONICA', 'WEST HOLLYWOOD', 'BEVERLY HILLS', 'ENCINO',
      'SHERMAN OAKS', 'WOODLAND HILLS', 'CALABASAS', 'THOUSAND OAKS',
      'VENTURA', 'OXNARD', 'SANTA BARBARA', 'SAN LUIS OBISPO',
      'MONTEREY', 'SANTA CRUZ', 'WALNUT CREEK', 'CONCORD',
      'PLEASANTON', 'REDWOOD CITY', 'MOUNTAIN VIEW', 'SUNNYVALE',
      'CAMPBELL', 'CUPERTINO', 'MILPITAS', 'SAN MATEO',
      'FOSTER CITY', 'SAN RAFAEL', 'NOVATO', 'PETALUMA',
      'NAPA', 'SANTA ROSA', 'VALLEJO', 'FAIRFIELD',
      'ROSEVILLE', 'FOLSOM', 'ELK GROVE', 'DAVIS',
      'RANCHO CUCAMONGA', 'ONTARIO', 'POMONA', 'CLAREMONT',
      'WEST COVINA', 'ARCADIA', 'WHITTIER', 'DOWNEY',
      'FULLERTON', 'COSTA MESA', 'NEWPORT BEACH', 'LAGUNA BEACH',
      'MISSION VIEJO', 'LAKE FOREST', 'CARLSBAD', 'ENCINITAS',
      'ESCONDIDO', 'OCEANSIDE', 'LA JOLLA', 'CHULA VISTA',
      'EL CAJON', 'TEMECULA', 'MURRIETA', 'PALM SPRINGS',
      'REDLANDS', 'SAN BERNARDINO', 'CORONA', 'ORANGE',
      'TUSTIN', 'BREA', 'YORBA LINDA', 'LAGUNA NIGUEL',
    ],
  },
  {
    code: 'NY',
    cities: [
      // NYC boroughs + neighborhoods (NPPES uses mailing city)
      'NEW YORK', 'BROOKLYN', 'BRONX', 'QUEENS', 'STATEN ISLAND',
      'FLUSHING', 'ASTORIA', 'JAMAICA', 'BAYSIDE', 'FOREST HILLS',
      'LONG ISLAND CITY', 'GREAT NECK', 'GARDEN CITY',
      // Major metros
      'BUFFALO', 'ROCHESTER', 'YONKERS', 'SYRACUSE', 'ALBANY',
      'NEW ROCHELLE', 'SCHENECTADY', 'UTICA', 'BINGHAMTON',
      'WHITE PLAINS', 'ITHACA', 'TROY', 'SARATOGA SPRINGS',
      // Long Island
      'HUNTINGTON', 'SMITHTOWN', 'COMMACK', 'DIX HILLS',
      'MASSAPEQUA', 'LEVITTOWN', 'EAST MEADOW', 'HEMPSTEAD',
      'HICKSVILLE', 'VALLEY STREAM', 'LYNBROOK', 'ROCKVILLE CENTRE',
      'MERRICK', 'FREEPORT', 'ISLIP', 'BAY SHORE', 'PATCHOGUE',
      'RIVERHEAD', 'STONY BROOK', 'PORT JEFFERSON',
      // Westchester + Hudson Valley
      'TARRYTOWN', 'DOBBS FERRY', 'MAMARONECK', 'RYE',
      'MOUNT VERNON', 'PELHAM', 'BRONXVILLE', 'SCARSDALE',
      'HARRISON', 'LARCHMONT', 'PLEASANTVILLE', 'CHAPPAQUA',
      'POUGHKEEPSIE', 'NEWBURGH', 'MIDDLETOWN', 'KINGSTON',
      // Upstate
      'PLATTSBURGH', 'GLENS FALLS', 'OSWEGO', 'CORTLAND',
      'ONEONTA', 'WATERTOWN', 'OGDENSBURG', 'JAMESTOWN',
    ],
  },
  {
    code: 'TX',
    cities: [
      // Major metros
      'HOUSTON', 'DALLAS', 'SAN ANTONIO', 'AUSTIN', 'FORT WORTH',
      'EL PASO', 'ARLINGTON', 'PLANO', 'CORPUS CHRISTI', 'LUBBOCK',
      'IRVING', 'LAREDO', 'GARLAND', 'FRISCO', 'MCKINNEY',
      'AMARILLO', 'GRAND PRAIRIE', 'BROWNSVILLE', 'KILLEEN',
      'PASADENA', 'MESQUITE', 'MIDLAND', 'MCALLEN', 'DENTON',
      // Major suburbs
      'ROUND ROCK', 'SUGAR LAND', 'THE WOODLANDS', 'PEARLAND',
      'LEAGUE CITY', 'ALLEN', 'RICHARDSON', 'CEDAR PARK',
      'PFLUGERVILLE', 'GEORGETOWN', 'SAN MARCOS', 'NEW BRAUNFELS',
      'CONROE', 'SPRING', 'HUMBLE', 'KATY', 'CYPRESS',
      'TOMBALL', 'KINGWOOD', 'FRIENDSWOOD', 'MISSOURI CITY',
      'BEAUMONT', 'TYLER', 'WACO', 'COLLEGE STATION',
      'ABILENE', 'ODESSA', 'WICHITA FALLS', 'TEMPLE',
      'LEWISVILLE', 'FLOWER MOUND', 'CARROLLTON', 'COPPELL',
      'GRAPEVINE', 'SOUTHLAKE', 'MANSFIELD', 'EULESS',
      'BEDFORD', 'HURST', 'NORTH RICHLAND HILLS', 'BURLESON',
    ],
  },
  {
    code: 'PA',
    cities: [
      // Major metros
      'PHILADELPHIA', 'PITTSBURGH', 'ALLENTOWN', 'ERIE', 'READING',
      'LANCASTER', 'BETHLEHEM', 'SCRANTON', 'HARRISBURG',
      // Major suburbs
      'KING OF PRUSSIA', 'WEST CHESTER', 'MEDIA', 'DOYLESTOWN',
      'NEWTOWN', 'BRYN MAWR', 'ARDMORE', 'WAYNE', 'PAOLI',
      'BALA CYNWYD', 'WYNDMOOR', 'JENKINTOWN', 'ELKINS PARK',
      'LANSDALE', 'NORRISTOWN', 'CONSHOHOCKEN', 'BLUE BELL',
      'FORT WASHINGTON', 'AMBLER', 'WARMINSTER', 'WARRINGTON',
      'YARDLEY', 'MORRISVILLE', 'CHERRY HILL', 'EXTON',
      // Pittsburgh suburbs
      'CRANBERRY TOWNSHIP', 'WEXFORD', 'MONROEVILLE', 'BETHEL PARK',
      'MOUNT LEBANON', 'MURRYSVILLE', 'GREENSBURG', 'LATROBE',
      // Mid-state
      'STATE COLLEGE', 'WILLIAMSPORT', 'LEWISBURG', 'CHAMBERSBURG',
      'CARLISLE', 'YORK', 'GETTYSBURG', 'HANOVER',
      'POTTSTOWN', 'PHOENIXVILLE', 'DOWNINGTOWN', 'COATESVILLE',
      'WILKES BARRE', 'EASTON', 'STROUDSBURG', 'QUAKERTOWN',
    ],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface NPPESResult {
  result_count: number;
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
    organization_name?: string;
  };
  addresses: {
    country_code: string;
    address_purpose: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postal_code: string;
    telephone_number?: string;
  }[];
  taxonomies: {
    code: string;
    desc: string;
    primary: boolean;
    state?: string;
    license?: string;
  }[];
}

interface ProviderInsert {
  provider: Record<string, unknown>;
  location: Record<string, unknown>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<NPPESResult> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (response.status === 429) {
        console.log(`      Rate limited, waiting ${RETRY_DELAY_MS * attempt}ms`);
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return (await response.json()) as NPPESResult;
    } catch (err) {
      if (attempt === retries) throw err;
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  throw new Error('Exhausted retries');
}

function fetchNPPES(taxonomy: string, state: string, city: string | null, skip: number): Promise<NPPESResult> {
  let url = `${NPPES_API_BASE}`
    + `&taxonomy_description=${encodeURIComponent(taxonomy)}`
    + `&state=${encodeURIComponent(state)}`
    + `&limit=${BATCH_SIZE}&skip=${skip}`
    + `&country_code=US&enumeration_type=NPI-1`;
  if (city) url += `&city=${encodeURIComponent(city)}`;
  return fetchWithRetry(url);
}

function mapNPPESToInsert(record: NPPESRecord): ProviderInsert | null {
  const basic = record.basic;
  const practiceAddr =
    record.addresses.find((a) => a.address_purpose === 'LOCATION') || record.addresses[0];
  const primaryTaxonomy =
    record.taxonomies.find((t) => t.primary) || record.taxonomies[0];

  if (!basic || !practiceAddr) return null;
  if (primaryTaxonomy?.code && !isMentalHealthTaxonomy(primaryTaxonomy.code)) return null;

  const isOrg = record.enumeration_type === 'NPI-2';
  const displayName = isOrg
    ? basic.organization_name || 'Unknown Organization'
    : `${basic.first_name || ''} ${basic.last_name || ''}`.trim() || 'Unknown Provider';

  const typeSlug = primaryTaxonomy?.code ? getProviderTypeSlug(primaryTaxonomy.code) : 'therapist';

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
      _type_slug: typeSlug,
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

// ─── Database Operations ─────────────────────────────────────────────────────

async function batchUpsertProviders(
  supabase: SupabaseClient,
  records: ProviderInsert[],
  typeMap: Map<string, string>,
): Promise<{ inserted: number; locationErrors: number }> {
  let totalInserted = 0;
  let totalLocationErrors = 0;

  for (let i = 0; i < records.length; i += DB_BATCH_SIZE) {
    const chunk = records.slice(i, i + DB_BATCH_SIZE);

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
      console.error(`      DB batch error: ${insertError.message}`);
      continue;
    }

    if (!inserted || inserted.length === 0) continue;
    totalInserted += inserted.length;

    const npiToId = new Map(
      inserted.map((p: { id: string; npi_number: string }) => [p.npi_number, p.id]),
    );

    const locationRows = chunk
      .filter((r) => npiToId.has(r.provider.npi_number as string))
      .map((r) => ({
        ...r.location,
        provider_id: npiToId.get(r.provider.npi_number as string),
      }));

    if (locationRows.length > 0) {
      const { error: locError } = await supabase
        .from('provider_locations')
        .upsert(locationRows, { onConflict: 'provider_id,is_primary', ignoreDuplicates: true });

      if (locError) {
        for (const loc of locationRows) {
          const { error } = await supabase.from('provider_locations').insert(loc);
          if (error) totalLocationErrors++;
        }
      }
    }
  }

  return { inserted: totalInserted, locationErrors: totalLocationErrors };
}

// ─── Core: Query a single taxonomy+state+city combination ────────────────────

async function queryAndCollect(
  taxonomy: string,
  state: string,
  city: string | null,
  seenNPIs: Set<string>,
): Promise<ProviderInsert[]> {
  const records: ProviderInsert[] = [];
  let consecutiveZeroNew = 0;

  for (let page = 0; page < MAX_PAGES_PER_QUERY; page++) {
    const skip = page * BATCH_SIZE;
    try {
      const batch = await fetchNPPES(taxonomy, state, city, skip);
      if (!batch.results || batch.results.length === 0) break;

      let newInPage = 0;
      for (const record of batch.results) {
        const npi = String(record.number);
        if (seenNPIs.has(npi)) continue;

        const mapped = mapNPPESToInsert(record);
        if (!mapped) continue;

        seenNPIs.add(npi);
        records.push(mapped);
        newInPage++;
      }

      // If we got 0 new unique MH providers, stop — API is recycling
      if (newInPage === 0) {
        consecutiveZeroNew++;
        if (consecutiveZeroNew >= 2) break;
      } else {
        consecutiveZeroNew = 0;
      }

      if (batch.results.length < BATCH_SIZE) break;
      await sleep(RATE_LIMIT_MS);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('abort')) {
        console.error(`      Fetch error: ${msg}`);
      }
      break;
    }
  }

  return records;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const resume = args.includes('--resume');

  const statesIdx = args.indexOf('--states');
  const targetStateCodes = statesIdx !== -1
    ? args[statesIdx + 1].split(',').map((s) => s.trim().toUpperCase())
    : STATE_CITIES.map((s) => s.code);

  const targetStates = STATE_CITIES.filter((s) => targetStateCodes.includes(s.code));

  if (targetStates.length === 0) {
    console.error('No matching states found. Available: ' + STATE_CITIES.map((s) => s.code).join(', '));
    process.exit(1);
  }

  // Count total cities
  const totalCities = targetStates.reduce((sum, s) => sum + s.cities.length, 0);
  const totalQueries = targetStates.reduce(
    (sum, s) => sum + (s.cities.length + 1) * TAXONOMY_DESCRIPTIONS.length,
    0,
  );

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  City-Level NPI Seeding Script`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Mode:       ${dryRun ? 'DRY RUN' : 'LIVE INSERT'}`);
  console.log(`  States:     ${targetStates.map((s) => s.code).join(', ')}`);
  console.log(`  Cities:     ${totalCities} across ${targetStates.length} states`);
  console.log(`  Taxonomies: ${TAXONOMY_DESCRIPTIONS.length}`);
  console.log(`  Est. queries: ~${totalQueries.toLocaleString()}`);
  console.log(`  Resume:     ${resume ? 'Yes' : 'No'}`);
  console.log(`${'═'.repeat(60)}\n`);

  // Initialize Supabase
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Load provider type mappings
  const { data: providerTypes } = await supabase.from('provider_types').select('id, slug');
  const typeMap = new Map(
    (providerTypes || []).map((t: { id: string; slug: string }) => [t.slug, t.id]),
  );
  if (typeMap.size === 0) {
    console.error('No provider types found.');
    process.exit(1);
  }
  console.log(`  Loaded ${typeMap.size} provider types`);

  // Load existing NPIs for dedup
  const seenNPIs = new Set<string>();
  if (resume) {
    console.log('  Loading existing NPIs for resume...');
    let offset = 0;
    const pageSize = 10000;
    while (true) {
      const { data } = await supabase
        .from('providers')
        .select('npi_number')
        .not('npi_number', 'is', null)
        .range(offset, offset + pageSize - 1);
      if (!data || data.length === 0) break;
      for (const row of data) {
        if (row.npi_number) seenNPIs.add(row.npi_number);
      }
      offset += pageSize;
    }
    console.log(`  Loaded ${seenNPIs.size.toLocaleString()} existing NPIs\n`);
  }

  const globalStart = Date.now();
  let globalInserted = 0;
  let globalFetched = 0;
  let queriesCompleted = 0;

  // Process each state
  for (const stateConfig of targetStates) {
    const { code: state, cities } = stateConfig;
    const stateStart = Date.now();
    let stateInserted = 0;
    let stateNewProviders = 0;

    console.log(`\n${'━'.repeat(55)}`);
    console.log(`  ${state} — ${cities.length} cities + state-level sweep`);
    console.log(`${'━'.repeat(55)}`);

    // Phase 1: State-level sweep (no city filter) to get the base pool
    console.log(`\n  Phase 1: State-level sweep for ${state}...`);
    for (const taxonomy of TAXONOMY_DESCRIPTIONS) {
      const records = await queryAndCollect(taxonomy, state, null, seenNPIs);
      stateNewProviders += records.length;

      if (records.length > 0 && !dryRun) {
        const result = await batchUpsertProviders(supabase, records, typeMap);
        stateInserted += result.inserted;
      }
      queriesCompleted++;
    }
    console.log(`    State sweep: ${stateNewProviders} new providers`);

    // Phase 2: City-by-city queries
    console.log(`\n  Phase 2: City-by-city queries for ${state}...`);
    let cityIdx = 0;
    for (const city of cities) {
      cityIdx++;
      let cityNew = 0;

      for (const taxonomy of TAXONOMY_DESCRIPTIONS) {
        const records = await queryAndCollect(taxonomy, state, city, seenNPIs);
        cityNew += records.length;

        if (records.length > 0 && !dryRun) {
          const result = await batchUpsertProviders(supabase, records, typeMap);
          stateInserted += result.inserted;
        }
        queriesCompleted++;
      }

      stateNewProviders += cityNew;

      // Progress log every 5 cities or when a city has results
      if (cityIdx % 5 === 0 || cityNew > 50) {
        const pct = Math.round((queriesCompleted / totalQueries) * 100);
        const elapsed = formatDuration(Date.now() - globalStart);
        console.log(
          `    [${cityIdx}/${cities.length}] ${city}: +${cityNew} new` +
            ` | State total: ${stateNewProviders.toLocaleString()}` +
            ` | ${pct}% done | ${elapsed}`,
        );
      }
    }

    const stateDuration = formatDuration(Date.now() - stateStart);
    globalInserted += stateInserted;
    globalFetched += stateNewProviders;

    console.log(`\n  ${state} COMPLETE: +${stateInserted.toLocaleString()} inserted` +
      ` (${stateNewProviders.toLocaleString()} new unique found) in ${stateDuration}`);
  }

  // Final summary
  const totalDuration = formatDuration(Date.now() - globalStart);
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  City-Level Seeding Complete!`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  New providers inserted: ${globalInserted.toLocaleString()}`);
  console.log(`  New unique found:       ${globalFetched.toLocaleString()}`);
  console.log(`  API queries completed:  ${queriesCompleted.toLocaleString()}`);
  console.log(`  Duration:               ${totalDuration}`);
  console.log(`  Previously existing:    ${seenNPIs.size.toLocaleString()} NPIs in DB`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
