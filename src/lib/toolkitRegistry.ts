/**
 * Toolkit item registry
 *
 * Single source of truth that maps a `toolkit_items.ref_id` to an in-app route.
 * A ref_id whose target tool/page does not exist yet resolves as unavailable so
 * the UI can render a disabled "coming soon" entry — never a broken link.
 *
 * ref_id grammar:
 *   tool:<slug>                  e.g. `tool:symptom-navigator`, `tool:steady`
 *   article:<catSlug>/<artSlug>  e.g. `article:anxiety/understanding-anxiety`
 *   term:<slug>                  Plain Words glossary entry (tool not built yet)
 *   strategy:<slug>              Coping Finder strategy (tool not built yet)
 *
 * Tools referenced by the seed toolkits that do not exist yet — Steady,
 * Plain Words (`term:`), Being There, Coping Finder (`strategy:`) — all resolve
 * to `available: false` until their routes are added here.
 */

export type ToolkitItemKind = 'tool' | 'article' | 'term' | 'strategy';

export interface ResolvedRef {
    /** In-app route to deep-link to, or null when the target does not exist yet. */
    href: string | null;
    /** When false, render a disabled "coming soon" entry instead of a link. */
    available: boolean;
}

/**
 * Tools that exist today, keyed by their `tool:` slug. Routes are mirrored from
 * the live router (see App.tsx) — reference existing tools, never re-implement.
 * Tools NOT in this map (steady, plain-words, being-there, coping-finder, …)
 * resolve to "coming soon".
 */
const TOOL_ROUTES: Record<string, string> = {
    'symptom-navigator': '/tools/symptom-navigator',
    'clarity-score': '/clarity-score',
    'mood-journal': '/tools/mood-journal',
    'sleep-architect': '/tools/sleep-architect',
    'relationship-health': '/tools/relationship-health',
    'clarity-journal': '/tools/clarity-journal',
    'mindmate': '/tools/mindmate',
    'medication-tracker': '/tools/medication-tracker',
    'crisis': '/crisis',
};

/**
 * Resolve a toolkit item's ref_id to an in-app route. Pure + synchronous so it
 * can be called during render. Unknown kinds or unbuilt targets are unavailable.
 */
export function resolveToolkitRef(refId: string): ResolvedRef {
    const sep = refId.indexOf(':');
    if (sep === -1) return { href: null, available: false };

    const kind = refId.slice(0, sep);
    const rest = refId.slice(sep + 1).trim();
    if (!rest) return { href: null, available: false };

    switch (kind) {
        case 'tool': {
            const route = TOOL_ROUTES[rest];
            return route ? { href: route, available: true } : { href: null, available: false };
        }
        case 'article': {
            // rest is "<catSlug>/<artSlug>"
            const parts = rest.split('/');
            if (parts.length !== 2 || !parts[0] || !parts[1]) {
                return { href: null, available: false };
            }
            return { href: `/learn/${parts[0]}/${parts[1]}`, available: true };
        }
        // Plain Words glossary (`term:`) and Coping Finder (`strategy:`) tools
        // are not built yet — always "coming soon" until their routes exist.
        case 'term':
        case 'strategy':
            return { href: null, available: false };
        default:
            return { href: null, available: false };
    }
}
