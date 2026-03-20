#!/usr/bin/env tsx
/**
 * Route Verification Script
 *
 * Runs before production builds to ensure all tools have valid route mappings.
 * Prevents deployment of incomplete features.
 *
 * Usage: npm run verify:routes
 */

import { tools } from '../src/data/tools';

const ROUTE_MAP: Record<number, string> = {
  1: '/clarity-score',
  2: '/tools/mood-journal',
  3: '/tools/sleep-architect',
  4: '#', // Breathwork - Coming soon
  5: '/find-care',
  6: '/crisis',
  7: '/tools/symptom-navigator',
  8: '/tools/mindmate',
  10: '/tools/clarity-journal',
  11: '/tools/relationship-health',
  12: '/tools/medication-tracker'
};

function verifyRoutes(): void {
  console.log('🔍 Verifying route mappings...\n');

  let hasErrors = false;

  // Check 1: All tools have routes (including '#' for coming soon)
  const toolsWithoutRoutes = tools.filter(t => ROUTE_MAP[t.id] === undefined);
  if (toolsWithoutRoutes.length > 0) {
    hasErrors = true;
    console.error('❌ Tools missing route mappings:');
    toolsWithoutRoutes.forEach(tool => {
      console.error(`   - ${tool.name} (id: ${tool.id})`);
    });
    console.error('\n   Update ROUTE_MAP in:');
    console.error('   - scripts/verify-routes.ts');
    console.error('   - src/tests/routes.test.ts');
    console.error('   - src/components/pages/ToolsPage.tsx (getToolLink)');
    console.error('   - src/components/home/ToolsSection.tsx (getToolLink)\n');
  }

  // Check 2: All route mappings have corresponding tools
  const mappedIds = Object.keys(ROUTE_MAP).map(Number);
  const toolIds = tools.map(t => t.id);
  const orphanedMappings = mappedIds.filter(id => !toolIds.includes(id));

  if (orphanedMappings.length > 0) {
    hasErrors = true;
    console.error('⚠️  Route mappings for non-existent tools:');
    orphanedMappings.forEach(id => {
      console.error(`   - Tool ID ${id} → ${ROUTE_MAP[id]}`);
    });
    console.error('   Remove these from ROUTE_MAP or add tools to src/data/tools.ts\n');
  }

  // Check 3: Duplicate tool IDs
  const duplicateIds = toolIds.filter((id, index) => toolIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    hasErrors = true;
    console.error('❌ Duplicate tool IDs detected:');
    duplicateIds.forEach(id => {
      const duplicates = tools.filter(t => t.id === id);
      console.error(`   - ID ${id}: ${duplicates.map(t => t.name).join(', ')}`);
    });
    console.error('');
  }

  // Summary
  if (hasErrors) {
    console.error('❌ Route verification failed!\n');
    console.error('Fix the issues above before deploying to production.\n');
    process.exit(1);
  } else {
    console.log('✅ All tools have valid routes');
    console.log(`✅ ${tools.length} tools verified`);
    console.log(`✅ ${Object.keys(ROUTE_MAP).length} route mappings validated\n`);
  }
}

// Run verification
verifyRoutes();
