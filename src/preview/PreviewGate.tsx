// Layer-2 token gate for the preview surface. A visitor arriving with ?key=<token> matching
// VITE_PREVIEW_ACCESS_TOKEN is granted access, and the token is stored in a session cookie so
// the query string is not needed again. Without it, a bare access screen shows — no content,
// no titles, no leakage of what is behind it. Constant-time compare.
//
// Honest caveat: a VITE_-exposed token is readable inside the preview bundle, so this is weak on
// its own. The real defences are Layer-1 route isolation (production has no preview bundle at all)
// and Vercel deployment protection. This gate is belt-and-braces.
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TOKEN = (import.meta.env.VITE_PREVIEW_ACCESS_TOKEN as string | undefined) || '';
const COOKIE = 'psychage_preview_access';

function constantTimeEquals(a: string, b: string): boolean {
    const len = Math.max(a.length, b.length);
    let diff = a.length ^ b.length;
    for (let i = 0; i < len; i++) {
        diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }
    return diff === 0;
}

function readCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : '';
}

export function PreviewGate({ children }: { children: React.ReactNode }) {
    const [searchParams] = useSearchParams();
    const [manualKey, setManualKey] = useState('');

    const authorized = useMemo(() => {
        if (!TOKEN) return false; // no token configured → deny (fail closed)
        // 1) query string
        const qk = searchParams.get('key');
        if (qk && constantTimeEquals(qk, TOKEN)) {
            document.cookie = `${COOKIE}=${encodeURIComponent(TOKEN)}; path=/preview; SameSite=Strict`;
            return true;
        }
        // 2) session cookie
        if (constantTimeEquals(readCookie(COOKIE), TOKEN)) return true;
        // 3) manual entry this session
        if (manualKey && constantTimeEquals(manualKey, TOKEN)) {
            document.cookie = `${COOKIE}=${encodeURIComponent(TOKEN)}; path=/preview; SameSite=Strict`;
            return true;
        }
        return false;
    }, [searchParams, manualKey]);

    if (authorized) return <>{children}</>;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-sm w-full text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                    <span className="text-primary text-xl" aria-hidden>
                        ◇
                    </span>
                </div>
                <h1 className="font-display text-xl text-text-primary mb-2">Private preview</h1>
                <p className="text-sm text-text-secondary mb-6">
                    This page is restricted. Enter the access key you were sent to continue.
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const input = (e.currentTarget.elements.namedItem('key') as HTMLInputElement)
                            ?.value;
                        setManualKey(input || '');
                    }}
                    className="flex gap-2"
                >
                    <input
                        name="key"
                        type="password"
                        autoComplete="off"
                        aria-label="Access key"
                        placeholder="Access key"
                        className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}
