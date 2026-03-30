#!/usr/bin/env tsx

/**
 * Seed Batch 2 Articles into Supabase
 *
 * Reads markdown files from articles/batch2/ directories,
 * parses YAML frontmatter, and inserts into Supabase articles table.
 *
 * Usage:
 *   npm install gray-matter glob @supabase/supabase-js
 *   npx tsx scripts/seed-batch2-articles.ts
 *
 * Options:
 *   --dry-run      Preview SQL without executing
 *   --status=draft Set article status (default: draft)
 */

import { createClient } from '@supabase/supabase-js'
import matter from 'gray-matter'
import { glob } from 'glob'
import * as fs from 'fs/promises'
import * as path from 'path'
import { randomUUID } from 'crypto'

// ============================================================================
// Configuration
// ============================================================================

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const DEFAULT_STATUS = args.find(arg => arg.startsWith('--status='))?.split('=')[1] || 'draft'

// ============================================================================
// Category Mapping (String → UUID)
// ============================================================================

interface Category {
  id: string
  name: string
  slug: string
}

let categoryCache: Category[] = []

async function getCategoryIdByName(categoryName: string): Promise<string | null> {
  if (categoryCache.length === 0) {
    const { data, error } = await supabase
      .from('article_categories')
      .select('id, name, slug')

    if (error) {
      console.error('❌ Failed to load categories:', error)
      return null
    }

    categoryCache = data || []
  }

  // Try exact match first
  let category = categoryCache.find(c => c.name === categoryName)

  // Try slug match (case-insensitive, normalized)
  if (!category) {
    const normalizedName = categoryName.toLowerCase()
      .replace(/[&,]/g, '')
      .replace(/\s+/g, '-')
    category = categoryCache.find(c => c.slug.includes(normalizedName.substring(0, 15)))
  }

  // Fallback mappings for known batch 2 categories
  if (!category) {
    const fallbacks: Record<string, string> = {
      'Brain & Neuroscience': 'brain-neuroscience',
      'Neurobiology & Brain Science': 'brain-neuroscience',
      'Creativity & Therapeutic Arts': 'creativity-therapeutic-arts',
      'Disability, Accessibility & Psychological Inclusion': 'disability-accessibility',
      'Forensic, Legal & Criminal Justice Mental Health': 'forensic-legal-justice',
      'Military, Veterans & First Responder Mental Health': 'military-veterans-firstresponder',
      'Sexuality, Intimacy & Sexual Health': 'sexuality-intimacy',
      'Spirituality, Existentialism & Meaning-Making': 'spirituality-meaning',
      'Spirituality, Meaning & Existential Mental Health': 'spirituality-meaning',
    }

    const slug = fallbacks[categoryName]
    if (slug) {
      category = categoryCache.find(c => c.slug === slug)
    }
  }

  if (!category) {
    console.warn(`⚠️  Category not found: "${categoryName}"`)
    return null
  }

  return category.id
}

// ============================================================================
// Article Parsing & Seeding
// ============================================================================

interface ArticleFrontmatter {
  id: string
  global_number: number
  title: string
  slug: string
  category: string
  subcategory: string
  template: string
  author: string
  clinical_reviewer: string
  status: string
  word_count: number
  reading_time: string
  date_created: string
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  citations_count: number
  source_categories_represented: number
  crisis_content: boolean
}

async function parseArticleFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as ArticleFrontmatter

  return {
    frontmatter,
    content: content.trim(),
    filePath
  }
}

async function seedArticle(article: Awaited<ReturnType<typeof parseArticleFile>>) {
  const { frontmatter, content, filePath } = article

  // Get category ID
  const categoryId = await getCategoryIdByName(frontmatter.category)
  if (!categoryId) {
    console.error(`❌ Skipping ${path.basename(filePath)} - category not found: ${frontmatter.category}`)
    return { success: false, slug: frontmatter.slug, error: 'Category not found' }
  }

  // Parse reading time (e.g., "9 min" → 9)
  const readTime = parseInt(frontmatter.reading_time.replace(/\D/g, '')) || null

  // Generate production ID (PSY-XXX-NNN)
  const articleId = frontmatter.id || `PSY-UNK-${frontmatter.global_number.toString().padStart(3, '0')}`

  // Build article record
  const articleRecord = {
    id: randomUUID(),
    slug: frontmatter.slug,
    title: frontmatter.title,
    seo_description: frontmatter.seo?.description || '',
    content: content,
    content_format: 'markdown' as const,
    category_id: categoryId,
    subcategory_id: null, // Subcategories not mapped yet
    read_time: readTime,
    status: DEFAULT_STATUS,
    word_count: frontmatter.word_count,
    author_name: frontmatter.author || 'Psychage Editorial Team',
    tags: frontmatter.seo?.keywords || [],
    crisis_content: frontmatter.crisis_content || false,
    citations_count: frontmatter.citations_count || 0,
    article_production_id: articleId,
    created_at: frontmatter.date_created || new Date().toISOString().split('T')[0],
  }

  if (DRY_RUN) {
    console.log(`\n📄 ${path.basename(filePath)}`)
    console.log(`   Slug: ${articleRecord.slug}`)
    console.log(`   Title: ${articleRecord.title}`)
    console.log(`   Category: ${frontmatter.category} (${categoryId})`)
    console.log(`   Word Count: ${articleRecord.word_count}`)
    console.log(`   Status: ${articleRecord.status}`)
    return { success: true, slug: frontmatter.slug, dryRun: true }
  }

  // Insert into Supabase
  const { error } = await supabase
    .from('articles')
    .insert(articleRecord)

  if (error) {
    console.error(`❌ Failed to insert ${articleRecord.slug}:`, error.message)
    return { success: false, slug: frontmatter.slug, error: error.message }
  }

  console.log(`✅ Seeded: ${articleRecord.slug} (${frontmatter.category})`)
  return { success: true, slug: frontmatter.slug }
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  console.log('🚀 Batch 2 Article Seeding Script')
  console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN' : '💾 LIVE'}`)
  console.log(`   Status: ${DEFAULT_STATUS}`)
  console.log()

  // Find all markdown files in batch2 directories
  const files = await glob('articles/batch2/**/*.md', {
    ignore: ['**/node_modules/**', '**/.git/**']
  })

  console.log(`📁 Found ${files.length} markdown files\n`)

  if (files.length === 0) {
    console.error('❌ No markdown files found in articles/batch2/')
    process.exit(1)
  }

  // Parse all articles
  console.log('📖 Parsing articles...')
  const articles = await Promise.all(
    files.map(file => parseArticleFile(file))
  )

  // Seed articles
  console.log(`\n💾 Seeding ${articles.length} articles...\n`)
  const results = []

  for (const article of articles) {
    const result = await seedArticle(article)
    results.push(result)

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  // Summary
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log('\n' + '='.repeat(60))
  console.log('📊 Seeding Summary')
  console.log('='.repeat(60))
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📁 Total: ${results.length}`)

  if (failed > 0) {
    console.log('\n❌ Failed articles:')
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`   - ${r.slug}: ${r.error}`))
  }

  if (DRY_RUN) {
    console.log('\n🔍 This was a dry run. No data was written.')
    console.log('   Run without --dry-run to actually seed articles.')
  }

  process.exit(failed > 0 ? 1 : 0)
}

main().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})
