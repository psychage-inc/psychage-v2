import React, { createContext, useContext, useReducer, useEffect, ReactNode, useRef } from 'react';
import {
    KnowledgeBase,
    NavigatorResults,
    RedFlagLevel,
    UserSymptomInput,
    UserDuration,
    UserFrequency
} from '../lib/navigator/types';
import { NavigatorAnalytics } from '../lib/navigator/analytics';

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
    | { type: 'RESET_FLOW' };

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
            return {
                ...initialState,
                knowledgeBase: state.knowledgeBase,
                isLoading: false,
                kbLoadedAt: state.kbLoadedAt,
                sessionHash: crypto.randomUUID(),
                startTime: Date.now(),
                detectedRegion: state.detectedRegion,
            };

        default:
            return state;
    }
}

// Context creation
const NavigatorContext = createContext<{
    state: NavigatorState;
    dispatch: React.Dispatch<NavigatorAction>;
    announcePolite: (message: string) => void;
    announceAssertive: (message: string) => void;
    prefetchKnowledgeBase: () => void;
} | undefined>(undefined);

// Define regions mapping
const detectRegion = (): string => {
    try {
        const locale = navigator.language;
        if (locale.includes('US') || locale.includes('us')) return 'US';
        if (locale.includes('GB') || locale.includes('gb') || locale.includes('UK') || locale.includes('uk')) return 'GB';
        if (locale.includes('CA') || locale.includes('ca')) return 'CA';
        if (locale.includes('AU') || locale.includes('au')) return 'AU';
    } catch (e) {
        // Ignore error
    }
    return 'DEFAULT'; // International fallback
};

// Prefetch state tracking (module-level to prevent duplicate fetches)
let prefetchPromise: Promise<KnowledgeBase> | null = null;
let prefetchCache: KnowledgeBase | null = null;

async function fetchKnowledgeBaseData(): Promise<KnowledgeBase> {
    if (prefetchCache) return prefetchCache;
    if (prefetchPromise) return prefetchPromise;

    prefetchPromise = (async () => {
        try {
            const mockDataUrl = '/api/navigator/knowledge-base';
            const res = await fetch(mockDataUrl);
            if (res.ok) {
                const data = await res.json();
                prefetchCache = data;
                return data;
            } else {
                throw new Error('Could not load knowledge base');
            }
        } catch (error) {
            console.warn('Prefetch failed, will try fallback on demand...', error);
            const module = await import('../data/mock_knowledge_base');
            prefetchCache = module.mockKnowledgeBase;
            return prefetchCache;
        }
    })();

    return prefetchPromise;
}

export const NavigatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(navigatorReducer, initialState);
    const analyticsRef = useRef<NavigatorAnalytics | null>(null);

    const announcePolite = (message: string) => dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'polite' } });
    const announceAssertive = (message: string) => dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'assertive' } });

    // Prefetch function (can be called on hover/focus)
    const prefetchKnowledgeBase = () => {
        if (!state.knowledgeBase && !prefetchPromise) {
            fetchKnowledgeBaseData().catch(() => {
                // Silently fail prefetch - will retry on actual navigation
            });
        }
    };

    // Initial setup & KB fetch
    useEffect(() => {
        // Set region via dispatch (not direct mutation)
        dispatch({ type: 'SET_REGION', payload: detectRegion() });

        // Initialize analytics tracker
        if (!analyticsRef.current) {
            analyticsRef.current = new NavigatorAnalytics(state.sessionHash, state.sessionHash);
        }

        const loadKnowledgeBase = async () => {
            try {
                const data = await fetchKnowledgeBaseData();
                dispatch({ type: 'KNOWLEDGE_BASE_LOADED', payload: data });
            } catch (error) {
                const message = 'Failed to load symptom data. Please try again later.';
                dispatch({ type: 'KNOWLEDGE_BASE_ERROR', payload: message });
                dispatch({ type: 'ANNOUNCE', payload: { message, mode: 'assertive' } });
            }
        };

        loadKnowledgeBase();
    }, [state.sessionHash]);

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

    return (
        <NavigatorContext.Provider value={{ state, dispatch, announcePolite, announceAssertive, prefetchKnowledgeBase }}>
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
