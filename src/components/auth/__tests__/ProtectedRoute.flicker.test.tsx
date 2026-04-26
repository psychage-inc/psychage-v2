import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

/**
 * AUTH-020: ProtectedRoute must NOT flash the loading spinner when
 * auth hydration completes within ~200ms (the typical case). The
 * spinner should only appear if loading drags past the defer threshold.
 */

let mockState: { isAuthenticated: boolean; isLoading: boolean } = {
    isAuthenticated: false,
    isLoading: false,
};

vi.mock('../../../context/AuthContext', () => ({
    useAuth: () => mockState,
}));

vi.mock('../../ui/Skeletons', () => ({
    GlobalLoading: () => <div data-testid="global-loading">loading</div>,
}));

import ProtectedRoute from '../ProtectedRoute';

function ProtectedContent() {
    return <div data-testid="content">protected content</div>;
}

function renderRoute() {
    return render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <ProtectedContent />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<div data-testid="login">login</div>} />
            </Routes>
        </MemoryRouter>,
    );
}

describe('ProtectedRoute — AUTH-020 loading flicker defer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders nothing for the first 200ms while loading', () => {
        mockState = { isAuthenticated: false, isLoading: true };
        const { container, queryByTestId } = renderRoute();
        // Within the defer window — no spinner, no content.
        expect(queryByTestId('global-loading')).toBeNull();
        expect(queryByTestId('content')).toBeNull();
        // Just below threshold
        act(() => {
            vi.advanceTimersByTime(150);
        });
        expect(queryByTestId('global-loading')).toBeNull();
        // Container body is empty (or contains only the route shell)
        expect(container.querySelector('[data-testid="global-loading"]')).toBeNull();
    });

    it('renders GlobalLoading after 200ms if still loading', () => {
        mockState = { isAuthenticated: false, isLoading: true };
        renderRoute();
        act(() => {
            vi.advanceTimersByTime(250);
        });
        expect(screen.getByTestId('global-loading')).toBeTruthy();
    });

    it('renders authenticated content immediately when not loading and authenticated', () => {
        mockState = { isAuthenticated: true, isLoading: false };
        renderRoute();
        expect(screen.getByTestId('content')).toBeTruthy();
        expect(screen.queryByTestId('global-loading')).toBeNull();
    });

    it('redirects to /login when unauthenticated and not loading', () => {
        mockState = { isAuthenticated: false, isLoading: false };
        renderRoute();
        expect(screen.getByTestId('login')).toBeTruthy();
    });
});
