/**
 * MindMate consent withdrawal and conversation deletion (compliance item 6).
 *
 * Every operation goes through a SECURITY DEFINER function scoped to the
 * caller (auth.uid()) and throws on failure — there is no client-side
 * fallback path.
 */
import { supabase } from '@/lib/supabaseClient';

/** Browser copies of MindMate state. Cleared on deletion and sign-out. */
export const MINDMATE_HISTORY_KEY = 'psychage_ai_chat_history';
export const MINDMATE_SESSION_KEY = 'psychage_ai_session_id';

export function clearMindMateLocalData(): void {
  localStorage.removeItem(MINDMATE_HISTORY_KEY);
  sessionStorage.removeItem(MINDMATE_SESSION_KEY);
}

/** True when the signed-in user has a granted, non-withdrawn MindMate consent. */
export async function hasActiveMindMateConsent(): Promise<boolean> {
  const { count, error } = await supabase
    .from('consent_log')
    .select('id', { count: 'exact', head: true })
    .eq('consent_type', 'mindmate')
    .eq('granted', true)
    .is('revoked_at', null);
  if (error) throw new Error(`Could not read MindMate consent: ${error.message}`);
  return (count ?? 0) > 0;
}

/** Stamp the withdrawal time on the caller's MindMate consent. */
export async function withdrawMindMateConsent(): Promise<void> {
  const { error } = await supabase.rpc('withdraw_mindmate_consent');
  if (error) throw new Error(`Could not turn off MindMate: ${error.message}`);
}

/** Hard-delete all of the caller's MindMate conversations and messages. */
export async function deleteAllMindMateConversations(): Promise<void> {
  const { error } = await supabase.rpc('delete_mindmate_conversations');
  if (error) throw new Error(`Could not delete conversations: ${error.message}`);
  clearMindMateLocalData();
}
