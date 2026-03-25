#!/usr/bin/env tsx
/**
 * Deployment Verification Script
 *
 * Comprehensive pre-deployment and post-deployment checks for PsychAge v2
 *
 * Pre-deployment: Verifies build, env vars, and local functionality
 * Post-deployment: Tests production URL, API connectivity, and critical flows
 *
 * Usage:
 *   npm run verify:deployment              # Local verification
 *   npm run verify:deployment production   # Verify deployed site
 *   npm run verify:deployment https://psychage.vercel.app  # Custom URL
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn' | 'skip';
  message: string;
  details?: string;
}

class Colors {
  static reset = '\x1b[0m';
  static bright = '\x1b[1m';
  static red = '\x1b[31m';
  static green = '\x1b[32m';
  static yellow = '\x1b[33m';
  static blue = '\x1b[34m';
  static cyan = '\x1b[36m';
  static gray = '\x1b[90m';
}

function printResult(result: CheckResult) {
  const icon =
    result.status === 'pass'
      ? `${Colors.green}✓${Colors.reset}`
      : result.status === 'fail'
      ? `${Colors.red}✗${Colors.reset}`
      : result.status === 'warn'
      ? `${Colors.yellow}⚠${Colors.reset}`
      : `${Colors.gray}○${Colors.reset}`;

  console.log(`  ${icon} ${result.name}`);

  const messageColor =
    result.status === 'pass'
      ? Colors.green
      : result.status === 'fail'
      ? Colors.red
      : result.status === 'warn'
      ? Colors.yellow
      : Colors.gray;

  console.log(`     ${messageColor}${result.message}${Colors.reset}`);

  if (result.details) {
    console.log(`     ${Colors.gray}${result.details}${Colors.reset}`);
  }
}

function printHeader(title: string) {
  console.log(`\n${Colors.bright}${Colors.cyan}${title}${Colors.reset}`);
}

// ============================================================================
// PRE-DEPLOYMENT CHECKS
// ============================================================================

function checkEnvironmentVariables(): CheckResult[] {
  const results: CheckResult[] = [];
  const envPath = join(process.cwd(), '.env');

  if (!existsSync(envPath)) {
    return [
      {
        name: 'Environment File',
        status: 'fail',
        message: '.env file not found',
        details: 'Copy .env.example to .env and configure variables'
      }
    ];
  }

  const envContent = readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_SANITY_PROJECT_ID',
    'VITE_SANITY_DATASET'
  ];

  for (const varName of requiredVars) {
    const hasVar = envContent.includes(`${varName}=`) && !envContent.includes(`${varName}=your-`);
    results.push({
      name: varName,
      status: hasVar ? 'pass' : 'fail',
      message: hasVar ? 'Configured' : 'Not configured or using placeholder'
    });
  }

  // Optional but recommended
  const optionalVars = [
    { name: 'VITE_API_URL', purpose: 'Backend API connection' },
    { name: 'VITE_GEMINI_API_KEY', purpose: 'MindMate AI chatbot' }
  ];

  for (const { name, purpose } of optionalVars) {
    const hasVar = envContent.includes(`${name}=`) && !envContent.includes(`${name}=your-`);
    results.push({
      name,
      status: hasVar ? 'pass' : 'warn',
      message: hasVar ? 'Configured' : `Optional: ${purpose}`
    });
  }

  return results;
}

function checkBuildArtifacts(): CheckResult[] {
  const results: CheckResult[] = [];
  const distPath = join(process.cwd(), 'dist');

  if (!existsSync(distPath)) {
    return [
      {
        name: 'Build Artifacts',
        status: 'fail',
        message: 'dist/ folder not found',
        details: 'Run: npm run build'
      }
    ];
  }

  const requiredFiles = [
    'index.html',
    'assets',
    '.vite/manifest.json'
  ];

  for (const file of requiredFiles) {
    const filePath = join(distPath, file);
    const exists = existsSync(filePath);
    results.push({
      name: `dist/${file}`,
      status: exists ? 'pass' : 'fail',
      message: exists ? 'Present' : 'Missing'
    });
  }

  return results;
}

function checkVercelConfiguration(): CheckResult[] {
  const results: CheckResult[] = [];
  const vercelPath = join(process.cwd(), 'vercel.json');

  if (!existsSync(vercelPath)) {
    return [
      {
        name: 'vercel.json',
        status: 'warn',
        message: 'Not found (optional for most setups)',
        details: 'SPA routing may not work without manual configuration'
      }
    ];
  }

  const vercelConfig = JSON.parse(readFileSync(vercelPath, 'utf-8'));

  // Check rewrites for SPA routing
  const hasRewrites = vercelConfig.rewrites && Array.isArray(vercelConfig.rewrites);
  results.push({
    name: 'SPA Routing',
    status: hasRewrites ? 'pass' : 'warn',
    message: hasRewrites ? 'Configured' : 'No rewrites found'
  });

  // Check headers for security
  const hasHeaders = vercelConfig.headers && Array.isArray(vercelConfig.headers);
  results.push({
    name: 'Security Headers',
    status: hasHeaders ? 'pass' : 'warn',
    message: hasHeaders ? 'Configured' : 'Consider adding security headers'
  });

  return results;
}

function checkPackageDependencies(): CheckResult[] {
  const results: CheckResult[] = [];
  const packagePath = join(process.cwd(), 'package.json');

  if (!existsSync(packagePath)) {
    return [
      {
        name: 'package.json',
        status: 'fail',
        message: 'Not found',
        details: 'Invalid project structure'
      }
    ];
  }

  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

  // Check critical dependencies
  const criticalDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    '@supabase/supabase-js',
    'tailwindcss'
  ];

  for (const dep of criticalDeps) {
    const hasDepency = pkg.dependencies && pkg.dependencies[dep];
    results.push({
      name: dep,
      status: hasDepency ? 'pass' : 'fail',
      message: hasDepency ? `v${pkg.dependencies[dep]}` : 'Missing'
    });
  }

  return results;
}

// ============================================================================
// POST-DEPLOYMENT CHECKS
// ============================================================================

async function checkProductionURL(url: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  try {
    const startTime = Date.now();
    const response = await fetch(url);
    const responseTime = Date.now() - startTime;

    results.push({
      name: 'Homepage Accessibility',
      status: response.ok ? 'pass' : 'fail',
      message: response.ok ? `${response.status} (${responseTime}ms)` : `${response.status} ${response.statusText}`
    });

    if (response.ok) {
      const html = await response.text();

      // Check for key elements
      const checks = [
        { pattern: /<title>.*Psychage.*<\/title>/i, name: 'Page Title' },
        { pattern: /<div id="root">/i, name: 'React Root' },
        { pattern: /type="module"/i, name: 'ES Modules' }
      ];

      for (const check of checks) {
        const found = check.pattern.test(html);
        results.push({
          name: check.name,
          status: found ? 'pass' : 'warn',
          message: found ? 'Present' : 'Not found in HTML'
        });
      }
    }
  } catch (error) {
    results.push({
      name: 'Homepage Accessibility',
      status: 'fail',
      message: 'Failed to fetch',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  return results;
}

async function checkCriticalRoutes(baseUrl: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const routes = [
    '/',
    '/learn',
    '/find-care',
    '/tools',
    '/about',
    '/contact'
  ];

  for (const route of routes) {
    try {
      const response = await fetch(`${baseUrl}${route}`);
      results.push({
        name: route,
        status: response.ok ? 'pass' : 'fail',
        message: response.ok ? `${response.status}` : `${response.status} ${response.statusText}`
      });
    } catch (error) {
      results.push({
        name: route,
        status: 'fail',
        message: 'Failed to fetch',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}

async function checkBackendConnectivity(apiUrl: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  if (!apiUrl) {
    return [
      {
        name: 'Backend API',
        status: 'skip',
        message: 'VITE_API_URL not configured'
      }
    ];
  }

  try {
    const response = await fetch(`${apiUrl}/api/health`).catch(() => null);

    if (response && response.ok) {
      results.push({
        name: 'Backend Health',
        status: 'pass',
        message: 'API is reachable'
      });
    } else {
      results.push({
        name: 'Backend Health',
        status: 'warn',
        message: '/api/health endpoint not available',
        details: 'This is normal if backend is not yet deployed'
      });
    }
  } catch {
    results.push({
      name: 'Backend Health',
      status: 'warn',
      message: 'Backend not reachable',
      details: 'Frontend will fall back to Supabase → Mock data'
    });
  }

  return results;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function runPreDeploymentChecks() {
  printHeader('Pre-Deployment Checks');

  console.log('\n📦 Build Artifacts');
  const buildResults = checkBuildArtifacts();
  buildResults.forEach(printResult);

  console.log('\n🔐 Environment Variables');
  const envResults = checkEnvironmentVariables();
  envResults.forEach(printResult);

  console.log('\n📋 Package Dependencies');
  const depsResults = checkPackageDependencies();
  depsResults.forEach(printResult);

  console.log('\n⚙️  Vercel Configuration');
  const vercelResults = checkVercelConfiguration();
  vercelResults.forEach(printResult);

  const allResults = [...buildResults, ...envResults, ...depsResults, ...vercelResults];
  const failures = allResults.filter(r => r.status === 'fail').length;
  const warnings = allResults.filter(r => r.status === 'warn').length;

  return { failures, warnings };
}

async function runPostDeploymentChecks(url: string) {
  printHeader('Post-Deployment Checks');

  console.log(`\n🌐 Production URL: ${url}`);
  const urlResults = await checkProductionURL(url);
  urlResults.forEach(printResult);

  console.log('\n🛣️  Critical Routes');
  const routeResults = await checkCriticalRoutes(url);
  routeResults.forEach(printResult);

  console.log('\n🔌 Backend Connectivity');
  const apiUrl = process.env.VITE_API_URL || '';
  const backendResults = await checkBackendConnectivity(apiUrl);
  backendResults.forEach(printResult);

  const allResults = [...urlResults, ...routeResults, ...backendResults];
  const failures = allResults.filter(r => r.status === 'fail').length;
  const warnings = allResults.filter(r => r.status === 'warn').length;

  return { failures, warnings };
}

async function main() {
  console.log(`${Colors.cyan}${Colors.bright}`);
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║            PsychAge v2 - Deployment Verification              ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(Colors.reset);

  const mode = process.argv[2] || 'local';
  let productionUrl = '';

  if (mode === 'production' || mode.startsWith('http')) {
    productionUrl = mode.startsWith('http') ? mode : 'https://psychage.vercel.app';

    const { failures, warnings } = await runPostDeploymentChecks(productionUrl);

    console.log(`\n${Colors.bright}═══════════════════════════════════════════════════════════════${Colors.reset}`);
    console.log(`\n${Colors.bright}Summary:${Colors.reset}`);
    console.log(`  ${failures === 0 ? Colors.green : Colors.red}Failures: ${failures}${Colors.reset}`);
    console.log(`  ${warnings === 0 ? Colors.green : Colors.yellow}Warnings: ${warnings}${Colors.reset}`);

    if (failures === 0 && warnings === 0) {
      console.log(`\n${Colors.green}${Colors.bright}✓ All checks passed! Deployment is healthy.${Colors.reset}`);
    } else if (failures === 0) {
      console.log(`\n${Colors.yellow}${Colors.bright}⚠ Deployment is functional but has warnings.${Colors.reset}`);
    } else {
      console.log(`\n${Colors.red}${Colors.bright}✗ Deployment has failures that need attention.${Colors.reset}`);
    }
  } else {
    const { failures, warnings } = await runPreDeploymentChecks();

    console.log(`\n${Colors.bright}═══════════════════════════════════════════════════════════════${Colors.reset}`);
    console.log(`\n${Colors.bright}Summary:${Colors.reset}`);
    console.log(`  ${failures === 0 ? Colors.green : Colors.red}Failures: ${failures}${Colors.reset}`);
    console.log(`  ${warnings === 0 ? Colors.green : Colors.yellow}Warnings: ${warnings}${Colors.reset}`);

    if (failures === 0 && warnings === 0) {
      console.log(`\n${Colors.green}${Colors.bright}✓ Ready for deployment!${Colors.reset}`);
      console.log(`\nNext steps:`);
      console.log(`  ${Colors.cyan}1. Commit your changes: git add . && git commit -m "ready for deployment"${Colors.reset}`);
      console.log(`  ${Colors.cyan}2. Push to GitHub: git push origin main${Colors.reset}`);
      console.log(`  ${Colors.cyan}3. Vercel will auto-deploy${Colors.reset}`);
      console.log(`  ${Colors.cyan}4. Run: npm run verify:deployment production${Colors.reset}`);
    } else if (failures === 0) {
      console.log(`\n${Colors.yellow}${Colors.bright}⚠ Project has warnings but can be deployed.${Colors.reset}`);
      console.log(`\nConsider addressing warnings for optimal production setup.`);
    } else {
      console.log(`\n${Colors.red}${Colors.bright}✗ Fix failures before deploying.${Colors.reset}`);
    }
  }

  console.log('');
}

main().catch(error => {
  console.error(`${Colors.red}Fatal error:${Colors.reset}`, error);
  process.exit(1);
});
