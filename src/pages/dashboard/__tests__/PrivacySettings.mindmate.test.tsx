import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Settings > Privacy > MindMate (compliance item 6): counsel-approved text,
// "Turn off MindMate" withdraws consent, "Delete all conversations" hard-deletes.

const hasActiveMindMateConsent = vi.fn();
const withdrawMindMateConsent = vi.fn();
const deleteAllMindMateConversations = vi.fn();
vi.mock('@/services/mindmateDataService', () => ({
  hasActiveMindMateConsent: () => hasActiveMindMateConsent(),
  withdrawMindMateConsent: () => withdrawMindMateConsent(),
  deleteAllMindMateConversations: () => deleteAllMindMateConversations(),
}));
vi.mock('@/services/consentService', () => ({
  consentService: {
    getActiveConsents: vi.fn().mockResolvedValue({
      newsletter: false, analytics_cookies: false, ai_chat_history: false, clarity_score_tracking: false,
    }),
  },
}));
vi.mock('@/services/privacyService', () => ({
  privacyService: { getDSARHistory: vi.fn().mockResolvedValue([]) },
}));
const toast = vi.hoisted(() => ({ addToast: () => {} }));
vi.mock('@/context/ToastContext', () => ({ useToast: () => toast }));
// Stable references: the page reloads on every new `user` object.
const auth = vi.hoisted(() => ({ user: { id: 'u1' }, deleteAccount: () => Promise.resolve({ success: true }) }));
vi.mock('@/context/AuthContext', () => ({ useAuth: () => auth }));
vi.mock('../UserSidebar', () => ({ default: () => null }));
vi.mock('@/components/SEO', () => ({ default: () => null }));

import PrivacySettings from '../PrivacySettings';

const SETTINGS_TEXT =
  'Turning this off stops MindMate from sending your messages to Anthropic. You can also delete all MindMate conversations. Deletion removes them from Psychage within 30 days, including backups. Anthropic deletes any copy automatically within 30 days.';

function renderPage() {
  return render(
    <MemoryRouter>
      <PrivacySettings />
    </MemoryRouter>,
  );
}

describe('Settings > Privacy > MindMate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hasActiveMindMateConsent.mockResolvedValue(true);
    withdrawMindMateConsent.mockResolvedValue(undefined);
    deleteAllMindMateConversations.mockResolvedValue(undefined);
  });

  it('shows the counsel-approved text and the consent state', async () => {
    renderPage();
    expect(await screen.findByText(SETTINGS_TEXT)).toBeTruthy();
    expect(screen.getByText('MindMate consent:')).toBeTruthy();
    expect(screen.getByText('On')).toBeTruthy();
    expect(screen.getByRole('switch', { name: 'MindMate consent:' }).getAttribute('aria-checked')).toBe('true');
    expect(screen.getByRole('button', { name: 'Turn off MindMate' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete all conversations' })).toBeTruthy();
  });

  it('"Turn off MindMate" withdraws consent and shows Off', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Turn off MindMate' }));
    await waitFor(() => expect(withdrawMindMateConsent).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('Off')).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Turn off MindMate' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('"Delete all conversations" deletes after confirmation', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Delete all conversations' }));
    await waitFor(() => expect(deleteAllMindMateConversations).toHaveBeenCalledTimes(1));
  });

  it('does not delete when the confirmation is cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Delete all conversations' }));
    expect(deleteAllMindMateConversations).not.toHaveBeenCalled();
  });

  it('shows Off with a disabled switch when consent is not active', async () => {
    hasActiveMindMateConsent.mockResolvedValue(false);
    renderPage();
    expect(await screen.findByText('Off')).toBeTruthy();
    expect((screen.getByRole('switch', { name: 'MindMate consent:' }) as HTMLButtonElement).disabled).toBe(true);
  });
});
