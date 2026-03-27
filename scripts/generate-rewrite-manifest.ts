/**
 * generate-rewrite-manifest.ts
 *
 * Scans all article TSX files, estimates word counts, and produces
 * article-rewrite-manifest.json for the /rewrite skill.
 *
 * Usage: npx tsx scripts/generate-rewrite-manifest.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTICLES_DIR = path.resolve(__dirname, '../src/data/articles');
const OUTPUT_FILE = path.resolve(__dirname, '../article-rewrite-manifest.json');
const MIN_WORD_THRESHOLD = 1500; // Only include articles under this word count

interface ManifestArticle {
  index: number;
  catIdNum: number;
  slug: string;
  title: string;
  currentWords: number;
  status: 'pending' | 'in_progress' | 'complete' | 'failed';
}

interface ManifestSession {
  status: 'pending' | 'in_progress' | 'complete' | 'partial' | 'build_failed';
  category: number;
  subcategoryFile: string;
  file: string;
  exportName: string;
  articles: ManifestArticle[];
  completedAt: string | null;
}

interface Manifest {
  version: number;
  generatedAt: string;
  wordThreshold: number;
  totalSessions: number;
  completedSessions: number;
  totalArticles: number;
  sessions: Record<string, ManifestSession>;
}

/**
 * Strip JSX/HTML tags and code constructs to estimate prose word count.
 */
function estimateProseWords(contentStr: string): number {
  let text = contentStr;

  // Remove JSX component tags like <ArticleCallout variant="..."> and self-closing tags
  text = text.replace(/<[A-Z][^>]*\/>/g, '');
  text = text.replace(/<\/[A-Z][^>]*>/g, '');
  text = text.replace(/<[A-Z][^>]*>/g, '');

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Remove JSX expressions like {/* comments */}
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // Remove JSX expressions like {variableName} or {someFunction()}
  text = text.replace(/\{[^}]*\}/g, '');

  // Remove className attributes and their values
  text = text.replace(/className="[^"]*"/g, '');

  // Remove style attributes
  text = text.replace(/style=\{[^}]*\}/g, '');

  // Remove import statements
  text = text.replace(/import\s+.*?from\s+['"][^'"]*['"]/g, '');

  // Remove export statements
  text = text.replace(/export\s+(const|default|function)/g, '');

  // Remove common JSX syntax artifacts
  text = text.replace(/<>/g, '');
  text = text.replace(/<\/>/g, '');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Count words (3+ characters to filter noise)
  const words = text.split(/\s+/).filter(w => w.length >= 3 && /[a-zA-Z]/.test(w));
  return words.length;
}

/**
 * Parse a TSX file to extract individual articles and their metadata.
 */
function parseArticleFile(filePath: string): ManifestArticle[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const articles: ManifestArticle[] = [];

  // Find the exported array name
  const exportMatch = content.match(/export\s+const\s+(\w+)\s*:\s*Article\[\]/);
  if (!exportMatch) return articles;

  // Find all article objects by looking for catId(N) patterns
  const catIdRegex = /id:\s*catId\((\d+)\)/g;
  let match;
  const catIdPositions: { num: number; pos: number }[] = [];

  while ((match = catIdRegex.exec(content)) !== null) {
    catIdPositions.push({ num: parseInt(match[1]), pos: match.index });
  }

  for (let i = 0; i < catIdPositions.length; i++) {
    const { num, pos } = catIdPositions[i];
    const nextPos = i + 1 < catIdPositions.length ? catIdPositions[i + 1].pos : content.length;

    // Extract the article block between this catId and the next
    const articleBlock = content.substring(pos, nextPos);

    // Extract slug
    const slugMatch = articleBlock.match(/slug:\s*['"]([^'"]+)['"]/);
    const slug = slugMatch ? slugMatch[1] : `unknown-${num}`;

    // Extract title
    const titleMatch = articleBlock.match(/title:\s*['"]([\s\S]*?)['"]\s*,/);
    const title = titleMatch ? titleMatch[1].replace(/\\'/g, "'") : `Article ${num}`;

    // Find the content field and estimate words
    const contentStart = articleBlock.indexOf('content:');
    let wordCount = 0;
    if (contentStart !== -1) {
      // Extract from content: to the end of this article block
      const contentBlock = articleBlock.substring(contentStart);
      wordCount = estimateProseWords(contentBlock);
    }

    articles.push({
      index: i,
      catIdNum: num,
      slug,
      title,
      currentWords: wordCount,
      status: 'pending',
    });
  }

  return articles;
}

async function main() {
  console.log('Scanning article TSX files...\n');

  // Find all article TSX files (not _shared, not index)
  const pattern = path.join(ARTICLES_DIR, 'category-*/[0-9]*.tsx');
  const files = await glob(pattern);
  files.sort();

  console.log(`Found ${files.length} article files\n`);

  const manifest: Manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    wordThreshold: MIN_WORD_THRESHOLD,
    totalSessions: 0,
    completedSessions: 0,
    totalArticles: 0,
    sessions: {},
  };

  let sessionNum = 1;
  let totalArticlesNeedingRewrite = 0;
  let totalArticlesSkipped = 0;

  for (const filePath of files) {
    const relPath = path.relative(path.resolve(__dirname, '..'), filePath);
    const articles = parseArticleFile(filePath);

    if (articles.length === 0) continue;

    // Filter to only articles under the word threshold
    const needsRewrite = articles.filter(a => a.currentWords < MIN_WORD_THRESHOLD);

    if (needsRewrite.length === 0) {
      totalArticlesSkipped += articles.length;
      continue;
    }

    // Extract category number from path
    const catMatch = relPath.match(/category-(\d+)/);
    const categoryNum = catMatch ? parseInt(catMatch[1]) : 0;

    // Extract the export name from the file
    const content = fs.readFileSync(filePath, 'utf-8');
    const exportMatch = content.match(/export\s+const\s+(\w+)\s*:\s*Article\[\]/);
    const exportName = exportMatch ? exportMatch[1] : 'unknown';

    // Extract subcategory filename
    const fileName = path.basename(filePath, '.tsx');

    manifest.sessions[String(sessionNum)] = {
      status: 'pending',
      category: categoryNum,
      subcategoryFile: fileName,
      file: relPath,
      exportName,
      articles: needsRewrite.map((a, idx) => ({ ...a, index: idx })),
      completedAt: null,
    };

    totalArticlesNeedingRewrite += needsRewrite.length;
    totalArticlesSkipped += articles.length - needsRewrite.length;
    sessionNum++;
  }

  manifest.totalSessions = sessionNum - 1;
  manifest.totalArticles = totalArticlesNeedingRewrite;

  // Write the manifest
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log('=== Manifest Generated ===\n');
  console.log(`Total article files scanned: ${files.length}`);
  console.log(`Total articles needing rewrite (<${MIN_WORD_THRESHOLD} words): ${totalArticlesNeedingRewrite}`);
  console.log(`Total articles already at quality (>=${MIN_WORD_THRESHOLD} words): ${totalArticlesSkipped}`);
  console.log(`Total sessions created: ${manifest.totalSessions}`);
  console.log(`\nManifest written to: ${OUTPUT_FILE}`);

  // Print per-category summary
  const categorySummary: Record<number, { sessions: number; articles: number }> = {};
  for (const session of Object.values(manifest.sessions)) {
    if (!categorySummary[session.category]) {
      categorySummary[session.category] = { sessions: 0, articles: 0 };
    }
    categorySummary[session.category].sessions++;
    categorySummary[session.category].articles += session.articles.length;
  }

  console.log('\n--- Per-Category Breakdown ---\n');
  console.log('Cat | Sessions | Articles to Rewrite');
  console.log('----|----------|--------------------');
  for (const [cat, data] of Object.entries(categorySummary).sort(
    (a, b) => parseInt(a[0]) - parseInt(b[0])
  )) {
    console.log(`${String(cat).padStart(3)} | ${String(data.sessions).padStart(8)} | ${data.articles}`);
  }
}

main().catch(console.error);
