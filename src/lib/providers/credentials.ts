/**
 * Credential glossary for mental health provider credentials.
 * Maps common abbreviations to their full names.
 */
export const CREDENTIAL_GLOSSARY: Record<string, { full: string }> = {
  'LCSW': { full: 'Licensed Clinical Social Worker' },
  'LMSW': { full: 'Licensed Master Social Worker' },
  'PsyD': { full: 'Doctor of Psychology' },
  'PhD': { full: 'Doctor of Philosophy (Psychology)' },
  'MD': { full: 'Doctor of Medicine (Psychiatrist)' },
  'DO': { full: 'Doctor of Osteopathy (Psychiatrist)' },
  'LMHC': { full: 'Licensed Mental Health Counselor' },
  'LPC': { full: 'Licensed Professional Counselor' },
  'LPCC': { full: 'Licensed Professional Clinical Counselor' },
  'LMFT': { full: 'Licensed Marriage and Family Therapist' },
  'LCPC': { full: 'Licensed Clinical Professional Counselor' },
  'PMHNP': { full: 'Psychiatric Mental Health Nurse Practitioner' },
  'PMHNP-BC': { full: 'Board Certified Psychiatric Mental Health NP' },
  'NP': { full: 'Nurse Practitioner' },
  'APRN': { full: 'Advanced Practice Registered Nurse' },
  'LICSW': { full: 'Licensed Independent Clinical Social Worker' },
  'LISW': { full: 'Licensed Independent Social Worker' },
  'LPC-S': { full: 'Licensed Professional Counselor – Supervisor' },
  'LCMHC': { full: 'Licensed Clinical Mental Health Counselor' },
  'EdD': { full: 'Doctor of Education' },
  'DNP': { full: 'Doctor of Nursing Practice' },
  'PA-C': { full: 'Physician Assistant – Certified' },
  'RN': { full: 'Registered Nurse' },
  'BCBA': { full: 'Board Certified Behavior Analyst' },
  'CAC': { full: 'Certified Addiction Counselor' },
  'CADC': { full: 'Certified Alcohol and Drug Counselor' },
  'CASAC': { full: 'Credentialed Alcoholism and Substance Abuse Counselor' },
  'MS': { full: 'Master of Science' },
  'MA': { full: 'Master of Arts' },
  'MSW': { full: 'Master of Social Work' },
  'MFT': { full: 'Marriage and Family Therapist' },
};

/**
 * Parse a credentials string (e.g., "LCSW, PhD") and return expanded explanations.
 * Returns null if no known credentials are found.
 */
export function explainCredential(credentialString: string): string | null {
  const parts = credentialString
    .split(/[,;]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const explanations: string[] = [];
  for (const part of parts) {
    const entry = CREDENTIAL_GLOSSARY[part];
    if (entry) {
      explanations.push(`${part} — ${entry.full}`);
    }
  }

  return explanations.length > 0 ? explanations.join('\n') : null;
}
