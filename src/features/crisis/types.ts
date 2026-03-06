export type Severity = 'WATCH' | 'URGENT' | 'CRISIS';

export interface CrisisLine {
  name: string;
  num: string | null;
  chat?: boolean;
  text?: string;
  available: string;
  languages?: string[];
}

export interface CountryResources {
  name: string;
  flag: string;
  region: string;
  emergency: string;
  lines: CrisisLine[];
}

export interface CrisisSupportProps {
  severity: Severity;
  region?: string;
  onClose: () => void;
  onNotifyTrustedContact?: (contactInfo: string) => void;
  safetyPlanUrl?: string;
}
