 
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrisisSupportModalContent from '../../features/crisis/components/CrisisSupportModalContent';
import type { Severity } from '../../features/crisis/types';

function renderModal(severity: Severity, props = {}) {
  return render(
    <MemoryRouter>
      <CrisisSupportModalContent
        severity={severity}
        region="US"
        onClose={vi.fn()}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe('CrisisSupportModalContent', () => {
  it('renders WATCH severity with grounding exercise', () => {
    renderModal('WATCH');
    expect(screen.getByText('We noticed something')).toBeTruthy();
    expect(screen.getByText('Grounding Exercise')).toBeTruthy();
    expect(screen.getByText('View support options')).toBeTruthy();
  });

  it('WATCH: shows resources after clicking "View support options"', () => {
    renderModal('WATCH');
    fireEvent.click(screen.getByText('View support options'));
    expect(screen.getByText(/988 Suicide & Crisis Lifeline/)).toBeTruthy();
  });

  it('renders URGENT severity with resources and grounding', () => {
    renderModal('URGENT');
    expect(screen.getByText("You don't have to face this alone")).toBeTruthy();
    expect(screen.getByText('Grounding Exercise')).toBeTruthy();
    expect(screen.getByText(/988 Suicide & Crisis Lifeline/)).toBeTruthy();
  });

  it('URGENT: shows trusted contact section', () => {
    renderModal('URGENT', { onNotifyTrustedContact: vi.fn() });
    expect(screen.getByText('Trusted Contact')).toBeTruthy();
  });

  it('renders CRISIS severity with prominent call CTA', () => {
    renderModal('CRISIS');
    expect(screen.getByText('Please reach out right now')).toBeTruthy();
    expect(screen.getByText('Call 988')).toBeTruthy();
    expect(screen.getByText('Emergency Services')).toBeTruthy();
  });

  it('CRISIS: trusted contact requires explicit confirmation', () => {
    const onNotify = vi.fn();
    renderModal('CRISIS', { onNotifyTrustedContact: onNotify });

    // Initially only shows the toggle link
    const link = screen.getByText('Notify a trusted person that you need support');
    expect(link).toBeTruthy();

    // Click to expand confirmation form
    fireEvent.click(link);
    expect(screen.getByPlaceholderText('Name or phone number')).toBeTruthy();
    expect(screen.getByText('Confirm & Notify')).toBeTruthy();

    // Cannot notify without entering contact info
    const confirmBtn = screen.getByText('Confirm & Notify');
    fireEvent.click(confirmBtn);
    expect(onNotify).not.toHaveBeenCalled();

    // Enter contact and confirm
    const input = screen.getByPlaceholderText('Name or phone number');
    fireEvent.change(input, { target: { value: 'Maria 555-0192' } });
    fireEvent.click(screen.getByText('Confirm & Notify'));
    expect(onNotify).toHaveBeenCalledWith('Maria 555-0192');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderModal('WATCH', { onClose });
    fireEvent.click(screen.getByLabelText('Close crisis support dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows safety plan link when provided', () => {
    renderModal('WATCH', {
      safetyPlanUrl: 'https://example.com/safety-plan.pdf',
    });
    expect(screen.getByText('Download Safety Plan Template')).toBeTruthy();
  });

  it('falls back to US resources when no region provided', () => {
    render(
      <MemoryRouter>
        <CrisisSupportModalContent
          severity="CRISIS"
          onClose={vi.fn()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Call 988')).toBeTruthy();
  });
});
