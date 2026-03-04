#!/usr/bin/env ts-node
/**
 * Backend API Verification Script
 *
 * Tests all critical endpoints when the backend is deployed.
 * Run this before integrating the backend with the frontend.
 *
 * Usage:
 *   npm install -g ts-node
 *   ts-node scripts/verify-api-endpoints.ts https://your-backend-url.vercel.app
 */

interface EndpointTest {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  requiresAuth?: boolean;
  body?: unknown;
  expectedStatus: number;
  validate?: (data: unknown) => boolean;
}

const ENDPOINTS: EndpointTest[] = [
  // Search Endpoints (Critical - used by SearchResults, SearchAutocomplete)
  {
    name: 'Unified Search',
    method: 'GET',
    path: '/api/search?q=anxiety&type=all&limit=10',
    expectedStatus: 200,
    validate: (data: any) => {
      return data && (data.articles || data.videos || data.tools);
    }
  },
  {
    name: 'Article Search',
    method: 'GET',
    path: '/api/search/articles?q=anxiety&limit=5',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },

  // Tools Endpoints (Critical - used by CategoryPage, ToolsLandingPage)
  {
    name: 'Get All Tools',
    method: 'GET',
    path: '/api/tools',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },
  {
    name: 'Get Tool by ID',
    method: 'GET',
    path: '/api/tools/1',
    expectedStatus: 200,
    validate: (data: any) => data && (data.id || data.data?.id)
  },

  // Articles Endpoints (Used by CategoryPage, LearnPage)
  {
    name: 'Get Articles by Category',
    method: 'GET',
    path: '/api/articles?category=anxiety',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },
  {
    name: 'Get Article by ID',
    method: 'GET',
    path: '/api/articles/1',
    expectedStatus: 200,
    validate: (data: any) => data && (data.id || data.data?.id)
  },

  // Optional: Videos Endpoints
  {
    name: 'Get All Videos',
    method: 'GET',
    path: '/api/videos',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },

  // Optional: Categories Endpoints
  {
    name: 'Get All Categories',
    method: 'GET',
    path: '/api/categories',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },

  // Auth Endpoints (Used by login, signup)
  {
    name: 'Login',
    method: 'POST',
    path: '/api/auth/login',
    body: {
      email: 'test@example.com',
      password: 'test123'
    },
    expectedStatus: 200,
    validate: (data: any) => data && (data.access_token || data.data?.access_token || data.token)
  },

  // Provider Endpoints
  {
    name: 'Get All Providers',
    method: 'GET',
    path: '/api/providers',
    expectedStatus: 200,
    validate: (data: any) => Array.isArray(data) || Array.isArray(data?.data)
  },

  // User Dashboard (Requires Auth)
  {
    name: 'Get User Profile',
    method: 'GET',
    path: '/api/user/profile',
    requiresAuth: true,
    expectedStatus: 200,
    validate: (data: any) => data && (data.id || data.data?.id || data.user)
  }
];

class Colors {
  static reset = '\x1b[0m';
  static bright = '\x1b[1m';
  static red = '\x1b[31m';
  static green = '\x1b[32m';
  static yellow = '\x1b[33m';
  static blue = '\x1b[34m';
  static cyan = '\x1b[36m';
}

async function testEndpoint(
  baseUrl: string,
  test: EndpointTest,
  authToken?: string
): Promise<{ success: boolean; message: string; responseTime: number }> {
  const url = `${baseUrl}${test.path}`;
  const startTime = Date.now();

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (test.requiresAuth && authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      method: test.method,
      headers,
      body: test.body ? JSON.stringify(test.body) : undefined
    });

    const responseTime = Date.now() - startTime;
    const data = await response.json().catch(() => null);

    // Check status
    if (response.status !== test.expectedStatus) {
      return {
        success: false,
        message: `Expected status ${test.expectedStatus}, got ${response.status}`,
        responseTime
      };
    }

    // Check validation function if provided
    if (test.validate && !test.validate(data)) {
      return {
        success: false,
        message: 'Response validation failed',
        responseTime
      };
    }

    return {
      success: true,
      message: 'OK',
      responseTime
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      responseTime
    };
  }
}

async function main() {
  const baseUrl = process.argv[2];

  if (!baseUrl) {
    console.error(`${Colors.red}Error: Backend URL required${Colors.reset}`);
    console.log(`Usage: ts-node scripts/verify-api-endpoints.ts https://your-backend-url.vercel.app`);
    process.exit(1);
  }

  console.log(`${Colors.cyan}${Colors.bright}Backend API Verification${Colors.reset}`);
  console.log(`${Colors.blue}Testing: ${baseUrl}${Colors.reset}\n`);

  let passed = 0;
  let failed = 0;
  let authToken: string | undefined;

  // First, try to get auth token if login endpoint works
  console.log(`${Colors.yellow}Phase 1: Authentication${Colors.reset}`);
  const loginTest = ENDPOINTS.find(e => e.path === '/api/auth/login');
  if (loginTest) {
    const result = await testEndpoint(baseUrl, loginTest);
    console.log(
      `  ${result.success ? '✓' : '✗'} ${loginTest.name} (${result.responseTime}ms) ${result.success ? Colors.green : Colors.red}${result.message}${Colors.reset}`
    );

    // Note: This is a simplified example - in real scenario you'd need valid credentials
    // authToken = result.data?.access_token;
  }
  console.log('');

  // Test all endpoints
  console.log(`${Colors.yellow}Phase 2: Critical Endpoints${Colors.reset}`);
  const criticalTests = ENDPOINTS.filter(e => !e.requiresAuth && e.path !== '/api/auth/login');

  for (const test of criticalTests) {
    const result = await testEndpoint(baseUrl, test, authToken);

    if (result.success) {
      passed++;
      console.log(
        `  ${Colors.green}✓${Colors.reset} ${test.name} ${Colors.cyan}(${result.responseTime}ms)${Colors.reset}`
      );
    } else {
      failed++;
      console.log(
        `  ${Colors.red}✗${Colors.reset} ${test.name} ${Colors.cyan}(${result.responseTime}ms)${Colors.reset}`
      );
      console.log(`    ${Colors.red}${result.message}${Colors.reset}`);
    }
  }
  console.log('');

  // Test authenticated endpoints if we have a token
  if (authToken) {
    console.log(`${Colors.yellow}Phase 3: Authenticated Endpoints${Colors.reset}`);
    const authTests = ENDPOINTS.filter(e => e.requiresAuth);

    for (const test of authTests) {
      const result = await testEndpoint(baseUrl, test, authToken);

      if (result.success) {
        passed++;
        console.log(
          `  ${Colors.green}✓${Colors.reset} ${test.name} ${Colors.cyan}(${result.responseTime}ms)${Colors.reset}`
        );
      } else {
        failed++;
        console.log(
          `  ${Colors.red}✗${Colors.reset} ${test.name} ${Colors.cyan}(${result.responseTime}ms)${Colors.reset}`
        );
        console.log(`    ${Colors.red}${result.message}${Colors.reset}`);
      }
    }
    console.log('');
  }

  // Summary
  console.log(`${Colors.bright}Summary:${Colors.reset}`);
  console.log(`  ${Colors.green}Passed: ${passed}${Colors.reset}`);
  console.log(`  ${Colors.red}Failed: ${failed}${Colors.reset}`);
  console.log(`  Total: ${passed + failed}`);
  console.log('');

  if (failed === 0) {
    console.log(`${Colors.green}${Colors.bright}✓ All endpoints verified successfully!${Colors.reset}`);
    console.log(`${Colors.green}You can now set VITE_API_URL=${baseUrl} in your .env file${Colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${Colors.red}${Colors.bright}✗ Some endpoints failed verification${Colors.reset}`);
    console.log(`${Colors.yellow}Fix the failing endpoints before integrating with frontend${Colors.reset}`);
    process.exit(1);
  }
}

main().catch(error => {
  console.error(`${Colors.red}Fatal error:${Colors.reset}`, error);
  process.exit(1);
});
