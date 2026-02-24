// =============================================================================
// POST /api/ai/providers/search — Provider Directory Search
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import type {
  ProviderSearchRequest,
  ProviderSearchResponse,
} from '@/lib/ai/types';
import { getRequiredEnv } from '@/lib/ai/config';
import { searchProviders } from '@/lib/ai/providers';

export async function handleProviderSearch(
  request: ProviderSearchRequest
): Promise<ProviderSearchResponse> {
  const supabase = createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')
  );

  const limit = request.limit ?? 5;
  const page = request.page ?? 1;

  const result = await searchProviders(
    {
      query: request.query,
      location: request.location,
      specialty: request.specialty,
      providerType: request.providerType,
      telehealth: request.telehealth,
      language: request.language,
      page,
      limit,
    },
    supabase
  );

  return {
    providers: result.providers,
    total: result.totalMatches,
    page,
    limit,
  };
}
