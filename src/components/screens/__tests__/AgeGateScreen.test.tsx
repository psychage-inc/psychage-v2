import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AgeGateScreen, UnderageNoticeScreen } from '../AgeGateScreen';

describe('AgeGateScreen', () => {
    it('renders age confirmation question', () => {
        render(<AgeGateScreen onContinue={vi.fn()} onUnderage={vi.fn()} />);

        expect(screen.getByText(/are you 13 years of age or older/i)).toBeInTheDocument();
    });

    it('shows both Yes and No options', () => {
        render(<AgeGateScreen onContinue={vi.fn()} onUnderage={vi.fn()} />);

        expect(screen.getByRole('button', { name: /yes, i am 13\+/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /no, i am younger/i })).toBeInTheDocument();
    });

    it('calls onContinue when Yes is clicked', async () => {
        const user = userEvent.setup();
        const handleContinue = vi.fn();
        const handleUnderage = vi.fn();

        render(<AgeGateScreen onContinue={handleContinue} onUnderage={handleUnderage} />);

        const yesButton = screen.getByRole('button', { name: /yes, i am 13\+/i });
        await user.click(yesButton);

        expect(handleContinue).toHaveBeenCalled();
        expect(handleUnderage).not.toHaveBeenCalled();
    });

    it('calls onUnderage when No is clicked', async () => {
        const user = userEvent.setup();
        const handleContinue = vi.fn();
        const handleUnderage = vi.fn();

        render(<AgeGateScreen onContinue={handleContinue} onUnderage={handleUnderage} />);

        const noButton = screen.getByRole('button', { name: /no, i am younger/i });
        await user.click(noButton);

        expect(handleUnderage).toHaveBeenCalled();
        expect(handleContinue).not.toHaveBeenCalled();
    });

    it('displays crisis notice', () => {
        render(<AgeGateScreen onContinue={vi.fn()} onUnderage={vi.fn()} />);

        expect(screen.getByText(/this tool provides educational information only/i)).toBeInTheDocument();
    });
});

describe('UnderageNoticeScreen', () => {
    it('renders message for underage users', () => {
        render(<UnderageNoticeScreen onBack={vi.fn()} />);

        expect(screen.getByText(/talk to a trusted adult/i)).toBeInTheDocument();
        expect(screen.getByText(/this tool may not be appropriate for your age/i)).toBeInTheDocument();
    });

    it('shows crisis resources', () => {
        render(<UnderageNoticeScreen onBack={vi.fn()} />);

        expect(screen.getByText(/988/i)).toBeInTheDocument(); // Suicide & Crisis Lifeline
        expect(screen.getByText(/741741/i)).toBeInTheDocument(); // Crisis Text Line
    });

    it('calls onBack when Go Back is clicked', async () => {
        const user = userEvent.setup();
        const handleBack = vi.fn();

        render(<UnderageNoticeScreen onBack={handleBack} />);

        const backButton = screen.getByRole('button', { name: /go back/i });
        await user.click(backButton);

        expect(handleBack).toHaveBeenCalled();
    });

    it('suggests talking to trusted adults', () => {
        render(<UnderageNoticeScreen onBack={vi.fn()} />);

        expect(screen.getByText(/parent/i)).toBeInTheDocument();
        expect(screen.getByText(/guardian/i)).toBeInTheDocument();
        expect(screen.getByText(/school counselor/i)).toBeInTheDocument();
    });
});
