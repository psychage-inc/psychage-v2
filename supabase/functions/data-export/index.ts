/**
 * EDGE FUNCTION: data-export
 *
 * POST /functions/v1/data-export
 *
 * Aggregates all user data into a JSON bundle for GDPR data portability.
 * Authenticates via Authorization header and uses service_role for cross-table reads.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { handleCorsPreflightRequest, createCorsResponse } from '../_shared/cors.ts';

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return handleCorsPreflightRequest();
    }

    if (req.method !== 'POST') {
        return createCorsResponse(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405 }
        );
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

        // Authenticate user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return createCorsResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401 }
            );
        }

        const userClient = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } },
        });

        const { data: { user }, error: authError } = await userClient.auth.getUser();
        if (authError || !user) {
            return createCorsResponse(
                JSON.stringify({ error: 'Authentication failed' }),
                { status: 401 }
            );
        }

        // Use service role for cross-table data aggregation
        const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

        // Parse optional DSAR ID from body
        let dsarId: string | null = null;
        try {
            const body = await req.json();
            dsarId = body?.dsar_id || null;
        } catch {
            // No body is fine
        }

        // Aggregate all user data
        const [
            profileResult,
            moodResult,
            sleepResult,
            assessmentResult,
            clarityResult,
            bookmarkResult,
            conversationResult,
            consentResult,
        ] = await Promise.all([
            serviceClient.from('profiles').select('*').eq('id', user.id).single(),
            serviceClient.from('mood_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            serviceClient.from('sleep_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            serviceClient.from('assessment_results').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            serviceClient.from('clarity_score_history').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            serviceClient.from('bookmarks').select('*').eq('user_id', user.id),
            serviceClient.from('ai_conversations').select('id, session_id, created_at, last_message_at, message_count').eq('user_id', user.id).eq('is_active', true),
            serviceClient.from('consent_log').select('*').eq('user_id', user.id).order('granted_at', { ascending: false }),
        ]);

        // Load messages for each conversation
        const conversations = conversationResult.data || [];
        const conversationsWithMessages = await Promise.all(
            conversations.map(async (conv: { id: string }) => {
                const { data: messages } = await serviceClient
                    .from('ai_messages')
                    .select('role, content, created_at')
                    .eq('conversation_id', conv.id)
                    .order('created_at', { ascending: true });
                return { ...conv, messages: messages || [] };
            })
        );

        const exportBundle = {
            exported_at: new Date().toISOString(),
            user_id: user.id,
            email: user.email,
            profile: profileResult.data || null,
            mood_entries: moodResult.data || [],
            sleep_entries: sleepResult.data || [],
            assessment_results: assessmentResult.data || [],
            clarity_score_history: clarityResult.data || [],
            bookmarks: bookmarkResult.data || [],
            ai_conversations: conversationsWithMessages,
            consent_log: consentResult.data || [],
        };

        // If DSAR ID provided, update its status
        if (dsarId) {
            await serviceClient
                .from('dsar_requests')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                })
                .eq('id', dsarId)
                .eq('user_id', user.id);
        }

        return createCorsResponse(
            JSON.stringify(exportBundle, null, 2),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Disposition': `attachment; filename="psychage-data-export-${new Date().toISOString().slice(0, 10)}.json"`,
                },
            }
        );
    } catch (error) {
        console.error('Data export error:', error);
        return createCorsResponse(
            JSON.stringify({ error: 'Internal server error during data export' }),
            { status: 500 }
        );
    }
});
