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

// Directories to scan
const SCAN_DIRS = [
  'src/lib/navigator',
  'src/app/api/navigator',
  'supabase/migrations',
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.sql'];

// Patterns to ignore (these are the prohibited list definition itself, test files, etc.)
const IGNORE_PATTERNS = [
  'validate-language.ts',
  'PROHIBITED_PHRASES',
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
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

    for (const phrase of PROHIBITED_PHRASES) {
      if (lineLower.includes(phrase.toLowerCase())) {
        // Check if it's inside a string literal (rough heuristic)
        const inString = isInStringLiteral(line, lineLower.indexOf(phrase.toLowerCase()));

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
  let allViolations: Violation[] = [];

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
