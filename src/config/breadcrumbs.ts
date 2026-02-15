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
};
