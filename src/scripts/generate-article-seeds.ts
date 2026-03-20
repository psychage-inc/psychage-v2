/**
 * Generate Article Seed Migrations for Categories 8-15
 *
 * Reads TSX article data from src/data/articles/ and generates SQL migration
 * files following the established seed pattern.
 *
 * Usage: npx tsx src/scripts/generate-article-seeds.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Category metadata (extracted from _shared.ts files)
// ---------------------------------------------------------------------------

interface CategoryMeta {
  catNum: number;
  catPad: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
  articleTarget: number;
  color: string;
  subTopics: string[];
}

const CATEGORIES: CategoryMeta[] = [
  {
    catNum: 8,
    catPad: '08',
    name: 'Habits, Motivation & Behavior Change',
    slug: 'habits-behavior-change',
    description:
      'The psychology of habits, motivation, and behavior change — building routines that support mental health.',
    icon: 'Repeat',
    displayOrder: 8,
    articleTarget: 65,
    color: '#F97316',
    subTopics: [
      'The Science of Habit Formation',
      'Understanding Motivation',
      'Building Healthy Routines',
      'Breaking Unhealthy Patterns',
      'Discipline, Willpower & Self-Control',
      'Stages of Change & Readiness',
      'Systems, Environment & Identity-Based Change',
    ],
  },
  {
    catNum: 9,
    catPad: '09',
    name: 'Sleep, Body & Mind-Body Connection',
    slug: 'sleep-body-connection',
    description:
      'The mind-body connection — sleep science, exercise psychology, nutrition, and somatic awareness for mental wellness.',
    icon: 'Moon',
    displayOrder: 9,
    articleTarget: 60,
    color: '#8B5CF6',
    subTopics: [
      'Sleep Science & Mental Health',
      'Sleep Disorders & Common Problems',
      'Exercise, Movement & Mental Wellness',
      'Nutrition, Gut Health & the Brain',
      'Somatic Awareness & Body-Based Healing',
      'Pain, Chronic Illness & Psychological Impact',
    ],
  },
  {
    catNum: 10,
    catPad: '10',
    name: 'Digital Life, Social Media & Modern Stressors',
    slug: 'digital-life',
    description:
      'Managing digital life, social media impact, screen time, and modern stressors for better mental health.',
    icon: 'Smartphone',
    displayOrder: 10,
    articleTarget: 50,
    color: '#3B82F6',
    subTopics: [
      'Social Media & Mental Health',
      'Screen Time, Digital Habits & Balance',
      'Online Comparison, Cyberbullying & Digital Harm',
      'Information Overload & Doomscrolling',
      'Digital Wellness & Intentional Technology Use',
    ],
  },
  {
    catNum: 11,
    catPad: '11',
    name: 'Trauma-Informed Education & Healing',
    slug: 'trauma-healing',
    description:
      'Understanding trauma, its impact on the brain and body, and evidence-based paths to healing and recovery.',
    icon: 'Shield',
    displayOrder: 11,
    articleTarget: 55,
    color: '#EF4444',
    subTopics: [
      'Understanding Trauma & Its Impact',
      'PTSD & Complex Trauma',
      'Trauma Responses & Survival Patterns',
      'Body-Based Trauma Healing',
      'Trauma-Informed Care & Relationships',
      'Collective Trauma, Resilience & Growth',
    ],
  },
  {
    catNum: 12,
    catPad: '12',
    name: 'Cultural Perspectives, Inclusion & Global Wellness',
    slug: 'cultural-global',
    description:
      'Cultural perspectives on mental health, reducing stigma, and building inclusive approaches to psychological wellness.',
    icon: 'Globe',
    displayOrder: 12,
    articleTarget: 50,
    color: '#06B6D4',
    subTopics: [
      'Mental Health Across Cultures',
      'Stigma, Shame & Help-Seeking',
      'Race, Ethnicity & Mental Health',
      'Immigration, Displacement & Mental Health',
      'Traditional Healing & Global Approaches',
    ],
  },
  {
    catNum: 13,
    catPad: '13',
    name: 'Understanding Mental Health Conditions',
    slug: 'mental-health-conditions',
    description:
      'Clear, research-based explanations of mental health conditions — symptoms, causes, diagnosis, and treatment.',
    icon: 'BookOpen',
    displayOrder: 13,
    articleTarget: 80,
    color: '#14B8A6',
    subTopics: [
      'Anxiety Disorders',
      'Mood Disorders',
      'Trauma & Dissociative Disorders',
      'OCD Spectrum & Impulse Control Disorders',
      'Neurodevelopmental Conditions',
      'Eating Disorders',
      'Substance Use, Sleep & Somatic Disorders',
      'Psychotic, Personality & Adjustment Disorders',
    ],
  },
  {
    catNum: 14,
    catPad: '14',
    name: 'Therapy, Treatment & Mental Health Navigation',
    slug: 'therapy-navigation',
    description:
      'Navigating the therapy landscape — types of therapy, medication, finding providers, and the mental health system.',
    icon: 'MessageCircle',
    displayOrder: 14,
    articleTarget: 50,
    color: '#22C55E',
    subTopics: [
      'Types of Therapy Explained',
      'Medication & Pharmacological Treatment',
      'Your First Steps into Treatment',
      'Navigating the Mental Health System',
      'Supporting Someone in Treatment',
    ],
  },
  {
    catNum: 15,
    catPad: '15',
    name: 'Loneliness, Social Connection & Belonging',
    slug: 'loneliness-connection',
    description:
      'Understanding loneliness, building social connection, and finding belonging in an increasingly disconnected world.',
    icon: 'Users',
    displayOrder: 15,
    articleTarget: 50,
    color: '#EC4899',
    subTopics: [
      'The Science of Loneliness & Social Connection',
      'Loneliness Across the Lifespan',
      'Building & Deepening Friendships',
      'Community, Belonging & Purpose',
      'Digital Connection & Modern Isolation',
    ],
  },
];

// ---------------------------------------------------------------------------
// Slugify helper
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// SQL escape helper
// ---------------------------------------------------------------------------
function esc(str: string): string {
  return str.replace(/'/g, "''");
}

// ---------------------------------------------------------------------------
// Source type inference from tier
// ---------------------------------------------------------------------------
function inferSourceType(tier: number): string {
  switch (tier) {
    case 1:
      return 'peer_reviewed';
    case 2:
      return 'government';
    case 3:
      return 'professional_org';
    case 4:
      return 'clinical_guideline';
    case 5:
      return 'reference';
    default:
      return 'reference';
  }
}

// ---------------------------------------------------------------------------
// Extract article number from catId format (e.g., 'cat08-031' → 31)
// ---------------------------------------------------------------------------
function extractArticleNum(id: string, catPad: string): number {
  const prefix = `cat${catPad}-`;
  if (typeof id === 'string' && id.startsWith(prefix)) {
    return parseInt(id.slice(prefix.length), 10) || 0;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Derive production ID from article's internal id (cat08-001 → CAT08-001)
// ---------------------------------------------------------------------------
function toProdId(id: string): string {
  if (typeof id === 'string' && id.match(/^cat\d{2}-\d{3}$/)) {
    return id.toUpperCase();
  }
  return id?.toString().toUpperCase() || '';
}

// ---------------------------------------------------------------------------
// Main generation logic
// ---------------------------------------------------------------------------
async function main() {
  const projectRoot = path.resolve(__dirname, '../..');
  const migrationsDir = path.join(projectRoot, 'supabase/migrations');
  const dataDir = path.join(projectRoot, 'src/data/articles');

  let totalFiles = 0;
  let totalArticles = 0;
  let totalCitations = 0;

  for (const cat of CATEGORIES) {
    console.log(`\n📦 Processing Category ${cat.catNum}: ${cat.name}`);

    // Dynamically import the category module
    const catDir = path.join(dataDir, `category-${cat.catPad}`);
    const indexPath = path.join(catDir, 'index.ts');

    if (!fs.existsSync(indexPath)) {
      console.warn(`  ⚠️  No index.ts found at ${indexPath}, skipping`);
      continue;
    }

    // Import the module — tsx handles TSX transpilation
    const catModule = await import(indexPath);

    // Flatten all exported arrays into a single articles list
    const articles: any[] = [];
    for (const [_key, value] of Object.entries(catModule)) {
      if (Array.isArray(value)) {
        articles.push(...value);
      }
    }

    // Sort articles by their internal ID number (e.g., cat08-001 → 1)
    articles.sort((a, b) => {
      const numA = extractArticleNum(a.id, cat.catPad);
      const numB = extractArticleNum(b.id, cat.catPad);
      return numA - numB;
    });

    console.log(`  📄 Found ${articles.length} articles`);

    // Group articles into subcategories (10 per subcategory)
    const subcatGroups: any[][] = [];
    for (let i = 0; i < articles.length; i += 10) {
      subcatGroups.push(articles.slice(i, i + 10));
    }

    // Ensure we don't exceed the defined subtopics
    const numSubcats = Math.min(subcatGroups.length, cat.subTopics.length);

    // If there are more articles than subtopics * 10, put extras in the last group
    if (subcatGroups.length > cat.subTopics.length) {
      const lastIdx = cat.subTopics.length - 1;
      for (let i = cat.subTopics.length; i < subcatGroups.length; i++) {
        subcatGroups[lastIdx].push(...subcatGroups[i]);
      }
      subcatGroups.length = cat.subTopics.length;
    }

    for (let subIdx = 0; subIdx < numSubcats; subIdx++) {
      const subName = cat.subTopics[subIdx];
      const subSlug = slugify(subName);
      const subArticles = subcatGroups[subIdx];
      const subNum = String(subIdx + 1).padStart(2, '0');

      // Migration file naming: 20260321CCSS01 where CC=cat num, SS=subcat num
      const migrationName = `20260321${cat.catPad}${subNum}01_seed_category${cat.catPad}_subcategory${subNum}.sql`;
      const migrationPath = path.join(migrationsDir, migrationName);

      // Compute article range from actual IDs
      const startProdId = toProdId(subArticles[0]?.id || '');
      const endProdId = toProdId(subArticles[subArticles.length - 1]?.id || '');

      let sql = '';

      // Header
      sql += `-- ============================================================================\n`;
      sql += `-- Seed: Category ${cat.catNum} (${cat.name}) — Subcategory ${subNum}\n`;
      sql += `-- ${subArticles.length} articles: ${startProdId} through ${endProdId}\n`;
      sql += `-- ============================================================================\n\n`;

      // Section 1: Insert Category
      sql += `-- ---------------------------------------------------------------------------\n`;
      sql += `-- 1. Insert Category if not present\n`;
      sql += `-- ---------------------------------------------------------------------------\n\n`;
      sql += `INSERT INTO public.article_categories (name, slug, description, icon, display_order, article_target, color)\n`;
      sql += `VALUES (\n`;
      sql += `  '${esc(cat.name)}',\n`;
      sql += `  '${esc(cat.slug)}',\n`;
      sql += `  '${esc(cat.description)}',\n`;
      sql += `  '${esc(cat.icon)}',\n`;
      sql += `  ${cat.displayOrder},\n`;
      sql += `  ${cat.articleTarget},\n`;
      sql += `  '${esc(cat.color)}'\n`;
      sql += `)\nON CONFLICT (slug) DO NOTHING;\n\n`;

      // Section 2: Insert Subcategory
      sql += `-- ---------------------------------------------------------------------------\n`;
      sql += `-- 2. Insert Subcategory\n`;
      sql += `-- ---------------------------------------------------------------------------\n\n`;
      sql += `DO $$\nDECLARE\n  v_cat_id UUID;\nBEGIN\n`;
      sql += `  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${esc(cat.slug)}';\n\n`;
      sql += `  INSERT INTO public.article_subcategories (name, slug, category_id, display_order)\n`;
      sql += `  VALUES ('${esc(subName)}', '${esc(subSlug)}', v_cat_id, ${subIdx + 1})\n`;
      sql += `  ON CONFLICT (slug, category_id) DO NOTHING;\nEND $$;\n\n`;

      // Section 3: Insert Articles
      sql += `-- ---------------------------------------------------------------------------\n`;
      sql += `-- 3. Insert Articles\n`;
      sql += `-- ---------------------------------------------------------------------------\n\n`;
      sql += `DO $$\nDECLARE\n  v_cat_id UUID;\n  v_sub_id UUID;\nBEGIN\n`;
      sql += `  SELECT id INTO v_cat_id FROM public.article_categories WHERE slug = '${esc(cat.slug)}';\n`;
      sql += `  SELECT id INTO v_sub_id FROM public.article_subcategories WHERE slug = '${esc(subSlug)}' AND category_id = v_cat_id;\n\n`;

      for (let artIdx = 0; artIdx < subArticles.length; artIdx++) {
        const art = subArticles[artIdx];
        const prodId = toProdId(art.id);
        const isFirst = artIdx === 0;
        const citCount = art.citations?.length || 0;
        const wordCount = Math.round((art.description?.length || 200) * 1.2) + 800;
        const tags = (art.tags || []) as string[];
        const tagsArray = `ARRAY[${tags.map((t: string) => `'${esc(t)}'`).join(', ')}]`;
        const authorName = art.author?.name || 'Dr. Sarah Chen';
        const articleType = art.articleType || 'self_help';
        const hasCrisis = tags.some(
          (t: string) =>
            t.toLowerCase().includes('crisis') ||
            t.toLowerCase().includes('suicide') ||
            t.toLowerCase().includes('safety')
        );

        sql += `  -- ${prodId}: ${esc(art.title)}\n`;
        sql += `  INSERT INTO public.articles (\n`;
        sql += `    title, slug, status, category, tags, word_count, author_name,\n`;
        sql += `    article_type, article_production_id, category_id, subcategory_id,\n`;
        sql += `    review_stage, seo_description, hero_image_url, citation_count,\n`;
        sql += `    has_crisis_disclaimer, is_cornerstone, published_at, featured\n`;
        sql += `  ) VALUES (\n`;
        sql += `    '${esc(art.title)}',\n`;
        sql += `    '${esc(art.slug)}',\n`;
        sql += `    'draft',\n`;
        sql += `    '${esc(cat.name)}',\n`;
        sql += `    ${tagsArray},\n`;
        sql += `    ${wordCount},\n`;
        sql += `    '${esc(authorName)}',\n`;
        sql += `    '${esc(articleType)}',\n`;
        sql += `    '${esc(prodId)}',\n`;
        sql += `    v_cat_id,\n`;
        sql += `    v_sub_id,\n`;
        sql += `    'drafted',\n`;
        sql += `    '${esc(art.description || '')}',\n`;
        sql += `    '${esc(art.image || `/images/articles/cat${cat.catPad}/cover-${String(artIdx + 1).padStart(3, '0')}.svg`)}',\n`;
        sql += `    ${citCount},\n`;
        sql += `    ${hasCrisis},\n`;
        sql += `    ${isFirst},\n`;
        sql += `    NULL,\n`;
        sql += `    FALSE\n`;
        sql += `  ) ON CONFLICT (article_production_id) DO NOTHING;\n\n`;
      }

      sql += `END $$;\n\n`;

      // Section 4: Insert Citations
      const articlesWithCitations = subArticles.filter(
        (a: any) => a.citations && a.citations.length > 0
      );

      if (articlesWithCitations.length > 0) {
        sql += `-- ---------------------------------------------------------------------------\n`;
        sql += `-- 4. Insert Citations\n`;
        sql += `-- ---------------------------------------------------------------------------\n\n`;
        sql += `DO $$\nDECLARE\n  v_art_id UUID;\nBEGIN\n\n`;

        for (let artIdx = 0; artIdx < subArticles.length; artIdx++) {
          const art = subArticles[artIdx];
          if (!art.citations || art.citations.length === 0) continue;

          const prodId = toProdId(art.id);

          sql += `  -- === ${prodId} Citations ===\n`;
          sql += `  SELECT id INTO v_art_id FROM public.articles WHERE article_production_id = '${esc(prodId)}';\n`;
          sql += `  IF v_art_id IS NOT NULL THEN\n`;
          sql += `    INSERT INTO public.article_citations (article_id, source_type, tier, title, year, url, journal_name, sort_order) VALUES\n`;

          const citLines: string[] = [];
          for (const cit of art.citations) {
            const sourceType = inferSourceType(cit.tier || 5);
            const year = cit.year ? `'${esc(String(cit.year))}'` : 'NULL';
            const url = cit.link ? `'${esc(cit.link)}'` : 'NULL';
            const journal =
              cit.journalName || cit.source
                ? `'${esc(cit.journalName || cit.source)}'`
                : 'NULL';
            const sortOrder = parseInt(cit.id, 10) || 0;

            citLines.push(
              `      (v_art_id, '${sourceType}', ${cit.tier || 5}, '${esc(cit.text || '')}', ${year}, ${url}, ${journal}, ${sortOrder})`
            );
            totalCitations++;
          }

          sql += citLines.join(',\n') + '\n';
          sql += `    ON CONFLICT DO NOTHING;\n`;
          sql += `  END IF;\n\n`;
        }

        sql += `END $$;\n\n`;
      }

      // Section 5: Update citation counts
      sql += `-- ---------------------------------------------------------------------------\n`;
      sql += `-- 5. Update citation counts and tier percentages\n`;
      sql += `-- ---------------------------------------------------------------------------\n\n`;
      sql += `DO $$\nBEGIN\n`;
      sql += `  ALTER TABLE public.articles DISABLE TRIGGER USER;\n\n`;
      sql += `  UPDATE public.articles a\n`;
      sql += `  SET citation_count = (\n`;
      sql += `    SELECT COUNT(*) FROM public.article_citations c WHERE c.article_id = a.id\n`;
      sql += `  ),\n`;
      sql += `  tier1_citation_pct = (\n`;
      sql += `    SELECT ROUND(\n`;
      sql += `      100.0 * COUNT(*) FILTER (WHERE c.tier = 1) / NULLIF(COUNT(*), 0),\n`;
      sql += `      1\n`;
      sql += `    )\n`;
      sql += `    FROM public.article_citations c WHERE c.article_id = a.id\n`;
      sql += `  )\n`;
      sql += `  WHERE a.article_production_id LIKE 'CAT${cat.catPad}-%';\n\n`;
      sql += `  ALTER TABLE public.articles ENABLE TRIGGER USER;\nEND $$;\n`;

      // Write the file
      fs.writeFileSync(migrationPath, sql, 'utf-8');
      totalFiles++;
      totalArticles += subArticles.length;

      console.log(
        `  ✅ ${migrationName} — ${subArticles.length} articles, ${articlesWithCitations.reduce((s: number, a: any) => s + (a.citations?.length || 0), 0)} citations`
      );
    }
  }

  console.log(`\n🎉 Done! Generated ${totalFiles} migration files`);
  console.log(`   📄 ${totalArticles} articles total`);
  console.log(`   📚 ${totalCitations} citations total`);
  console.log(`\nNext steps:`);
  console.log(`  1. Review generated files in supabase/migrations/`);
  console.log(`  2. Run: supabase db push (or supabase migration up)`);
  console.log(
    `  3. Run: npx tsx src/scripts/seed-article-content.ts (to seed HTML content)`
  );
}

main().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
