/**
 * verify-word-counts.mjs (v3)
 *
 * Reads the article-rewrite-manifest.json and for each completed session,
 * reads the TSX file, extracts the visible text content from each article's
 * `content` JSX field, and counts words. Reports any article under 1,500 words.
 *
 * Handles multiple article formats:
 * - Standard format: slug on its own line, `content: (` on its own line
 * - Compact format: slug inline, `content: <>` inline
 * - Mixed formats within the same file
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const manifest = JSON.parse(readFileSync(resolve(ROOT, 'article-rewrite-manifest.json'), 'utf-8'));
const THRESHOLD = 1500;

/**
 * Extract articles from a TSX file.
 *
 * Uses a two-pass approach:
 * 1. Find all slug positions with a global regex
 * 2. For each slug, find its content block using multiple strategies
 */
function extractArticles(fileContent) {
  const articles = [];
  const lines = fileContent.split('\n');

  // Build a position-to-line index for fast lookup
  let charToLine = [];
  let charPos = 0;
  for (let i = 0; i < lines.length; i++) {
    charToLine.push({ line: i, startChar: charPos });
    charPos += lines[i].length + 1; // +1 for newline
  }

  function getLineForPos(pos) {
    for (let i = charToLine.length - 1; i >= 0; i--) {
      if (charToLine[i].startChar <= pos) return charToLine[i].line;
    }
    return 0;
  }

  // Find all slugs
  const slugRegex = /slug:\s*(['"])([^'"]+)\1/g;
  const slugMatches = [];
  let m;
  while ((m = slugRegex.exec(fileContent)) !== null) {
    slugMatches.push({
      slug: m[2],
      pos: m.index,
      endPos: m.index + m[0].length,
      line: getLineForPos(m.index),
    });
  }

  for (let si = 0; si < slugMatches.length; si++) {
    const { slug, endPos, line: slugLine } = slugMatches[si];
    const nextSlugPos = si < slugMatches.length - 1
      ? slugMatches[si + 1].pos
      : fileContent.length;

    // Strategy 1: Find `content: (` on its own line between this slug and next
    let contentJsx = '';
    let found = false;

    // Look for `content: (` pattern
    const contentParenIdx = fileContent.indexOf('content: (', endPos);
    if (contentParenIdx !== -1 && contentParenIdx < nextSlugPos) {
      const contentLine = getLineForPos(contentParenIdx);
      const contentIndent = lines[contentLine].search(/\S/);

      // Find matching close: `)` at same or lesser indent on its own line
      for (let li = contentLine + 1; li < lines.length; li++) {
        const closeMatch = lines[li].match(/^(\s*)\)[\s,]*$/);
        if (closeMatch && closeMatch[1].length <= contentIndent) {
          // Collect all lines between content: ( and the closing )
          const startLine = contentLine + 1;
          contentJsx = lines.slice(startLine, li).join('\n');
          found = true;
          break;
        }
      }
    }

    // Strategy 2: Find `content: <>` inline (compact format)
    if (!found) {
      const contentFragIdx = fileContent.indexOf('content: <>', endPos);
      if (contentFragIdx !== -1 && contentFragIdx < nextSlugPos) {
        // Find the closing </> for this fragment
        const afterFragment = contentFragIdx + 'content: <>'.length;
        // Find </> that closes this fragment, accounting for nested fragments
        let fragDepth = 1;
        let searchPos = afterFragment;
        while (fragDepth > 0 && searchPos < fileContent.length) {
          const nextOpen = fileContent.indexOf('<>', searchPos);
          const nextClose = fileContent.indexOf('</>', searchPos);

          if (nextClose === -1) break;

          if (nextOpen !== -1 && nextOpen < nextClose) {
            fragDepth++;
            searchPos = nextOpen + 2;
          } else {
            fragDepth--;
            if (fragDepth === 0) {
              contentJsx = fileContent.substring(afterFragment, nextClose);
              found = true;
            }
            searchPos = nextClose + 3;
          }
        }
      }
    }

    // Strategy 3: Find `content: (<>` (paren with immediate fragment)
    if (!found) {
      const contentParenFragIdx = fileContent.indexOf('content: (<>', endPos);
      if (contentParenFragIdx !== -1 && contentParenFragIdx < nextSlugPos) {
        const afterOpen = contentParenFragIdx + 'content: (<>'.length;
        // Find </>) that closes this
        let fragDepth = 1;
        let searchPos = afterOpen;
        while (fragDepth > 0 && searchPos < fileContent.length) {
          const nextOpen = fileContent.indexOf('<>', searchPos);
          const nextClose = fileContent.indexOf('</>', searchPos);

          if (nextClose === -1) break;

          if (nextOpen !== -1 && nextOpen < nextClose) {
            fragDepth++;
            searchPos = nextOpen + 2;
          } else {
            fragDepth--;
            if (fragDepth === 0) {
              contentJsx = fileContent.substring(afterOpen, nextClose);
              found = true;
            }
            searchPos = nextClose + 3;
          }
        }
      }
    }

    articles.push({ slug, contentJsx: found ? contentJsx : '' });
  }

  return articles;
}

/**
 * Count visible words from JSX content.
 */
function countVisibleWords(jsxString) {
  if (!jsxString || jsxString.trim().length === 0) return 0;

  let allText = [];
  let m;

  // 1. Text between tags (most reliable): > text <
  const betweenTagsRegex = />([^<>{]+)</g;
  while ((m = betweenTagsRegex.exec(jsxString)) !== null) {
    const text = m[1].trim();
    if (text.length > 0) allText.push(text);
  }

  // 2. String prop values that contain visible text
  const propNames = [
    'title', 'description', 'content', 'label', 'myth', 'fact',
    'quote', 'text', 'before', 'after', 'subtitle', 'summary',
    'name', 'explanation', 'definition', 'header', 'caption',
    'heading', 'subheading', 'answer', 'question', 'tip',
    'message', 'detail', 'details', 'note', 'source',
    'lead', 'body', 'intro', 'conclusion', 'warning',
    'step', 'instruction', 'benefit', 'drawback',
    'insight', 'takeaway', 'example', 'attribution',
  ];

  for (const prop of propNames) {
    // Single-quoted values
    const singleRegex = new RegExp(`${prop}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g');
    while ((m = singleRegex.exec(jsxString)) !== null) {
      const val = m[1].replace(/\\'/g, "'").replace(/\\n/g, ' ').trim();
      if (val.length > 3 && !val.startsWith('/') && !val.startsWith('#') &&
          !val.match(/^[a-z0-9_-]+$/) && !val.match(/^https?:\/\//)) {
        allText.push(val);
      }
    }

    // Double-quoted values
    const doubleRegex = new RegExp(`${prop}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'g');
    while ((m = doubleRegex.exec(jsxString)) !== null) {
      const val = m[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
      if (val.length > 3 && !val.startsWith('/') && !val.startsWith('#') &&
          !val.match(/^[a-z0-9_-]+$/) && !val.match(/^https?:\/\//)) {
        allText.push(val);
      }
    }

    // Template literals
    const templateRegex = new RegExp(`${prop}:\\s*\`([^\`]*)\``, 'g');
    while ((m = templateRegex.exec(jsxString)) !== null) {
      const val = m[1].trim();
      if (val.length > 3) allText.push(val);
    }
  }

  // 3. JSX string expressions: {'text'} or {"text"}
  const jsxStringRegex = /\{\s*['"]([^'"]{4,})['"]\s*\}/g;
  while ((m = jsxStringRegex.exec(jsxString)) !== null) {
    allText.push(m[1]);
  }

  // Join and count
  let combined = allText.join(' ');
  combined = combined.replace(/&amp;/g, '&');
  combined = combined.replace(/&mdash;/g, ' ');
  combined = combined.replace(/&ndash;/g, ' ');
  combined = combined.replace(/&nbsp;/g, ' ');
  combined = combined.replace(/---/g, ' ');
  combined = combined.replace(/--/g, ' ');
  combined = combined.replace(/\{[^}]*\}/g, ' ');
  combined = combined.replace(/\s+/g, ' ').trim();

  if (combined.length === 0) return 0;
  return combined.split(/\s+/).filter(w => w.length > 0).length;
}

// ==================== Main ====================

const completedSessions = Object.entries(manifest.sessions)
  .filter(([, s]) => s.status === 'complete');

const fileToSessions = new Map();
for (const [sessionId, session] of completedSessions) {
  const file = session.file;
  if (!fileToSessions.has(file)) fileToSessions.set(file, []);
  fileToSessions.get(file).push({ sessionId, session });
}

console.log(`\n========================================`);
console.log(`  ARTICLE WORD COUNT VERIFICATION`);
console.log(`========================================\n`);
console.log(`Completed sessions: ${completedSessions.length}`);
console.log(`Unique files to check: ${fileToSessions.size}`);
console.log(`Word threshold: ${THRESHOLD}\n`);

const underArticles = [];
let totalChecked = 0;
let totalOver = 0;
let totalUnder = 0;
let totalWordCount = 0;
let errorFiles = [];
let notFoundCount = 0;
const allWordCounts = [];

for (const [file, sessions] of fileToSessions) {
  const filePath = resolve(ROOT, file);
  let fileContent;
  try {
    fileContent = readFileSync(filePath, 'utf-8');
  } catch (err) {
    errorFiles.push({ file, error: err.message });
    for (const { sessionId, session } of sessions) {
      for (const a of session.articles) {
        totalChecked++;
        totalUnder++;
        underArticles.push({
          sessionId, file, slug: a.slug, title: a.title,
          wordCount: 0, note: 'FILE NOT FOUND'
        });
        allWordCounts.push(0);
      }
    }
    continue;
  }

  const extractedArticles = extractArticles(fileContent);

  for (const { sessionId, session } of sessions) {
    for (const articleMeta of session.articles) {
      const slug = articleMeta.slug;
      const title = articleMeta.title;

      let extracted = extractedArticles.find(a => a.slug === slug);

      if (!extracted || !extracted.contentJsx || extracted.contentJsx.trim().length === 0) {
        notFoundCount++;
        totalChecked++;
        totalUnder++;
        underArticles.push({
          sessionId, file, slug, title,
          wordCount: 0,
          note: extracted ? 'EMPTY CONTENT' : 'SLUG NOT FOUND'
        });
        allWordCounts.push(0);
        continue;
      }

      const wordCount = countVisibleWords(extracted.contentJsx);
      totalWordCount += wordCount;
      totalChecked++;
      allWordCounts.push(wordCount);

      if (wordCount >= THRESHOLD) {
        totalOver++;
      } else {
        totalUnder++;
        underArticles.push({ sessionId, file, slug, title, wordCount });
      }
    }
  }
}

// ==================== Results ====================

console.log(`\n========================================`);
console.log(`  RESULTS SUMMARY`);
console.log(`========================================\n`);
console.log(`Total articles checked:     ${totalChecked}`);
console.log(`Articles >= ${THRESHOLD} words:  ${totalOver}  (${(totalOver/totalChecked*100).toFixed(1)}%)`);
console.log(`Articles < ${THRESHOLD} words:   ${totalUnder}  (${(totalUnder/totalChecked*100).toFixed(1)}%)`);
console.log(`Average word count:         ${totalChecked > 0 ? Math.round(totalWordCount / totalChecked) : 0}`);

if (errorFiles.length > 0) {
  console.log(`\nFile read errors: ${errorFiles.length}`);
  for (const { file, error } of errorFiles) {
    console.log(`  - ${file}: ${error}`);
  }
}

if (notFoundCount > 0) {
  console.log(`\nArticles with extraction issues: ${notFoundCount}`);
}

// Separate results
const extractionFailures = underArticles.filter(a => a.note);
const genuineUnder = underArticles.filter(a => !a.note);

if (genuineUnder.length > 0) {
  console.log(`\n========================================`);
  console.log(`  ARTICLES UNDER ${THRESHOLD} WORDS (${genuineUnder.length} articles)`);
  console.log(`========================================\n`);
  genuineUnder.sort((a, b) => a.wordCount - b.wordCount);
  for (const article of genuineUnder) {
    console.log(`  [Session ${article.sessionId}] ${article.wordCount} words`);
    console.log(`    File:  ${article.file}`);
    console.log(`    Slug:  ${article.slug}`);
    console.log(`    Title: ${article.title}`);
    console.log('');
  }
}

if (extractionFailures.length > 0) {
  console.log(`\n========================================`);
  console.log(`  EXTRACTION FAILURES (${extractionFailures.length})`);
  console.log(`========================================\n`);
  for (const article of extractionFailures) {
    console.log(`  [Session ${article.sessionId}] ${article.note} -> ${article.file} / ${article.slug}`);
  }
}

if (genuineUnder.length === 0 && extractionFailures.length === 0) {
  console.log(`\nAll articles meet the ${THRESHOLD}-word threshold!`);
}

// ==================== Distribution ====================

console.log(`\n========================================`);
console.log(`  WORD COUNT DISTRIBUTION`);
console.log(`========================================\n`);

const validWordCounts = allWordCounts.filter(w => w > 0);
validWordCounts.sort((a, b) => a - b);

const ranges = [
  [1, 499], [500, 999], [1000, 1099], [1100, 1199],
  [1200, 1299], [1300, 1399], [1400, 1499],
  [1500, 1599], [1600, 1799], [1800, 1999],
  [2000, 2499], [2500, 2999], [3000, Infinity],
];

for (const [low, high] of ranges) {
  const count = validWordCounts.filter(w => w >= low && w <= high).length;
  const label = high === Infinity ? `${low}+` : `${low}-${high}`;
  const bar = '#'.repeat(Math.ceil(count / 2));
  console.log(`  ${label.padStart(12)}: ${String(count).padStart(4)}  ${bar}`);
}

if (validWordCounts.length > 0) {
  console.log(`\n  Min: ${validWordCounts[0]}  |  Median: ${validWordCounts[Math.floor(validWordCounts.length / 2)]}  |  Max: ${validWordCounts[validWordCounts.length - 1]}`);
  console.log(`  Valid articles: ${validWordCounts.length}  |  Extraction failures: ${allWordCounts.filter(w => w === 0).length}`);
}
