interface BreadcrumbItem {
    label: string;
    href?: string;
}

export const breadcrumbConfig: Record<string, BreadcrumbItem[]> = {
    // Learn section
    '/learn': [{ label: 'Learn' }],
    '/learn/:categorySlug': [
        { label: 'Learn', href: '/learn' },
        { label: ':categorySlug' } // Dynamic
    ],
    '/learn/:categorySlug/:slug': [
        { label: 'Learn', href: '/learn' },
        { label: ':categorySlug', href: '/learn/:categorySlug' },
        { label: ':title' } // From article data
    ],
    '/learn/article/:id': [
        { label: 'Learn', href: '/learn' },
        { label: ':category', href: '/learn/:categorySlug' },
        { label: ':title' }
    ],

    // Tools section
    '/tools': [{ label: 'Tools' }],
    '/tools/clarity-score': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Score' }
    ],
    '/tools/mood-journal': [
        { label: 'Tools', href: '/tools' },
        { label: 'Mood Journal' }
    ],
    '/tools/clarity-journal': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal' }
    ],
    '/tools/clarity-journal/daily': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Daily Check-In' }
    ],
    '/tools/clarity-journal/screening': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Weekly Screening' }
    ],
    '/tools/clarity-journal/thought-record': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Thought Record' }
    ],
    '/tools/clarity-journal/activation': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Behavioral Activation' }
    ],
    '/tools/clarity-journal/triggers': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Trigger Log' }
    ],
    '/tools/clarity-journal/toolbox': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Wellness Toolbox' }
    ],
    '/tools/clarity-journal/reflection': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Weekly Reflection' }
    ],
    '/tools/clarity-journal/history': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'History' }
    ],
    '/tools/clarity-journal/insights': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Insights' }
    ],
    '/tools/clarity-journal/entry': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Daily Entry' }
    ],
    '/tools/clarity-journal/report': [
        { label: 'Tools', href: '/tools' },
        { label: 'Clarity Journal', href: '/tools/clarity-journal' },
        { label: 'Therapist Report' }
    ],
    '/tools/thought-reframer': [
        { label: 'Tools', href: '/tools' },
        { label: 'Thought Reframer' }
    ],

    // Dashboard sections
    '/dashboard': [{ label: 'Dashboard' }],
    '/dashboard/settings': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Account Settings' }
    ],
    '/dashboard/bookmarks': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Saved' }
    ],
    '/dashboard/history': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Assessment History' }
    ],

    // Provider dashboard
    '/provider': [{ label: 'Provider Dashboard' }],
    '/provider/patients': [
        { label: 'Provider Dashboard', href: '/provider' },
        { label: 'Patients' }
    ],
    '/provider/analytics': [
        { label: 'Provider Dashboard', href: '/provider' },
        { label: 'Analytics' }
    ],
    '/provider/edit-profile': [
        { label: 'Provider Dashboard', href: '/provider' },
        { label: 'Edit Public Profile' }
    ],
    // Fallback for current profile route if used
    '/provider/profile': [
        { label: 'Provider Dashboard', href: '/provider' },
        { label: 'Edit Public Profile' }
    ],

    // Admin dashboard
    '/admin': [{ label: 'Admin Dashboard' }],
    '/admin/providers': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Providers' }
    ],
    '/admin/providers/:id': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Providers', href: '/admin/providers' },
        { label: ':name' } // Dynamic from provider data
    ],
    '/admin/users': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Users' }
    ],
    '/admin/reports': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Reports' }
    ],
    '/admin/reports/:id': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Reports', href: '/admin/reports' },
        { label: 'Report Details' }
    ],
    '/admin/audit': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Audit Logs' }
    ],
    '/admin/analytics': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Analytics' }
    ],
    '/admin/content': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Content' }
    ],
    '/admin/settings': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Settings' }
    ],
    '/admin/users/:id': [
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'Users', href: '/admin/users' },
        { label: 'User Details' }
    ],
};
