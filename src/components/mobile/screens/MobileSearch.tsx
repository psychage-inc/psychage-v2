import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchService } from '@/services/searchService';
import type { ArticleWithContent } from '@/services/articleService';
import { useCategoryData } from '@/hooks/useCategoryData';
import { ArticleRowCard, ArticleRowCardSkeleton } from '@/components/mobile/cards/ArticleRowCard';

/**
 * Mobile full-screen Search (route `/search?q=<query>`). Phone breakpoint only;
 * desktop renders `SearchResults` via `ResponsiveRoute` and is untouched.
 *
 * Three failures from user testing are fixed here:
 *  1. Keyboard dismissing per keystroke — the `<input>` is a single persistent
 *     DOM node owned by local state (seeded once from the URL, never re-read).
 *     It is never conditionally swapped; only the body region below it changes.
 *     `setSearchParams` does not remount this screen (no AnimatePresence/key
 *     around `<Routes>`), so syncing `?q=` mid-type is safe.
 *  2. Unlabeled "ESC" submit — replaced by an explicit, `aria-label`led submit
 *     button (magnifier) plus native Enter via the wrapping `<form>`.
 *  3. Substring noise ("bipolar" → autism) — results come straight from
 *     `searchService.searchArticles`, whose scorer gates body-only matches to
 *     zero and returns title/category-first ordering. Rendered as returned; no
 *     screen-level re-rank (it would only regress the service ordering).
 */

const DEBOUNCE_MS = 250;
const RESULT_LIMIT = 50;
const SKELETON_COUNT = 6;

const MobileSearch: React.FC = () => {
    const [params, setParams] = useSearchParams();

    // Input is owned by local state — seeded once from the URL via lazy
    // initializers, then never re-read from it. This is the keyboard-dismiss
    // fix: the field keeps DOM identity. `autoFocusInput` is captured at mount
    // so a shareable `/search?q=…` link doesn't force the keyboard open.
    const [input, setInput] = useState(() => params.get('q') ?? '');
    const [query, setQuery] = useState(() => (params.get('q') ?? '').trim());
    const [autoFocusInput] = useState(() => !(params.get('q') ?? '').trim());
    const [results, setResults] = useState<ArticleWithContent[]>([]);
    const [total, setTotal] = useState(0);
    // The query that `results`/`total` correspond to. Set only inside the async
    // resolve/reject callbacks (never synchronously in the effect body), so the
    // loading state is derived rather than written from the effect.
    const [resultsQuery, setResultsQuery] = useState('');

    const { categories, isLoading: categoriesLoading } = useCategoryData();

    // Debounce input → query + shareable URL. `replace` keeps history clean.
    useEffect(() => {
        const trimmed = input.trim();
        const id = setTimeout(() => {
            setQuery(trimmed);
            setParams(trimmed ? { q: trimmed } : {}, { replace: true });
        }, DEBOUNCE_MS);
        return () => clearTimeout(id);
    }, [input, setParams]);

    // Run the search on the debounced query. The `cancelled` flag drops stale,
    // out-of-order responses so a fast typist never sees an earlier result win.
    // An empty query needs no work — the body region renders chips off
    // `trimmedInput`, so stale `results`/`pending` are never shown.
    useEffect(() => {
        if (!query) return;
        let cancelled = false;
        searchService
            .searchArticles(query, {}, RESULT_LIMIT)
            .then(res => {
                if (cancelled) return;
                setResults(res.items);
                setTotal(res.totalAvailable);
                setResultsQuery(query);
            })
            .catch(() => {
                if (cancelled) return;
                setResults([]);
                setTotal(0);
                setResultsQuery(query);
            });
        return () => {
            cancelled = true;
        };
    }, [query]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const trimmed = input.trim();
            setQuery(trimmed);
            setParams(trimmed ? { q: trimmed } : {}, { replace: true });
        },
        [input, setParams],
    );

    const handleClear = useCallback(() => setInput(''), []);

    const trimmedInput = input.trim();
    // Loading while the debounced query lags the input (mid-type) OR the search
    // for the current query hasn't resolved yet (results still match an older
    // query). Both gaps render skeletons instead of flickering back to chips.
    const loadingResults =
        trimmedInput.length > 0 && (trimmedInput !== query || query !== resultsQuery);
    const showResults = trimmedInput.length > 0 && !loadingResults && results.length > 0;
    const showEmpty = trimmedInput.length > 0 && !loadingResults && results.length === 0;
    const showChips = trimmedInput.length === 0;

    const renderChips = () => {
        if (categoriesLoading) {
            return (
                <div className="flex flex-wrap gap-2" aria-hidden>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-11 w-28 animate-pulse rounded-full bg-surface-hover"
                        />
                    ))}
                </div>
            );
        }
        if (categories.length === 0) return null;
        return (
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category.slug}
                        type="button"
                        onClick={() => setInput(category.name)}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary active:bg-surface-hover"
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="px-4 py-6">
            <h1 className="font-display text-2xl font-semibold text-text-primary">Search</h1>

            {/* Persistent search bar — always mounted so the keyboard stays up. */}
            <form onSubmit={handleSubmit} role="search" className="mt-4">
                <div className="flex items-center gap-1 rounded-xl border border-border bg-surface pl-4 pr-1 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        autoFocus={autoFocusInput}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        inputMode="search"
                        enterKeyHint="search"
                        aria-label="Search articles"
                        placeholder="Search articles…"
                        className="h-12 flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary focus:outline-none"
                    />
                    {trimmedInput.length > 0 ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear search"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:text-text-primary"
                        >
                            <X className="h-5 w-5" aria-hidden />
                        </button>
                    ) : null}
                    <button
                        type="submit"
                        aria-label="Search"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-primary"
                    >
                        <Search className="h-5 w-5" aria-hidden />
                    </button>
                </div>
            </form>

            <div className="mt-6">
                {loadingResults ? (
                    <div className="flex flex-col gap-1" aria-busy="true">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <ArticleRowCardSkeleton key={i} />
                        ))}
                    </div>
                ) : showResults ? (
                    <>
                        <p className="mb-2 text-xs text-text-tertiary">
                            {total > results.length
                                ? `Top ${results.length} of ${total} results`
                                : `${total} result${total === 1 ? '' : 's'}`}
                        </p>
                        <div className="flex flex-col gap-1">
                            {results.map(article => (
                                <ArticleRowCard key={article.id} article={article} />
                            ))}
                        </div>
                    </>
                ) : showEmpty ? (
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-base font-medium text-text-primary">
                                No results for “{trimmedInput}”
                            </p>
                            <p className="mt-1 text-sm text-text-secondary">
                                Try a different word, or pick a topic to explore.
                            </p>
                        </div>
                        {renderChips()}
                    </div>
                ) : showChips ? (
                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                            Browse topics
                        </p>
                        {renderChips()}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MobileSearch;
