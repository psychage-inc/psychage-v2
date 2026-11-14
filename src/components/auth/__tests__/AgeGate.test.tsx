import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgeGate from '../AgeGate';

// Node >= 22 ships a global `localStorage` that shadows jsdom's and is
// undefined without --localstorage-file. Point the global at jsdom's Storage.
beforeAll(() => {
    vi.stubGlobal('localStorage', (globalThis as unknown as { jsdom: { window: Window } }).jsdom.window.localStorage);
});

const UNDER_18_TEXT =
    'Psychage accounts are for adults 18 and over. You can still read our free articles and watch our videos. If you need help now, call or text 988.';
const LOCK_KEY = 'psychage_age_gate_locked_until';
const HOUR = 60 * 60 * 1000;
const NOW = new Date('2026-11-14T12:00:00Z');

function renderGate(onPass = vi.fn()) {
    const utils = render(
        <MemoryRouter>
            <AgeGate onPass={onPass} />
        </MemoryRouter>,
    );
    return { ...utils, onPass };
}

function chooseYear(year: number) {
    fireEvent.change(screen.getByLabelText('What year were you born?'), { target: { value: String(year) } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
}

describe('AgeGate', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(NOW);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('has no default year selected and Continue is disabled', () => {
        renderGate();
        const select = screen.getByLabelText('What year were you born?') as HTMLSelectElement;
        expect(select.tagName).toBe('SELECT');
        expect(select.value).toBe('');

        const placeholder = screen.getByRole('option', { name: 'Select year' }) as HTMLOptionElement;
        expect(placeholder).toBeDisabled();
        expect(placeholder.selected).toBe(true);
        expect(select.options[0]).toBe(placeholder);

        expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
    });

    it('lists years from the current year down to current year minus 120', () => {
        renderGate();
        const select = screen.getByLabelText('What year were you born?') as HTMLSelectElement;
        const years = Array.from(select.options).slice(1).map((o) => Number(o.value));
        expect(years[0]).toBe(2026);
        expect(years[years.length - 1]).toBe(2026 - 120);
        expect(years).toHaveLength(121);
    });

    it('enables Continue once a year is chosen', () => {
        renderGate();
        fireEvent.change(screen.getByLabelText('What year were you born?'), { target: { value: '1990' } });
        expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
    });

    it('renders no hint of the required age', () => {
        const { container } = renderGate();
        // Everything except the year options themselves.
        const clone = container.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('option:not([value=""])').forEach((o) => o.remove());
        expect(clone.textContent).toBe('What year were you born?Select yearContinue');
        expect(clone.textContent).not.toMatch(/18|\+|must be|adult|older|minimum|age/i);
        expect(container.innerHTML).not.toMatch(/18\+|must be|years of age/i);
    });

    it('under 18: shows the exact message and locks the gate for 24h', () => {
        const { onPass } = renderGate();
        chooseYear(2026 - 17);

        expect(onPass).not.toHaveBeenCalled();
        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent(UNDER_18_TEXT);
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
        expect(localStorage.getItem(LOCK_KEY)).toBe(String(NOW.getTime() + 24 * HOUR));

        expect(screen.getByRole('link', { name: 'Browse articles' })).toHaveAttribute('href', '/learn');
        expect(screen.getByRole('link', { name: 'Call 988' })).toHaveAttribute('href', 'tel:988');
        expect(screen.getByRole('link', { name: 'Text 988' })).toHaveAttribute('href', 'sms:988');
    });

    it('the lock persists across remount', () => {
        const first = renderGate();
        chooseYear(2026 - 10);
        first.unmount();

        vi.setSystemTime(new Date(NOW.getTime() + 23 * HOUR));
        renderGate();
        expect(screen.getByText(UNDER_18_TEXT)).toBeInTheDocument();
        expect(screen.queryByLabelText('What year were you born?')).not.toBeInTheDocument();
    });

    it('the lock expires after 24h and the gate shows again', () => {
        const first = renderGate();
        chooseYear(2026 - 10);
        first.unmount();

        vi.setSystemTime(new Date(NOW.getTime() + 24 * HOUR));
        renderGate();
        expect(screen.queryByText(UNDER_18_TEXT)).not.toBeInTheDocument();
        expect(screen.getByLabelText('What year were you born?')).toBeInTheDocument();
        expect(localStorage.getItem(LOCK_KEY)).toBeNull();
    });

    it('adult year calls onPass and does not lock', () => {
        const { onPass } = renderGate();
        chooseYear(2026 - 18);
        expect(onPass).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem(LOCK_KEY)).toBeNull();
        expect(screen.queryByText(UNDER_18_TEXT)).not.toBeInTheDocument();
    });
});
