import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// ============================================================
// Cross-subdomain session sharing (AUTH-037)
// ============================================================
// The app runs on two ORIGINS in production:
//   • www.psychage.com   — main / consumer site
//   • admin.psychage.com — admin panel
// Supabase's default storage is localStorage, which is per-ORIGIN. A
// session created on www therefore does NOT exist on admin: a super_admin
// who signs in on the main site is redirected to the admin subdomain with
// no session, the admin gate bounces them, and they land back on the
// consumer dashboard. Same account, same password — purely an origin
// boundary.
//
// Fix: persist the Supabase auth token in a COOKIE scoped to the
// registrable domain (".psychage.com") so every subdomain shares it. The
// login on www is then visible on admin and the redirect carries through.
//
// Scope is intentionally limited to a real shared parent domain. On
// localhost, raw-IP hosts, and *.vercel.app preview deploys (no shared
// app surface) we fall back to the default localStorage — those are
// single-origin so cross-domain sharing isn't needed and a broad cookie
// would be wrong.

/** The ".psychage.com"-style registrable domain, or null when sharing doesn't apply. */
function sharedCookieDomain(): string | null {
    if (typeof window === 'undefined') return null;
    const host = window.location.hostname;
    if (host === 'localhost' || /^[\d.]+$/.test(host)) return null; // localhost / IP
    if (host.endsWith('.vercel.app')) return null;                  // preview deploys
    const parts = host.split('.');
    if (parts.length < 2) return null;
    return '.' + parts.slice(-2).join('.'); // last two labels → ".psychage.com"
}

const COOKIE_DOMAIN = sharedCookieDomain();

// Browsers cap a single cookie at ~4KB; the Supabase session blob (access
// token + refresh token + user) can exceed that, so chunk on write and
// reassemble on read.
const COOKIE_CHUNK = 3000;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year; refresh-token rotation governs real lifetime

function readCookies(): Map<string, string> {
    const map = new Map<string, string>();
    if (typeof document === 'undefined' || !document.cookie) return map;
    for (const pair of document.cookie.split('; ')) {
        const eq = pair.indexOf('=');
        if (eq === -1) continue;
        map.set(pair.slice(0, eq), decodeURIComponent(pair.slice(eq + 1)));
    }
    return map;
}

const cookieStorage = {
    getItem(key: string): string | null {
        const cookies = readCookies();
        if (cookies.has(key)) return cookies.get(key)!; // unchunked
        let i = 0;
        let value = '';
        while (cookies.has(`${key}.${i}`)) {
            value += cookies.get(`${key}.${i}`);
            i++;
        }
        return i > 0 ? value : null;
    },
    setItem(key: string, value: string): void {
        this.removeItem(key); // clear any prior value / stale chunks first
        const attrs = `; Path=/; SameSite=Lax; Secure; Domain=${COOKIE_DOMAIN}; Max-Age=${COOKIE_MAX_AGE}`;
        if (value.length <= COOKIE_CHUNK) {
            document.cookie = `${key}=${encodeURIComponent(value)}${attrs}`;
            return;
        }
        let i = 0;
        for (let off = 0; off < value.length; off += COOKIE_CHUNK, i++) {
            const part = value.slice(off, off + COOKIE_CHUNK);
            document.cookie = `${key}.${i}=${encodeURIComponent(part)}${attrs}`;
        }
    },
    removeItem(key: string): void {
        const expire = `; Path=/; Domain=${COOKIE_DOMAIN}; Max-Age=0`;
        for (const name of readCookies().keys()) {
            if (name === key || name.startsWith(`${key}.`)) {
                document.cookie = `${name}=${expire}`;
            }
        }
    },
};

// Only use the cookie adapter where a shared parent domain exists (prod);
// everywhere else Supabase keeps its default localStorage behavior.
const useCookieStorage = COOKIE_DOMAIN !== null && typeof document !== 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        ...(useCookieStorage ? { storage: cookieStorage } : {}),
    },
});
