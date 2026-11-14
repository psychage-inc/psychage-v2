import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const getMindMateConsentStatus = vi.fn();
const grantMindMateConsent = vi.fn();
const withdrawMindMateConsent = vi.fn();
vi.mock('@/services/mindmateDataService', () => ({
  getMindMateConsentStatus: () => getMindMateConsentStatus(),
  grantMindMateConsent: () => grantMindMateConsent(),
  withdrawMindMateConsent: () => withdrawMindMateConsent(),
}));

const summary = vi.hoisted(() => ({ value: null as string | null }));
vi.mock('@/lib/ai/mindmateConsent', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/ai/mindmateConsent')>();
  return {
    ...actual,
    get MINDMATE_CONSENT_CHANGE_SUMMARY() {
      return summary.value;
    },
  };
});

import { MindMateConsentGate, MindMateGreeting } from '../MindMateConsentGate';

function renderGate(onDecline = vi.fn()) {
  let lost: () => void = () => {};
  render(
    <MemoryRouter>
      <MindMateConsentGate onDecline={onDecline}>
        {(onConsentLost) => {
          lost = onConsentLost;
          return <div>CHAT</div>;
        }}
      </MindMateConsentGate>
    </MemoryRouter>,
  );
  return { onDecline, consentLost: () => lost() };
}

describe('MindMateConsentGate', () => {
  beforeEach(() => {
    getMindMateConsentStatus.mockReset();
    grantMindMateConsent.mockReset();
    withdrawMindMateConsent.mockReset();
    summary.value = null;
  });

  it('shows the consent screen, word for word, before the first message', async () => {
    getMindMateConsentStatus.mockResolvedValue('none');
    renderGate();

    expect(await screen.findByRole('heading', { name: 'Before you use MindMate' })).toBeInTheDocument();
    expect(screen.getByText('MindMate is an AI system, not a person, therapist, or clinician. It explains mental health topics for education. It cannot diagnose, treat, or give medical advice.')).toBeInTheDocument();
    expect(screen.getByText('Your messages may include health information. When you send a message:')).toBeInTheDocument();
    expect(screen.getByText('It goes to Anthropic, an AI company in the United States, which processes it for Psychage only. Anthropic does not use your messages to train its models and deletes them within 30 days, except messages flagged for a safety review, which it may keep longer.')).toBeInTheDocument();
    expect(screen.getByText('When AI Chat History is on, Psychage stores the conversation in your account until you delete it.')).toBeInTheDocument();
    expect(screen.getByText('Psychage never sells your messages or uses them for advertising.')).toBeInTheDocument();
    expect(screen.getByText('You can withdraw this consent and delete your conversations at any time in Settings > Privacy > MindMate.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read the Consumer Health Data Privacy Policy' })).toHaveAttribute('href', '/legal/privacy#health-data');
    expect(screen.getByRole('button', { name: 'I agree to MindMate processing my messages' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Not now' })).toBeInTheDocument();
    expect(screen.queryByText('CHAT')).not.toBeInTheDocument();
  });

  it('has nothing pre-ticked', async () => {
    getMindMateConsentStatus.mockResolvedValue('none');
    renderGate();
    await screen.findByRole('heading', { name: 'Before you use MindMate' });
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.queryAllByRole('switch')).toHaveLength(0);
    expect(grantMindMateConsent).not.toHaveBeenCalled();
  });

  it('records consent on agree, then shows the chat', async () => {
    getMindMateConsentStatus.mockResolvedValue('none');
    grantMindMateConsent.mockResolvedValue(undefined);
    renderGate();
    await userEvent.click(await screen.findByRole('button', { name: 'I agree to MindMate processing my messages' }));
    expect(grantMindMateConsent).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('CHAT')).toBeInTheDocument();
  });

  it('stays on the consent screen and shows the error when recording fails', async () => {
    getMindMateConsentStatus.mockResolvedValue('none');
    grantMindMateConsent.mockRejectedValue(new Error('Could not turn on MindMate: boom'));
    renderGate();
    await userEvent.click(await screen.findByRole('button', { name: 'I agree to MindMate processing my messages' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not turn on MindMate: boom');
    expect(screen.queryByText('CHAT')).not.toBeInTheDocument();
  });

  it('Not now leaves without recording consent', async () => {
    getMindMateConsentStatus.mockResolvedValue('none');
    const { onDecline } = renderGate();
    await userEvent.click(await screen.findByRole('button', { name: 'Not now' }));
    expect(onDecline).toHaveBeenCalledTimes(1);
    expect(grantMindMateConsent).not.toHaveBeenCalled();
  });

  it('shows the chat directly with a current consent', async () => {
    getMindMateConsentStatus.mockResolvedValue('current');
    renderGate();
    expect(await screen.findByText('CHAT')).toBeInTheDocument();
    expect(screen.queryByText('Before you use MindMate')).not.toBeInTheDocument();
  });

  it('shows no chat when consent cannot be read, with a retry', async () => {
    getMindMateConsentStatus.mockRejectedValueOnce(new Error('Could not read MindMate consent: down'));
    getMindMateConsentStatus.mockResolvedValueOnce('current');
    renderGate();
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not read MindMate consent: down');
    expect(screen.queryByText('CHAT')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByText('CHAT')).toBeInTheDocument();
  });

  it('returns to the consent screen when the server reports consent lost', async () => {
    getMindMateConsentStatus.mockResolvedValueOnce('current').mockResolvedValueOnce('none');
    const { consentLost } = renderGate();
    await screen.findByText('CHAT');
    consentLost();
    expect(await screen.findByRole('heading', { name: 'Before you use MindMate' })).toBeInTheDocument();
    expect(screen.queryByText('CHAT')).not.toBeInTheDocument();
  });

  describe('re-consent after a version bump', () => {
    beforeEach(() => {
      summary.value = 'MindMate now keeps conversations for 60 days.';
      getMindMateConsentStatus.mockResolvedValue('outdated');
    });

    it('shows the re-consent screen with both buttons', async () => {
      renderGate();
      expect(await screen.findByText('MindMate has changed how it handles your messages.')).toBeInTheDocument();
      expect(screen.getByText(/MindMate now keeps conversations for 60 days\. Please review and agree again to keep using MindMate\./)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Review and agree' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Turn off MindMate' })).toBeInTheDocument();
      expect(screen.queryByText('CHAT')).not.toBeInTheDocument();
    });

    it('Review and agree shows the consent text, and agreeing opens the chat', async () => {
      grantMindMateConsent.mockResolvedValue(undefined);
      renderGate();
      await userEvent.click(await screen.findByRole('button', { name: 'Review and agree' }));
      await userEvent.click(await screen.findByRole('button', { name: 'I agree to MindMate processing my messages' }));
      await waitFor(() => expect(grantMindMateConsent).toHaveBeenCalledTimes(1));
      expect(await screen.findByText('CHAT')).toBeInTheDocument();
    });

    it('Turn off MindMate withdraws consent and leaves', async () => {
      withdrawMindMateConsent.mockResolvedValue(undefined);
      const { onDecline } = renderGate();
      await userEvent.click(await screen.findByRole('button', { name: 'Turn off MindMate' }));
      await waitFor(() => expect(withdrawMindMateConsent).toHaveBeenCalledTimes(1));
      expect(onDecline).toHaveBeenCalledTimes(1);
      expect(grantMindMateConsent).not.toHaveBeenCalled();
    });
  });
});

describe('MindMateGreeting', () => {
  it('shows the start-of-session text and a Help Now control', async () => {
    const onHelpNow = vi.fn();
    render(<MemoryRouter><MindMateGreeting onHelpNow={onHelpNow} /></MemoryRouter>);
    expect(screen.getByText("Hi, I'm MindMate, an AI guide to mental health topics. I'm not a therapist and I can't diagnose or treat. If you're in crisis, tap Help Now or call or text 988.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Help Now' }));
    expect(onHelpNow).toHaveBeenCalled();
  });

  it('links Help Now to the crisis page by default', () => {
    render(<MemoryRouter><MindMateGreeting /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Help Now' })).toHaveAttribute('href', '/crisis');
  });
});
