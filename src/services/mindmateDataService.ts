/**
 * MindMate consent withdrawal and conversation deletion (compliance item 6).
 *
 * Every operation goes through a SECURITY DEFINER function scoped to the
 * caller (auth.uid()) and throws on failure — there is no client-side
 * fallback path.
 */
import { supabase } from '@/lib/supabaseClient';
import {
  MINDMATE_CONSENT_VERSION,
  WEB_APP_VERSION,
  type MindMateConsentStatus,
} from '@/lib/ai/mindmateConsent';

/** Browser copies of MindMate state. Cleared on deletion and sign-out. */
export const MINDMATE_HISTORY_KEY = 'psychage_ai_chat_history';
export const MINDMATE_SESSION_KEY = 'psychage_ai_session_id';

export function clearMindMateLocalData(): void {
  localStorage.removeItem(MINDMATE_HISTORY_KEY);
  sessionStorage.removeItem(MINDMATE_SESSION_KEY);
}

/**
 * Which MindMate screen the signed-in user needs: 'current' (chat),
 * 'outdated' (re-consent), 'none' (consent).
 */
export async function getMindMateConsentStatus(): Promise<MindMateConsentStatus> {
  const { data, error } = await supabase.rpc('mindmate_consent_status');
  if (error) throw new Error(`Could not read MindMate consent: ${error.message}`);
  if (data !== 'current' && data !== 'outdated' && data !== 'none') {
    throw new Error(`Unexpected MindMate consent status: ${String(data)}`);
  }
  return data;
}

/** True when the signed-in user has a granted, non-withdrawn consent at the current version. */
export async function hasActiveMindMateConsent(): Promise<boolean> {
  return (await getMindMateConsentStatus()) === 'current';
}

/** Record the caller's consent to the MindMate text this build shows. */
export async function grantMindMateConsent(): Promise<void> {
  const { error } = await supabase.rpc('grant_mindmate_consent', {
    p_version: MINDMATE_CONSENT_VERSION,
    p_app_version: WEB_APP_VERSION,
  });
  if (error) throw new Error(`Could not turn on MindMate: ${error.message}`);
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
