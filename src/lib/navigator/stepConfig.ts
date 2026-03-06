/**
 * Step configuration for Navigator flow.
 * Single source of truth for step IDs, labels, and order.
 */

export type NavigatorStep = 'welcome' | 'domains' | 'symptoms' | 'details' | 'processing' | 'results';

export interface StepConfig {
    id: NavigatorStep;
    label: string;
    shortLabel: string;
    order: number;
}

export const STEP_CONFIGS: Record<NavigatorStep, StepConfig> = {
    welcome: {
        id: 'welcome',
        label: 'Welcome',
        shortLabel: 'Start',
        order: 0
    },
    domains: {
        id: 'domains',
        label: 'Select Domains',
        shortLabel: 'Domains',
        order: 1
    },
    symptoms: {
        id: 'symptoms',
        label: 'Select Symptoms',
        shortLabel: 'Symptoms',
        order: 2
    },
    details: {
        id: 'details',
        label: 'Duration & Severity',
        shortLabel: 'Details',
        order: 3
    },
    processing: {
        id: 'processing',
        label: 'Processing Results',
        shortLabel: 'Processing',
        order: 4
    },
    results: {
        id: 'results',
        label: 'View Results',
        shortLabel: 'Results',
        order: 5
    }
};

/**
 * Returns the step configuration for a given step ID
 */
export function getStepConfig(stepId: NavigatorStep): StepConfig {
    return STEP_CONFIGS[stepId] ?? STEP_CONFIGS.welcome;
}

/**
 * Returns step number (1-indexed for display)
 */
export function getStepNumber(stepId: NavigatorStep): number {
    return STEP_CONFIGS[stepId].order + 1;
}

/**
 * Returns total number of steps (excluding welcome)
 */
export function getTotalSteps(): number {
    return Object.values(STEP_CONFIGS).filter(s => s.order > 0).length;
}

/**
 * Checks if a step is before another step in the flow
 */
export function isStepBefore(stepId: NavigatorStep, targetStep: NavigatorStep): boolean {
    return STEP_CONFIGS[stepId].order < STEP_CONFIGS[targetStep].order;
}

/**
 * Checks if jumping to a target step would invalidate data
 * (e.g., going back to symptoms would invalidate details/results)
 */
export function wouldJumpInvalidateData(
    currentStep: NavigatorStep,
    targetStep: NavigatorStep
): boolean {
    // Jumping back to symptoms or domains from details/processing/results invalidates downstream data
    if (
        (targetStep === 'symptoms' || targetStep === 'domains') &&
        (currentStep === 'details' || currentStep === 'processing' || currentStep === 'results')
    ) {
        return true;
    }
    return false;
}
