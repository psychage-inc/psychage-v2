import { supabase } from '@/lib/supabaseClient';

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
  // throws to the caller. Check the insert error too: supabase-js resolves
  // { error } rather than throwing, so the catch alone never fired for
  // RLS/DB denials.
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
    }
  } catch (err) {
    console.error('Failed to log admin action:', err);
  }
}
