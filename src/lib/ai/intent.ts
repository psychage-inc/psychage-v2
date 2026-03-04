// =============================================================================
// Psychage AI Help — Intent Classification
// =============================================================================

import type {
  IntentClassification,
  Intent,
  ExtractedEntities,
  Message,
  LLMProvider,
  LLMMessage,
} from './types';

// =============================================================================
// Quick Intent Detection (regex-based, no LLM needed)
// =============================================================================

const GREETING_PATTERNS = [
  /^(hi|hello|hey|howdy|good\s+(morning|afternoon|evening)|what['']?s\s+up|yo)\b/i,
  /^(greetings|hola|bonjour|oi|hej)\b/i,
];

const FEEDBACK_PATTERNS = [
  /^(thanks?|thank\s+you|thx|great|helpful|perfect|awesome|got\s+it)\b/i,
  /^(not\s+(helpful|what\s+i)|that['']?s\s+not|wrong|bad\s+answer)\b/i,
];

const META_PATTERNS = [
  /\b(what\s+can\s+you\s+do|who\s+(are|made)\s+you|are\s+you\s+(a|an|real))\b/i,
  /\b(how\s+do\s+you\s+work|what\s+are\s+you|your\s+(name|purpose))\b/i,
  /\b(are\s+you\s+a\s+(therapist|doctor|human|bot|ai))\b/i,
];

const TOOL_ROUTE_PATTERNS = [
  /\b(symptom\s+(checker|navigator|quiz)|take\s+(the|a)\s+(quiz|assessment|test))\b/i,
  /\b(breathing\s+exercise|clarity\s+score|mood\s+journal|sleep\s+(tracker|architect))\b/i,
  /\b(use\s+the\s+tool|open\s+(the|a)\s+tool|show\s+me\s+the\s+tool)\b/i,
];

const PROVIDER_SEARCH_PATTERNS = [
  /\b(find\s+(me\s+)?(a\s+)?(therapist|psychiatrist|psychologist|counselor|doctor))\b/i,
  /\b(i\s+need\s+(a\s+)?(therapist|psychiatrist|professional))\b/i,
  /\b(recommend\s+(a\s+)?(therapist|provider|specialist))\b/i,
  /\b(therapy|counseling)\s+(near|in|around)\b/i,
  /\b(provider|therapist|psychiatrist)\s+(in|near|around)\b/i,
];

const NAVIGATION_PATTERNS = [
  /\b(where['']?s?\s+(the|your)\s+(article|guide|page|video))\b/i,
  /\b(show\s+me\s+(the|your|an?)\s+(article|guide|resource|video))\b/i,
  /\b(link\s+to|take\s+me\s+to|direct\s+me\s+to)\b/i,
  /\b(do\s+you\s+have\s+(an?\s+)?(article|guide|resource)\s+(about|on))\b/i,
];

const COPING_PATTERNS = [
  /\b(how\s+(can|do)\s+i\s+(cope|deal|manage|handle))\b/i,
  /\b(coping\s+(strateg|technique|skill|mechanism|tip))\b/i,
  /\b(help\s+me\s+(calm|relax|breathe|cope|feel\s+better))\b/i,
  /\b(what\s+(can|should)\s+i\s+do\s+(right\s+now|when|if|about))\b/i,
  /\b(i\s+need\s+help\s+(calming|relaxing|coping))\b/i,
];

// =============================================================================
// Entity Extraction Patterns
// =============================================================================

const CONDITION_KEYWORDS: Record<string, RegExp> = {
  depression: /\b(depress(ed|ion|ive)?|major\s+depressive)\b/i,
  anxiety: /\b(anxi(ety|ous)|generalized\s+anxiety|gad)\b/i,
  ptsd: /\b(ptsd|post[\s-]?traumatic|trauma(tic)?)\b/i,
  ocd: /\b(ocd|obsessive[\s-]?compulsive)\b/i,
  bipolar: /\b(bipolar|manic|mania|hypomania)\b/i,
  adhd: /\b(adhd|add|attention\s+deficit)\b/i,
  eating_disorders: /\b(eating\s+disorder|anorexi|bulimi|binge\s+eating)\b/i,
  schizophrenia: /\b(schizophren|psycho(sis|tic))\b/i,
  panic_disorder: /\b(panic\s+(attack|disorder)|agoraphobia)\b/i,
  social_anxiety: /\b(social\s+anxiety|social\s+phobia)\b/i,
  insomnia: /\b(insomnia|can['']?t\s+sleep|sleep\s+(disorder|problem))\b/i,
  grief: /\b(grief|bereavement|mourning|loss\s+of\s+(a\s+)?loved)\b/i,
  substance_use: /\b(substance\s+(use|abuse)|addict(ion|ed)?|alcohol(ism)?|drug\s+(use|abuse))\b/i,
  burnout: /\b(burnout|burn[\s-]?out|workplace\s+stress)\b/i,
  phobias: /\b(phobia|phobic|arachnophobia|claustrophobia|acrophobia)\b/i,
  self_harm: /\b(self[\s-]?harm|self[\s-]?injur|cutting)\b/i,
};

const SYMPTOM_KEYWORDS: Record<string, RegExp> = {
  insomnia: /\b(can['']?t\s+sleep|trouble\s+sleeping|insomnia|sleepless|awake\s+at\s+night)\b/i,
  fatigue: /\b(tired|fatigue(d)?|exhausted|no\s+energy|drained)\b/i,
  sadness: /\b(sad(ness)?|crying|tearful|unhappy|miserable)\b/i,
  worry: /\b(worr(y|ied|ying)|overthink(ing)?|racing\s+thoughts?)\b/i,
  appetite_change: /\b(no\s+appetite|not\s+eating|eating\s+(too\s+much|a\s+lot)|weight\s+(gain|loss))\b/i,
  concentration: /\b(can['']?t\s+(focus|concentrate)|brain\s+fog|distract(ed|ible))\b/i,
  isolation: /\b(isolat(ed|ing)|withdraw(n|ing)?|avoid(ing)?\s+(people|friends))\b/i,
  panic: /\b(panic|heart\s+racing|chest\s+(tight|pain)|can['']?t\s+breathe|hyperventilat)\b/i,
  irritability: /\b(irritabl|angry|rage|short\s+temper|frustrat(ed|ion))\b/i,
  numbness: /\b(numb|empty|feeling\s+nothing|emotionless|detach(ed|ment))\b/i,
  flashbacks: /\b(flashback|nightmare|night\s+terror|reliving|triggered)\b/i,
  guilt: /\b(guilt(y)?|shame|self[\s-]?blame|worthless(ness)?)\b/i,
};

const LOCATION_PATTERNS = [
  /\b(?:in|near|around|from)\s+([A-Z][a-zA-Z\s]+(?:,\s*[A-Z]{2})?)\b/,
  /\b(London|New\s+York|Los\s+Angeles|Chicago|Toronto|Sydney|Melbourne|Mumbai|São\s+Paulo|Madrid|Stockholm|Manchester|Montreal|Austin|San\s+Francisco)\b/i,
];

const PROVIDER_TYPE_PATTERNS: Record<string, RegExp> = {
  therapist: /\b(therapist|therapy)\b/i,
  psychiatrist: /\b(psychiatrist|psychiatry)\b/i,
  psychologist: /\b(psychologist|psychology)\b/i,
  counselor: /\b(counselo?r|counseling|counselling)\b/i,
  social_worker: /\b(social\s+worker|lcsw|msw)\b/i,
};

// =============================================================================
// Quick Intent Classifier (no LLM)
// =============================================================================

function quickClassify(message: string): { intent: Intent; confidence: number } | null {
  const trimmed = message.trim();

  // Short messages are often greetings
  if (trimmed.length < 15) {
    for (const p of GREETING_PATTERNS) {
      if (p.test(trimmed)) return { intent: 'greeting', confidence: 0.95 };
    }
    for (const p of FEEDBACK_PATTERNS) {
      if (p.test(trimmed)) return { intent: 'feedback', confidence: 0.9 };
    }
  }

  for (const p of META_PATTERNS) {
    if (p.test(trimmed)) return { intent: 'meta', confidence: 0.9 };
  }
  for (const p of TOOL_ROUTE_PATTERNS) {
    if (p.test(trimmed)) return { intent: 'tool_route', confidence: 0.9 };
  }
  for (const p of COPING_PATTERNS) {
    if (p.test(trimmed)) return { intent: 'coping_request', confidence: 0.85 };
  }
  for (const p of PROVIDER_SEARCH_PATTERNS) {
    if (p.test(trimmed)) return { intent: 'provider_search', confidence: 0.85 };
  }
  for (const p of NAVIGATION_PATTERNS) {
    if (p.test(trimmed)) return { intent: 'navigation', confidence: 0.85 };
  }

  return null;
}

// =============================================================================
// Entity Extraction
// =============================================================================

function extractEntities(message: string): ExtractedEntities {
  const entities: ExtractedEntities = {};

  // Extract conditions
  const conditions: string[] = [];
  for (const [condition, pattern] of Object.entries(CONDITION_KEYWORDS)) {
    if (pattern.test(message)) conditions.push(condition);
  }
  if (conditions.length > 0) entities.conditions = conditions;

  // Extract symptoms
  const symptoms: string[] = [];
  for (const [symptom, pattern] of Object.entries(SYMPTOM_KEYWORDS)) {
    if (pattern.test(message)) symptoms.push(symptom);
  }
  if (symptoms.length > 0) entities.symptoms = symptoms;

  // Extract location
  for (const pattern of LOCATION_PATTERNS) {
    const match = message.match(pattern);
    if (match) {
      entities.location = match[1].trim();
      break;
    }
  }

  // Extract provider type
  for (const [type, pattern] of Object.entries(PROVIDER_TYPE_PATTERNS)) {
    if (pattern.test(message)) {
      entities.providerType = type;
      break;
    }
  }

  return entities;
}

// =============================================================================
// LLM-Based Intent Classifier (for ambiguous messages)
// =============================================================================

const INTENT_CLASSIFIER_PROMPT = `You are an intent classifier for a mental health education chatbot called Psychage AI Help.

Classify the user's message into ONE of these intents:

- educational: Questions about mental health conditions, symptoms, treatments, or general wellbeing education ("What is depression?", "How does anxiety work?", "What are symptoms of PTSD?")
- navigation: Looking for a specific Psychage article, guide, or page ("Where's the article about PTSD?", "Show me your sleep guide")
- symptom_inquiry: Describing personal symptoms seeking understanding ("I can't sleep and I feel sad", "Why am I always tired?")
- provider_search: Looking for a mental health professional ("Find me a therapist in London", "I need a psychiatrist")
- coping_request: Seeking immediate coping strategies or help ("How can I cope with anxiety right now?", "I need help calming down")
- tool_route: Wants to use a Psychage tool like Symptom Navigator, Clarity Score, breathing exercises
- crisis: Expression of immediate danger (handled by safety system)
- greeting: Simple greeting ("Hi", "Hello")
- feedback: Response to previous answer ("Thanks", "That was helpful", "Not what I was looking for")
- off_topic: Not related to mental health ("What's the weather?", "Write me a poem")
- meta: Questions about the chatbot itself ("What can you do?", "Who made you?", "Are you a real therapist?")

Also extract any entities: conditions mentioned, symptoms described, location, provider type.

Respond with ONLY a JSON object:
{
  "intent": "educational|navigation|symptom_inquiry|provider_search|coping_request|tool_route|crisis|greeting|feedback|off_topic|meta",
  "confidence": 0.0-1.0,
  "entities": {
    "conditions": ["depression"],
    "symptoms": ["insomnia", "fatigue"],
    "location": "London, UK",
    "providerType": "therapist",
    "urgency": "low|moderate|high"
  }
}

Only include entity fields that are actually present in the message. Omit empty/null fields.`;

export async function classifyIntent(
  message: string,
  conversationHistory: Message[],
  llmProvider: LLMProvider
): Promise<IntentClassification> {
  // First try quick classification (free, instant)
  const quickResult = quickClassify(message);
  const extractedEntities = extractEntities(message);

  if (quickResult && quickResult.confidence >= 0.85) {
    return {
      primary: quickResult.intent,
      confidence: quickResult.confidence,
      entities: extractedEntities,
    };
  }

  // For symptom inquiries detected by entity extraction
  if (
    extractedEntities.symptoms &&
    extractedEntities.symptoms.length >= 2 &&
    !quickResult
  ) {
    return {
      primary: 'symptom_inquiry',
      confidence: 0.8,
      entities: extractedEntities,
    };
  }

  // Fall back to LLM classification for ambiguous messages
  try {
    const recentContext = conversationHistory
      .slice(-4)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const contextStr = recentContext ? `\nRecent context:\n${recentContext}\n` : '';

    const messages: LLMMessage[] = [
      { role: 'system', content: INTENT_CLASSIFIER_PROMPT },
      {
        role: 'user',
        content: `${contextStr}\nClassify this message:\n"${message}"`,
      },
    ];

    const response = await llmProvider.generateCompletion(messages, {
      maxTokens: 200,
      temperature: 0,
    });

    const parsed = JSON.parse(response.content.trim());

    // Merge LLM entities with regex-extracted ones (regex is more reliable for known patterns)
    const mergedEntities: ExtractedEntities = {
      ...parsed.entities,
      ...extractedEntities,
      conditions: mergeArrays(
        parsed.entities?.conditions,
        extractedEntities.conditions
      ),
      symptoms: mergeArrays(
        parsed.entities?.symptoms,
        extractedEntities.symptoms
      ),
    };

    return {
      primary: parsed.intent as Intent,
      confidence: Math.min(1, Math.max(0, parsed.confidence ?? 0.7)),
      entities: mergedEntities,
    };
  } catch {
    // If LLM fails, use quick result or default to educational
    return {
      primary: quickResult?.intent ?? 'educational',
      confidence: quickResult?.confidence ?? 0.5,
      entities: extractedEntities,
    };
  }
}

function mergeArrays(
  a: string[] | undefined,
  b: string[] | undefined
): string[] | undefined {
  if (!a && !b) return undefined;
  const set = new Set([...(a ?? []), ...(b ?? [])]);
  return set.size > 0 ? Array.from(set) : undefined;
}
