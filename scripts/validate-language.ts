/**
 * Language Compliance Validator
 *
 * Build-time script that scans all user-facing strings in the navigator
 * codebase for prohibited diagnostic language.
 *
 * Usage: npx tsx scripts/validate-language.ts
 *
 * Exit code 0 = pass, 1 = violations found
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname (repo is "type": "module").
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROHIBITED_PHRASES = [
  'you have',
  'you are diagnosed',
  'diagnosis:',
  'you suffer from',
  'you are suffering from',
  'your condition is',
  'this confirms',
  'this proves',
  'you definitely have',
  'clinical diagnosis',
  'we can confirm',
  'test results show you have',
  'based on your results, you have',
  'you meet the criteria for',
  'positive for',
  'negative for',
  'diagnostic result',
  'your diagnosis',
  'diagnosed with',
  'prescription',
  'prescribe',
  'take this medication',
  'you need medication',
  'guaranteed',
  '100% accurate',
  'certainty',
  'with certainty',
  'conclusive',
  'definitive diagnosis',
  'confirmed diagnosis',
];

// Directories to scan.
// Covers user-facing interactive/UI surfaces (SR-3 prohibited-diagnostic-language
// gate). src/lib is a superset of the original src/lib/navigator. The src/data
// article corpus is deliberately excluded: it is long-form educational prose
// (e.g. "diagnosed with cancer" in narrative case studies), not result/assessment
// surfaces, and scanning it floods the gate with false positives.
const SCAN_DIRS = [
  'src/components',
  'src/features',
  'src/pages',
  'src/lib',
  'supabase/migrations',
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.sql'];

/**
 * Compile each prohibited phrase into a word-boundary-aware regex so that a
 * phrase only matches as a whole word, not as a substring of a larger word.
 * Without this, "certainty" matches "uncertainty", "you have" matches
 * "you haven't", and "prescribe" matches "prescribed" — all false positives.
 * Boundaries are only enforced on the alphanumeric edges of the phrase, so
 * phrases ending in punctuation (e.g. "diagnosis:") still match correctly.
 */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function compilePhrase(phrase: string): RegExp {
  const body = escapeRegex(phrase);
  const lead = /[A-Za-z0-9]/.test(phrase[0]) ? '(?<![A-Za-z0-9])' : '';
  const tail = /[A-Za-z0-9]/.test(phrase[phrase.length - 1]) ? '(?![A-Za-z0-9])' : '';
  return new RegExp(`${lead}${body}${tail}`, 'i');
}

const COMPILED_PHRASES: Array<{ phrase: string; regex: RegExp }> = PROHIBITED_PHRASES.map(
  (phrase) => ({ phrase, regex: compilePhrase(phrase) })
);

// Documented false-positive allowlist. Each entry is an EXACT (case-insensitive)
// substring of a known-benign line. This does NOT weaken PROHIBITED_PHRASES — the
// policy list is untouched; these suppress specific confirmed false positives where
// a prohibited phrase appears in benign prose/data the matcher cannot semantically
// distinguish from a real diagnostic claim. Exact-string matching keeps it safe: if
// the surrounding copy ever changes (e.g. to an actual "you have [condition]" claim),
// the substring no longer matches and the gate flags it again.
const FALSE_POSITIVE_ALLOWLIST: Array<{ match: string; reason: string }> = [
  // User-facing UI: benign declarative "you have" / a feature label
  { match: 'prescription refill', reason: 'messaging category label' },
  { match: 'comfort you have access to', reason: 'gratitude journal prompt' },
  { match: 'you have a solid foundation', reason: 'Clarity Score encouragement copy' },
  { match: 'you have strengths in', reason: 'Relationship Health Check result copy' },
  { match: 'you have meaningful connections', reason: 'Relationship Health Check result copy' },
  { match: 'you have unsaved changes', reason: 'admin discard-changes confirm dialog' },
  { match: 'you have 30 days to cancel', reason: 'account-deletion toast' },
  // Navigator clinical seed data
  { match: 'need for certainty', reason: 'OCD symptom description (clinical noun, not a tool claim)' },
  { match: 'more items than you have space for', reason: 'hoarding screening question' },
  // Provider taxonomy reference data
  { match: 'can prescribe medication', reason: 'psychiatrist taxonomy description (factual)' },
  // Article-metadata seeds: editorial titles, slugs, keyword tags, descriptions
  { match: 'after a real diagnosis:', reason: 'editorial article title' },
  { match: 'navigating a mental health diagnosis', reason: 'editorial article title' },
  { match: 'identity after diagnosis', reason: 'editorial article title' },
  { match: 'prescription medications', reason: 'article keyword tag' },
  { match: 'prescription medication misuse', reason: 'article description (academic)' },
  { match: 'prescription management', reason: 'article keyword tag' },
  { match: 'prescription apps', reason: 'article keyword tag' },
  { match: 'prescription digital therapeutics', reason: 'article description (academic)' },
  { match: 'prescription drug misuse', reason: 'article description (academic)' },
  { match: 'guaranteed meaning', reason: 'editorial article title (Camus)' },
  { match: 'guaranteed-meaning', reason: 'editorial article slug (Camus)' },
];

// Patterns to ignore (these are the prohibited list definition itself, test files, etc.)
// The SR-3 *enforcement* twins are also ignored: they define/check the same phrase
// list at runtime (or map them to recommended phrasing), so they enumerate the
// prohibited terms by design — exactly like validate-language.ts itself.
const IGNORE_PATTERNS = [
  'validate-language.ts',
  'PROHIBITED_PHRASES',
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
  // SR-3 enforcement / language-policy definitions
  'navigator/utils.ts', // runtime prohibited-phrase validator + disclaimer copy
  'ai/safety.ts', // AI safety classifier phrase definitions
  'ai/llm.ts', // AI system-prompt safety language
  'article-framework/constants.ts', // sensitivity map whose suggestions are the recommended phrasing
];

interface Violation {
  file: string;
  line: number;
  phrase: string;
  context: string;
}

function scanFile(filePath: string): Violation[] {
  const violations: Violation[] = [];

  // Skip ignored files
  if (IGNORE_PATTERNS.some((p) => filePath.includes(p))) {
    return violations;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();

    // Skip comment-only lines that reference the prohibited list
    if (lineLower.includes('prohibited') && (line.trim().startsWith('//') || line.trim().startsWith('*'))) {
      continue;
    }

    // Skip SQL line comments (e.g. migration policy notes describing the gate).
    if (line.trim().startsWith('--')) {
      continue;
    }

    // Skip academic citation-title rows in SQL seeds: these insert peer-reviewed /
    // government source titles (e.g. "Differential diagnosis: ..."), which are
    // scholarly references, not user-facing diagnostic claims.
    if (/'(peer_reviewed|government|professional_org|textbook|clinical_guideline|reference)'/.test(lineLower)) {
      continue;
    }

    for (const { phrase, regex } of COMPILED_PHRASES) {
      const match = regex.exec(line);
      if (match) {
        // Interrogative screening questions ("Do you have...?", "Did you have...?")
        // are the correct, non-diagnostic way to ask about symptoms — not the
        // declarative "You have [condition]" claim the policy targets.
        const before = line.slice(0, match.index).toLowerCase();
        if (phrase.toLowerCase().startsWith('you have') && /\b(do|did)\s+$/.test(before)) {
          continue;
        }

        // Skip documented false positives.
        if (FALSE_POSITIVE_ALLOWLIST.some((entry) => lineLower.includes(entry.match))) {
          continue;
        }

        // Check if it's inside a string literal (rough heuristic)
        const inString = isInStringLiteral(line, match.index);

        if (inString) {
          violations.push({
            file: filePath,
            line: i + 1,
            phrase,
            context: line.trim().slice(0, 120),
          });
        }
      }
    }
  }

  return violations;
}

/**
 * Rough heuristic to check if a position is inside a string literal.
 * Looks for surrounding quotes (single, double, or backtick).
 */
function isInStringLiteral(line: string, position: number): boolean {
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;

  for (let i = 0; i < position; i++) {
    const char = line[i];
    const prev = i > 0 ? line[i - 1] : '';

    if (prev === '\\') continue;

    if (char === "'" && !inDouble && !inBacktick) inSingle = !inSingle;
    if (char === '"' && !inSingle && !inBacktick) inDouble = !inDouble;
    if (char === '`' && !inSingle && !inDouble) inBacktick = !inBacktick;
  }

  return inSingle || inDouble || inBacktick;
}

function scanDirectory(dirPath: string): Violation[] {
  const violations: Violation[] = [];

  if (!fs.existsSync(dirPath)) {
    console.warn(`Warning: Directory not found: ${dirPath}`);
    return violations;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      violations.push(...scanDirectory(fullPath));
    } else if (entry.isFile() && SCAN_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      violations.push(...scanFile(fullPath));
    }
  }

  return violations;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('Language Compliance Validator');
  console.log('============================\n');
  console.log(`Scanning for ${PROHIBITED_PHRASES.length} prohibited phrases...\n`);

  const rootDir = path.resolve(__dirname, '..');
  const allViolations: Violation[] = [];

  for (const dir of SCAN_DIRS) {
    const fullDir = path.join(rootDir, dir);
    console.log(`Scanning: ${dir}/`);
    const violations = scanDirectory(fullDir);
    allViolations.push(...violations);
  }

  console.log('');

  if (allViolations.length === 0) {
    console.log('PASS: No prohibited language found in user-facing strings.\n');
    process.exit(0);
  } else {
    console.log(`FAIL: ${allViolations.length} violation(s) found:\n`);

    for (const v of allViolations) {
      console.log(`  ${v.file}:${v.line}`);
      console.log(`    Phrase: "${v.phrase}"`);
      console.log(`    Context: ${v.context}\n`);
    }

    console.log('Fix all violations before deploying.\n');
    process.exit(1);
  }
}

main();
