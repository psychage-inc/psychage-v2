import { LucideIcon } from 'lucide-react';
import {
    Brain, CloudRain, MessageCircle, Leaf, Moon, Sparkles,
    Briefcase, Globe, HeartPulse, Home, Target, Smartphone, Hourglass, Flower2,
    Shield, Activity, Monitor, Sunrise,
} from 'lucide-react';

/**
 * Shade palette for a category — 4 stops from light to dark.
 * Used for subcategory differentiation and UI variants.
 */
export interface CategoryShades {
    50: string;
    100: string;
    500: string;
    600: string;
}

/**
 * Complete theme for one category, including all utility classes
 * needed across every rendering context.
 */
export interface CategoryTheme {
    label: string;
    colorFamily: string;
    icon: LucideIcon;
    shades: CategoryShades;
    classes: {
        bg: string;
        bgLight: string;
        bgLightDark: string;
        text: string;
        textDark: string;
        border: string;
        borderDark: string;
        spotlight: string;
        gradient: string;
        ring: string;
    };
}

export type CategoryThemeMap = Record<string, CategoryTheme>;

/**
 * 18 category themes aligned with content-architecture slugs.
 * Each entry's slug key matches the article `_shared.ts` category slug.
 */
export const categoryThemes: CategoryThemeMap = {
    // ─── EMOTIONAL FOUNDATIONS ─────────────────────────────────
    'emotional-regulation': {
        label: 'Emotional Regulation & Self-Awareness',
        colorFamily: 'rose',
        icon: HeartPulse,
        shades: { 50: 'rose-50', 100: 'rose-100', 500: 'rose-500', 600: 'rose-600' },
        classes: {
            bg: 'bg-rose-500',
            bgLight: 'bg-rose-50',
            bgLightDark: 'dark:bg-rose-950/30',
            text: 'text-rose-600',
            textDark: 'dark:text-rose-400',
            border: 'border-rose-200',
            borderDark: 'dark:border-rose-800',
            spotlight: 'rgba(244, 63, 94, 0.15)',
            gradient: 'from-rose-400 to-rose-600',
            ring: 'ring-rose-500/40',
        },
    },
    'anxiety-stress': {
        label: 'Anxiety, Stress & Overwhelm',
        colorFamily: 'teal',
        icon: Brain,
        shades: { 50: 'teal-50', 100: 'teal-100', 500: 'teal-500', 600: 'teal-600' },
        classes: {
            bg: 'bg-teal-500',
            bgLight: 'bg-teal-50',
            bgLightDark: 'dark:bg-teal-950/30',
            text: 'text-teal-600',
            textDark: 'dark:text-teal-400',
            border: 'border-teal-200',
            borderDark: 'dark:border-teal-800',
            spotlight: 'rgba(13, 148, 136, 0.15)',
            gradient: 'from-teal-400 to-teal-600',
            ring: 'ring-teal-500/40',
        },
    },
    'relationships-communication': {
        label: 'Relationships & Communication',
        colorFamily: 'pink',
        icon: MessageCircle,
        shades: { 50: 'pink-50', 100: 'pink-100', 500: 'pink-500', 600: 'pink-600' },
        classes: {
            bg: 'bg-pink-500',
            bgLight: 'bg-pink-50',
            bgLightDark: 'dark:bg-pink-950/30',
            text: 'text-pink-600',
            textDark: 'dark:text-pink-400',
            border: 'border-pink-200',
            borderDark: 'dark:border-pink-800',
            spotlight: 'rgba(236, 72, 153, 0.15)',
            gradient: 'from-pink-400 to-pink-600',
            ring: 'ring-pink-500/40',
        },
    },
    'self-worth-identity': {
        label: 'Self-Worth, Confidence & Identity',
        colorFamily: 'orange',
        icon: Sparkles,
        shades: { 50: 'orange-50', 100: 'orange-100', 500: 'orange-500', 600: 'orange-600' },
        classes: {
            bg: 'bg-orange-500',
            bgLight: 'bg-orange-50',
            bgLightDark: 'dark:bg-orange-950/30',
            text: 'text-orange-600',
            textDark: 'dark:text-orange-400',
            border: 'border-orange-200',
            borderDark: 'dark:border-orange-800',
            spotlight: 'rgba(249, 115, 22, 0.15)',
            gradient: 'from-orange-400 to-orange-600',
            ring: 'ring-orange-500/40',
        },
    },
    'work-productivity': {
        label: 'Work, Productivity & Burnout',
        colorFamily: 'blue',
        icon: Briefcase,
        shades: { 50: 'blue-50', 100: 'blue-100', 500: 'blue-500', 600: 'blue-600' },
        classes: {
            bg: 'bg-blue-500',
            bgLight: 'bg-blue-50',
            bgLightDark: 'dark:bg-blue-950/30',
            text: 'text-blue-600',
            textDark: 'dark:text-blue-400',
            border: 'border-blue-200',
            borderDark: 'dark:border-blue-800',
            spotlight: 'rgba(59, 130, 246, 0.15)',
            gradient: 'from-blue-400 to-blue-600',
            ring: 'ring-blue-500/40',
        },
    },
    'family-parenting': {
        label: 'Family, Parenting & Childhood Patterns',
        colorFamily: 'emerald',
        icon: Home,
        shades: { 50: 'emerald-50', 100: 'emerald-100', 500: 'emerald-500', 600: 'emerald-600' },
        classes: {
            bg: 'bg-emerald-500',
            bgLight: 'bg-emerald-50',
            bgLightDark: 'dark:bg-emerald-950/30',
            text: 'text-emerald-600',
            textDark: 'dark:text-emerald-400',
            border: 'border-emerald-200',
            borderDark: 'dark:border-emerald-800',
            spotlight: 'rgba(34, 197, 94, 0.15)',
            gradient: 'from-emerald-400 to-emerald-600',
            ring: 'ring-emerald-500/40',
        },
    },
    'depression-grief': {
        label: 'Depression, Grief & Loss',
        colorFamily: 'indigo',
        icon: CloudRain,
        shades: { 50: 'indigo-50', 100: 'indigo-100', 500: 'indigo-500', 600: 'indigo-600' },
        classes: {
            bg: 'bg-indigo-500',
            bgLight: 'bg-indigo-50',
            bgLightDark: 'dark:bg-indigo-950/30',
            text: 'text-indigo-600',
            textDark: 'dark:text-indigo-400',
            border: 'border-indigo-200',
            borderDark: 'dark:border-indigo-800',
            spotlight: 'rgba(99, 102, 241, 0.15)',
            gradient: 'from-indigo-400 to-indigo-600',
            ring: 'ring-indigo-500/40',
        },
    },

    // ─── HABITS & WELLNESS ────────────────────────────────────
    'habits-behavior-change': {
        label: 'Habits, Motivation & Behavior Change',
        colorFamily: 'green',
        icon: Target,
        shades: { 50: 'green-50', 100: 'green-100', 500: 'green-500', 600: 'green-600' },
        classes: {
            bg: 'bg-green-500',
            bgLight: 'bg-green-50',
            bgLightDark: 'dark:bg-green-950/30',
            text: 'text-green-600',
            textDark: 'dark:text-green-400',
            border: 'border-green-200',
            borderDark: 'dark:border-green-800',
            spotlight: 'rgba(34, 197, 94, 0.15)',
            gradient: 'from-green-400 to-green-600',
            ring: 'ring-green-500/40',
        },
    },
    'sleep-body-connection': {
        label: 'Sleep, Body & Mind-Body Connection',
        colorFamily: 'violet',
        icon: Moon,
        shades: { 50: 'violet-50', 100: 'violet-100', 500: 'violet-500', 600: 'violet-600' },
        classes: {
            bg: 'bg-violet-500',
            bgLight: 'bg-violet-50',
            bgLightDark: 'dark:bg-violet-950/30',
            text: 'text-violet-600',
            textDark: 'dark:text-violet-400',
            border: 'border-violet-200',
            borderDark: 'dark:border-violet-800',
            spotlight: 'rgba(139, 92, 246, 0.15)',
            gradient: 'from-violet-400 to-violet-600',
            ring: 'ring-violet-500/40',
        },
    },

    // ─── MODERN LIFE & SOCIETY ────────────────────────────────
    'digital-life': {
        label: 'Digital Life & Modern Stressors',
        colorFamily: 'cyan',
        icon: Smartphone,
        shades: { 50: 'cyan-50', 100: 'cyan-100', 500: 'cyan-500', 600: 'cyan-600' },
        classes: {
            bg: 'bg-cyan-600',
            bgLight: 'bg-cyan-50',
            bgLightDark: 'dark:bg-cyan-950/30',
            text: 'text-cyan-600',
            textDark: 'dark:text-cyan-400',
            border: 'border-cyan-200',
            borderDark: 'dark:border-cyan-800',
            spotlight: 'rgba(6, 182, 212, 0.15)',
            gradient: 'from-cyan-400 to-cyan-600',
            ring: 'ring-cyan-500/40',
        },
    },
    'trauma-healing': {
        label: 'Trauma-Informed Education & Healing',
        colorFamily: 'red',
        icon: Leaf,
        shades: { 50: 'red-50', 100: 'red-100', 500: 'red-500', 600: 'red-600' },
        classes: {
            bg: 'bg-red-500',
            bgLight: 'bg-red-50',
            bgLightDark: 'dark:bg-red-950/30',
            text: 'text-red-600',
            textDark: 'dark:text-red-400',
            border: 'border-red-200',
            borderDark: 'dark:border-red-800',
            spotlight: 'rgba(239, 68, 68, 0.15)',
            gradient: 'from-red-400 to-red-600',
            ring: 'ring-red-500/40',
        },
    },
    'cultural-global': {
        label: 'Cultural Perspectives & Global Wellness',
        colorFamily: 'sky',
        icon: Globe,
        shades: { 50: 'sky-50', 100: 'sky-100', 500: 'sky-500', 600: 'sky-600' },
        classes: {
            bg: 'bg-sky-500',
            bgLight: 'bg-sky-50',
            bgLightDark: 'dark:bg-sky-950/30',
            text: 'text-sky-600',
            textDark: 'dark:text-sky-400',
            border: 'border-sky-200',
            borderDark: 'dark:border-sky-800',
            spotlight: 'rgba(14, 165, 233, 0.15)',
            gradient: 'from-sky-400 to-sky-600',
            ring: 'ring-sky-500/40',
        },
    },

    // ─── SPECIALIZED POPULATIONS ──────────────────────────────
    'aging-dementia-late-life': {
        label: 'Aging, Dementia & Late-Life Mental Health',
        colorFamily: 'amber',
        icon: Hourglass,
        shades: { 50: 'amber-50', 100: 'amber-100', 500: 'amber-500', 600: 'amber-600' },
        classes: {
            bg: 'bg-amber-500',
            bgLight: 'bg-amber-50',
            bgLightDark: 'dark:bg-amber-950/30',
            text: 'text-amber-600',
            textDark: 'dark:text-amber-400',
            border: 'border-amber-200',
            borderDark: 'dark:border-amber-800',
            spotlight: 'rgba(245, 158, 11, 0.15)',
            gradient: 'from-amber-400 to-amber-600',
            ring: 'ring-amber-500/40',
        },
    },
    'womens-mental-health': {
        label: "Women's Mental Health",
        colorFamily: 'fuchsia',
        icon: Flower2,
        shades: { 50: 'fuchsia-50', 100: 'fuchsia-100', 500: 'fuchsia-500', 600: 'fuchsia-600' },
        classes: {
            bg: 'bg-fuchsia-500',
            bgLight: 'bg-fuchsia-50',
            bgLightDark: 'dark:bg-fuchsia-950/30',
            text: 'text-fuchsia-600',
            textDark: 'dark:text-fuchsia-400',
            border: 'border-fuchsia-200',
            borderDark: 'dark:border-fuchsia-800',
            spotlight: 'rgba(217, 70, 239, 0.15)',
            gradient: 'from-fuchsia-400 to-fuchsia-600',
            ring: 'ring-fuchsia-500/40',
        },
    },
    'mens-mental-health': {
        label: "Men's Mental Health",
        colorFamily: 'slate',
        icon: Shield,
        shades: { 50: 'slate-50', 100: 'slate-100', 500: 'slate-600', 600: 'slate-700' },
        classes: {
            bg: 'bg-slate-600',
            bgLight: 'bg-slate-50',
            bgLightDark: 'dark:bg-slate-800/30',
            text: 'text-slate-700',
            textDark: 'dark:text-slate-400',
            border: 'border-slate-200',
            borderDark: 'dark:border-slate-700',
            spotlight: 'rgba(71, 85, 105, 0.15)',
            gradient: 'from-slate-500 to-slate-700',
            ring: 'ring-slate-600/40',
        },
    },

    // ─── MEDICAL & EXISTENTIAL ────────────────────────────────
    'chronic-illness-pain': {
        label: 'Chronic Illness, Pain & Medical Psychology',
        colorFamily: 'lime',
        icon: Activity,
        shades: { 50: 'lime-50', 100: 'lime-100', 500: 'lime-500', 600: 'lime-600' },
        classes: {
            bg: 'bg-lime-600',
            bgLight: 'bg-lime-50',
            bgLightDark: 'dark:bg-lime-950/30',
            text: 'text-lime-700',
            textDark: 'dark:text-lime-400',
            border: 'border-lime-200',
            borderDark: 'dark:border-lime-800',
            spotlight: 'rgba(101, 163, 13, 0.15)',
            gradient: 'from-lime-400 to-lime-600',
            ring: 'ring-lime-500/40',
        },
    },
    'technology-digital-life': {
        label: 'Technology, Digital Life & Mental Health',
        colorFamily: 'stone',
        icon: Monitor,
        shades: { 50: 'stone-50', 100: 'stone-100', 500: 'stone-500', 600: 'stone-600' },
        classes: {
            bg: 'bg-stone-600',
            bgLight: 'bg-stone-50',
            bgLightDark: 'dark:bg-stone-800/30',
            text: 'text-stone-600',
            textDark: 'dark:text-stone-400',
            border: 'border-stone-200',
            borderDark: 'dark:border-stone-700',
            spotlight: 'rgba(120, 113, 108, 0.15)',
            gradient: 'from-stone-400 to-stone-600',
            ring: 'ring-stone-500/40',
        },
    },
    'spirituality-meaning': {
        label: 'Spirituality, Meaning & Existential Mental Health',
        colorFamily: 'yellow',
        icon: Sunrise,
        shades: { 50: 'yellow-50', 100: 'yellow-100', 500: 'yellow-500', 600: 'yellow-600' },
        classes: {
            bg: 'bg-yellow-500',
            bgLight: 'bg-yellow-50',
            bgLightDark: 'dark:bg-yellow-950/30',
            text: 'text-yellow-700',
            textDark: 'dark:text-yellow-400',
            border: 'border-yellow-200',
            borderDark: 'dark:border-yellow-800',
            spotlight: 'rgba(234, 179, 8, 0.15)',
            gradient: 'from-yellow-400 to-yellow-600',
            ring: 'ring-yellow-500/40',
        },
    },
};

/** Fallback theme for unknown category slugs */
export const defaultCategoryTheme: CategoryTheme = {
    label: 'General',
    colorFamily: 'gray',
    icon: Brain,
    shades: { 50: 'gray-50', 100: 'gray-100', 500: 'gray-500', 600: 'gray-600' },
    classes: {
        bg: 'bg-gray-500',
        bgLight: 'bg-gray-50',
        bgLightDark: 'dark:bg-gray-950/30',
        text: 'text-gray-600',
        textDark: 'dark:text-gray-400',
        border: 'border-gray-200',
        borderDark: 'dark:border-gray-800',
        spotlight: 'rgba(107, 114, 128, 0.15)',
        gradient: 'from-gray-400 to-gray-600',
        ring: 'ring-gray-500/40',
    },
};

// ─── HELPER FUNCTIONS ────────────────────────────────────────────

/** Get the full theme for a category by slug. Always returns a valid theme. */
export function getCategoryTheme(slug: string): CategoryTheme {
    return categoryThemes[slug] ?? defaultCategoryTheme;
}

/** Get just the pre-computed classes for a category slug. */
export function getCategoryClasses(slug: string): CategoryTheme['classes'] {
    return getCategoryTheme(slug).classes;
}

/** Get the Lucide icon component for a category slug. */
export function getCategoryIcon(slug: string): LucideIcon {
    return getCategoryTheme(slug).icon;
}

/** Get the spotlight RGBA string for InteractiveCard. */
export function getCategorySpotlight(slug: string): string {
    return getCategoryTheme(slug).classes.spotlight;
}

/**
 * Get Badge-compatible inline className for a category.
 * Returns bgLight + text classes to pass to Badge's className prop.
 */
export function getCategoryBadgeClasses(slug: string): string {
    const { bgLight, bgLightDark, text, textDark } = getCategoryTheme(slug).classes;
    return `${bgLight} ${bgLightDark} ${text} ${textDark}`;
}
