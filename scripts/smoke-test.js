#!/usr/bin/env node

/**
 * Smoke Test for All Routes
 *
 * Simple HTTP-based test that verifies all routes return valid responses
 * without requiring Playwright (avoids version conflicts)
 *
 * Usage:
 *   node scripts/smoke-test.js [base-url]
 *
 * Examples:
 *   node scripts/smoke-test.js                     # Uses http://localhost:5173
 *   node scripts/smoke-test.js http://localhost:4173  # Production preview
 *   node scripts/smoke-test.js https://your-domain.vercel.app  # Deployed site
 */

const BASE_URL = process.argv[2] || 'http://localhost:5173';

const PUBLIC_ROUTES = [
    { path: '/', name: 'Homepage' },
    { path: '/learn', name: 'Learn Page' },
    { path: '/find-care', name: 'Provider Directory' },
    { path: '/tools', name: 'Tools Landing' },
    { path: '/tools/mood-journal', name: 'Mood Journal' },
    { path: '/tools/sleep-architect', name: 'Sleep Architect' },
    { path: '/clarity-score', name: 'Clarity Score Tool' },
    { path: '/about', name: 'About Page' },
    { path: '/contact', name: 'Contact Page' },
    { path: '/legal/privacy', name: 'Privacy Policy' },
    { path: '/legal/terms', name: 'Terms of Service' },
    { path: '/crisis', name: 'Crisis Resources' },
    { path: '/navigator', name: 'Symptom Navigator' },
    { path: '/navigator/crisis', name: 'Navigator Crisis Resources' },
    { path: '/providers/register', name: 'Provider Registration' },
    { path: '/login', name: 'Login Page' },
    { path: '/signup', name: 'Signup Page' },
    { path: '/reset-password', name: 'Reset Password' },
    { path: '/search?q=anxiety', name: 'Search (with query)' },
    { path: '/category/anxiety', name: 'Category Page (dynamic)' },
    { path: '/learn/anxiety', name: 'Article Category (dynamic)' },
];

const PROTECTED_ROUTES = [
    { path: '/dashboard', name: 'User Dashboard', expectRedirect: true },
    { path: '/dashboard/settings', name: 'Account Settings', expectRedirect: true },
    { path: '/dashboard/bookmarks', name: 'Bookmarks', expectRedirect: true },
    { path: '/dashboard/history', name: 'Assessment History', expectRedirect: true },
    { path: '/admin', name: 'Admin Dashboard', expectRedirect: true },
    { path: '/admin/providers', name: 'Provider Management', expectRedirect: true },
    { path: '/admin/audit', name: 'Audit Log', expectRedirect: true },
    { path: '/admin/reports', name: 'Reports', expectRedirect: true },
    { path: '/provider', name: 'Provider Dashboard', expectRedirect: true },
    { path: '/provider/profile', name: 'Provider Profile Editor', expectRedirect: true },
    { path: '/provider/analytics', name: 'Provider Analytics', expectRedirect: true },
    { path: '/provider/patients', name: 'Provider Patients', expectRedirect: true },
];

const EDGE_CASES = [
    { path: '/nonexistent-12345', name: '404 Page', expectNotFound: true },
];

async function testRoute(route, options = {}) {
    const url = `${BASE_URL}${route.path}`;

    try {
        const response = await fetch(url, { redirect: 'manual' });
        const status = response.status;

        // Determine if test passed
        let passed = false;
        let message = '';

        if (options.expectRedirect) {
            // Protected routes should redirect (302, 301) or load with auth check (200)
            passed = status === 200 || status === 301 || status === 302 || status === 307;
            message = passed ? 'OK (auth handled)' : `Expected redirect/200, got ${status}`;
        } else if (options.expectNotFound) {
            // 404 pages should return 200 (SPA routing) or 404
            passed = status === 200 || status === 404;
            message = passed ? 'OK (404 handled)' : `Expected 200/404, got ${status}`;
        } else {
            // Public routes should return 200
            passed = status === 200;
            message = passed ? 'OK' : `Expected 200, got ${status}`;
        }

        return {
            route: route.path,
            name: route.name,
            status,
            passed,
            message,
        };
    } catch (error) {
        return {
            route: route.path,
            name: route.name,
            status: 'ERROR',
            passed: false,
            message: error.message,
        };
    }
}

async function runTests() {
    console.log(`\n🧪 Psychage v2 Route Smoke Test\n`);
    console.log(`   Testing: ${BASE_URL}\n`);

    const allResults = [];

    // Test public routes
    console.log('📄 Public Routes:');
    for (const route of PUBLIC_ROUTES) {
        const result = await testRoute(route);
        allResults.push(result);
        const icon = result.passed ? '✓' : '✗';
        const color = result.passed ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';
        console.log(`   ${color}${icon}${reset} [${result.status}] ${result.name.padEnd(35)} ${result.message}`);
    }

    // Test protected routes
    console.log('\n🔒 Protected Routes (should redirect or handle auth):');
    for (const route of PROTECTED_ROUTES) {
        const result = await testRoute(route, { expectRedirect: true });
        allResults.push(result);
        const icon = result.passed ? '✓' : '✗';
        const color = result.passed ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';
        console.log(`   ${color}${icon}${reset} [${result.status}] ${result.name.padEnd(35)} ${result.message}`);
    }

    // Test edge cases
    console.log('\n🧩 Edge Cases:');
    for (const route of EDGE_CASES) {
        const result = await testRoute(route, { expectNotFound: true });
        allResults.push(result);
        const icon = result.passed ? '✓' : '✗';
        const color = result.passed ? '\x1b[32m' : '\x1b[31m';
        const reset = '\x1b[0m';
        console.log(`   ${color}${icon}${reset} [${result.status}] ${result.name.padEnd(35)} ${result.message}`);
    }

    // Summary
    const passed = allResults.filter(r => r.passed).length;
    const failed = allResults.filter(r => !r.passed).length;
    const total = allResults.length;

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📊 Summary: ${passed}/${total} passed`);

    if (failed > 0) {
        console.log(`\n❌ Failed Routes (${failed}):`);
        allResults.filter(r => !r.passed).forEach(r => {
            console.log(`   • ${r.name} (${r.route})`);
            console.log(`     Status: ${r.status}, Message: ${r.message}`);
        });
        process.exit(1);
    } else {
        console.log(`\n✅ All routes passed!\n`);
        process.exit(0);
    }
}

// Run tests
runTests().catch(error => {
    console.error('Fatal error running smoke tests:', error);
    process.exit(1);
});
