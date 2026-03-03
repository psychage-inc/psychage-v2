#!/bin/bash

# MindMate 2.0 - Database Verification Script
# This script helps verify your Supabase database is ready for MindMate

echo ""
echo "======================================================================"
echo "🔍 MindMate 2.0 - Database Verification"
echo "======================================================================"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found"
    echo "💡 Copy .env.ai.example to .env and add your keys"
    exit 1
fi

# Source .env
export $(cat .env | grep -v '^#' | xargs)

# Check required env vars
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ VITE_SUPABASE_URL not set in .env"
    exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ SUPABASE_SERVICE_ROLE_KEY not set in .env"
    exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Instructions for running migration
echo "📋 To set up your database:"
echo ""
echo "1. Open Supabase Dashboard: https://supabase.com/dashboard"
echo "2. Go to SQL Editor"
echo "3. Copy the contents of: supabase/migrations/20260303000003_mindmate_pgvector.sql"
echo "4. Paste into SQL Editor and click 'Run'"
echo ""
echo "Once migration is complete, run:"
echo "  npm run tsx scripts/test-vector-search.ts"
echo ""
echo "======================================================================"
echo ""
