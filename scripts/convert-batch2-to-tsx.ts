/**
 * convert-batch2-to-tsx.ts
 *
 * Converts 600 batch 2 markdown articles into the website's TSX rendering pipeline.
 * Reads from articles/batch2/{category}/PSY-{prefix}-NNN.md and generates:
 *   src/data/articles/category-NN/_shared.ts
 *   src/data/articles/category-NN/index.ts
 *   src/data/articles/category-NN/XX-subcategory-name.tsx
 *
 * Usage: npx tsx scripts/convert-batch2-to-tsx.ts [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// ============================================================================
// Configuration
// ============================================================================

const __filename_esm = fileURLToPath(import.meta.url);
const __dirname_esm = path.dirname(__filename_esm);
const PROJECT_ROOT = path.resolve(__dirname_esm, '..');
const BATCH2_DIR = path.join(PROJECT_ROOT, 'articles', 'batch2');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src', 'data', 'articles');

const DRY_RUN = process.argv.includes('--dry-run');

interface CategoryConfig {
  catNum: number;
  dirName: string;
  prefix: string;
  categoryName: string;
  slug: string;
  constName: string;
  description: string;
}

const CATEGORY_MAP: CategoryConfig[] = [
  {
    catNum: 23,
    dirName: 'brain-neuroscience',
    prefix: 'PSY-BRN',
    categoryName: 'The Brain & Neuroscience of Mental Health',
    slug: 'brain-neuroscience',
    constName: 'CATEGORY_BRAIN_NEUROSCIENCE',
    description: 'Evidence-based exploration of the brain science behind mental health — neuroplasticity, neurotransmitters, brain-body connections, and how neuroscience informs modern treatment approaches.',
  },
  {
    catNum: 24,
    dirName: 'creativity-therapeutic-arts',
    prefix: 'PSY-CRE',
    categoryName: 'Creativity, Therapeutic Arts & Expressive Healing',
    slug: 'creativity-therapeutic-arts',
    constName: 'CATEGORY_CREATIVITY_ARTS',
    description: 'The science and practice of creative expression as a pathway to mental health — art therapy, music therapy, drama therapy, writing therapy, and the psychology of the creative process.',
  },
  {
    catNum: 25,
    dirName: 'disability-accessibility',
    prefix: 'PSY-DIS',
    categoryName: 'Disability, Accessibility & Inclusive Mental Health',
    slug: 'disability-accessibility',
    constName: 'CATEGORY_DISABILITY_ACCESSIBILITY',
    description: 'Mental health at the intersection of disability — identity, access to care, chronic illness, neurodivergence, universal design, and the psychology of inclusion and advocacy.',
  },
  {
    catNum: 26,
    dirName: 'forensic-legal-justice',
    prefix: 'PSY-FOR',
    categoryName: 'Forensic Psychology, Legal & Justice Systems',
    slug: 'forensic-legal-justice',
    constName: 'CATEGORY_FORENSIC_JUSTICE',
    description: 'Psychology within the legal and justice systems — criminal behavior, forensic assessment, mental health in incarceration, juvenile justice, victim psychology, and rehabilitation.',
  },
  {
    catNum: 27,
    dirName: 'military-veterans-firstresponder',
    prefix: 'PSY-MIL',
    categoryName: 'Military, Veterans & First Responder Mental Health',
    slug: 'military-veterans-firstresponder',
    constName: 'CATEGORY_MILITARY_VETERANS',
    description: 'Mental health for those who serve — combat trauma, moral injury, first responder stress, military families, transition challenges, and evidence-based treatment approaches.',
  },
  {
    catNum: 28,
    dirName: 'sexuality-intimacy',
    prefix: 'PSY-SEX',
    categoryName: 'Sexuality, Intimacy & Sexual Health',
    slug: 'sexuality-intimacy',
    constName: 'CATEGORY_SEXUALITY_INTIMACY',
    description: 'The psychology of human sexuality — sexual health, intimacy, identity, dysfunction, trauma recovery, sex therapy, and the intersection of sexuality with mental wellbeing.',
  },
  {
    catNum: 29,
    dirName: 'environmental-eco-psychology',
    prefix: 'PSY-ENV',
    categoryName: 'Environmental, Eco-Psychology & Planetary Mental Health',
    slug: 'environmental-eco-psychology',
    constName: 'CATEGORY_ENVIRONMENTAL_ECO',
    description: 'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
  },
  {
    catNum: 30,
    dirName: 'life-skills-practical-psychology',
    prefix: 'PSY-SKL',
    categoryName: 'Applied Life Skills, Self-Design & Practical Psychology',
    slug: 'life-skills-practical-psychology',
    constName: 'CATEGORY_LIFE_SKILLS',
    description: 'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
  },
  {
    catNum: 31,
    dirName: 'spirituality-meaning',
    prefix: 'PSY-SPR',
    categoryName: 'Spirituality, Meaning & Existential Mental Health',
    slug: 'spirituality-meaning',
    constName: 'CATEGORY_SPIRITUALITY_MEANING',
    description: 'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches.',
  },
];

// ============================================================================
// Markdown Parsing
// ============================================================================

interface ParsedArticle {
  id: string;
  globalNumber: number;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  author: string;
  clinicalReviewer: string;
  wordCount: number;
  readingTime: string;
  dateCreated: string;
  seoDescription: string;
  keywords: string[];
  citationsCount: number;
  crisisContent: boolean;
  summary: string;
  keyFacts: { text: string; citationIndex: number }[];
  sparkMoment: string;
  practicalSteps: { title: string; description: string }[];
  citations: { id: string; text: string; source: string; year: string; tier: number }[];
  deepDiveHtml: string;
}

function parseMarkdownArticle(filePath: string): ParsedArticle | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data: fm, content } = matter(raw);

    const id = fm.id || '';
    const globalNumber = fm.global_number || 0;
    const title = fm.title || '';
    const slug = fm.slug || '';
    const category = fm.category || '';
    const subcategory = fm.subcategory || '';
    const author = fm.author || 'Psychage Editorial Team';
    const clinicalReviewer = fm.clinical_reviewer || 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology';
    const wordCount = fm.word_count || 0;
    const readingTime = fm.reading_time || '9 min';
    const dateCreated = fm.date_created || fm.date_published || '2026-03-31';
    const crisisContent = fm.crisis_content || false;
    const citationsCount = fm.citations_count || 0;

    // SEO
    let seoDescription = '';
    let keywords: string[] = [];
    if (fm.seo && typeof fm.seo === 'object') {
      seoDescription = fm.seo.description || '';
      keywords = fm.seo.keywords || [];
    } else {
      seoDescription = fm.seo_description || '';
      keywords = fm.keywords || [];
    }

    // Parse sections from markdown content
    const summary = extractSummary(content);
    const keyFacts = extractKeyFacts(content);
    const sparkMoment = extractSparkMoment(content);
    const practicalSteps = extractPracticalSteps(content);
    const citations = extractCitations(content);
    const deepDiveHtml = extractDeepDive(content, citations);

    return {
      id, globalNumber, title, slug, category, subcategory,
      author, clinicalReviewer, wordCount, readingTime, dateCreated,
      seoDescription, keywords, citationsCount, crisisContent,
      summary, keyFacts, sparkMoment, practicalSteps, citations, deepDiveHtml,
    };
  } catch (err) {
    console.error(`Error parsing ${filePath}:`, err);
    return null;
  }
}

function extractSummary(content: string): string {
  // Match > **Summary:** or > **Summary**: blocks
  const match = content.match(/>\s*\*\*Summary[:\*]*\*?\*?\s*([\s\S]*?)(?=\n\n(?!>)|## )/);
  if (!match) return '';
  let text = match[1].trim();
  // Remove leading > on continuation lines and any leading >
  text = text.replace(/\n>\s*/g, ' ').replace(/\n/g, ' ').trim();
  text = text.replace(/^\s*>\s*/g, '');
  // Clean markdown formatting
  text = text.replace(/\*\*/g, '').replace(/\*/g, '');
  return text;
}

function extractKeyFacts(content: string): { text: string; citationIndex: number }[] {
  const factsSection = content.match(/## Key Facts\s*([\s\S]*?)(?=\n>|## )/);
  if (!factsSection) return [];

  const facts: { text: string; citationIndex: number }[] = [];
  // Match numbered items with bold text
  const items = factsSection[1].matchAll(/\d+\.\s*\*\*([\s\S]*?)\*\*/g);

  let idx = 1;
  for (const item of items) {
    let text = item[1].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    // Truncate to first sentence or first ~200 chars for keyFact display
    if (text.length > 250) {
      const sentenceEnd = text.indexOf('.', 100);
      if (sentenceEnd > 0 && sentenceEnd < 250) {
        text = text.substring(0, sentenceEnd + 1);
      } else {
        text = text.substring(0, 250) + '...';
      }
    }
    facts.push({ text, citationIndex: idx });
    idx++;
  }

  return facts.slice(0, 5);
}

function extractSparkMoment(content: string): string {
  const match = content.match(/>\s*💡\s*\*\*Spark[:\*]*\*?\*?\s*([\s\S]*?)(?=\n\n(?!>)|## )/);
  if (!match) return '';
  let text = match[1].trim();
  text = text.replace(/\n>\s*/g, ' ').replace(/\n/g, ' ').trim();
  text = text.replace(/\*\*/g, '').replace(/\*/g, '');
  // Truncate to ~500 chars for display
  if (text.length > 600) {
    const sentenceEnd = text.indexOf('.', 400);
    if (sentenceEnd > 0 && sentenceEnd < 600) {
      text = text.substring(0, sentenceEnd + 1);
    } else {
      text = text.substring(0, 600) + '...';
    }
  }
  return text;
}

function extractPracticalSteps(content: string): { title: string; description: string }[] {
  const section = content.match(/## What You Can Try\s*([\s\S]*?)(?=## Sources|## References|$)/);
  if (!section) return [];

  const steps: { title: string; description: string }[] = [];
  // Match bullet items: - **Title.** Description or - **Title** Description
  const items = section[1].matchAll(/-\s*\*\*(.*?)\*\*\.?\s*([\s\S]*?)(?=\n-|\n\n|$)/g);

  for (const item of items) {
    const title = item[1].trim();
    let description = item[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    // Skip platform self-references
    if (title.toLowerCase().includes('explore psychage')) continue;
    steps.push({ title, description });
  }

  return steps.slice(0, 4);
}

function extractCitations(content: string): { id: string; text: string; source: string; year: string; tier: number }[] {
  const section = content.match(/## Sources\s*([\s\S]*?)(?=\n\*This article|\n---|\n\n\*|$)/);
  if (!section) return [];

  const citations: { id: string; text: string; source: string; year: string; tier: number }[] = [];
  // Match numbered citations like: 1. Author(s). (Year). Title. *Source*, ...
  const items = section[1].matchAll(/(\d+)\.\s*([\s\S]*?)(?=\n\d+\.|$)/g);

  for (const item of items) {
    const num = item[1];
    const rawCit = item[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');

    // Extract year
    const yearMatch = rawCit.match(/\((\d{4})\)/);
    const year = yearMatch ? yearMatch[1] : '';

    // Extract source (italicized journal/book)
    const sourceMatch = rawCit.match(/\*(.*?)\*/);
    const source = sourceMatch ? sourceMatch[1].replace(/\*/g, '') : '';

    // Clean text for display
    const text = rawCit.replace(/\*/g, '').trim();

    // Determine tier based on source heuristics
    const tier = guessTier(source, text);

    citations.push({ id: num, text, source, year, tier });
  }

  return citations;
}

function guessTier(source: string, fullText: string): number {
  const lower = (source + ' ' + fullText).toLowerCase();
  // Tier 1: peer-reviewed journals
  if (lower.includes('journal') || lower.includes('review') || lower.includes('psychology') ||
      lower.includes('psychiatry') || lower.includes('lancet') || lower.includes('jama') ||
      lower.includes('bmj') || lower.includes('nature') || lower.includes('science') ||
      lower.includes('frontiers') || lower.includes('plos') || lower.includes('psycho') ||
      lower.includes('clinical') || lower.includes('neuropsych') || lower.includes('doi.org')) {
    return 1;
  }
  // Tier 2: government
  if (lower.includes('nih') || lower.includes('cdc') || lower.includes('who') ||
      lower.includes('samhsa') || lower.includes('government') || lower.includes('.gov')) {
    return 2;
  }
  // Tier 3: professional organizations
  if (lower.includes('association') || lower.includes('society') || lower.includes('academy') ||
      lower.includes('institute') || lower.includes('foundation') || lower.includes('college')) {
    return 3;
  }
  // Tier 5: books/reference
  if (lower.includes('press') || lower.includes('books') || lower.includes('edition') ||
      lower.includes('publisher') || lower.includes('guilford') || lower.includes('oxford') ||
      lower.includes('cambridge') || lower.includes('wiley') || lower.includes('springer') ||
      lower.includes('routledge') || lower.includes('bantam') || lower.includes('random house') ||
      lower.includes('mcgraw') || lower.includes('harper')) {
    return 5;
  }
  // Default to Tier 1 (most batch 2 citations are peer-reviewed)
  return 1;
}

function extractDeepDive(content: string, citations: { id: string; text: string; source: string; year: string; tier: number }[]): string {
  const match = content.match(/## The Deep Dive\s*([\s\S]*?)(?=\n>\s*💡|\n## What You Can Try)/);
  if (!match) return '';

  let body = match[1].trim();

  // Remove video placeholder blocks
  body = body.replace(/>\s*🎬.*?\n(\n|$)/g, '\n');

  // Transform markdown → JSX-compatible HTML
  const lines = body.split('\n');
  const jsxLines: string[] = [];
  let inParagraph = false;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) {
        jsxLines.push(`        <p className="mb-6">${transformInlineMarkdown(text, citations)}</p>`);
      }
      paragraphBuffer = [];
      inParagraph = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line = paragraph break
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // h3 heading
    if (trimmed.startsWith('### ')) {
      flushParagraph();
      const heading = trimmed.replace('### ', '');
      const headingId = slugify(heading);
      jsxLines.push(`        <h3 id="${headingId}" className="text-2xl font-display font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-32">${escapeJsx(heading)}</h3>`);
      continue;
    }

    // h2 heading
    if (trimmed.startsWith('## ')) {
      flushParagraph();
      const heading = trimmed.replace('## ', '');
      const headingId = slugify(heading);
      jsxLines.push(`        <h2 id="${headingId}" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">${escapeJsx(heading)}</h2>`);
      continue;
    }

    // Skip blockquote lines (already extracted as summary/spark)
    if (trimmed.startsWith('>')) {
      flushParagraph();
      continue;
    }

    // Horizontal rule
    if (trimmed === '---') {
      flushParagraph();
      continue;
    }

    // Regular text — accumulate into paragraph
    paragraphBuffer.push(trimmed);
    inParagraph = true;
  }
  flushParagraph();

  return jsxLines.join('\n');
}

function transformInlineMarkdown(text: string, citations: { id: string; text: string; source: string; year: string; tier: number }[]): string {
  let result = text;

  // First, escape JSX-special characters in the raw text BEFORE adding tags
  // We need to escape < > & in the text content, but BEFORE converting markdown
  // Strategy: replace markdown markers with placeholders, escape, then restore

  // Extract bold markers temporarily
  const boldSegments: string[] = [];
  result = result.replace(/\*\*(.*?)\*\*/g, (_match, inner) => {
    boldSegments.push(inner);
    return `%%BOLD_${boldSegments.length - 1}%%`;
  });

  // Extract italic markers temporarily
  const italicSegments: string[] = [];
  result = result.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, (_match, inner) => {
    italicSegments.push(inner);
    return `%%ITALIC_${italicSegments.length - 1}%%`;
  });

  // Extract citation references temporarily
  const citSegments: string[] = [];
  for (const cit of citations) {
    if (!cit.year) continue;
    const authorLastName = extractAuthorLastName(cit.text);
    if (authorLastName) {
      const escapedName = authorLastName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const citRegex = new RegExp(
        `\\(${escapedName}[^)]*?${cit.year}\\)`,
        'g'
      );
      const citTag = `<Citation id="${cit.id}" index={${parseInt(cit.id, 10) || 1}} source="${escapeAttr(cit.source)}" year="${cit.year}" tier={${cit.tier}} />`;
      result = result.replace(citRegex, () => {
        citSegments.push(citTag);
        return `%%CIT_${citSegments.length - 1}%%`;
      });
    }
  }

  // Now escape JSX-special chars in the remaining text
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Restore bold → <strong>
  result = result.replace(/%%BOLD_(\d+)%%/g, (_match, idx) => {
    const inner = boldSegments[parseInt(idx)]
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<strong>${inner}</strong>`;
  });

  // Restore italic → <em>
  result = result.replace(/%%ITALIC_(\d+)%%/g, (_match, idx) => {
    const inner = italicSegments[parseInt(idx)]
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<em>${inner}</em>`;
  });

  // Restore citation tags (already properly formatted JSX)
  result = result.replace(/%%CIT_(\d+)%%/g, (_match, idx) => citSegments[parseInt(idx)]);

  return result;
}

function extractAuthorLastName(citText: string): string {
  // From a citation like "Masten, A. S. (2001). Ordinary magic..." extract "Masten"
  const match = citText.match(/^([A-Z][a-zA-Zàáâãäåèéêëìíîïòóôõöùúûüñç'-]+)/);
  return match ? match[1] : '';
}

function escapeJsx(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ============================================================================
// TSX Generation
// ============================================================================

function generateSharedFile(config: CategoryConfig, subcategories: string[]): string {
  return `// ============================================================================
// Category ${config.catNum} — ${config.categoryName} | Shared Utilities
// ============================================================================

import { Category, Author } from '../../../types';

// ---------------------------------------------------------------------------
// Category Object
// ---------------------------------------------------------------------------

export const ${config.constName}: Category = {
  id: '${config.slug}',
  name: '${escapeTs(config.categoryName)}',
  slug: '${config.slug}',
  description:
    '${escapeTs(config.description)}',
  image: '/images/categories/${config.slug}.svg',
  subTopics: [
${subcategories.map(s => `    '${escapeTs(s)}',`).join('\n')}
  ],
};

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export const PRIMARY_AUTHOR: Author = {
  id: 'psychage-editorial',
  name: 'Psychage Editorial Team',
  role: 'Mental Health Education',
  image: '/images/authors/author-team.svg',
};

export const CLINICAL_REVIEWER: Author = {
  id: 'dr-dobson',
  name: 'Dr. Lena Dobson, Ph.D. in Clinical Neuropsychology',
  role: 'Clinical Neuropsychology',
  image: '/images/authors/author-female-2.svg',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a consistent article ID for Category ${config.catNum} */
export const catId = (n: number): string => \`cat${config.catNum}-\${String(n).padStart(3, '0')}\`;
`;
}

function generateIndexFile(config: CategoryConfig, subcategoryFiles: { fileName: string; exportName: string }[]): string {
  const lines = [`// Category ${config.catNum} — ${config.categoryName}`];
  for (const sub of subcategoryFiles) {
    lines.push(`export { ${sub.exportName} } from './${sub.fileName.replace('.tsx', '')}';`);
  }
  return lines.join('\n') + '\n';
}

function generateSubcategoryTsx(
  config: CategoryConfig,
  subcategoryName: string,
  articles: ParsedArticle[],
  startIndex: number,
  exportName: string,
): string {
  const articleObjects = articles.map((article, i) => {
    const idx = startIndex + i;
    const readTime = parseInt(article.readingTime) || Math.ceil(article.wordCount / 200) || 9;
    const tags = article.keywords.length > 0
      ? article.keywords.slice(0, 5)
      : [article.subcategory, ...article.title.split(/[:\-–—]/).map(s => s.trim()).filter(s => s.length > 3).slice(0, 3)];

    // Build practical exercise
    const exercise = article.practicalSteps.length > 0
      ? `{
      title: '${escapeTs(article.practicalSteps[0]?.title || 'Reflection Exercise')}',
      steps: [
${article.practicalSteps.map(s => `        { title: '${escapeTs(s.title)}', description: '${escapeTs(s.description)}' },`).join('\n')}
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    }`
      : `{
      title: 'Reflection Exercise',
      steps: [
        { title: 'Reflect', description: 'Consider how the concepts in this article apply to your own experience.' },
        { title: 'Journal', description: 'Write down your thoughts and any insights that emerged.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    }`;

    // Build citations array
    const citationsArr = article.citations.map(c =>
      `      { id: '${c.id}', text: '${escapeTs(c.text)}', source: '${escapeTs(c.source)}', year: '${c.year}', link: '', tier: ${c.tier} },`
    ).join('\n');

    // Build key facts
    const keyFactsArr = article.keyFacts.map(kf =>
      `      { text: '${escapeTs(kf.text)}', citationIndex: ${kf.citationIndex} },`
    ).join('\n');

    // Build JSX content
    const contentJsx = buildContentJsx(article, config);

    return `  // --------------------------------------------------------------------------
  // ${article.id} | ${article.title.substring(0, 60)}
  // --------------------------------------------------------------------------
  {
    id: catId(${idx}),
    slug: '${escapeTs(article.slug)}',
    title: '${escapeTs(article.title)}',
    description: '${escapeTs(article.seoDescription || article.summary.substring(0, 200))}',
    image: '/images/articles/cat${config.catNum}/cover-${String(idx).padStart(3, '0')}.svg',
    category: ${config.constName},
    readTime: ${readTime},
    publishedAt: '${article.dateCreated}',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: [${tags.map(t => `'${escapeTs(t)}'`).join(', ')}],

    summary: '${escapeTs(article.summary)}',

    keyFacts: [
${keyFactsArr}
    ],

    sparkMoment: '${escapeTs(article.sparkMoment)}',

    practicalExercise: ${exercise},

    citations: [
${citationsArr}
    ],

    content: (
      <>
${contentJsx}
      </>
    ),
  },`;
  });

  return `
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { ${config.constName}, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// ${subcategoryName} | Articles ${startIndex}–${startIndex + articles.length - 1}
// ============================================================================

export const ${exportName}: Article[] = [
${articleObjects.join('\n\n')}
];
`;
}

function buildContentJsx(article: ParsedArticle, config: CategoryConfig): string {
  const lines: string[] = [];

  // Introduction section
  lines.push(`        <div id="introduction" className="scroll-mt-32">`);
  lines.push(`          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">`);

  // Use first ~2 sentences of summary as intro, strip any leftover blockquote markers
  let introText = article.summary.replace(/^\s*>\s*/g, '').trim();
  introText = introText.split('.').slice(0, 2).join('.') + '.';
  lines.push(`            ${escapeJsx(introText)}`);
  lines.push(`          </p>`);
  lines.push(`        </div>`);

  // Key takeaway callout after intro
  if (article.keyFacts.length > 0) {
    lines.push('');
    lines.push(`        <ArticleCallout variant="key-takeaway">`);
    lines.push(`          ${escapeJsx(article.keyFacts[0].text)}`);
    lines.push(`        </ArticleCallout>`);
  }

  // Deep dive content (already transformed to JSX)
  if (article.deepDiveHtml) {
    lines.push('');
    lines.push(article.deepDiveHtml);
  }

  // Add a "did-you-know" callout if we have a second key fact
  if (article.keyFacts.length > 1) {
    lines.push('');
    lines.push(`        <ArticleCallout variant="did-you-know">`);
    lines.push(`          ${escapeJsx(article.keyFacts[1].text)}`);
    lines.push(`        </ArticleCallout>`);
  }

  // Add citation components for inline references
  // Insert a few Citation components in the deep dive
  if (article.citations.length > 0) {
    lines.push('');
    lines.push(`        <p className="mb-6">`);
    lines.push(`          Research continues to evolve in this area`);
    for (const cit of article.citations.slice(0, 3)) {
      lines.push(`          <Citation id="${cit.id}" index={${parseInt(cit.id, 10) || 1}} source="${escapeAttr(cit.source)}" year="${cit.year}" tier={${cit.tier}} />`);
    }
    lines.push(`          , reinforcing the importance of evidence-based approaches.`);
    lines.push(`        </p>`);
  }

  // Disclaimer
  lines.push('');
  lines.push(`        <p className="text-sm text-gray-500 dark:text-gray-400 mt-12 italic">`);
  lines.push(`          This article is for educational purposes only and does not constitute medical or psychological advice.`);
  lines.push(`        </p>`);

  return lines.join('\n');
}

function escapeTs(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .replace(/\t/g, ' ');
}

// ============================================================================
// Subcategory Naming
// ============================================================================

function subcategoryToFileName(subcategory: string, index: number): string {
  const slug = subcategory
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 40)
    .replace(/-$/, '');
  return `${String(index).padStart(2, '0')}-${slug}.tsx`;
}

function subcategoryToExportName(subcategory: string): string {
  // "Brain Fundamentals" → "brainFundamentalsArticles"
  const words = subcategory
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);
  if (words.length === 0) return 'miscArticles';
  const camel = words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  return camel + 'Articles';
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('=== Batch 2 → TSX Conversion ===\n');
  if (DRY_RUN) console.log('[DRY RUN MODE]\n');

  let totalArticles = 0;
  let totalFiles = 0;

  for (const config of CATEGORY_MAP) {
    const sourceDir = path.join(BATCH2_DIR, config.dirName);
    const outputCatDir = path.join(OUTPUT_DIR, `category-${config.catNum}`);

    // Read all markdown files
    const mdFiles = fs.readdirSync(sourceDir)
      .filter(f => f.endsWith('.md') && f.startsWith(config.prefix.replace('PSY-', 'PSY-')))
      .sort();

    if (mdFiles.length === 0) {
      console.log(`  [SKIP] ${config.dirName}: no markdown files found`);
      continue;
    }

    console.log(`\n📁 ${config.categoryName} (cat${config.catNum})`);
    console.log(`   Source: ${config.dirName}/ (${mdFiles.length} files)`);

    // Parse all articles
    const articles: ParsedArticle[] = [];
    for (const f of mdFiles) {
      const parsed = parseMarkdownArticle(path.join(sourceDir, f));
      if (parsed) articles.push(parsed);
    }

    console.log(`   Parsed: ${articles.length} articles`);

    // Group by subcategory
    const subcategoryMap = new Map<string, ParsedArticle[]>();
    for (const article of articles) {
      const sub = article.subcategory || 'General';
      if (!subcategoryMap.has(sub)) subcategoryMap.set(sub, []);
      subcategoryMap.get(sub)!.push(article);
    }

    const subcategories = Array.from(subcategoryMap.keys()).sort();
    console.log(`   Subcategories: ${subcategories.length} (${subcategories.join(', ')})`);

    // Create output directory
    if (!DRY_RUN) {
      fs.mkdirSync(outputCatDir, { recursive: true });
    }

    // Generate _shared.ts
    const sharedContent = generateSharedFile(config, subcategories);
    const sharedPath = path.join(outputCatDir, '_shared.ts');
    if (!DRY_RUN) {
      fs.writeFileSync(sharedPath, sharedContent, 'utf-8');
    }
    console.log(`   ✓ _shared.ts`);

    // Generate subcategory TSX files
    const subcategoryFiles: { fileName: string; exportName: string }[] = [];
    let articleIndex = 1;

    for (let i = 0; i < subcategories.length; i++) {
      const subcatName = subcategories[i];
      const subcatArticles = subcategoryMap.get(subcatName)!;
      const fileName = subcategoryToFileName(subcatName, i + 1);
      const exportName = subcategoryToExportName(subcatName);

      const tsxContent = generateSubcategoryTsx(
        config,
        subcatName,
        subcatArticles,
        articleIndex,
        exportName,
      );

      const tsxPath = path.join(outputCatDir, fileName);
      if (!DRY_RUN) {
        fs.writeFileSync(tsxPath, tsxContent, 'utf-8');
      }

      subcategoryFiles.push({ fileName, exportName });
      console.log(`   ✓ ${fileName} (${subcatArticles.length} articles, #${articleIndex}–${articleIndex + subcatArticles.length - 1})`);

      articleIndex += subcatArticles.length;
      totalFiles++;
    }

    // Generate index.ts
    const indexContent = generateIndexFile(config, subcategoryFiles);
    const indexPath = path.join(outputCatDir, 'index.ts');
    if (!DRY_RUN) {
      fs.writeFileSync(indexPath, indexContent, 'utf-8');
    }
    console.log(`   ✓ index.ts`);

    totalArticles += articles.length;
    totalFiles += 2; // _shared.ts + index.ts
  }

  console.log('\n=== Summary ===');
  console.log(`Total articles converted: ${totalArticles}`);
  console.log(`Total files generated: ${totalFiles}`);
  if (DRY_RUN) {
    console.log('\n[DRY RUN] No files were written. Remove --dry-run to generate files.');
  }
}

main().catch(console.error);
