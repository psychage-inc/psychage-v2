/**
 * MindMate consent (compliance item 5). Counsel-approved text, word for word.
 *
 * The current consent text version is the database constant
 * `public.mindmate_consent_version()`; the server gate in api/ai/chat.ts and
 * `grant_mindmate_consent()` check against it. MINDMATE_CONSENT_VERSION labels
 * the text this build shows: when the text changes, bump both, and the
 * server rejects consents to the old text (re-consent).
 */
import { version as packageVersion } from '../../../package.json';

export const MINDMATE_CONSENT_VERSION = 'mm-consent-v1';

/** Recorded as consent_log.app_version. */
export const WEB_APP_VERSION = `web-${packageVersion}`;

export const MINDMATE_CONSENT_TITLE = 'Before you use MindMate';

export const MINDMATE_CONSENT_INTRO =
  'MindMate is an AI system, not a person, therapist, or clinician. It explains mental health topics for education. It cannot diagnose, treat, or give medical advice.';

export const MINDMATE_CONSENT_LEAD = 'Your messages may include health information. When you send a message:';

export const MINDMATE_CONSENT_POINTS = [
  'It goes to Anthropic, an AI company in the United States, which processes it for Psychage only. Anthropic does not use your messages to train its models and deletes them within 30 days, except messages flagged for a safety review, which it may keep longer.',
  'When AI Chat History is on, Psychage stores the conversation in your account until you delete it.',
  'Psychage never sells your messages or uses them for advertising.',
] as const;

export const MINDMATE_CONSENT_WITHDRAW =
  'You can withdraw this consent and delete your conversations at any time in Settings > Privacy > MindMate.';

export const MINDMATE_CONSENT_POLICY_LINK = 'Read the Consumer Health Data Privacy Policy';
export const MINDMATE_CONSENT_POLICY_HREF = '/legal/privacy#health-data';

export const MINDMATE_CONSENT_AGREE = 'I agree to MindMate processing my messages';
export const MINDMATE_CONSENT_NOT_NOW = 'Not now';

/** Shown at the start of every session. */
export const MINDMATE_SESSION_GREETING =
  "Hi, I'm MindMate, an AI guide to mental health topics. I'm not a therapist and I can't diagnose or treat. If you're in crisis, tap Help Now or call or text 988.";

export const MINDMATE_RECONSENT_HEADING = 'MindMate has changed how it handles your messages.';
export const MINDMATE_RECONSENT_CLOSING = 'Please review and agree again to keep using MindMate.';
export const MINDMATE_RECONSENT_REVIEW = 'Review and agree';
export const MINDMATE_RECONSENT_TURN_OFF = 'Turn off MindMate';

/**
 * One-line description of what changed in MINDMATE_CONSENT_VERSION, shown on
 * the re-consent screen. mm-consent-v1 is the first version, so nothing has
 * changed yet. Set it whenever MINDMATE_CONSENT_VERSION is bumped.
 */
export const MINDMATE_CONSENT_CHANGE_SUMMARY: string | null = null;

export type MindMateConsentStatus = 'current' | 'outdated' | 'none';
