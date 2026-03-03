/**
 * SAFETY PLAN BUILDER
 *
 * Interactive implementation of Stanley-Brown Safety Planning Intervention.
 * 5 steps (order is clinically significant — do not rearrange):
 * 1. Warning Signs
 * 2. Reasons to Live
 * 3. Who to Call
 * 4. Coping Strategies
 * 5. Safe Environments
 *
 * Clinical review: Dr. Lena Dobson
 */

import React, { useState } from 'react';
import { useSafetyPlan } from '../hooks/useSafetyPlan';
import type { SafetyPlanContent } from '../types/crisis.types';

export function SafetyPlanBuilder() {
  const { plan, savePlan, exportPDF, shareBySMS } = useSafetyPlan();
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState<SafetyPlanContent>({
    warningSigns: [],
    reasonsToLive: [],
    copingStrategies: [],
    contacts: [],
    safeEnvironments: [],
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Safety Plan</h1>
      {/* TODO: Step indicator (1-5) */}
      {/* Step content with title + clinical rationale */}
      {/* Auto-save every 30 seconds */}
      {/* Export options: PDF, SMS, shareable link */}
    </div>
  );
}
