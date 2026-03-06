/**
 * EDGE FUNCTION: account-deletion
 *
 * POST /functions/v1/account-deletion
 *
 * Manages account deletion lifecycle:
 * - action=request  → soft-delete profile, set 30-day countdown
 * - action=cancel   → clear soft-delete flags
 * - action=execute  → hard-delete (called by pg_cron or admin)
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

        const body = await req.json();
        const action = body?.action;

        if (!action || !['request', 'cancel', 'execute'].includes(action)) {
            return createCorsResponse(
                JSON.stringify({ error: 'Invalid action. Must be: request, cancel, or execute' }),
                { status: 400 }
            );
        }

        // For request/cancel: authenticate via user token
        // For execute: authenticate via service role (pg_cron/admin)
        if (action === 'execute') {
            // Execute requires service role — validate via a shared secret or service key
            const adminSecret = req.headers.get('X-Admin-Secret');
            const expectedSecret = Deno.env.get('ADMIN_FUNCTION_SECRET');
            if (!expectedSecret || adminSecret !== expectedSecret) {
                return createCorsResponse(
                    JSON.stringify({ error: 'Unauthorized: admin secret required' }),
                    { status: 403 }
                );
            }

            const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
            const userId = body?.user_id;

            if (!userId) {
                return createCorsResponse(
                    JSON.stringify({ error: 'user_id is required for execute action' }),
                    { status: 400 }
                );
            }

            // Hard-delete: remove the user from auth (CASCADE handles tables)
            const { error: deleteError } = await serviceClient.auth.admin.deleteUser(userId);
            if (deleteError) {
                console.error('Hard-delete error:', deleteError);
                return createCorsResponse(
                    JSON.stringify({ error: 'Failed to delete user' }),
                    { status: 500 }
                );
            }

            // Update DSAR status
            await serviceClient
                .from('dsar_requests')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    notes: 'Account permanently deleted.',
                })
                .eq('user_id', userId)
                .eq('request_type', 'deletion')
                .eq('status', 'pending');

            return createCorsResponse(
                JSON.stringify({ success: true, message: 'Account permanently deleted' }),
                { status: 200 }
            );
        }

        // Request/Cancel: authenticate via user token
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

        const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

        if (action === 'request') {
            const deletionDate = new Date();
            deletionDate.setDate(deletionDate.getDate() + 30);
            const scheduledAt = deletionDate.toISOString();

            // Soft-delete profile
            const { error: profileError } = await serviceClient
                .from('profiles')
                .update({
                    deleted_at: new Date().toISOString(),
                    deletion_scheduled_at: scheduledAt,
                })
                .eq('id', user.id);

            if (profileError) {
                console.error('Soft-delete error:', profileError);
                return createCorsResponse(
                    JSON.stringify({ error: 'Failed to schedule deletion' }),
                    { status: 500 }
                );
            }

            // Create DSAR record
            await serviceClient
                .from('dsar_requests')
                .insert({
                    user_id: user.id,
                    request_type: 'deletion',
                    status: 'pending',
                    requested_at: new Date().toISOString(),
                    expires_at: scheduledAt,
                    notes: '30-day grace period. User can cancel by logging in.',
                });

            return createCorsResponse(
                JSON.stringify({
                    success: true,
                    scheduled_at: scheduledAt,
                    message: 'Account deletion scheduled. You have 30 days to cancel.',
                }),
                { status: 200 }
            );
        }

        if (action === 'cancel') {
            // Clear soft-delete flags
            const { error: profileError } = await serviceClient
                .from('profiles')
                .update({
                    deleted_at: null,
                    deletion_scheduled_at: null,
                })
                .eq('id', user.id);

            if (profileError) {
                console.error('Cancel deletion error:', profileError);
                return createCorsResponse(
                    JSON.stringify({ error: 'Failed to cancel deletion' }),
                    { status: 500 }
                );
            }

            // Cancel DSAR
            await serviceClient
                .from('dsar_requests')
                .update({
                    status: 'cancelled',
                    notes: 'Cancelled by user within grace period.',
                })
                .eq('user_id', user.id)
                .eq('request_type', 'deletion')
                .eq('status', 'pending');

            return createCorsResponse(
                JSON.stringify({ success: true, message: 'Account deletion cancelled.' }),
                { status: 200 }
            );
        }

        return createCorsResponse(
            JSON.stringify({ error: 'Unknown action' }),
            { status: 400 }
        );
    } catch (error) {
        console.error('Account deletion error:', error);
        return createCorsResponse(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
});
