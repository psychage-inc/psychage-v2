/**
 * Psychage Article Quality Audit Script
 *
 * Audits every article in Supabase against PEAF quality standards.
 * Generates a quality report with word count classification, readability,
 * citation counts, and section completeness.
 *
 * Usage:
 *   npx tsx src/scripts/article-audit.ts                    # Audit all articles
 *   npx tsx src/scripts/article-audit.ts --category 1       # Single category
 *   npx tsx src/scripts/article-audit.ts --flag-rewrites    # Auto-flag articles needing rewrite
 *   npx tsx src/scripts/article-audit.ts --output json      # Output format: table (default), json, csv
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

// ---------------------------------------------------------------------------
// Supabase client
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------------------------------------------------------------------
// Readability (inline to avoid Vite import issues with PEAF modules)
// ---------------------------------------------------------------------------

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 2) return 1;

  let count = 0;
  const vowels = 'aeiouy';
  let prevVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Silent e
  if (w.endsWith('e') && !w.endsWith('le') && count > 1) count--;
  // -ed endings (not creating syllable)
  if (w.endsWith('ed') && w.length > 3 && !w.endsWith('ted') && !w.endsWith('ded')) count--;

  return Math.max(1, count);
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getWords(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

function getSentences(text: string): string[] {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
}

interface ReadabilityInfo {
  wordCount: number;
  sentenceCount: number;
  fleschKincaidGrade: number;
  fleschReadingEase: number;
  avgWordsPerSentence: number;
}

function analyzeReadability(text: string): ReadabilityInfo {
  const words = getWords(text);
  const sentences = getSentences(text);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

  const fleschReadingEase =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschKincaidGrade =
    0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  return {
    wordCount,
    sentenceCount,
    fleschKincaidGrade: Math.round(fleschKincaidGrade * 10) / 10,
    fleschReadingEase: Math.round(fleschReadingEase * 10) / 10,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
  };
}

// ---------------------------------------------------------------------------
// Status classification
// ---------------------------------------------------------------------------

type QualityTier = 'CRITICAL' | 'FAILING' | 'BELOW_STANDARD' | 'PASSING';

function classifyWordCount(wordCount: number): QualityTier {
  if (wordCount < 500) return 'CRITICAL';
  if (wordCount < 1500) return 'FAILING';
  if (wordCount < 2000) return 'BELOW_STANDARD';
  return 'PASSING';
}

const TIER_COLORS: Record<QualityTier, string> = {
  CRITICAL: '\x1b[31m',     // red
  FAILING: '\x1b[33m',      // yellow
  BELOW_STANDARD: '\x1b[36m', // cyan
  PASSING: '\x1b[32m',      // green
};
const RESET = '\x1b[0m';

// ---------------------------------------------------------------------------
// Section detection
// ---------------------------------------------------------------------------

interface SectionPresence {
  hasSummary: boolean;
  hasKeyFacts: boolean;
  hasExercise: boolean;
  hasCitations: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  hasDisclaimer: boolean;
}

function detectSections(
  content: string,
  article: Record<string, unknown>,
): SectionPresence {
  const lower = content.toLowerCase();
  return {
    hasSummary: !!(article.seo_description || lower.includes('summary') || lower.includes('overview')),
    hasKeyFacts: lower.includes('key fact') || lower.includes('key point') || lower.includes('did you know'),
    hasExercise: lower.includes('exercise') || lower.includes('try this') || lower.includes('practice'),
    hasCitations: (article.citation_count as number) > 0 || lower.includes('[1]') || lower.includes('reference'),
    hasVideo: article.video_status === 'published',
    hasAudio: article.audio_status === 'published' || article.audio_status === 'recorded',
    hasDisclaimer: lower.includes('disclaimer') || lower.includes('not a substitute') || lower.includes('professional advice'),
  };
}

// ---------------------------------------------------------------------------
// Audit result type
// ---------------------------------------------------------------------------

interface AuditResult {
  id: string;
  article_id: string;
  title: string;
  category: string;
  wordCount: number;
  tier: QualityTier;
  gradeLevel: number;
  readingEase: number;
  citationCount: number;
  sections: SectionPresence;
  videoStatus: string;
  audioStatus: string;
  rewriteStatus: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Main audit
// ---------------------------------------------------------------------------

async function runAudit(options: {
  category?: number;
  flagRewrites: boolean;
  output: 'table' | 'json' | 'csv';
}) {
  console.log('\n🔍 Psychage Article Quality Audit\n');
  console.log(`   Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`   Output: ${options.output}`);
  if (options.category) console.log(`   Category filter: ${options.category}`);
  console.log('');

  // Fetch all articles
  let query = supabase
    .from('articles')
    .select('*')
    .order('article_id', { ascending: true });

  if (options.category) {
    const catPrefix = `CAT${String(options.category).padStart(2, '0')}`;
    query = query.like('article_id', `${catPrefix}%`);
  }

  const { data: articles, error } = await query;

  if (error) {
    console.error('Error fetching articles:', error.message);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log('No articles found.');
    process.exit(0);
  }

  console.log(`   Found ${articles.length} articles to audit\n`);

  // Process each article
  const results: AuditResult[] = [];
  const rewriteIds: string[] = [];

  for (const article of articles) {
    const plainText = stripHtml(article.content || '');
    const readability = analyzeReadability(plainText);
    const tier = classifyWordCount(readability.wordCount);
    const sections = detectSections(plainText, article);

    const result: AuditResult = {
      id: article.id,
      article_id: article.article_id || '',
      title: (article.title || '').slice(0, 60),
      category: article.category_id || '',
      wordCount: readability.wordCount,
      tier,
      gradeLevel: readability.fleschKincaidGrade,
      readingEase: readability.fleschReadingEase,
      citationCount: article.citation_count || 0,
      sections,
      videoStatus: article.video_status || 'none',
      audioStatus: article.audio_status || 'tts_only',
      rewriteStatus: article.rewrite_status || 'not_needed',
      status: article.status || 'draft',
    };

    results.push(result);

    if (tier !== 'PASSING' && article.rewrite_status !== 'complete') {
      rewriteIds.push(article.id);
    }
  }

  // Sort by word count ascending (worst first)
  results.sort((a, b) => a.wordCount - b.wordCount);

  // ---------------------------------------------------------------------------
  // Summary stats
  // ---------------------------------------------------------------------------
  const tierCounts: Record<QualityTier, number> = {
    CRITICAL: 0,
    FAILING: 0,
    BELOW_STANDARD: 0,
    PASSING: 0,
  };
  let totalWords = 0;
  let videoPublished = 0;
  let audioAvailable = 0;

  for (const r of results) {
    tierCounts[r.tier]++;
    totalWords += r.wordCount;
    if (r.videoStatus === 'published') videoPublished++;
    if (r.audioStatus === 'published' || r.audioStatus === 'recorded') audioAvailable++;
  }

  const avgWords = Math.round(totalWords / results.length);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('                      QUALITY SUMMARY                          ');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Total articles:    ${results.length}`);
  console.log(`  Average words:     ${avgWords}`);
  console.log('');
  console.log(`  ${TIER_COLORS.PASSING}PASSING (2000+):     ${tierCounts.PASSING}${RESET}`);
  console.log(`  ${TIER_COLORS.BELOW_STANDARD}BELOW STANDARD:      ${tierCounts.BELOW_STANDARD}${RESET}`);
  console.log(`  ${TIER_COLORS.FAILING}FAILING (500-1499):  ${tierCounts.FAILING}${RESET}`);
  console.log(`  ${TIER_COLORS.CRITICAL}CRITICAL (<500):     ${tierCounts.CRITICAL}${RESET}`);
  console.log('');
  console.log(`  Video published:   ${videoPublished}/${results.length} (${Math.round((videoPublished / results.length) * 100)}%)`);
  console.log(`  Audio available:   ${audioAvailable}/${results.length} (${Math.round((audioAvailable / results.length) * 100)}%)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // ---------------------------------------------------------------------------
  // Output
  // ---------------------------------------------------------------------------
  if (options.output === 'table') {
    // Console table
    console.log(
      'ID'.padEnd(12) +
        'Title'.padEnd(50) +
        'Words'.padStart(7) +
        '  Tier'.padEnd(18) +
        'Grade'.padStart(7) +
        'Cites'.padStart(7) +
        'Video'.padStart(10) +
        'Rewrite'.padStart(12),
    );
    console.log('─'.repeat(123));

    for (const r of results) {
      const color = TIER_COLORS[r.tier];
      console.log(
        r.article_id.padEnd(12) +
          r.title.padEnd(50) +
          String(r.wordCount).padStart(7) +
          `  ${color}${r.tier.padEnd(16)}${RESET}` +
          String(r.gradeLevel).padStart(7) +
          String(r.citationCount).padStart(7) +
          r.videoStatus.padStart(10) +
          r.rewriteStatus.padStart(12),
      );
    }
  }

  // Write JSON
  const outputDir = path.resolve(__dirname, '../..');
  const jsonPath = path.join(outputDir, 'audit-results.json');
  const jsonOutput = {
    auditDate: new Date().toISOString(),
    totalArticles: results.length,
    summary: {
      avgWordCount: avgWords,
      tiers: tierCounts,
      videoPublished,
      audioAvailable,
    },
    articles: results,
  };
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`\n  JSON report: ${jsonPath}`);

  // Write CSV
  const csvPath = path.join(outputDir, 'audit-results.csv');
  const csvHeader =
    'article_id,title,word_count,tier,grade_level,reading_ease,citation_count,video_status,audio_status,rewrite_status,status,has_summary,has_key_facts,has_exercise,has_citations,has_disclaimer';
  const csvRows = results.map(
    (r) =>
      [
        r.article_id,
        `"${r.title.replace(/"/g, '""')}"`,
        r.wordCount,
        r.tier,
        r.gradeLevel,
        r.readingEase,
        r.citationCount,
        r.videoStatus,
        r.audioStatus,
        r.rewriteStatus,
        r.status,
        r.sections.hasSummary ? 'Y' : 'N',
        r.sections.hasKeyFacts ? 'Y' : 'N',
        r.sections.hasExercise ? 'Y' : 'N',
        r.sections.hasCitations ? 'Y' : 'N',
        r.sections.hasDisclaimer ? 'Y' : 'N',
      ].join(','),
  );
  fs.writeFileSync(csvPath, [csvHeader, ...csvRows].join('\n'));
  console.log(`  CSV report:  ${csvPath}`);

  // ---------------------------------------------------------------------------
  // Flag rewrites (optional)
  // ---------------------------------------------------------------------------
  if (options.flagRewrites && rewriteIds.length > 0) {
    console.log(`\n  Flagging ${rewriteIds.length} articles for rewrite...`);

    const { error: updateError } = await supabase
      .from('articles')
      .update({
        rewrite_needed: true,
        rewrite_status: 'flagged',
        last_quality_audit: new Date().toISOString(),
      })
      .in('id', rewriteIds);

    if (updateError) {
      console.error('  Error flagging rewrites:', updateError.message);
    } else {
      console.log(`  Flagged ${rewriteIds.length} articles for rewrite.`);
    }
  }

  // Update audit timestamp on all articles
  const { error: auditError } = await supabase
    .from('articles')
    .update({ last_quality_audit: new Date().toISOString() })
    .in(
      'id',
      results.map((r) => r.id),
    );

  if (auditError) {
    console.error('  Error updating audit timestamps:', auditError.message);
  }

  console.log('\n  Audit complete.\n');
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const categoryIdx = args.indexOf('--category');
const outputIdx = args.indexOf('--output');

runAudit({
  category: categoryIdx >= 0 ? parseInt(args[categoryIdx + 1], 10) : undefined,
  flagRewrites: args.includes('--flag-rewrites'),
  output: (outputIdx >= 0 ? args[outputIdx + 1] : 'table') as 'table' | 'json' | 'csv',
});
