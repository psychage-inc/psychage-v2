import { describe, it, expect } from 'vitest';
import { tools } from '@/data/tools';

/**
 * Route Integrity Tests
 *
 * Ensures all tools in the database have valid route mappings.
 * This prevents production issues where tools appear but link to '#'.
 */

// This should match the getToolLink function in ToolsPage.tsx and ToolsSection.tsx
const ROUTE_MAP: Record<number, string> = {
  1: '/clarity-score',
  2: '/tools/mood-journal',
  3: '/tools/sleep-architect',
  4: '#', // Breathwork - Coming soon
  5: '/providers',
  6: '/crisis',
  7: '/tools/symptom-navigator',
  8: '/tools/mindmate',
  9: '/tools/thought-reframer',
  10: '/tools/clarity-journal'
};

const _getToolLink = (toolId: number): string => {
  return ROUTE_MAP[toolId] || '#';
};

describe('Route Integrity', () => {
  it('all tools in database have route mappings (including # for coming soon)', () => {
    const toolsWithoutMappings = tools.filter(tool => {
      return ROUTE_MAP[tool.id] === undefined;
    });

    if (toolsWithoutMappings.length > 0) {
      const toolNames = toolsWithoutMappings.map(t => `${t.name} (id: ${t.id})`).join(', ');
      throw new Error(
        `The following tools lack route mappings: ${toolNames}\n` +
        `Add them to ROUTE_MAP in src/tests/routes.test.ts and update getToolLink() in:\n` +
        `- src/components/pages/ToolsPage.tsx\n` +
        `- src/components/home/ToolsSection.tsx`
      );
    }

    expect(toolsWithoutMappings).toHaveLength(0);
  });

  it('all route mappings point to valid paths', () => {
    const validPrefixes = ['/clarity-score', '/tools/', '/providers', '/crisis', '#'];

    Object.values(ROUTE_MAP).forEach(route => {
      const isValid = validPrefixes.some(prefix => route.startsWith(prefix));
      expect(isValid).toBe(true);
    });
  });

  it('no duplicate tool IDs exist', () => {
    const ids = tools.map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('route map covers all defined tools', () => {
    const definedToolIds = tools.map(t => t.id);
    const mappedToolIds = Object.keys(ROUTE_MAP).map(Number);

    const missingMappings = definedToolIds.filter(id => !mappedToolIds.includes(id));

    if (missingMappings.length > 0) {
      const missingTools = tools.filter(t => missingMappings.includes(t.id));
      const toolNames = missingTools.map(t => `${t.name} (id: ${t.id})`).join(', ');

      throw new Error(
        `Missing route mappings for: ${toolNames}\n` +
        `These tools exist in src/data/tools.ts but lack routes in ROUTE_MAP.`
      );
    }

    expect(missingMappings).toHaveLength(0);
  });
});
