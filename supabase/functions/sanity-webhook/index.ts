/**
 * Sanity Webhook Edge Function
 *
 * Receives webhook payloads from Sanity CMS when articles are
 * created, updated, or deleted, and syncs metadata to the
 * Supabase `articles` table.
 *
 * Deploy: supabase functions deploy sanity-webhook
 *
 * Required env vars (set via supabase secrets):
 *   SANITY_WEBHOOK_SECRET
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, sanity-webhook-signature',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get('SANITY_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Read body
    const body = await req.text();

    // Verify webhook signature (if secret is configured)
    if (webhookSecret) {
      const signature = req.headers.get('sanity-webhook-signature');
      if (!signature) {
        return new Response(
          JSON.stringify({ error: 'Missing webhook signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const hmac = createHmac('sha256', webhookSecret);
      hmac.update(body);
      const expectedSignature = hmac.digest('hex');

      if (signature !== expectedSignature) {
        return new Response(
          JSON.stringify({ error: 'Invalid webhook signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const payload = JSON.parse(body);
    const { _id, _type, _rev, title, slug, status, category, author } = payload;

    // Only process article documents
    if (_type !== 'article') {
      return new Response(
        JSON.stringify({ message: 'Ignored: not an article document' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Determine operation type from webhook headers or payload
    const operation = req.headers.get('sanity-operation') || 'createOrReplace';

    if (operation === 'delete') {
      // Soft-archive the article
      const { error } = await supabase
        .from('articles')
        .update({ status: 'archived' })
        .eq('sanity_id', _id);

      if (error) {
        console.error('Archive error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to archive article' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Article archived', sanity_id: _id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create or update
    const articleData: Record<string, unknown> = {
      sanity_id: _id,
      title: title || 'Untitled',
      slug: slug?.current || _id,
      category: category?.name || null,
      author_name: author?.name || null,
      sanity_last_synced_at: new Date().toISOString(),
    };

    // Resolve category_id from article_categories by name match
    if (category?.name) {
      const { data: catRow } = await supabase
        .from('article_categories')
        .select('id')
        .ilike('name', category.name)
        .limit(1)
        .maybeSingle();
      if (catRow) {
        articleData.category_id = catRow.id;
      }
    }

    const { data, error } = await supabase
      .from('articles')
      .upsert(articleData, { onConflict: 'sanity_id' })
      .select('id')
      .single();

    if (error) {
      console.error('Upsert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to sync article' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Article synced', id: data.id, sanity_id: _id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
