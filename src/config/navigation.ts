import type { NavigationConfig, NavMegaMenu, NavLink } from '../types/navigation';

/**
 * Comprehensive Navigation Configuration
 *
 * Single source of truth for all navigation items across the application.
 * Items are automatically filtered based on permissions, roles, and feature flags.
 */
export const navigationConfig: NavigationConfig = {
    // PRIMARY NAVIGATION (Desktop navbar, top-level items)
    primary: [
        // Learn mega menu - 4 sections: Browse + 3 themed groups (6/6/7).
        // Every category link points at a slug with published content (no dead links).
        {
            id: 'learn',
            label: 'Learn',
            type: 'mega-menu',
            sections: [
                {
                    title: 'Browse',
                    items: [
                        {
                            id: 'browse-all',
                            label: 'Browse All Articles',
                            description: 'Explore our complete library',
                            href: '/learn',
                            icon: 'library'
                        }
                    ]
                },
                {
                    title: 'Conditions & Disorders',
                    items: [
                        {
                            id: 'anxiety-stress',
                            label: 'Anxiety & Stress',
                            description: 'Managing worry and overwhelm',
                            href: '/learn/anxiety-stress',
                            icon: 'brain'
                        },
                        {
                            id: 'depression-mood',
                            label: 'Depression & Mood',
                            description: 'Navigating sadness and emotional lows',
                            href: '/learn/depression-mood',
                            icon: 'cloud'
                        },
                        {
                            id: 'trauma-healing',
                            label: 'Trauma & Healing',
                            description: 'Processing difficult experiences',
                            href: '/learn/trauma-healing',
                            icon: 'shield-check'
                        },
                        {
                            id: 'mental-health-conditions',
                            label: 'Mental Health Conditions',
                            description: 'Understanding diagnoses and disorders',
                            href: '/learn/mental-health-conditions',
                            icon: 'clipboard-list'
                        },
                        {
                            id: 'chronic-illness-pain',
                            label: 'Chronic Illness & Pain',
                            description: 'Mind-body and medical psychology',
                            href: '/learn/chronic-illness-pain',
                            icon: 'activity'
                        },
                        {
                            id: 'aging-dementia-late-life',
                            label: 'Aging & Late-Life',
                            description: 'Mental health in later life',
                            href: '/learn/aging-dementia-late-life',
                            icon: 'sunset'
                        }
                    ]
                },
                {
                    title: 'Behavior & Wellness',
                    items: [
                        {
                            id: 'emotional-regulation',
                            label: 'Emotional Regulation',
                            description: 'Understanding and managing emotions',
                            href: '/learn/emotional-regulation',
                            icon: 'heart-pulse'
                        },
                        {
                            id: 'self-esteem-identity',
                            label: 'Self-Esteem & Identity',
                            description: 'Building self-worth and confidence',
                            href: '/learn/self-esteem-identity',
                            icon: 'heart'
                        },
                        {
                            id: 'habits-behavior-change',
                            label: 'Habits & Behavior Change',
                            description: 'Motivation and lasting change',
                            href: '/learn/habits-behavior-change',
                            icon: 'repeat'
                        },
                        {
                            id: 'sleep-body-connection',
                            label: 'Sleep & Mind-Body',
                            description: 'Better sleep and mind-body health',
                            href: '/learn/sleep-body-connection',
                            icon: 'moon'
                        },
                        {
                            id: 'therapy-navigation',
                            label: 'Therapy & Treatment',
                            description: 'Finding the right support',
                            href: '/learn/therapy-navigation',
                            icon: 'message-circle'
                        },
                        {
                            id: 'spirituality-meaning',
                            label: 'Spirituality & Meaning',
                            description: 'Purpose, values, and existential wellbeing',
                            href: '/learn/spirituality-meaning',
                            icon: 'sparkles'
                        }
                    ]
                },
                {
                    title: 'Life & Society',
                    items: [
                        {
                            id: 'relationships-social',
                            label: 'Relationships & Social',
                            description: 'Building healthy connections',
                            href: '/learn/relationships-social',
                            icon: 'users'
                        },
                        {
                            id: 'workplace-academic',
                            label: 'Workplace & Academic',
                            description: 'Burnout, stress, and balance',
                            href: '/learn/workplace-academic',
                            icon: 'briefcase'
                        },
                        {
                            id: 'technology-digital-life',
                            label: 'Technology & Mental Health',
                            description: 'Tech, AI, and digital wellbeing',
                            href: '/learn/technology-digital-life',
                            icon: 'cpu'
                        },
                        {
                            id: 'mens-mental-health',
                            label: "Men's Mental Health",
                            description: 'Men-specific mental health',
                            href: '/learn/mens-mental-health',
                            icon: 'user'
                        },
                        {
                            id: 'digital-life',
                            label: 'Digital Life',
                            description: 'Social media and modern stressors',
                            href: '/learn/digital-life',
                            icon: 'smartphone'
                        },
                        {
                            id: 'cultural-global',
                            label: 'Global & Cultural MH',
                            description: 'Cross-cultural perspectives',
                            href: '/learn/cultural-global',
                            icon: 'globe'
                        },
                        {
                            id: 'loneliness-connection',
                            label: 'Loneliness & Connection',
                            description: 'Belonging and social connection',
                            href: '/learn/loneliness-connection',
                            icon: 'heart-handshake'
                        }
                    ]
                }
            ],
            quickActions: [
                { label: 'Browse All Articles', href: '/learn' },
                { label: 'Most Popular', href: '/learn?sort=popular' },
                { label: 'Recently Added', href: '/learn?sort=recent' },
                {
                    label: 'Symptom Navigator',
                    href: '/tools/symptom-navigator'
                }
            ]
        } as NavMegaMenu,

        // Tools mega menu (existing, enhanced with feature flags)
        {
            id: 'tools',
            label: 'Tools',
            type: 'mega-menu',
            sections: [
                {
                    title: 'Assessments',
                    items: [
                        {
                            id: 'clarity',
                            label: 'Clarity Score',
                            description: 'Cognitive assessment',
                            href: '/clarity-score',
                            icon: 'chart',
                            cta: 'Take Assessment',
                            requiredFeatureFlag: 'VITE_ENABLE_CLARITY_SCORE'
                        },
                        {
                            id: 'symptom-navigator',
                            label: 'Symptom Navigator',
                            description: 'Interactive symptom checker',
                            href: '/tools/symptom-navigator',
                            icon: 'brain',
                            cta: 'Start Navigation'
                        },
                        {
                            id: 'relationship-health',
                            label: 'Relationship Health',
                            description: 'Relationship quality check',
                            href: '/tools/relationship-health',
                            icon: 'heart-handshake',
                            cta: 'Take Assessment'
                        }
                    ]
                },
                {
                    title: 'Daily Tools',
                    items: [
                        {
                            id: 'mood',
                            label: 'Mood Journal',
                            description: 'Track patterns & triggers',
                            href: '/tools/mood-journal',
                            icon: 'edit',
                            requiredFeatureFlag: 'VITE_ENABLE_MOOD_JOURNAL'
                        },
                        {
                            id: 'sleep',
                            label: 'Sleep Architect',
                            description: 'Optimize your sleep',
                            href: '/tools/sleep-architect',
                            icon: 'moon',
                            requiredFeatureFlag: 'VITE_ENABLE_SLEEP_TRACKER'
                        },
                        {
                            id: 'mindmate',
                            label: 'MindMate AI',
                            description: 'AI mental health companion',
                            href: '/tools/mindmate',
                            icon: 'brain',
                            cta: 'Chat Now',
                            requiredFeatureFlag: 'VITE_ENABLE_AI_CHAT'
                        },
                        {
                            id: 'clarity-journal',
                            label: 'Clarity Journal',
                            description: 'Structured journaling & tracking',
                            href: '/tools/clarity-journal',
                            icon: 'notebook-pen'
                        },
                        {
                            id: 'medication-tracker',
                            label: 'Medication Tracker',
                            description: 'Track doses & adherence',
                            href: '/tools/medication-tracker',
                            icon: 'pill',
                            requiredFeatureFlag: 'VITE_ENABLE_MEDICATION_TRACKER'
                        }
                    ]
                }
            ],
            quickActions: [
                { label: 'All Tools', href: '/tools' },
                {
                    label: 'Clarity Score',
                    href: '/clarity-score',
                    requiredFeatureFlag: 'VITE_ENABLE_CLARITY_SCORE'
                },
                {
                    label: 'Symptom Navigator',
                    href: '/tools/symptom-navigator'
                },
                {
                    label: 'MindMate AI',
                    href: '/tools/mindmate',
                    requiredFeatureFlag: 'VITE_ENABLE_AI_CHAT'
                },
                {
                    label: 'Mood Journal',
                    href: '/tools/mood-journal',
                    requiredFeatureFlag: 'VITE_ENABLE_MOOD_JOURNAL'
                }
            ]
        } as NavMegaMenu,

        // Find Care — always visible (directory is live with 423K providers)
        {
            id: 'providers',
            label: 'Find Care',
            type: 'link',
            href: '/providers',
        } as NavLink,

        // Conditions A–Z — standalone reference (separate from the Learn categories)
        {
            id: 'conditions',
            label: 'Conditions',
            type: 'link',
            href: '/conditions',
        } as NavLink,

    ],

    // SECONDARY NAVIGATION (Utility items in top-right)
    secondary: [
        {
            id: 'crisis',
            label: 'Crisis Support',
            type: 'link',
            href: '/crisis',
            className: 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-100'
        } as NavLink
    ],

    // DASHBOARD NAVIGATION (Role-specific dashboard links)
    dashboard: [
        {
            id: 'patient-dashboard',
            label: 'Dashboard',
            type: 'link',
            href: '/dashboard',
            allowedRoles: ['patient', 'admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink,
        {
            id: 'provider-dashboard',
            label: 'Dashboard',
            type: 'link',
            href: '/provider',
            allowedRoles: ['provider', 'admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink,
        {
            id: 'admin-dashboard',
            label: 'Admin',
            type: 'link',
            href: '/admin',
            allowedRoles: ['admin'],
            requiredAuth: true,
            showOnlyWhenAuthenticated: true
        } as NavLink
    ],

    // AUTH NAVIGATION (Login/Signup buttons)
    auth: [
        {
            id: 'login',
            label: 'Sign In',
            type: 'link',
            href: '/login',
            hideWhenAuthenticated: true
        } as NavLink,
        {
            id: 'signup',
            label: 'Get Started',
            type: 'link',
            href: '/signup',
            hideWhenAuthenticated: true,
            className: 'bg-teal-600 hover:bg-teal-700 text-white'
        } as NavLink
    ]
};

/**
 * LEGACY EXPORT (for backward compatibility with existing NavMenu component)
 * This will be removed once all components are updated to use the new structure.
 */
export const legacyNavigationConfig = {
    learn: navigationConfig.primary.find(item => item.id === 'learn')!,
    tools: navigationConfig.primary.find(item => item.id === 'tools')!,
};
