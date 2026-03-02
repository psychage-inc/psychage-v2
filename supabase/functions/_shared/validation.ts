/**
 * VALIDATION SCHEMAS
 *
 * Zod schemas for request/response validation across all endpoints
 */

import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

// ===== LANGUAGE & DEMOGRAPHIC SCHEMAS =====
export const LanguageSchema = z.enum(['en', 'es', 'fr', 'ar', 'bn']);

export const AgeRangeSchema = z.enum([
  '13-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
]);

export const RegionSchema = z.string().length(2).regex(/^[A-Z]{2}$/); // ISO 3166-1 alpha-2

// ===== ASSESSMENT STATUS =====
export const AssessmentStatusSchema = z.enum(['in_progress', 'completed', 'abandoned']);

// ===== SCORE LABELS =====
export const ScoreLabelSchema = z.enum([
  'thriving',
  'balanced',
  'struggling',
  'distressed',
  'crisis',
]);

// ===== RAW RESPONSES SCHEMA =====
// Individual item responses with range validation
export const RawResponsesSchema = z.object({
  // PHQ-4 items (0-3 scale)
  phq2_1: z.number().int().min(0).max(3),
  phq2_2: z.number().int().min(0).max(3),
  gad2_1: z.number().int().min(0).max(3),
  gad2_2: z.number().int().min(0).max(3),

  // WHO-5 items (0-5 scale)
  who5_1: z.number().int().min(0).max(5),
  who5_2: z.number().int().min(0).max(5),
  who5_3: z.number().int().min(0).max(5),
  who5_4: z.number().int().min(0).max(5),
  who5_5: z.number().int().min(0).max(5),

  // UCLA-3 items (1-3 scale)
  ucla_1: z.number().int().min(1).max(3),
  ucla_2: z.number().int().min(1).max(3),
  ucla_3: z.number().int().min(1).max(3),

  // PSS-4 items (0-4 scale)
  pss_1: z.number().int().min(0).max(4),
  pss_2: z.number().int().min(0).max(4),
  pss_3: z.number().int().min(0).max(4),
  pss_4: z.number().int().min(0).max(4),

  // Functioning items (0-4 scale)
  func_1: z.number().int().min(0).max(4),
  func_2: z.number().int().min(0).max(4),
  func_3: z.number().int().min(0).max(4),
  func_4: z.number().int().min(0).max(4),
});

// ===== ENDPOINT REQUEST SCHEMAS =====

// POST /assessment/start
export const StartAssessmentRequestSchema = z.object({
  language: LanguageSchema.default('en'),
});

// POST /assessment/submit
export const SubmitAssessmentRequestSchema = z.object({
  assessment_id: z.string().uuid(),
  responses: RawResponsesSchema,
});

// GET /assessment/history (query params)
export const HistoryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

// POST /assessment/share
export const ShareAssessmentRequestSchema = z.object({
  assessment_ids: z.array(z.string().uuid()).min(1).max(10),
  expiry_hours: z.number().int().min(1).max(168).default(72), // 1 hour to 7 days
});

// ===== ENDPOINT RESPONSE SCHEMAS =====

// Domain scores
export const DomainScoresSchema = z.object({
  emotional: z.number().min(0).max(20),
  vitality: z.number().min(0).max(20),
  social: z.number().min(0).max(20),
  cognitive: z.number().min(0).max(20),
  functioning: z.number().min(0).max(20),
});

// Clinical subscores
export const ClinicalSubscoresSchema = z.object({
  phq2: z.object({
    raw: z.number().int().min(0).max(6),
    max: z.literal(6),
    cutoff: z.literal(3),
    positive: z.boolean(),
  }),
  gad2: z.object({
    raw: z.number().int().min(0).max(6),
    max: z.literal(6),
    cutoff: z.literal(3),
    positive: z.boolean(),
  }),
  who5_percentage: z.object({
    value: z.number().int().min(0).max(100),
    poor_threshold: z.literal(50),
    poor: z.boolean(),
  }),
  ucla3: z.object({
    raw: z.number().int().min(3).max(9),
    max: z.literal(9),
    elevated_threshold: z.literal(6),
    elevated: z.boolean(),
  }),
  pss4: z.object({
    raw: z.number().int().min(0).max(16),
    max: z.literal(16),
    moderate_threshold: z.literal(8),
    elevated: z.boolean(),
  }),
});

// Clinical flag
export const ClinicalFlagSchema = z.object({
  type: z.enum([
    'depression_screen',
    'anxiety_screen',
    'low_wellbeing',
    'loneliness',
    'high_stress',
    'impairment',
  ]),
  severity: z.enum(['moderate', 'high']),
});

// Assessment scores (returned by submit and detail endpoints)
export const AssessmentScoresSchema = z.object({
  total: z.number().int().min(0).max(100),
  label: ScoreLabelSchema,
  domains: z.object({
    emotional: z.object({ score: z.number().min(0).max(20), max: z.literal(20) }),
    vitality: z.object({ score: z.number().min(0).max(20), max: z.literal(20) }),
    social: z.object({ score: z.number().min(0).max(20), max: z.literal(20) }),
    cognitive: z.object({ score: z.number().min(0).max(20), max: z.literal(20) }),
    functioning: z.object({ score: z.number().min(0).max(20), max: z.literal(20) }),
  }),
  clinical_subscores: ClinicalSubscoresSchema,
  clinical_flags: z.array(ClinicalFlagSchema),
  crisis_detected: z.boolean(),
});

// Retake information
export const RetakeInfoSchema = z.object({
  next_available_at: z.string().datetime(),
  recommended_at: z.string().datetime().optional(),
  days_until_available: z.number().int().min(0).optional(),
});

// POST /assessment/submit response
export const SubmitAssessmentResponseSchema = z.object({
  assessment_id: z.string().uuid(),
  completed_at: z.string().datetime(),
  scores: AssessmentScoresSchema,
  retake: RetakeInfoSchema,
});

// History trend analysis
export const TrendAnalysisSchema = z.object({
  total_change: z.number(),
  improving_domains: z.array(z.string()),
  declining_domains: z.array(z.string()),
  stable_domains: z.array(z.string()),
});

// GET /assessment/history response
export const HistoryResponseSchema = z.object({
  assessments: z.array(
    z.object({
      id: z.string().uuid(),
      completed_at: z.string().datetime(),
      total_score: z.number().int().min(0).max(100),
      score_label: ScoreLabelSchema,
      domains: DomainScoresSchema,
      clinical_flags: z.array(ClinicalFlagSchema),
      crisis_detected: z.boolean(),
    })
  ),
  total_count: z.number().int().min(0),
  retake: RetakeInfoSchema.partial(),
  trends: TrendAnalysisSchema.optional(),
});

// POST /assessment/share response
export const ShareResponseSchema = z.object({
  share_url: z.string().url(),
  expires_at: z.string().datetime(),
  assessment_count: z.number().int().min(1),
});

// ===== ERROR SCHEMA =====
export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
  }),
});

// ===== TYPES (exported for use in Edge Functions) =====
export type Language = z.infer<typeof LanguageSchema>;
export type AgeRange = z.infer<typeof AgeRangeSchema>;
export type AssessmentStatus = z.infer<typeof AssessmentStatusSchema>;
export type ScoreLabel = z.infer<typeof ScoreLabelSchema>;
export type RawResponses = z.infer<typeof RawResponsesSchema>;
export type StartAssessmentRequest = z.infer<typeof StartAssessmentRequestSchema>;
export type SubmitAssessmentRequest = z.infer<typeof SubmitAssessmentRequestSchema>;
export type ShareAssessmentRequest = z.infer<typeof ShareAssessmentRequestSchema>;
export type ClinicalFlag = z.infer<typeof ClinicalFlagSchema>;
export type AssessmentScores = z.infer<typeof AssessmentScoresSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
