#!/usr/bin/env tsx

/**
 * ARTICLE REWRITE PLAN GENERATOR
 * Identifies articles <1600 words and creates parallel-execution-ready expansion plans
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Read .env
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

for (const line of envContent.split('\n')) {
  const match = line.match(/^([A-Z_]+)=(.+)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Article {
  id: string;
  article_production_id: string;
  title: string;
  category: string;
  content: string;
  word_count: number;
  article_type: string;
}

interface ContentAnalysis {
  hasSections: boolean;
  sectionCount: number;
  hasLists: boolean;
  hasTables: boolean;
  hasCallouts: boolean;
  hasExamples: boolean;
  hasPracticalExercises: boolean;
  hasResearchCitations: boolean;
  structuralGaps: string[];
  contentGaps: string[];
}

interface ExpansionPlan {
  articleId: string;
  title: string;
  category: string;
  originalWordCount: number;
  targetWordCount: number;
  gapSummary: string[];
  proposedStructure: string[];
  expansionInstructions: string[];
  sectionsToExpand: string[];
  sectionsToAdd: string[];
  mandatoryAdditions: string[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(html: string): number {
  const text = stripHtml(html);
  if (!text) return 0;
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function analyzeContent(html: string): ContentAnalysis {
  const sections = html.match(/<h2/gi) || [];
  const subsections = html.match(/<h3/gi) || [];

  return {
    hasSections: sections.length > 0,
    sectionCount: sections.length + subsections.length,
    hasLists: /<ul|<ol/i.test(html),
    hasTables: /<table/i.test(html),
    hasCallouts: /callout|alert|notice|tip|warning/i.test(html),
    hasExamples: /example|for instance|such as|case study/i.test(html),
    hasPracticalExercises: /exercise|practice|try this|step-by-step|worksheet|tool|technique/i.test(html),
    hasResearchCitations: /study|research|found that|according to|meta-analysis/i.test(html),
    structuralGaps: [],
    contentGaps: [],
  };
}

function identifyGaps(analysis: ContentAnalysis, wordCount: number): { structural: string[]; content: string[] } {
  const structural: string[] = [];
  const content: string[] = [];

  // Structural gaps
  if (analysis.sectionCount < 4) structural.push('Insufficient section depth (need 4-6 H2 sections)');
  if (!analysis.hasLists) structural.push('No lists for scannable content');
  if (!analysis.hasCallouts) structural.push('No callout boxes for key insights');

  // Content gaps
  if (!analysis.hasPracticalExercises) content.push('CRITICAL: No practical exercises (mandatory)');
  if (!analysis.hasExamples) content.push('Lacks concrete examples');
  if (wordCount < 800) content.push('Severely underdeveloped (needs fundamental expansion)');
  else if (wordCount < 1200) content.push('Needs moderate depth expansion');

  return { structural, content };
}

function generateExpansionPlan(article: Article): ExpansionPlan {
  const actualWordCount = countWords(article.content);
  const analysis = analyzeContent(article.content);
  const gaps = identifyGaps(analysis, actualWordCount);

  // Determine target word count
  let targetWordCount = 1700; // Default mid-range
  if (actualWordCount < 500) targetWordCount = 1800;
  else if (actualWordCount < 800) targetWordCount = 1750;

  // Base sections all articles should have
  const baseStructure = [
    'H2: Introduction/Overview',
    'H2: Core Concept Explanation',
    'H2: Research & Evidence',
    'H2: Practical Application',
    'H2: Common Challenges/Misconceptions',
    'H2: When to Seek Professional Help',
  ];

  // Sections to add based on gaps
  const sectionsToAdd: string[] = [];
  if (!analysis.hasPracticalExercises) {
    sectionsToAdd.push('H2: Practical Exercises & Tools (MANDATORY)');
  }
  if (!analysis.hasExamples) {
    sectionsToAdd.push('H3: Real-World Examples (within existing sections)');
  }

  // Expansion instructions
  const instructions: string[] = [
    `Expand from ${actualWordCount} to ${targetWordCount} words`,
    'Preserve original title and core topic',
    'Add depth, not fluff',
    'Include 2-3 practical exercises (step-by-step)',
    'Add 3-5 concrete examples',
    'Include research citations (maintain 7+ citations)',
    'Ensure scannable structure (lists, callouts)',
  ];

  // Mandatory additions
  const mandatoryAdditions = [
    '📋 Practical Exercise Section: 2-3 actionable exercises with clear steps',
    '💡 3-5 Concrete Examples: Real scenarios illustrating concepts',
    '📊 Research Integration: Weave in studies naturally',
    '⚠️ Callout Boxes: 2-3 for key insights/warnings',
  ];

  return {
    articleId: article.article_production_id,
    title: article.title,
    category: article.category,
    originalWordCount: actualWordCount,
    targetWordCount,
    gapSummary: [...gaps.structural, ...gaps.content],
    proposedStructure: baseStructure,
    expansionInstructions: instructions,
    sectionsToExpand: analysis.sectionCount < 4 ? ['All sections need depth'] : ['Identified thin sections'],
    sectionsToAdd,
    mandatoryAdditions,
  };
}

async function main() {
  console.log('\n' + '='.repeat(120));
  console.log('ARTICLE REWRITE PLAN GENERATOR — SUB-1600 WORD ARTICLES');
  console.log('='.repeat(120));
  console.log();

  // Fetch all articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, article_production_id, title, category, content, word_count, article_type')
    .order('article_production_id');

  if (error || !articles) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📊 Total articles in database: ${articles.length}`);

  // Filter articles <1600 words
  const shortArticles: Article[] = [];
  for (const article of articles) {
    const actualWordCount = countWords(article.content || '');
    if (actualWordCount < 1600) {
      shortArticles.push({
        ...article,
        word_count: actualWordCount,
      });
    }
  }

  console.log(`🎯 Articles under 1600 words: ${shortArticles.length}`);
  console.log();

  // Generate expansion plans
  const plans: ExpansionPlan[] = shortArticles.map(generateExpansionPlan);

  // Calculate batch strategy
  const batchSize = 15;
  const batchCount = Math.ceil(plans.length / batchSize);
  const suggestedAgents = Math.min(batchCount, 10); // Max 10 parallel agents

  // ============================================================================
  // GLOBAL EXECUTION PLAN
  // ============================================================================

  console.log('='.repeat(120));
  console.log('GLOBAL EXECUTION PLAN');
  console.log('='.repeat(120));
  console.log();
  console.log(`📌 Total Articles to Rewrite:     ${shortArticles.length}`);
  console.log(`📌 Suggested Batch Size:          ${batchSize} articles/agent`);
  console.log(`📌 Estimated Parallel Agents:     ${suggestedAgents} agents`);
  console.log(`📌 Total Batches:                 ${batchCount} batches`);
  console.log();

  console.log('EXECUTION STRATEGY:');
  console.log('-'.repeat(120));
  console.log('1. Parallel Processing:');
  console.log(`   - Launch ${suggestedAgents} agents in parallel`);
  console.log(`   - Each agent processes ${batchSize} articles sequentially`);
  console.log('   - Agents operate independently (no shared state)');
  console.log();
  console.log('2. Consistency Guidelines:');
  console.log('   - All rewrites must preserve original title');
  console.log('   - Target: 1600-1800 words per article');
  console.log('   - Mandatory: Practical exercises section');
  console.log('   - Format: HTML with Tailwind classes (match existing)');
  console.log('   - Tone: Professional, empathetic, evidence-based');
  console.log();
  console.log('3. Validation Checklist (per article):');
  console.log('   ✅ Word count ≥1600 and ≤1800');
  console.log('   ✅ Has practical exercises section');
  console.log('   ✅ Has 3+ concrete examples');
  console.log('   ✅ Has 7+ research citations');
  console.log('   ✅ Original title preserved');
  console.log('   ✅ HTML format valid');
  console.log();

  // ============================================================================
  // DETAILED PLANS BY CATEGORY
  // ============================================================================

  console.log('='.repeat(120));
  console.log('REWRITE PLANS BY CATEGORY');
  console.log('='.repeat(120));
  console.log();

  // Group by category
  const byCategory = new Map<string, ExpansionPlan[]>();
  for (const plan of plans) {
    const catMatch = plan.articleId.match(/^CAT(\d+)-/);
    const catNum = catMatch ? `Category ${catMatch[1]}` : 'Unknown';
    if (!byCategory.has(catNum)) {
      byCategory.set(catNum, []);
    }
    byCategory.get(catNum)!.push(plan);
  }

  // Output by category
  for (const [category, categoryPlans] of Array.from(byCategory.entries()).sort()) {
    console.log(`\n${'━'.repeat(120)}`);
    console.log(`${category.toUpperCase()} — ${categoryPlans.length} articles`);
    console.log('━'.repeat(120));

    for (const plan of categoryPlans) {
      console.log();
      console.log(`┌─ ${plan.articleId} ─────────────────────────────────────────────────────`);
      console.log(`│ TITLE: ${plan.title}`);
      console.log(`│ WORDS: ${plan.originalWordCount} → ${plan.targetWordCount} (+${plan.targetWordCount - plan.originalWordCount})`);
      console.log(`│`);
      console.log(`│ GAP SUMMARY:`);
      for (const gap of plan.gapSummary) {
        console.log(`│   • ${gap}`);
      }
      console.log(`│`);
      console.log(`│ MANDATORY ADDITIONS:`);
      for (const addition of plan.mandatoryAdditions) {
        console.log(`│   ${addition}`);
      }
      console.log(`│`);
      console.log(`│ PROPOSED STRUCTURE:`);
      for (const section of plan.proposedStructure) {
        console.log(`│   ${section}`);
      }
      if (plan.sectionsToAdd.length > 0) {
        console.log(`│   + ADD: ${plan.sectionsToAdd.join(', ')}`);
      }
      console.log(`│`);
      console.log(`│ EXPANSION INSTRUCTIONS:`);
      for (const instruction of plan.expansionInstructions) {
        console.log(`│   → ${instruction}`);
      }
      console.log(`└${'─'.repeat(118)}`);
    }
  }

  // ============================================================================
  // BATCH ASSIGNMENTS
  // ============================================================================

  console.log('\n\n' + '='.repeat(120));
  console.log('BATCH ASSIGNMENTS FOR PARALLEL EXECUTION');
  console.log('='.repeat(120));
  console.log();

  for (let i = 0; i < batchCount; i++) {
    const start = i * batchSize;
    const end = Math.min(start + batchSize, plans.length);
    const batchPlans = plans.slice(start, end);

    console.log(`\n${'▓'.repeat(120)}`);
    console.log(`BATCH ${i + 1} — ${batchPlans.length} articles (Agent ${i + 1})`);
    console.log('▓'.repeat(120));

    for (const plan of batchPlans) {
      console.log(`  ${plan.articleId.padEnd(12)} | ${plan.originalWordCount.toString().padStart(4)}→${plan.targetWordCount.toString().padStart(4)} words | ${plan.title.substring(0, 70)}`);
    }
  }

  // ============================================================================
  // EXPORT JSON FOR AGENT CONSUMPTION
  // ============================================================================

  const exportData = {
    metadata: {
      totalArticles: shortArticles.length,
      batchSize,
      batchCount,
      suggestedAgents,
      generatedAt: new Date().toISOString(),
    },
    batches: Array.from({ length: batchCount }, (_, i) => {
      const start = i * batchSize;
      const end = Math.min(start + batchSize, plans.length);
      return {
        batchId: i + 1,
        articles: plans.slice(start, end).map(p => ({
          articleId: p.articleId,
          title: p.title,
          category: p.category,
          originalWordCount: p.originalWordCount,
          targetWordCount: p.targetWordCount,
          gapSummary: p.gapSummary,
          proposedStructure: p.proposedStructure,
          mandatoryAdditions: p.mandatoryAdditions,
          expansionInstructions: p.expansionInstructions,
        })),
      };
    }),
  };

  const jsonPath = path.join(process.cwd(), 'rewrite-plan.json');
  fs.writeFileSync(jsonPath, JSON.stringify(exportData, null, 2));

  console.log('\n\n' + '='.repeat(120));
  console.log('EXPORT COMPLETE');
  console.log('='.repeat(120));
  console.log(`✅ JSON export: ${jsonPath}`);
  console.log(`✅ Ready for parallel agent execution`);
  console.log('='.repeat(120));
  console.log();
}

main();
