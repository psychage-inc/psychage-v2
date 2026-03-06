import {
  Heart,
  Layout,
  ShieldAlert,
  Wrench,
  ListChecks,
  CheckCircle2,
} from 'lucide-react';

export const ONBOARDING_STEPS = [
  { label: 'Welcome', icon: Heart },
  { label: 'Platform', icon: Layout },
  { label: 'Guidelines', icon: ShieldAlert },
  { label: 'Admin Tools', icon: Wrench },
  { label: 'Quick Start', icon: ListChecks },
  { label: 'Complete', icon: CheckCircle2 },
] as const;

export type OnboardingStepIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
}
