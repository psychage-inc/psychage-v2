// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProcessingScreen, PROCESSING_STEPS, STEP_INTERVAL_MS, FINAL_DELAY_MS } from '../ProcessingScreen';
import * as NavigatorContextModule from '../../../context/NavigatorContext';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

vi.mock('lucide-react', () => ({
    ShieldAlert: () => <svg data-testid="icon-shield" />
}));

vi.mock('../../navigator/NavigatorButton', () => ({
    NavigatorButton: ({ children, onClick, variant, ...props }: any) => (
        <button onClick={onClick} data-variant={variant} {...props}>
            {children}
        </button>
    )
}));

vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, className, ...props }: any, ref: any) => (
            <div ref={ref} className={className} {...props}>
                {children}
            </div>
        )),
        p: ({ children, className, ...props }: any) => (
            <p className={className} {...props}>
                {children}
            </p>
        ),
        circle: (props: any) => <circle {...props} />,
        span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

vi.mock('../../../lib/navigator/engine', () => ({
    runSymptomNavigator: vi.fn(() => ({
        results: [],
        safety: { has_crisis: false, has_urgent: false },
        metadata: { timestamp: Date.now() }
    }))
}));

describe('ProcessingScreen timing budget', () => {
    it('total animation delay stays within 2500ms budget', () => {
        const totalMs = PROCESSING_STEPS.length * STEP_INTERVAL_MS + FINAL_DELAY_MS;
        expect(totalMs).toBeLessThanOrEqual(2500);
    });

    it('has exactly 3 processing steps', () => {
        expect(PROCESSING_STEPS).toHaveLength(3);
    });
});

describe('ProcessingScreen Error States', () => {
    const mockDispatch = vi.fn();
    const mockAnnounceAssertive = vi.fn();
    const mockAnnouncePolite = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    it('should render error UI when knowledgeBase is missing', () => {
        const mockState = {
            knowledgeBase: null,
            selectedSymptoms: new Map(),
            detectedRegion: 'US',
            kbLoadedAt: null,
            crisisTriggered: false,
            currentStep: 'processing' as const
        };

        vi.spyOn(NavigatorContextModule, 'useNavigator').mockReturnValue({
            state: mockState as any,
            dispatch: mockDispatch,
            announceAssertive: mockAnnounceAssertive,
            announcePolite: mockAnnouncePolite,
            prefetchKnowledgeBase: vi.fn()
        });

        render(<ProcessingScreen />);

        // Should show error message
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/Processing Error/i)).toBeInTheDocument();
        expect(screen.getByText(/symptom data unavailable/i)).toBeInTheDocument();

        // Should announce error assertively
        expect(mockAnnounceAssertive).toHaveBeenCalledWith(
            expect.stringContaining('symptom data unavailable')
        );
    });

    it('should provide recovery actions in error state', async () => {
        const user = userEvent.setup();

        const mockState = {
            knowledgeBase: null,
            selectedSymptoms: new Map(),
            detectedRegion: 'US',
            kbLoadedAt: null,
            crisisTriggered: false,
            currentStep: 'processing' as const
        };

        vi.spyOn(NavigatorContextModule, 'useNavigator').mockReturnValue({
            state: mockState as any,
            dispatch: mockDispatch,
            announceAssertive: mockAnnounceAssertive,
            announcePolite: mockAnnouncePolite,
            prefetchKnowledgeBase: vi.fn()
        });

        render(<ProcessingScreen />);

        // Should have Go Back button
        const goBackButton = screen.getByRole('button', { name: /Go Back/i });
        expect(goBackButton).toBeInTheDocument();

        await user.click(goBackButton);
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_STEP', payload: 'symptoms' });

        // Should have Start Over button
        const startOverButton = screen.getByRole('button', { name: /Start Over/i });
        expect(startOverButton).toBeInTheDocument();

        await user.click(startOverButton);
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET_FLOW' });
    });

    it('should render processing UI when knowledgeBase exists', () => {
        const mockState = {
            knowledgeBase: {
                symptoms: [],
                conditions: [],
                mappings: [],
                crisisResources: {}
            },
            selectedSymptoms: new Map(),
            detectedRegion: 'US',
            kbLoadedAt: Date.now(),
            crisisTriggered: false,
            currentStep: 'processing' as const
        };

        vi.spyOn(NavigatorContextModule, 'useNavigator').mockReturnValue({
            state: mockState as any,
            dispatch: mockDispatch,
            announceAssertive: mockAnnounceAssertive,
            announcePolite: mockAnnouncePolite,
            prefetchKnowledgeBase: vi.fn()
        });

        render(<ProcessingScreen />);

        // Should show processing message (first step)
        expect(screen.getByText(/Analyzing symptom patterns/i)).toBeInTheDocument();
    });
});
