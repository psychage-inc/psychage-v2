import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode, useRef, useCallback } from 'react';
import {
    KnowledgeBase,
    NavigatorResults,
    RedFlagLevel,
    UserSymptomInput
} from '../lib/navigator/types';
import { NavigatorAnalytics } from '../lib/navigator/analytics';
import { mockKnowledgeBase } from '../data/mock_knowledge_base';
import { saveNavigatorState, loadNavigatorState, clearNavigatorState, hasRawNavigatorState } from '../lib/navigator/storage';

// Define the shape of our state
export interface NavigatorState {
    currentStep: 'welcome' | 'age_gate' | 'underage_notice' | 'domains' | 'symptoms' | 'details' | 'processing' | 'results';
    knowledgeBase: KnowledgeBase | null;
    isLoading: boolean;
    error: string | null;

    selectedDomains: string[];
    selectedSymptoms: Map<string, UserSymptomInput>;

    crisisTriggered: boolean;
    crisisLevel: RedFlagLevel | null;
    crisisAcknowledged: boolean;
    detectedRegion: string | null;

    results: NavigatorResults | null;
    kbLoadedAt: number | null;

    sessionHash: string;
    startTime: number;
    liveAnnouncement: { message: string; mode: 'polite' | 'assertive'; id: number } | null;
    ageGatePassed: boolean;
}

// Define the actions
type NavigatorAction =
    | { type: 'SET_STEP'; payload: NavigatorState['currentStep'] }
    | { type: 'KNOWLEDGE_BASE_LOADED'; payload: KnowledgeBase }
    | { type: 'KNOWLEDGE_BASE_ERROR'; payload: string }
    | { type: 'TOGGLE_DOMAIN'; payload: string }
    | { type: 'SELECT_ALL_DOMAINS' }
    | { type: 'TOGGLE_SYMPTOM'; payload: string }
    | { type: 'UPDATE_SYMPTOM_DETAIL'; payload: { symptomId: string; updates: Partial<UserSymptomInput> } }
    | { type: 'TRIGGER_CRISIS'; payload: RedFlagLevel }
    | { type: 'ACKNOWLEDGE_CRISIS' }
    | { type: 'SET_RESULTS'; payload: NavigatorResults }
    | { type: 'SET_REGION'; payload: string }
    | { type: 'ANNOUNCE'; payload: { message: string; mode: 'polite' | 'assertive' } }
    | { type: 'RESET_FLOW' }
    | { type: 'RESTORE_STATE'; payload: {
        currentStep: NavigatorState['currentStep'];
        selectedDomains: string[];
        selectedSymptoms: Map<string, UserSymptomInput>;
        crisisAcknowledged: boolean;
        ageGatePassed: boolean;
    } };

// Initial State
const initialState: NavigatorState = {
    currentStep: 'welcome',
    knowledgeBase: null,
    isLoading: true,
    error: null,
    selectedDomains: [],
    selectedSymptoms: new Map(),
    crisisTriggered: false,
    crisisLevel: null,
    crisisAcknowledged: false,
    detectedRegion: null, // Will be populated later via region detection
    results: null,
    kbLoadedAt: null,
    sessionHash: crypto.randomUUID(),
    startTime: Date.now(),
    liveAnnouncement: null,
    ageGatePassed: false,
};

// Reducer
function navigatorReducer(state: NavigatorState, action: NavigatorAction): NavigatorState {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, currentStep: action.payload };

        case 'KNOWLEDGE_BASE_LOADED':
            return { ...state, knowledgeBase: action.payload, isLoading: false, kbLoadedAt: Date.now() };

        case 'KNOWLEDGE_BASE_ERROR':
            return { ...state, error: action.payload, isLoading: false };

        case 'TOGGLE_DOMAIN': {
            const isSelected = state.selectedDomains.includes(action.payload);
            const newDomains = isSelected
                ? state.selectedDomains.filter(d => d !== action.payload)
                : [...state.selectedDomains, action.payload];
            return { ...state, selectedDomains: newDomains };
        }

        case 'SELECT_ALL_DOMAINS': {
            if (!state.knowledgeBase) return state;
            // Gather all unique domains from the symptoms
            const uniqueDomains = Array.from(new Set(state.knowledgeBase.symptoms.map(s => s.domain)));
            return { ...state, selectedDomains: uniqueDomains };
        }

        case 'TOGGLE_SYMPTOM': {
            const newMap = new Map(state.selectedSymptoms);
            const id = action.payload;
            if (newMap.has(id)) {
                newMap.delete(id);
            } else {
                newMap.set(id, { symptom_id: id });
            }
            return { ...state, selectedSymptoms: newMap };
        }

        case 'UPDATE_SYMPTOM_DETAIL': {
            const newMap = new Map(state.selectedSymptoms);
            const { symptomId, updates } = action.payload;
            const existing = newMap.get(symptomId) || { symptom_id: symptomId };
            newMap.set(symptomId, { ...existing, ...updates });
            return { ...state, selectedSymptoms: newMap };
        }

        case 'TRIGGER_CRISIS':
            return {
                ...state,
                crisisTriggered: true,
                crisisLevel: action.payload
            };

        case 'ACKNOWLEDGE_CRISIS':
            return { ...state, crisisAcknowledged: true, crisisTriggered: false };

        case 'SET_RESULTS':
            return { ...state, results: action.payload };

        case 'SET_REGION':
            return { ...state, detectedRegion: action.payload };

        case 'ANNOUNCE':
            return {
                ...state,
                liveAnnouncement: {
                    message: action.payload.message,
                    mode: action.payload.mode,
                    id: Date.now()
                }
            };

        case 'RESET_FLOW':
            clearNavigatorState();
            return {
                ...initialState,
                knowledgeBase: state.knowledgeBase,
                isLoading: false,
                kbLoadedAt: state.kbLoadedAt,
                sessionHash: crypto.randomUUID(),
                startTime: Date.now(),
                detectedRegion: state.detectedRegion,
            };

        case 'RESTORE_STATE':
            return {
                ...state,
                currentStep: action.payload.currentStep,
                selectedDomains: action.payload.selectedDomains,
                selectedSymptoms: action.payload.selectedSymptoms,
                crisisAcknowledged: action.payload.crisisAcknowledged,
                ageGatePassed: action.payload.ageGatePassed,
            };

        default:
            return state;
    }
}

// Steps that represent stable, user-interactive states (persisted to storage)
const PERSISTABLE_STEPS = new Set(['domains', 'symptoms', 'details']);

// Context creation
const NavigatorContext = createContext<{
    state: NavigatorState;
    dispatch: React.Dispatch<NavigatorAction>;
    announcePolite: (message: string) => void;
    announceAssertive: (message: string) => void;
    prefetchKnowledgeBase: () => void;
    wasRestored: boolean;
    wasCorrupted: boolean;
} | undefined>(undefined);

// Define regions mapping
const detectRegion = (): string => {
    try {
        const locale = navigator.language.toUpperCase();
        // Extract country code from locale (e.g., "en-US" → "US", "pt-BR" → "BR")
        const parts = locale.split(/[-_]/);
        const country = parts.length > 1 ? parts[1] : '';

        // Map locale country codes to crisis resource region keys
        const regionMap: Record<string, string> = {
            US: 'US', GB: 'GB', UK: 'GB', CA: 'CA', AU: 'AU',
            IN: 'IN', BD: 'BD', DE: 'DE', FR: 'FR', BR: 'BR',
            NZ: 'NZ', IE: 'IE', ZA: 'ZA', PH: 'PH', SG: 'SG',
        };

        if (country && regionMap[country]) return regionMap[country];

        // Fallback: check if the primary language hints at a region
        const langHints: Record<string, string> = {
            EN: 'US', HI: 'IN', BN: 'BD', DE: 'DE', FR: 'FR', PT: 'BR',
        };
        const lang = parts[0];
        if (lang && langHints[lang]) return langHints[lang];
    } catch {
        // Ignore error
    }
    return 'DEFAULT'; // International fallback
};

// Cache to avoid re-processing on re-renders
let prefetchCache: KnowledgeBase | null = null;

async function fetchKnowledgeBaseData(): Promise<KnowledgeBase> {
    if (prefetchCache) return prefetchCache;

    // Use bundled knowledge base directly — no fetch needed in client-only Vite app.
    // The mock KB is comprehensive (106 symptoms, 45 conditions, 448 mappings)
    // and is bundled by Vite, eliminating network latency and path issues.
    prefetchCache = mockKnowledgeBase;
    return prefetchCache;
}

export const NavigatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(navigatorReducer, initialState);
    const analyticsRef = useRef<NavigatorAnalytics | null>(null);
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const restoredRef = useRef(false);
    const corruptedRef = useRef(false);

    const announcePolite = useCallback((message: string) => dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'polite' } }), []);
    const announceAssertive = useCallback((message: string) => dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'assertive' } }), []);

    // Prefetch function (can be called on hover/focus)
    const prefetchKnowledgeBase = useCallback(() => {
        if (!prefetchCache) {
            fetchKnowledgeBaseData().catch(() => {
                // Silently fail prefetch - will retry on actual navigation
            });
        }
    }, []);

    // Initial setup & KB fetch
    useEffect(() => {
        // Set region via dispatch (not direct mutation)
        dispatch({ type: 'SET_REGION', payload: detectRegion() });

        // Initialize analytics tracker
        if (!analyticsRef.current) {
            analyticsRef.current = new NavigatorAnalytics(state.sessionHash, state.sessionHash);
        }

        // Attempt to restore persisted state
        const hadRawData = hasRawNavigatorState();
        const persisted = loadNavigatorState();
        if (persisted) {
            const restoredStep = (persisted.currentStep === 'processing' || persisted.currentStep === 'results')
                ? 'details' as NavigatorState['currentStep']
                : persisted.currentStep as NavigatorState['currentStep'];
            dispatch({
                type: 'RESTORE_STATE',
                payload: {
                    currentStep: restoredStep,
                    selectedDomains: persisted.selectedDomains,
                    selectedSymptoms: new Map(persisted.selectedSymptoms),
                    crisisAcknowledged: persisted.crisisAcknowledged,
                    ageGatePassed: persisted.ageGatePassed,
                },
            });
            restoredRef.current = true;
        } else if (hadRawData) {
            // Had data but it was invalid/expired — corrupted state was cleared
            corruptedRef.current = true;
        }

        const loadKnowledgeBase = async () => {
            try {
                const data = await fetchKnowledgeBaseData();
                dispatch({ type: 'KNOWLEDGE_BASE_LOADED', payload: data });
            } catch {
                const message = 'Failed to load symptom data. Please try again later.';
                dispatch({ type: 'KNOWLEDGE_BASE_ERROR', payload: message });
                dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'assertive' } });
            }
        };

        loadKnowledgeBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Debounced save to localStorage on state changes
    useEffect(() => {
        if (!PERSISTABLE_STEPS.has(state.currentStep)) return;

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            saveNavigatorState(state);
        }, 500);

        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [state.currentStep, state.selectedDomains, state.selectedSymptoms, state.crisisAcknowledged, state.ageGatePassed]);

    // Track step transitions
    useEffect(() => {
        if (analyticsRef.current && state.currentStep !== 'welcome') {
            const stepNames: Record<string, string> = {
                domains: 'Domain Selection',
                symptoms: 'Symptom Selection',
                details: 'Duration & Severity',
                processing: 'Processing',
                results: 'Results'
            };

            const stepName = stepNames[state.currentStep];
            if (stepName) {
                analyticsRef.current.trackStepView(state.currentStep, stepName);
            }
        }
    }, [state.currentStep]);

    // Track completion
    useEffect(() => {
        if (state.currentStep === 'results' && state.results && analyticsRef.current) {
            analyticsRef.current.trackComplete(
                state.selectedSymptoms.size,
                state.results.results?.length || 0
            );
        }
    }, [state.currentStep, state.results, state.selectedSymptoms.size]);

    const contextValue = useMemo(() => ({
        state, dispatch, announcePolite, announceAssertive, prefetchKnowledgeBase,
        wasRestored: restoredRef.current,
        wasCorrupted: corruptedRef.current,
    }), [state, announcePolite, announceAssertive, prefetchKnowledgeBase]);

    return (
        <NavigatorContext.Provider value={contextValue}>
            {children}
        </NavigatorContext.Provider>
    );
};

export const useNavigator = () => {
    const context = useContext(NavigatorContext);
    if (context === undefined) {
        throw new Error('useNavigator must be used within a NavigatorProvider');
    }
    return context;
};
