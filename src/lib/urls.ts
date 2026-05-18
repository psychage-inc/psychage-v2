/**
 * Cross-domain URL helpers for main site / admin panel separation.
 *
 * When VITE_MAIN_URL and VITE_ADMIN_URL are unset (local dev),
 * admin is at /admin/* on the same origin. adminUrl() returns
 * paths like "/admin/dashboard" so Vite middleware serves admin.html.
 *
 * AUTH-030: paths passed to mainUrl/adminUrl are validated against the
 * redirect allowlist before concatenation. Defense in depth — even if
 * a future caller forgets to validate at the call site, the host
 * concatenation cannot land an attacker-controlled path here.
 */

import { safeRedirectPath } from './auth/validateRedirect';

export const MAIN_URL = import.meta.env.VITE_MAIN_URL || window.location.origin;
export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || window.location.origin;

const _sameOrigin = ADMIN_URL === MAIN_URL;

/** Build a full URL on the main site */
export function mainUrl(path: string): string {
  const safePath = safeRedirectPath(path);
  return `${MAIN_URL}${safePath}`;
}

/** Build a full URL on the admin site */
export function adminUrl(path: string): string {
  const safePath = safeRedirectPath(path);
  if (_sameOrigin) {
    // Local dev: admin lives at /admin/* on the same origin
    const normalized = safePath.replace(/^\/admin/, '');
    return `/admin${normalized || '/'}`;
  }
  return `${ADMIN_URL}${safePath}`;
}

/** Check if we are currently running on the admin domain (production only — used for basename) */
export function isAdminDomain(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.origin === ADMIN_URL && !_sameOrigin;
}

/** Check if we are inside the admin app (production admin domain OR dev /admin/* path) */
export function isInAdminApp(): boolean {
  if (typeof window === 'undefined') return false;
  if (isAdminDomain()) return true;
  // Dev (same origin): admin app runs at /admin/* paths
  if (_sameOrigin) return window.location.pathname.startsWith('/admin');
  return false;
}

// ============================================================================
// Entity URL resolvers — canonical routes for searchable entity types.
// Used by search results, autocomplete, and any surface linking to entities.
// ============================================================================

import type { ProviderCardData } from '@/lib/providers/types';
import type { Tool } from '@/types/models';
import type { Condition } from '@/lib/navigator/types';
import type { CountryEntry } from '@/lib/crisis';

export function getProviderUrl(provider: Pick<ProviderCardData, 'id'>): string {
  return `/providers/${provider.id}`;
}

export function getProviderSearchUrl(): string {
  return '/providers/search';
}

// Tool catalog entries don't carry a slug — map by display name.
const TOOL_ROUTE_BY_NAME: Record<string, string> = {
  'Clarity Score': '/clarity-score',
  'Mood Journal': '/tools/mood-journal',
  'Sleep Architect': '/tools/sleep-architect',
  'Breathwork': '/tools',
  'Provider Finder': '/providers/search',
  'Crisis Support': '/crisis',
  'Symptom Navigator': '/tools/symptom-navigator',
  'MindMate AI': '/tools/mindmate',
  'Clarity Journal': '/tools/clarity-journal',
  'Relationship Health Check': '/tools/relationship-health',
  'Medication Tracker': '/tools/medication-tracker',
};

export function getToolUrl(tool: Pick<Tool, 'name'>): string {
  return TOOL_ROUTE_BY_NAME[tool.name] ?? '/tools';
}

export function getConditionUrl(condition: Pick<Condition, 'id' | 'guide_path'>): string {
  if (condition.guide_path && condition.guide_path.startsWith('/')) return condition.guide_path;
  return `/tools/symptom-navigator/conditions/${condition.id.toLowerCase()}`;
}

export function getCrisisUrl(country?: Pick<CountryEntry, 'iso2'>): string {
  if (country?.iso2) return `/crisis?country=${encodeURIComponent(country.iso2)}`;
  return '/crisis';
}
