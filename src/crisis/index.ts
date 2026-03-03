/**
 * PSYCHAGE CRISIS DETECTION SYSTEM
 *
 * Main entry point for the crisis detection and management module.
 * Import from here to use crisis system components throughout the app.
 *
 * @example
 * import { CrisisDetectionWrapper, useCrisisDetection } from '@/crisis';
 */

// ==================== HOOKS ====================
export { useCrisisDetection } from './hooks/useCrisisDetection';
export { useGeoLocation } from './hooks/useGeoLocation';
export { useMoodTracking } from './hooks/useMoodTracking';
export { useSafetyPlan } from './hooks/useSafetyPlan';

// ==================== COMPONENTS ====================
export { CrisisDetectionWrapper } from './components/CrisisDetectionWrapper';
export { EmergencyModal } from './components/EmergencyModal';
export { CrisisBanner } from './components/CrisisBanner';
export { GentleCheckIn } from './components/GentleCheckIn';
export { GlobalResourcePanel } from './components/GlobalResourcePanel';
export { MoodLogger } from './components/MoodLogger';
export { MoodPatternAlert } from './components/MoodPatternAlert';
export { SafetyPlanBuilder } from './components/SafetyPlanBuilder';

// ==================== UTILITIES ====================
export { logCrisisEvent, getSessionId } from './lib/crisisLogger';
export { encryptSafetyPlan, decryptSafetyPlan } from './lib/encryptionUtils';
export { fetchCrisisResources, getCachedResources } from './lib/throughlineClient';

// ==================== DATA ====================
export { crisisKeywords, getKeywordsByLanguage, getKeywordsByTier } from './data/crisisKeywords';
export { fallbackResources, getFallbackResourcesByCountry } from './data/fallbackResources';
export { getSystemPromptForTier } from './data/systemPrompts';

// ==================== TYPES ====================
export type {
  CrisisTier,
  MoodLevel,
  CrisisDetectionResult,
  CrisisKeyword,
  GeoConfidence,
  GeoLocation,
  CrisisResource,
  MoodLog,
  PatternAlert,
  PatternAlertType,
  PatternSeverity,
  PatternAction,
  SafetyPlan,
  SafetyPlanContent,
  SafetyContact,
  EncryptedSafetyPlan,
  CrisisEvent,
  ClaudePromptTier,
  CrisisCompanionRequest,
  CrisisCompanionResponse,
  CrisisDetectionWrapperProps,
  EmergencyModalProps,
  CrisisBannerProps,
  GentleCheckInProps,
} from './types/crisis.types';
