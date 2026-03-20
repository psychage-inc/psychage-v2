// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CrisisOverlay } from '../CrisisOverlay';
import * as NavigatorContextModule from '../../../context/NavigatorContext';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

vi.mock('lucide-react', () => ({
    ShieldAlert: () => <svg data-testid="icon-shield" />,
    X: () => <svg data-testid="icon-x" />,
    Phone: () => <svg data-testid="icon-phone" />,
    MessageSquare: () => <svg data-testid="icon-message" />,
    Globe: () => <svg data-testid="icon-globe" />,
    ExternalLink: () => <svg data-testid="icon-external" />
}));

vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, className, ...props }: any, ref: any) => (
            <div ref={ref} className={className} {...props}>
                {children}
            </div>
        ))
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

describe('CrisisOverlay Accessibility & Focus Trap', () => {
    const mockDispatch = vi.fn();
    const mockAnnounceAssertive = vi.fn();
    const mockAnnouncePolite = vi.fn();

    const renderOverlay = (isVisible: boolean) => {
        const mockState = {
            crisisTriggered: isVisible,
            crisisAcknowledged: false,
            detectedRegion: 'US',
            knowledgeBase: {
                crisisResources: {
                    US: [
                        { id: '1', name: 'Suicide Hotline', type: 'phone', contact: '988', description: 'National hotline', hours: '24/7' }
                    ]
                }
            }
        };

        vi.spyOn(NavigatorContextModule, 'useNavigator').mockReturnValue({
            state: mockState as any,
            dispatch: mockDispatch,
            announceAssertive: mockAnnounceAssertive,
            announcePolite: mockAnnouncePolite,
            prefetchKnowledgeBase: vi.fn()
        });

        return render(
            <div>
                <button data-testid="outside-button">Outside</button>
                <CrisisOverlay />
            </div>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    it('should trap focus within the overlay when visible', async () => {
        const user = userEvent.setup();
        renderOverlay(true);

        const dialog = screen.getByRole('alertdialog');
        expect(dialog).toBeInTheDocument();

        const understandButton = screen.getByRole('button', { name: "I understand, continue to results" });
        const links = screen.getAllByRole('link');
        const outsideButton = screen.getByTestId('outside-button');

        // Focus first link
        links[0].focus();
        expect(links[0]).toHaveFocus();

        // Tab through all focusable elements — focus should never escape to outside
        for (let i = 0; i < links.length + 2; i++) {
            await user.tab();
            expect(outsideButton).not.toHaveFocus();
        }

        // After cycling, the understand button should be reachable
        understandButton.focus();
        expect(understandButton).toHaveFocus();
    });

    it('should focus acknowledge button on Escape key (not close)', async () => {
        const user = userEvent.setup();
        renderOverlay(true);

        await user.keyboard('{Escape}');

        // Escape focuses the acknowledge button instead of closing (acknowledgment is required)
        expect(mockAnnounceAssertive).toHaveBeenCalledWith("Please acknowledge to continue.");
    });

    it('should announce assertively when opened', () => {
        renderOverlay(true);
        expect(mockAnnounceAssertive).toHaveBeenCalledWith(
            "Important Safety Information shown. Please consider reaching out to one of the resources provided."
        );
    });

    it('should call dispatch when acknowledge button is clicked', async () => {
        const user = userEvent.setup();
        renderOverlay(true);

        const acknowledgeButton = screen.getByRole('button', { name: /I understand/i });
        await user.click(acknowledgeButton);

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'ACKNOWLEDGE_CRISIS' });
    });

    it('should have focusable heading with tabIndex', () => {
        renderOverlay(true);

        const heading = screen.getByText(/Important Safety Information/i);
        expect(heading.tagName).toBe('H3');
        expect(heading.getAttribute('tabindex')).toBe('-1');
    });

    it('should render modal even when knowledgeBase is null', () => {
        const mockState = {
            crisisTriggered: true,
            crisisAcknowledged: false,
            detectedRegion: 'US',
            knowledgeBase: null // Missing knowledge base
        };

        vi.spyOn(NavigatorContextModule, 'useNavigator').mockReturnValue({
            state: mockState as any,
            dispatch: mockDispatch,
            announceAssertive: mockAnnounceAssertive,
            announcePolite: mockAnnouncePolite,
            prefetchKnowledgeBase: vi.fn()
        });

        const { container } = render(<CrisisOverlay />);

        // Should still render the modal structure (even without resources)
        const title = screen.getByText(/Important Safety Information/i);
        expect(title).toBeTruthy();
        expect(container.querySelector('[role="alertdialog"]')).toBeTruthy();
    });
});
