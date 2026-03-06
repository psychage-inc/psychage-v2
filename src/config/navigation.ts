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
        // Learn mega menu - 5 sections, 16 items (1 Browse + 15 categories)
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
                    title: 'Understanding Mental Health',
                    items: [
                        {
                            id: 'anxiety-stress',
                            label: 'Anxiety & Stress',
                            description: 'Managing worry and overwhelm',
                            href: '/learn?category=anxiety-stress',
                            icon: 'brain'
                        },
                        {
                            id: 'depression-grief',
                            label: 'Depression & Grief',
                            description: 'Navigating sadness and loss',
                            href: '/learn?category=depression-grief',
                            icon: 'cloud'
                        },
                        {
                            id: 'trauma-healing',
                            label: 'Trauma & Healing',
                            description: 'Processing difficult experiences',
                            href: '/learn?category=trauma-healing',
                            icon: 'shield-check'
                        },
                        {
                            id: 'mental-health-conditions',
                            label: 'Mental Health Conditions',
                            description: 'Understanding diagnoses',
                            href: '/learn?category=mental-health-conditions',
                            icon: 'stethoscope'
                        }
                    ]
                },
                {
                    title: 'Personal Growth',
                    items: [
                        {
                            id: 'emotional-regulation',
                            label: 'Emotional Regulation',
                            description: 'Managing your emotions',
                            href: '/learn?category=emotional-regulation',
                            icon: 'heart-pulse'
                        },
                        {
                            id: 'self-worth',
                            label: 'Self-Worth & Identity',
                            description: 'Building confidence',
                            href: '/learn?category=self-worth',
                            icon: 'star'
                        },
                        {
                            id: 'habits-motivation',
                            label: 'Habits & Motivation',
                            description: 'Creating positive change',
                            href: '/learn?category=habits-motivation',
                            icon: 'target'
                        },
                        {
                            id: 'sleep-body',
                            label: 'Sleep & Body',
                            description: 'Physical and mental wellness',
                            href: '/learn?category=sleep-body',
                            icon: 'moon'
                        }
                    ]
                },
                {
                    title: 'Relationships & Life',
                    items: [
                        {
                            id: 'relationships',
                            label: 'Relationships',
                            description: 'Building healthy connections',
                            href: '/learn?category=relationships',
                            icon: 'users'
                        },
                        {
                            id: 'family-parenting',
                            label: 'Family & Parenting',
                            description: 'Family dynamics and patterns',
                            href: '/learn?category=family-parenting',
                            icon: 'home'
                        },
                        {
                            id: 'loneliness-connection',
                            label: 'Loneliness & Connection',
                            description: 'Finding meaningful belonging',
                            href: '/learn?category=loneliness-connection',
                            icon: 'user-plus'
                        },
                        {
                            id: 'work-burnout',
                            label: 'Work & Burnout',
                            description: 'Managing work-life balance',
                            href: '/learn?category=work-burnout',
                            icon: 'briefcase'
                        }
                    ]
                },
                {
                    title: 'Modern Life & Support',
                    items: [
                        {
                            id: 'digital-life',
                            label: 'Digital Life',
                            description: 'Technology and mental health',
                            href: '/learn?category=digital-life',
                            icon: 'smartphone'
                        },
                        {
                            id: 'cultural-perspectives',
                            label: 'Cultural Perspectives',
                            description: 'Global mental health insights',
                            href: '/learn?category=cultural-perspectives',
                            icon: 'globe'
                        },
                        {
                            id: 'therapy-treatment',
                            label: 'Therapy & Treatment',
                            description: 'Finding the right support',
                            href: '/learn?category=therapy-treatment',
                            icon: 'heart'
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
                    href: '/tools/symptom-navigator',
                    requiredFeatureFlag: 'VITE_NAV_TIER1_ENABLED'
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
                            cta: 'Start Navigation',
                            requiredFeatureFlag: 'VITE_NAV_TIER1_ENABLED'
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
                            id: 'thought-reframer',
                            label: 'Thought Reframer',
                            description: 'Challenge negative thoughts',
                            href: '/tools/thought-reframer',
                            icon: 'lightbulb'
                        },
                        {
                            id: 'clarity-journal',
                            label: 'Clarity Journal',
                            description: 'Structured journaling & tracking',
                            href: '/tools/clarity-journal',
                            icon: 'notebook-pen'
                        }
                    ]
                }
            ],
            quickActions: [
                { label: 'All Tools', href: '/tools' },
                { label: 'Thought Reframer', href: '/tools/thought-reframer' },
                {
                    label: 'Clarity Score',
                    href: '/clarity-score',
                    requiredFeatureFlag: 'VITE_ENABLE_CLARITY_SCORE'
                },
                {
                    label: 'Symptom Navigator',
                    href: '/tools/symptom-navigator',
                    requiredFeatureFlag: 'VITE_NAV_TIER1_ENABLED'
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

        // Find Providers (existing, enhanced with feature flag)
        {
            id: 'providers',
            label: 'Find Providers',
            type: 'link',
            href: '/providers',
            requiredFeatureFlag: 'VITE_ENABLE_PROVIDER_DIRECTORY'
        } as NavLink,

        // For Providers (NEW)
        {
            id: 'for-providers',
            label: 'For Providers',
            type: 'mega-menu',
            sections: [
                {
                    title: 'Join Our Network',
                    items: [
                        {
                            id: 'for-providers-info',
                            label: 'Why Join Psychage',
                            description: 'Benefits for mental health professionals',
                            href: '/for-providers',
                            icon: 'info'
                        },
                        {
                            id: 'provider-apply',
                            label: 'Apply to Join',
                            description: 'Join our provider network',
                            href: '/for-providers/apply',
                            icon: 'user-plus'
                        },
                        {
                            id: 'provider-claim',
                            label: 'Claim Your Profile',
                            description: 'Already listed? Claim your profile',
                            href: '/for-providers/claim',
                            icon: 'shield-check'
                        }
                    ]
                }
            ],
            quickActions: [
                {
                    label: 'Provider Dashboard',
                    href: '/provider',
                    allowedRoles: ['provider', 'admin'],
                    requiredAuth: true
                }
            ]
        } as NavMegaMenu,

        // About/Company (NEW)
        {
            id: 'about',
            label: 'About',
            type: 'mega-menu',
            sections: [
                {
                    title: 'Company',
                    items: [
                        {
                            id: 'about-us',
                            label: 'About Psychage',
                            description: 'Our mission and values',
                            href: '/about',
                            icon: 'info'
                        },
                        {
                            id: 'contact',
                            label: 'Contact Us',
                            description: 'Get in touch with our team',
                            href: '/contact',
                            icon: 'mail'
                        }
                    ]
                },
                {
                    title: 'Legal',
                    items: [
                        {
                            id: 'privacy',
                            label: 'Privacy Policy',
                            description: 'How we protect your data',
                            href: '/legal/privacy',
                            icon: 'shield'
                        },
                        {
                            id: 'terms',
                            label: 'Terms of Service',
                            description: 'Terms and conditions',
                            href: '/legal/terms',
                            icon: 'file-text'
                        }
                    ]
                }
            ]
        } as NavMegaMenu
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
    learn: (navigationConfig.primary.find(item => item.id === 'learn') as any),
    tools: (navigationConfig.primary.find(item => item.id === 'tools') as any)
};
