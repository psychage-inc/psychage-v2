import { supabase } from '@/lib/supabaseClient';
import * as Sentry from '@sentry/react';

interface AuditLogParams {
  action: string;
  resourceType: string;
  resourceId?: string;
  previousValue?: unknown;
  newValue?: unknown;
  metadata?: unknown;
}

export async function logAdminAction(params: AuditLogParams): Promise<void> {
  // Best-effort by design (40+ fire-and-forget call sites), so this never
  // throws to the caller — but audit-trail gaps must not be invisible. Route
  // failures to Sentry instead of only console.error, and check the insert
  // error (supabase-js resolves { error } rather than throwing, so the catch
  // alone never fired for RLS/DB denials).
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('admin_audit_log').insert({
      admin_user_id: user.id,
      action: params.action,
      resource_type: params.resourceType,
      resource_id: params.resourceId ?? null,
      previous_value: params.previousValue ?? null,
      new_value: params.newValue ?? null,
      metadata: params.metadata ?? null,
    });

    if (error) {
      console.error('Failed to log admin action:', error);
      Sentry.captureException(new Error(`Admin audit log insert failed: ${error.message}`), {
        tags: { area: 'admin-audit' },
        extra: { action: params.action, resourceType: params.resourceType, resourceId: params.resourceId },
      });
    }
  } catch (err) {
    console.error('Failed to log admin action:', err);
    Sentry.captureException(err, {
      tags: { area: 'admin-audit' },
      extra: { action: params.action, resourceType: params.resourceType, resourceId: params.resourceId },
    });
  }
}
