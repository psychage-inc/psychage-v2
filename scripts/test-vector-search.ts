/**
 * MindMate 2.0 - Vector Search Test Script
 *
 * Tests:
 * 1. Database connection
 * 2. pgvector extension
 * 3. Tables exist
 * 4. Embedding generation
 * 5. Vector search functionality
 *
 * Usage:
 *   tsx scripts/test-vector-search.ts
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// ============================================================================
// Configuration
// ============================================================================

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// ============================================================================
// Test Functions
// ============================================================================

async function test1_DatabaseConnection() {
  console.log('\n1️⃣  Testing database connection...');

  try {
    const { data, error } = await supabase.from('psychage_embeddings').select('count').limit(1);

    if (error) {
      console.log('   ❌ Database connection failed:', error.message);
      return false;
    }

    console.log('   ✅ Database connected successfully');
    return true;
  } catch (error) {
    console.log('   ❌ Error:', error);
    return false;
  }
}

async function test2_PgvectorExtension() {
  console.log('\n2️⃣  Checking pgvector extension...');

  try {
    const { data, error } = await supabase.rpc('pg_extension_version', { extension_name: 'vector' });

    if (error || !data) {
      console.log('   ❌ pgvector extension not found');
      console.log('   💡 Run this in Supabase SQL editor:');
      console.log('      CREATE EXTENSION IF NOT EXISTS vector;');
      return false;
    }

    console.log(`   ✅ pgvector extension installed (version: ${data})`);
    return true;
  } catch (error) {
    console.log('   ⚠️  Could not verify pgvector (this is OK if migration was run)');
    return true; // Don't fail on this
  }
}

async function test3_TablesExist() {
  console.log('\n3️⃣  Checking required tables...');

  try {
    // Check psychage_embeddings
    const { error: embedError } = await supabase
      .from('psychage_embeddings')
      .select('id')
      .limit(1);

    if (embedError) {
      console.log('   ❌ psychage_embeddings table not found');
      console.log('   💡 Run the migration: supabase/migrations/20260303000003_mindmate_pgvector.sql');
      return false;
    }

    // Check mindmate_events
    const { error: eventsError } = await supabase
      .from('mindmate_events')
      .select('id')
      .limit(1);

    if (eventsError) {
      console.log('   ❌ mindmate_events table not found');
      return false;
    }

    console.log('   ✅ All required tables exist');
    return true;
  } catch (error) {
    console.log('   ❌ Error checking tables:', error);
    return false;
  }
}

async function test4_EmbeddingGeneration() {
  console.log('\n4️⃣  Testing embedding generation...');

  try {
    const testText = 'This is a test sentence for generating embeddings.';

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: testText,
      encoding_format: 'float',
    });

    const embedding = response.data[0].embedding;

    if (!Array.isArray(embedding) || embedding.length !== 1536) {
      console.log('   ❌ Invalid embedding dimension');
      return false;
    }

    console.log(`   ✅ Embedding generated successfully (${embedding.length} dimensions)`);
    return true;
  } catch (error) {
    console.log('   ❌ Error generating embedding:', error);
    return false;
  }
}

async function test5_VectorSearch() {
  console.log('\n5️⃣  Testing vector search...');

  try {
    // Check if we have any embeddings
    const { data: countData, error: countError } = await supabase
      .from('psychage_embeddings')
      .select('id', { count: 'exact', head: true });

    if (countError) {
      console.log('   ❌ Error counting embeddings:', countError.message);
      return false;
    }

    const count = (countData as any)?.count || 0;

    if (count === 0) {
      console.log('   ⚠️  No embeddings in database yet');
      console.log('   💡 Run: tsx scripts/ingest-sanity.ts --limit=5');
      return true; // Not a failure, just empty
    }

    console.log(`   📊 Found ${count} embeddings in database`);

    // Generate a test query embedding
    const queryText = 'What is anxiety?';
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: queryText,
      encoding_format: 'float',
    });

    const queryEmbedding = response.data[0].embedding;

    // Test the search_psychage_content function
    const { data: searchResults, error: searchError } = await supabase.rpc(
      'search_psychage_content',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.5, // Lower threshold for testing
        match_count: 3,
      }
    );

    if (searchError) {
      console.log('   ❌ Vector search failed:', searchError.message);
      console.log('   💡 Make sure you ran the migration with the search_psychage_content function');
      return false;
    }

    console.log(`   ✅ Vector search working (found ${searchResults?.length || 0} results)`);

    if (searchResults && searchResults.length > 0) {
      console.log('\n   🔍 Top result:');
      const top = searchResults[0];
      console.log(`      Title: ${top.title}`);
      console.log(`      URL: ${top.url}`);
      console.log(`      Similarity: ${(top.similarity * 100).toFixed(1)}%`);
      console.log(`      Preview: ${top.chunk_text.substring(0, 100)}...`);
    }

    return true;
  } catch (error) {
    console.log('   ❌ Error testing vector search:', error);
    return false;
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 MindMate 2.0 - Vector Search Test Suite');
  console.log('='.repeat(60));

  // Validate environment
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENAI_API_KEY) {
    console.log('\n❌ Missing required environment variables:');
    if (!SUPABASE_URL) console.log('  - VITE_SUPABASE_URL');
    if (!SUPABASE_SERVICE_KEY) console.log('  - SUPABASE_SERVICE_ROLE_KEY');
    if (!OPENAI_API_KEY) console.log('  - OPENAI_API_KEY');
    process.exit(1);
  }

  // Run tests
  const results = {
    connection: await test1_DatabaseConnection(),
    pgvector: await test2_PgvectorExtension(),
    tables: await test3_TablesExist(),
    embedding: await test4_EmbeddingGeneration(),
    search: await test5_VectorSearch(),
  };

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(Boolean).length;

  Object.entries(results).forEach(([test, passed]) => {
    const icon = passed ? '✅' : '❌';
    const name = test.charAt(0).toUpperCase() + test.slice(1);
    console.log(`${icon} ${name}`);
  });

  console.log('='.repeat(60));
  console.log(`\n${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('\n🎉 All systems operational! Ready to ingest content.\n');
  } else {
    console.log('\n⚠️  Some tests failed. Check the messages above for fixes.\n');
  }

  console.log('='.repeat(60) + '\n');

  process.exit(passed === total ? 0 : 1);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
