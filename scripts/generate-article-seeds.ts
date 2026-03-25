#!/usr/bin/env tsx
/**
 * Generate SQL seed migrations for articles
 *
 * Reads article TSX files from src/data/articles/category-XX/
 * Extracts metadata (title, tags, citations, etc.)
 * Generates SQL INSERT statements for Supabase migrations
 *
 * Usage: tsx scripts/generate-article-seeds.ts [--categories=1,2,3] [--output-dir=supabase/migrations]
 */

import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

// Category mapping (content architecture categories to DB categories)
const CATEGORY_MAPPING: Record<number, { name: string; slug: string }> = {
  1: { name: 'Emotional Regulation & Self-Awareness', slug: 'emotional-regulation' },
  2: { name: 'Anxiety, Stress & Overwhelm', slug: 'anxiety-stress' },
  3: { name: 'Relationships & Communication', slug: 'relationships-social' },
  4: { name: 'Self-Worth, Confidence & Identity', slug: 'self-esteem-identity' },
  5: { name: 'Work, Productivity & Burnout', slug: 'workplace-academic' },
  6: { name: 'Family, Parenting & Childhood Patterns', slug: 'relationships-social' },
  7: { name: 'Depression, Grief & Loss', slug: 'depression-mood' },
};

// Helper to generate subcategory name from slug
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface ArticleMetadata {
  id: string; // e.g., 'CAT01-001'
  title: string;
  slug: string;
  description: string;
  category: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  tags: string[];
  wordCount: number;
  authorName: string;
  articleType: string;
  citationCount: number;
  citations: Array<{
    sourceType: string;
    tier: number;
    title: string;
    year: string;
    url: string | null;
    journalName: string | null;
    sortOrder: number;
  }>;
  heroImage: string;
  hasCrisisDisclaimer: boolean;
  isCornerstone: boolean;
}

/**
 * Extract article metadata from TSX file content
 */
function extractArticleMetadata(fileContent: string, filePath: string): ArticleMetadata[] {
  const articles: ArticleMetadata[] = [];

  // Extract category number from file path (e.g., category-01 -> 1)
  const categoryMatch = filePath.match(/category-(\d+)/);
  if (!categoryMatch) {
    console.warn(`Could not extract category from path: ${filePath}`);
    return articles;
  }
  const categoryNum = parseInt(categoryMatch[1], 10);
  const categoryInfo = CATEGORY_MAPPING[categoryNum];
  if (!categoryInfo) {
    console.warn(`Unknown category number: ${categoryNum}`);
    return articles;
  }

  // Extract subcategory from filename (e.g., 01a-understanding-emotions.tsx -> 01)
  const subcatMatch = path.basename(filePath).match(/^(\d+)[ab]?-(.+)\.tsx$/);
  if (!subcatMatch) {
    console.warn(`Could not extract subcategory from filename: ${filePath}`);
    return articles;
  }
  const subcatNum = subcatMatch[1];
  const subcatSlug = subcatMatch[2];
  const subcatInfo = {
    name: slugToName(subcatSlug),
    displayOrder: parseInt(subcatNum, 10),
  };

  // Match all article objects in the file
  // Looking for pattern: { id: catId(N), slug: '...', title: '...', ...}
  const articleRegex = /\{\s*id:\s*catId\((\d+)\),\s*slug:\s*['"`]([^'"`]+)['"`],\s*title:\s*['"`]([^'"`]+)['"`]/gs;

  let match;
  while ((match = articleRegex.exec(fileContent)) !== null) {
    const articleNum = parseInt(match[1], 10);
    const slug = match[2];
    const title = match[3];

    // Extract the full article object
    const startIndex = match.index;
    let braceCount = 0;
    let endIndex = startIndex;
    let inObject = false;

    for (let i = startIndex; i < fileContent.length; i++) {
      if (fileContent[i] === '{') {
        braceCount++;
        inObject = true;
      }
      if (fileContent[i] === '}') {
        braceCount--;
        if (braceCount === 0 && inObject) {
          endIndex = i + 1;
          break;
        }
      }
    }

    const articleObjStr = fileContent.substring(startIndex, endIndex);

    // Extract fields using regex
    const descMatch = articleObjStr.match(/description:\s*['"`]([^'"`]+)['"`]/);
    const tagsMatch = articleObjStr.match(/tags:\s*\[([^\]]+)\]/);
    const readTimeMatch = articleObjStr.match(/readTime:\s*(\d+)/);
    const authorMatch = articleObjStr.match(/author:\s*(\w+)/);
    const typeMatch = articleObjStr.match(/type:\s*['"`]([^'"`]+)['"`]/);
    const imageMatch = articleObjStr.match(/image:\s*['"`]([^'"`]+)['"`]/);

    // Extract citations array
    const citations: ArticleMetadata['citations'] = [];
    const citationsMatch = articleObjStr.match(/citations:\s*\[([^\]]*(?:\[[^\]]*\][^\]]*)*)[\],]/s);
    if (citationsMatch) {
      const citationsStr = citationsMatch[1];
      const citationObjRegex = /\{\s*id:\s*['"`](\d+)['"`].*?text:\s*['"`]([^'"`]+)['"`].*?source:\s*['"`]([^'"`]+)['"`].*?year:\s*['"`]([^'"`]+)['"`].*?link:\s*['"`]([^'"`]*)['"`].*?tier:\s*(\d+)/gs;

      let citMatch;
      let sortOrder = 1;
      while ((citMatch = citationObjRegex.exec(citationsStr)) !== null) {
        const tier = parseInt(citMatch[6], 10);
        let sourceType = 'peer_reviewed';
        if (tier === 2) sourceType = 'government';
        else if (tier === 3) sourceType = 'professional_org';
        else if (tier === 4) sourceType = 'clinical_guideline';
        else if (tier === 5) sourceType = 'textbook';

        // Extract journal name from source if it looks like a journal
        const source = citMatch[3];
        const journalRegex = /journal|proceedings|review|science|medicine|psychiatry|psychology/i;
        const journalName = journalRegex.test(source) ? source : null;

        citations.push({
          sourceType,
          tier,
          title: citMatch[2],
          year: citMatch[4],
          url: citMatch[5] || null,
          journalName,
          sortOrder: sortOrder++,
        });
      }
    }

    // Parse tags
    const tags: string[] = [];
    if (tagsMatch) {
      const tagsStr = tagsMatch[1];
      const tagMatches = tagsStr.matchAll(/['"`]([^'"`]+)['"`]/g);
      for (const tagMatch of tagMatches) {
        tags.push(tagMatch[1]);
      }
    }

    // Estimate word count from readTime (200 words per minute)
    const readTime = readTimeMatch ? parseInt(readTimeMatch[1], 10) : 6;
    const wordCount = readTime * 200;

    articles.push({
      id: `CAT${String(categoryNum).padStart(2, '0')}-${String(articleNum).padStart(3, '0')}`,
      title,
      slug,
      description: descMatch ? descMatch[1] : '',
      category: categoryInfo.name,
      categorySlug: categoryInfo.slug,
      subcategoryName: subcatInfo.name,
      subcategorySlug: subcatSlug,
      tags,
      wordCount,
      authorName: authorMatch ? authorMatch[1].replace('_', ' ') : 'Raima',
      articleType: typeMatch ? typeMatch[1] : 'self_help',
      citationCount: citations.length,
      citations,
      heroImage: imageMatch ? imageMatch[1] : `/images/articles/cat${String(categoryNum).padStart(2, '0')}/cover-${String(articleNum).padStart(3, '0')}.svg`,
      hasCrisisDisclaimer: false,
      isCornerstone: articleNum % 10 === 1, // First article of each subtopic is cornerstone
    });
  }

  return articles;
}

/**
 * Generate SQL for article and citation inserts
 */
function generateSQL(articles: ArticleMetadata[], categoryNum: number, subcatNum: string): string {
  const categoryInfo = CATEGORY_MAPPING[categoryNum];

  if (!categoryInfo) {
    throw new Error(`Unknown category: ${categoryNum}`);
  }

  // Get subcategory info from first article
  const subcatInfo = {
    name: articles[0]?.subcategoryName || slugToName(articles[0]?.subcategorySlug || ''),
    displayOrder: parseInt(subcatNum, 10),
  };

  const _fileName = `seed_category${String(categoryNum).padStart(2, '0')}_subcategory${subcatNum}.sql`;
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const _migrationNum = `${timestamp}${String(parseInt(subcatNum, 10) + 100).padStart(6, '0')}`;

  let sql = `-- ============================================================================
-- Seed: Category ${categoryNum} (${categoryInfo.name}) — Subcategory ${subcatNum}
-- ${articles.length} articles: ${articles[0]?.id} through ${articles[articles.length - 1]?.id}
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Insert Category if not present
-- ---------------------------------------------------------------------------

INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)
VALUES (
  '${categoryInfo.name}',
  '${categoryInfo.slug}',
  '',
  'Brain',
  ${categoryNum},
  100,
  '#0D9488'
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. Insert Subcategory
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${categoryInfo.slug}';

  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)
  VALUES ('${subcatInfo.name}', '${articles[0].subcategorySlug}', v_cat_id, ${subcatInfo.displayOrder})
  ON CONFLICT (slug, category_id) DO NOTHING;
END $$;

-- ---------------------------------------------------------------------------
-- 3. Insert Articles
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_cat_id UUID;
  v_sub_id UUID;
BEGIN
  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${categoryInfo.slug}';
  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = '${articles[0].subcategorySlug}' AND category_id = v_cat_id;

`;

  // Generate INSERT for each article
  for (const article of articles) {
    const tagsArray = article.tags.length > 0
      ? `ARRAY[${article.tags.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}]`
      : `ARRAY[]::text[]`;

    sql += `  -- ${article.id}: ${article.title}
  INSERT INTO public.articles (
    title, slug, status, category, tags, word_count, author_name,
    article_type, article_production_id, category_id, subcategory_id,
    review_stage, seo_description, hero_image_url, citation_count,
    has_crisis_disclaimer, is_cornerstone, published_at, featured
  ) VALUES (
    '${article.title.replace(/'/g, "''")}',
    '${article.slug}',
    'draft',
    '${article.category}',
    ${tagsArray},
    ${article.wordCount},
    '${article.authorName}',
    '${article.articleType}',
    '${article.id}',
    v_cat_id,
    v_sub_id,
    'drafted',
    '${article.description.replace(/'/g, "''")}',
    '${article.heroImage}',
    ${article.citationCount},
    ${article.hasCrisisDisclaimer},
    ${article.isCornerstone},
    NULL,
    FALSE
  ) ON CONFLICT (article_production_id) DO NOTHING;

`;
  }

  sql += `END $$;

-- ---------------------------------------------------------------------------
-- 4. Insert Citations
-- ---------------------------------------------------------------------------

DO $$
DECLARE
  v_art_id UUID;
BEGIN

`;

  // Generate citations for each article
  for (const article of articles) {
    if (article.citations.length === 0) continue;

    sql += `  -- === ${article.id} Citations ===
  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = '${article.id}';
  IF v_art_id IS NOT NULL THEN
    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES
`;

    const citationRows = article.citations.map(cit => {
      const url = cit.url ? `'${cit.url}'` : 'NULL';
      const journal = cit.journalName ? `'${cit.journalName.replace(/'/g, "''")}'` : 'NULL';
      return `      (v_art_id, '${cit.sourceType}', ${cit.tier}, '${cit.title.replace(/'/g, "''")}', '${cit.year}', ${url}, ${journal}, ${cit.sortOrder})`;
    });

    sql += citationRows.join(',\n') + '\n    ON CONFLICT DO NOTHING;\n  END IF;\n\n';
  }

  sql += `END $$;

-- ---------------------------------------------------------------------------
-- 5. Update citation counts and tier percentages
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  ALTER TABLE public.articles DISABLE TRIGGER USER;

  UPDATE public.articles a
  SET citation_count = (
    SELECT COUNT(*) FROM public.article_citations c WHERE c.article_id = a.id
  ),
  tier1_citation_pct = (
    SELECT ROUND(
      100.0 * COUNT(*) FILTER (WHERE c.tier = 1) / NULLIF(COUNT(*), 0),
      1
    )
    FROM public.article_citations c WHERE c.article_id = a.id
  )
  WHERE a.article_production_id LIKE 'CAT${String(categoryNum).padStart(2, '0')}-%';

  ALTER TABLE public.articles ENABLE TRIGGER USER;
END $$;
`;

  return sql;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const categoriesArg = args.find(a => a.startsWith('--categories='))?.split('=')[1];
  const outputDirArg = args.find(a => a.startsWith('--output-dir='))?.split('=')[1];

  const categories = categoriesArg
    ? categoriesArg.split(',').map(Number)
    : [1, 2, 3, 4, 5, 6, 7]; // Default: all 7 categories

  const outputDir = outputDirArg || 'supabase/migrations';

  console.log(`Generating article seeds for categories: ${categories.join(', ')}`);
  console.log(`Output directory: ${outputDir}\n`);

  let totalArticles = 0;

  for (const categoryNum of categories) {
    console.log(`\n📦 Processing Category ${categoryNum}...`);

    // Find all TSX files for this category
    const pattern = `src/data/articles/category-${String(categoryNum).padStart(2, '0')}/*.tsx`;
    const files = await glob(pattern);

    if (files.length === 0) {
      console.warn(`  ⚠️  No files found for category ${categoryNum}`);
      continue;
    }

    // Group files by subcategory
    const filesBySubcat: Record<string, string[]> = {};
    for (const file of files) {
      const subcatMatch = path.basename(file).match(/^(\d+)[ab]-/);
      if (subcatMatch) {
        const subcatNum = subcatMatch[1];
        if (!filesBySubcat[subcatNum]) {
          filesBySubcat[subcatNum] = [];
        }
        filesBySubcat[subcatNum].push(file);
      }
    }

    // Process each subcategory
    for (const [subcatNum, subcatFiles] of Object.entries(filesBySubcat).sort()) {
      console.log(`  📄 Subcategory ${subcatNum}: ${subcatFiles.length} files`);

      const allArticles: ArticleMetadata[] = [];

      for (const file of subcatFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const articles = extractArticleMetadata(content, file);
        allArticles.push(...articles);
      }

      if (allArticles.length === 0) {
        console.warn(`    ⚠️  No articles extracted from subcategory ${subcatNum}`);
        continue;
      }

      // Sort articles by ID
      allArticles.sort((a, b) => a.id.localeCompare(b.id));

      console.log(`    ✓ Extracted ${allArticles.length} articles`);
      totalArticles += allArticles.length;

      // Generate SQL
      const sql = generateSQL(allArticles, categoryNum, subcatNum);

      // Write migration file
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const migrationNum = `${timestamp}${String(categoryNum * 100 + parseInt(subcatNum, 10)).padStart(6, '0')}`;
      const filename = `${migrationNum}_seed_category${String(categoryNum).padStart(2, '0')}_subcategory${subcatNum}.sql`;
      const outputPath = path.join(outputDir, filename);

      fs.writeFileSync(outputPath, sql, 'utf-8');
      console.log(`    ✓ Generated: ${filename}`);
    }
  }

  console.log(`\n✅ Done! Generated seeds for ${totalArticles} articles\n`);
}

main().catch(console.error);
