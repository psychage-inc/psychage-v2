#!/usr/bin/env npx tsx
// ============================================================================
// Generate SQL migration for categories 23-31 (subcategories + article seeds)
// Usage: npx tsx scripts/generate-category-migration.ts > supabase/migrations/XXXXXXXX.sql
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTICLES_DIR = path.join(__dirname, '..', 'src', 'data', 'articles');

// ---------------------------------------------------------------------------
// Category definitions for 29-31 (missing from DB entirely)
// ---------------------------------------------------------------------------
const NEW_CATEGORIES: Record<number, {
  name: string; slug: string; description: string;
  icon: string; color: string; articleTarget: number;
}> = {
  29: {
    name: 'Environmental, Eco-Psychology & Planetary Mental Health',
    slug: 'environmental-eco-psychology',
    description: 'The psychological dimensions of our relationship with the natural world — eco-anxiety, climate grief, nature-based therapy, urban psychology, and environmental justice.',
    icon: 'Leaf', color: '#059669', articleTarget: 70,
  },
  30: {
    name: 'Applied Life Skills, Self-Design & Practical Psychology',
    slug: 'life-skills-practical-psychology',
    description: 'Practical psychology for everyday life — decision-making, emotional intelligence, communication, productivity, habit formation, financial psychology, and the examined life.',
    icon: 'Lightbulb', color: '#D97706', articleTarget: 110,
  },
  31: {
    name: 'Spirituality, Meaning & Existential Mental Health',
    slug: 'spirituality-meaning',
    description: 'Evidence-based exploration of existential psychology — confronting questions of meaning, mortality, freedom, and isolation through philosophical frameworks and therapeutic approaches.',
    icon: 'Sun', color: '#7C3AED', articleTarget: 60,
  },
};

// ---------------------------------------------------------------------------
// Subcategory data from _shared.ts files (categories 23-31)
// ---------------------------------------------------------------------------
interface SubcategoryInfo {
  name: string;
  slug: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readSharedFile(catNum: number): { categorySlug: string; subtopics: SubcategoryInfo[] } {
  const dir = path.join(ARTICLES_DIR, `category-${String(catNum).padStart(2, '0')}`);
  const shared = fs.readFileSync(path.join(dir, '_shared.ts'), 'utf8');

  // Extract slug
  const slugMatch = shared.match(/slug:\s*'([^']+)'/);
  const categorySlug = slugMatch?.[1] || '';

  // Extract subTopics array
  const subTopicsMatch = shared.match(/subTopics:\s*\[([\s\S]*?)\]/);
  const subtopics: SubcategoryInfo[] = [];
  if (subTopicsMatch) {
    const items = subTopicsMatch[1].matchAll(/'([^']+)'/g);
    for (const item of items) {
      const name = item[1];
      subtopics.push({ name, slug: slugify(name) });
    }
  }

  return { categorySlug, subtopics };
}

// ---------------------------------------------------------------------------
// Article extraction from TSX files
// ---------------------------------------------------------------------------
interface ArticleMeta {
  num: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  wordCount: number;
  subcategorySlug: string;
  featured: boolean;
}

function extractArticles(catNum: number, subcategories: SubcategoryInfo[]): ArticleMeta[] {
  const dir = path.join(ARTICLES_DIR, `category-${String(catNum).padStart(2, '0')}`);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();
  const articles: ArticleMeta[] = [];
  const seenNums = new Set<number>();

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Determine subcategory from filename
    const fileBase = file.replace(/\.tsx$/, '');
    let subcategorySlug = '';
    for (const sub of subcategories) {
      if (fileBase.includes(sub.slug) || slugify(fileBase.replace(/^\d+-/, '')) === sub.slug) {
        subcategorySlug = sub.slug;
        break;
      }
    }
    if (!subcategorySlug && subcategories.length > 0) {
      // Fall back to matching by file order number
      const fileNumMatch = fileBase.match(/^(\d+)/);
      if (fileNumMatch) {
        const idx = parseInt(fileNumMatch[1]) - 1;
        if (idx >= 0 && idx < subcategories.length) {
          subcategorySlug = subcategories[idx].slug;
        }
      }
    }

    // Extract article objects using catId pattern
    const idRegex = /id:\s*catId\((\d+)\)/g;
    let match;
    while ((match = idRegex.exec(content)) !== null) {
      const num = parseInt(match[1]);
      if (seenNums.has(num)) continue;
      seenNums.add(num);

      // Extract surrounding block for this article
      const startSearch = Math.max(0, match.index - 200);
      const endSearch = Math.min(content.length, match.index + 3000);
      const block = content.substring(startSearch, endSearch);

      // Title - look after the id line
      const afterId = content.substring(match.index, match.index + 2000);
      const titleMatch = afterId.match(/title:\s*(?:'|`)([\s\S]*?)(?:'|`)\s*,/);
      const title = titleMatch?.[1]?.replace(/\n/g, ' ').trim() || `Article ${num}`;

      // Slug
      const slugMatch = afterId.match(/slug:\s*'([^']+)'/);
      const articleSlug = slugMatch?.[1] || slugify(title);

      // Description/summary
      const descMatch = afterId.match(/(?:description|summary):\s*(?:'|`)([\s\S]*?)(?:'|`)\s*,/);
      const description = descMatch?.[1]?.replace(/\n/g, ' ').replace(/\\/g, '').trim().substring(0, 300) || '';

      // Tags
      const tagsMatch = afterId.match(/tags:\s*\[([\s\S]*?)\]/);
      const tags: string[] = [];
      if (tagsMatch) {
        const tagItems = tagsMatch[1].matchAll(/'([^']+)'/g);
        for (const t of tagItems) {
          if (tags.length < 5) tags.push(t[1]);
        }
      }

      // Word count estimate
      const wcMatch = afterId.match(/word_count:\s*(\d+)/);
      const wordCount = wcMatch ? parseInt(wcMatch[1]) : 1200;

      articles.push({
        num,
        title: title.substring(0, 200),
        slug: articleSlug,
        description: description.substring(0, 300),
        tags,
        wordCount,
        subcategorySlug,
        featured: num === 1,
      });
    }
  }

  return articles.sort((a, b) => a.num - b.num);
}

// ---------------------------------------------------------------------------
// Category names for the `category` column (full names, not slugs)
// ---------------------------------------------------------------------------
const CATEGORY_NAMES: Record<number, string> = {
  23: 'Brain, Neuroscience & Biological Basis',
  24: 'Creativity & Therapeutic Arts',
  25: 'Disability, Accessibility & Psychological Inclusion',
  26: 'Forensic Psychology & Criminal Justice Mental Health',
  27: 'Military, Veterans & First Responder Mental Health',
  28: 'Sexuality, Intimacy & Sexual Health',
  29: 'Environmental, Eco-Psychology & Planetary Mental Health',
  30: 'Applied Life Skills, Self-Design & Practical Psychology',
  31: 'Spirituality, Meaning & Existential Mental Health',
};

// ---------------------------------------------------------------------------
// SQL generation
// ---------------------------------------------------------------------------
function escSql(s: string): string {
  return s.replace(/'/g, "''");
}

function generateMigration(): string {
  const lines: string[] = [];

  lines.push('-- ============================================================================');
  lines.push('-- Complete Category Alignment: Categories 23-31');
  lines.push('-- Adds missing categories (29-31), subcategories (23-31), and article seeds');
  lines.push('-- Generated: ' + new Date().toISOString().split('T')[0]);
  lines.push('-- ============================================================================');
  lines.push('');

  // -----------------------------------------------------------------------
  // Section 1: New category definitions (29-31)
  // -----------------------------------------------------------------------
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('-- 1. Insert Categories 29-31 (completely new)');
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('');

  for (const [catNum, cat] of Object.entries(NEW_CATEGORIES)) {
    lines.push(`INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)`);
    lines.push(`VALUES (`);
    lines.push(`  '${escSql(cat.name)}',`);
    lines.push(`  '${escSql(cat.slug)}',`);
    lines.push(`  '${escSql(cat.description)}',`);
    lines.push(`  '${cat.icon}',`);
    lines.push(`  ${catNum},`);
    lines.push(`  ${cat.articleTarget},`);
    lines.push(`  '${cat.color}'`);
    lines.push(`) ON CONFLICT (slug) DO UPDATE SET`);
    lines.push(`  display_order = EXCLUDED.display_order,`);
    lines.push(`  name = EXCLUDED.name,`);
    lines.push(`  description = EXCLUDED.description,`);
    lines.push(`  icon = EXCLUDED.icon,`);
    lines.push(`  article_target = EXCLUDED.article_target,`);
    lines.push(`  color = EXCLUDED.color;`);
    lines.push('');
  }

  // -----------------------------------------------------------------------
  // Section 2: Subcategories for 23-31
  // -----------------------------------------------------------------------
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('-- 2. Insert Subcategories for Categories 23-31');
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('');

  for (let catNum = 23; catNum <= 31; catNum++) {
    const { categorySlug, subtopics } = readSharedFile(catNum);
    if (subtopics.length === 0) continue;

    lines.push(`-- Category ${catNum}: ${categorySlug}`);
    lines.push(`DO $$`);
    lines.push(`DECLARE`);
    lines.push(`  v_cat_id UUID;`);
    lines.push(`BEGIN`);
    lines.push(`  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${escSql(categorySlug)}';`);
    lines.push('');

    subtopics.forEach((sub, idx) => {
      lines.push(`  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)`);
      lines.push(`  VALUES ('${escSql(sub.name)}', '${escSql(sub.slug)}', v_cat_id, ${idx + 1})`);
      lines.push(`  ON CONFLICT (slug, category_id) DO NOTHING;`);
      lines.push('');
    });

    lines.push(`END $$;`);
    lines.push('');
  }

  // -----------------------------------------------------------------------
  // Section 3: Article seeds for 23-31
  // -----------------------------------------------------------------------
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('-- 3. Seed Articles for Categories 23-31');
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('');

  let totalArticles = 0;

  for (let catNum = 23; catNum <= 31; catNum++) {
    const { categorySlug, subtopics } = readSharedFile(catNum);
    const articles = extractArticles(catNum, subtopics);

    if (articles.length === 0) continue;

    lines.push(`-- Category ${catNum}: ${categorySlug} (${articles.length} articles)`);
    lines.push(`DO $$`);
    lines.push(`DECLARE`);
    lines.push(`  v_cat_id UUID;`);
    lines.push(`  v_sub_id UUID;`);
    lines.push(`BEGIN`);
    lines.push(`  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${escSql(categorySlug)}';`);
    lines.push('');

    // Group articles by subcategory
    const bySubcat = new Map<string, ArticleMeta[]>();
    for (const art of articles) {
      const key = art.subcategorySlug || '_default';
      if (!bySubcat.has(key)) bySubcat.set(key, []);
      bySubcat.get(key)!.push(art);
    }

    for (const [subSlug, subArticles] of bySubcat) {
      if (subSlug !== '_default') {
        lines.push(`  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = '${escSql(subSlug)}' AND category_id = v_cat_id;`);
      } else {
        lines.push(`  v_sub_id := NULL;`);
      }
      lines.push('');

      for (const art of subArticles) {
        const prodId = `CAT${String(catNum).padStart(2, '0')}-${String(art.num).padStart(3, '0')}`;
        const tagsArray = art.tags.length > 0
          ? `ARRAY[${art.tags.map(t => `'${escSql(t)}'`).join(', ')}]`
          : `ARRAY[]::TEXT[]`;
        const catName = CATEGORY_NAMES[catNum] || categorySlug;

        lines.push(`  -- ${prodId}: ${escSql(art.title).substring(0, 60)}`);
        lines.push(`  INSERT INTO public.articles (`);
        lines.push(`    title, slug, status, category, tags, word_count, author_name,`);
        lines.push(`    article_type, article_production_id, category_id, subcategory_id,`);
        lines.push(`    review_stage, seo_description, hero_image_url, citation_count,`);
        lines.push(`    has_crisis_disclaimer, is_cornerstone, published_at, featured`);
        lines.push(`  ) VALUES (`);
        lines.push(`    '${escSql(art.title)}',`);
        lines.push(`    '${escSql(art.slug)}',`);
        lines.push(`    'draft',`);
        lines.push(`    '${escSql(catName)}',`);
        lines.push(`    ${tagsArray},`);
        lines.push(`    ${art.wordCount},`);
        lines.push(`    'Psychage Editorial Team',`);
        lines.push(`    'self_help',`);
        lines.push(`    '${prodId}',`);
        lines.push(`    v_cat_id,`);
        lines.push(`    v_sub_id,`);
        lines.push(`    'drafted',`);
        lines.push(`    '${escSql(art.description)}',`);
        lines.push(`    '/images/articles/cat${String(catNum).padStart(2, '0')}/cover-${String(art.num).padStart(3, '0')}.svg',`);
        lines.push(`    5,`);
        lines.push(`    false,`);
        lines.push(`    ${art.num === 1 ? 'true' : 'false'},`);
        lines.push(`    NULL,`);
        lines.push(`    ${art.featured ? 'TRUE' : 'FALSE'}`);
        lines.push(`  ) ON CONFLICT (article_production_id) DO NOTHING;`);
        lines.push('');
        totalArticles++;
      }
    }

    lines.push(`END $$;`);
    lines.push('');
  }

  // -----------------------------------------------------------------------
  // Section 4: Updated production ID function
  // -----------------------------------------------------------------------
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('-- 4. Update Production ID Generator (add prefixes for 29-31)');
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('');
  lines.push(`CREATE OR REPLACE FUNCTION public.generate_article_production_id(p_category_slug TEXT)`);
  lines.push(`RETURNS TEXT AS $$`);
  lines.push(`DECLARE`);
  lines.push(`  v_prefix TEXT;`);
  lines.push(`  v_seq INTEGER;`);
  lines.push(`  v_map JSONB := '{`);
  lines.push(`    "anxiety-stress": "ANX",`);
  lines.push(`    "depression-mood": "DEP",`);
  lines.push(`    "relationships-social": "REL",`);
  lines.push(`    "trauma-ptsd": "TRM",`);
  lines.push(`    "neurodevelopmental": "NDV",`);
  lines.push(`    "substance-addiction": "SUB",`);
  lines.push(`    "sleep-circadian": "SLP",`);
  lines.push(`    "self-esteem-identity": "EST",`);
  lines.push(`    "therapy-treatment": "THR",`);
  lines.push(`    "workplace-academic": "WRK",`);
  lines.push(`    "life-transitions": "LIF",`);
  lines.push(`    "children-adolescents": "CHD",`);
  lines.push(`    "eating-body": "EAT",`);
  lines.push(`    "ocd-related": "OCD",`);
  lines.push(`    "global-cultural": "GLB",`);
  lines.push(`    "psychosis-schizophrenia": "PSC",`);
  lines.push(`    "aging-dementia-late-life": "AGE",`);
  lines.push(`    "womens-mental-health": "WMH",`);
  lines.push(`    "mens-mental-health": "MMH",`);
  lines.push(`    "chronic-illness-pain": "CIP",`);
  lines.push(`    "technology-digital-life": "TDL",`);
  lines.push(`    "spirituality-meaning": "SPR",`);
  lines.push(`    "brain-neuroscience": "BRN",`);
  lines.push(`    "creativity-therapeutic-arts": "CRE",`);
  lines.push(`    "disability-accessibility": "DIS",`);
  lines.push(`    "forensic-legal-justice": "FOR",`);
  lines.push(`    "military-veterans-firstresponder": "MIL",`);
  lines.push(`    "sexuality-intimacy": "SEX",`);
  lines.push(`    "environmental-eco-psychology": "ENV",`);
  lines.push(`    "life-skills-practical-psychology": "LFS"`);
  lines.push(`  }'::JSONB;`);
  lines.push(`BEGIN`);
  lines.push(`  v_prefix := v_map ->> p_category_slug;`);
  lines.push(`  IF v_prefix IS NULL THEN`);
  lines.push(`    RAISE EXCEPTION 'Unknown category slug: %', p_category_slug;`);
  lines.push(`  END IF;`);
  lines.push('');
  lines.push(`  SELECT COALESCE(MAX(`);
  lines.push(`    CAST(SPLIT_PART(article_production_id, '-', 3) AS INTEGER)`);
  lines.push(`  ), 0) + 1`);
  lines.push(`  INTO v_seq`);
  lines.push(`  FROM public.articles`);
  lines.push(`  WHERE article_production_id LIKE 'PSY-' || v_prefix || '-%';`);
  lines.push('');
  lines.push(`  RETURN 'PSY-' || v_prefix || '-' || LPAD(v_seq::TEXT, 3, '0');`);
  lines.push(`END;`);
  lines.push(`$$ LANGUAGE plpgsql;`);
  lines.push('');

  // -----------------------------------------------------------------------
  // Section 5: Verification
  // -----------------------------------------------------------------------
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push(`-- 5. Verification (${totalArticles} articles seeded)`);
  lines.push('-- ---------------------------------------------------------------------------');
  lines.push('');
  lines.push('-- Verify categories:');
  lines.push('-- SELECT display_order, name, slug, article_target');
  lines.push('-- FROM public.article_categories');
  lines.push('-- WHERE display_order >= 23');
  lines.push('-- ORDER BY display_order;');
  lines.push('');
  lines.push('-- Verify subcategory counts:');
  lines.push('-- SELECT c.name, COUNT(s.id) as subcategories');
  lines.push('-- FROM public.article_categories c');
  lines.push('-- LEFT JOIN public.article_subcategories s ON s.category_id = c.id');
  lines.push('-- WHERE c.display_order >= 23');
  lines.push('-- GROUP BY c.name, c.display_order');
  lines.push('-- ORDER BY c.display_order;');
  lines.push('');
  lines.push('-- Verify article counts per category:');
  lines.push('-- SELECT c.name, COUNT(a.id) as articles');
  lines.push('-- FROM public.article_categories c');
  lines.push('-- LEFT JOIN public.articles a ON a.category_id = c.id');
  lines.push('-- WHERE c.display_order >= 23');
  lines.push('-- GROUP BY c.name, c.display_order');
  lines.push('-- ORDER BY c.display_order;');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
const sql = generateMigration();
console.log(sql);

// Also write to file
const migrationPath = path.join(
  __dirname, '..', 'supabase', 'migrations',
  '20260412000001_align_categories_23_31.sql'
);
fs.writeFileSync(migrationPath, sql);
console.error(`\n✓ Written to ${migrationPath}`);
console.error(`  Categories 29-31 defined`);
console.error(`  Subcategories for 23-31 inserted`);
console.error(`  Production ID function updated with all 31 categories`);
