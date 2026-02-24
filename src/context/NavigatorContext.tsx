import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import {
    KnowledgeBase,
    NavigatorResults,
    RedFlagLevel,
    UserSymptomInput,
    UserDuration,
    UserFrequency
} from '../lib/navigator/types';

// Define the shape of our state
export interface NavigatorState {
    currentStep: 'welcome' | 'domains' | 'symptoms' | 'details' | 'processing' | 'results';
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

    sessionHash: string;
    startTime: number;
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
    sessionHash: Math.random().toString(36).substring(2, 15),
    startTime: Date.now(),
};

// Reducer
function navigatorReducer(state: NavigatorState, action: NavigatorAction): NavigatorState {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, currentStep: action.payload };

        case 'KNOWLEDGE_BASE_LOADED':
            return { ...state, knowledgeBase: action.payload, isLoading: false };

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

        case 'RESET_FLOW':
            return {
                ...initialState,
                knowledgeBase: state.knowledgeBase, // Keep KB loaded
                isLoading: false,
                sessionHash: Math.random().toString(36).substring(2, 15),
                startTime: Date.now(),
                detectedRegion: state.detectedRegion
            };

        default:
            return state;
    }
}

// Context creation
const NavigatorContext = createContext<{
    state: NavigatorState;
    dispatch: React.Dispatch<NavigatorAction>;
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

export const NavigatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(navigatorReducer, initialState);

    // Initial setup & KB fetch
    useEffect(() => {
        // Set region
        state.detectedRegion = detectRegion();

        const fetchKnowledgeBase = async () => {
            try {
                // In a real app, this would be: 
                // const response = await fetch('/api/navigator/knowledge-base');
                // const data = await response.json();

                // For development/demonstration, we will import a mock if fetch fails
                // To prevent blocking, let's try fetch or fallback to a timeout mock
                const mockDataUrl = '/api/navigator/knowledge-base';
                const res = await fetch(mockDataUrl);
                if (res.ok) {
                    const data = await res.json();
                    dispatch({ type: 'KNOWLEDGE_BASE_LOADED', payload: data });
                } else {
                    throw new Error('Could not load knowledge base');
                }
            } catch (error) {
                console.warn('Using fallback knowledge base...', error);
                import('../data/mock_knowledge_base').then((module) => {
                    dispatch({ type: 'KNOWLEDGE_BASE_LOADED', payload: module.mockKnowledgeBase });
                }).catch(() => {
                    dispatch({ type: 'KNOWLEDGE_BASE_ERROR', payload: 'Failed to load' });
                });
            }
        };

        fetchKnowledgeBase();
    }, []);

    return (
        <NavigatorContext.Provider value={{ state, dispatch }}>
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
