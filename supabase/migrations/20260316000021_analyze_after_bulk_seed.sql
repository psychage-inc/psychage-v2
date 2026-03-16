-- =============================================================================
-- Post-bulk-seed: Update table statistics for query planner
-- After inserting 200k+ providers, the planner needs fresh stats.
-- =============================================================================

ANALYZE public.providers;
ANALYZE public.provider_locations;
ANALYZE public.provider_specialties;
ANALYZE public.provider_languages;
ANALYZE public.provider_cultural_competencies;
ANALYZE public.provider_insurance;
