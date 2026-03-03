/**
 * EMERGENCY MODAL (TIER 3)
 *
 * The most critical UI component in the system.
 * Renders as React Portal above all z-index layers.
 *
 * CRITICAL REQUIREMENTS:
 * - Cannot be dismissed with Escape, click outside, or browser back
 * - Only dismissal: "I've called for help" or "I'm safe right now"
 * - Test on iPhone SE + budget Android before deployment
 * - WCAG 2.1 AA contrast minimum
 * - First focus on heading for screen reader context
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShieldAlert, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import type { EmergencyModalProps, CrisisResource } from '../types/crisis.types';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { logCrisisEvent, getSessionId } from '../lib/crisisLogger';

export function EmergencyModal({
  isOpen,
  onDismiss,
  resources,
  locale,
  emergencyNumber,
}: EmergencyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Custom Escape handler: focus primary button instead of closing
  const handleEscapeKey = () => {
    if (primaryButtonRef.current) {
      primaryButtonRef.current.focus();
    }
  };

  // Focus trap: Escape focuses primary button (doesn't close modal)
  // Initial focus on heading for screen reader context (WCAG 2.4.3)
  useFocusTrap(modalRef, isOpen, undefined, undefined, headingRef, false, handleEscapeKey);

  useEffect(() => {
    // Prevent body scrolling when modal is active
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDismiss = async (path: 'called_help' | 'safe_now') => {
    // Log dismissal event (anonymous)
    await logCrisisEvent({
      tier: 3,
      countryCode: emergencyNumber || 'INTL',
      detectedLanguage: locale,
      sessionId: getSessionId(),
      throughlineResourceShown: resources.length > 0,
      emergencyModalDismissed: true,
      dismissalPath: path,
    });

    onDismiss(path);
  };

  const getResourceIcon = (resource: CrisisResource) => {
    if (resource.phoneNumber) {
      return <Phone className="w-5 h-5" />;
    }
    if (resource.textOption) {
      return <MessageSquare className="w-5 h-5" />;
    }
    return <ExternalLink className="w-5 h-5" />;
  };

  const getResourceAction = (resource: CrisisResource) => {
    if (resource.phoneNumber) {
      return {
        href: `tel:${resource.phoneNumber.replace(/[^\d+]/g, '')}`,
        text: 'Call Now',
        target: undefined,
      };
    }
    if (resource.textOption) {
      return {
        href: `sms:${resource.textOption.replace(/[^\d]/g, '')}`,
        text: 'Text Now',
        target: undefined,
      };
    }
    if (resource.chatUrl) {
      return {
        href: resource.chatUrl,
        text: 'Chat Now',
        target: '_blank' as const,
      };
    }
    return {
      href: '#',
      text: 'Contact',
      target: undefined,
    };
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm z-[9998]" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
          <div
            ref={modalRef}
            className="relative bg-charcoal-900/90 backdrop-blur-xl rounded-2xl text-left overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.15)] transform transition-all sm:my-8 sm:max-w-2xl w-full border border-crisis-red/20"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="emergency-modal-title"
            aria-describedby="emergency-modal-description"
            tabIndex={-1}
          >
            {/* Red accent bar */}
            <div className="h-2 bg-crisis-red w-full"></div>

            <div className="px-6 py-8 sm:p-10">
              <div className="sm:flex sm:items-start gap-6">
                {/* Icon */}
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-crisis-red/10 sm:mx-0">
                  <ShieldAlert className="h-8 w-8 text-crisis-red" aria-hidden="true" />
                </div>

                {/* Header */}
                <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h1
                    ref={headingRef}
                    className="text-2xl font-serif font-bold text-white drop-shadow-sm"
                    id="emergency-modal-title"
                    tabIndex={-1}
                  >
                    You are not alone right now
                  </h1>
                  <div className="mt-3">
                    <p id="emergency-modal-description" className="text-base text-charcoal-200 leading-relaxed">
                      Help is available right now. Please reach out to one of these crisis resources — they are available 24/7 and want to support you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Crisis Resources */}
              <div className="mt-8 space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 mb-2">
                  Available Support
                </h2>
                {resources.map((resource) => {
                  const action = getResourceAction(resource);
                  return (
                    <div
                      key={resource.id}
                      className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Ambient red glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-crisis-red/10 to-transparent opacity-50 pointer-events-none rounded-xl"></div>
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crisis-red shadow-[0_0_10px_rgba(239,68,68,0.8)] pointer-events-none"></div>

                      <div className="ml-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-semibold text-lg text-white">
                              {resource.organizationName}
                            </h3>
                            {resource.isAvailable24_7 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-crisis-red/20 text-red-300 border border-crisis-red/30 backdrop-blur-sm">
                                24/7
                              </span>
                            )}
                          </div>

                          <p className="font-mono font-medium text-lg text-white pt-1">
                            {resource.phoneNumber || resource.textOption || resource.chatUrl || ''}
                          </p>
                        </div>

                        <a
                          href={action.href}
                          target={action.target}
                          rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center justify-center gap-2 bg-crisis-red/90 text-white px-5 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400/30 hover:bg-crisis-red transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 w-full sm:w-auto flex-shrink-0"
                        >
                          {getResourceIcon(resource)}
                          <span>{action.text}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dismissal Buttons */}
              <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-white/20 px-6 py-3 bg-white/10 text-base font-medium text-white shadow-sm hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 focus-visible:ring-offset-charcoal-900 sm:w-auto sm:text-sm transition-colors backdrop-blur-md"
                  onClick={() => handleDismiss('safe_now')}
                >
                  I'm safe right now
                </button>
                <button
                  ref={primaryButtonRef}
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-white/20 px-6 py-3 bg-white text-charcoal-900 text-base font-medium shadow-sm hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 focus-visible:ring-offset-charcoal-900 sm:w-auto sm:text-sm transition-colors"
                  onClick={() => handleDismiss('called_help')}
                >
                  I've called for help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
