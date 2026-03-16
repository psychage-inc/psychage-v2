-- Add content column to articles table for storing full article body as markdown
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS content TEXT DEFAULT '';
