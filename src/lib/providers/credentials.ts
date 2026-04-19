// =============================================================================
// Credential Glossary — maps abbreviations to full professional titles
// =============================================================================

const CREDENTIAL_GLOSSARY: Record<string, string> = {
  // Doctoral
  MD: 'Doctor of Medicine',
  DO: 'Doctor of Osteopathic Medicine',
  PhD: 'Doctor of Philosophy',
  PsyD: 'Doctor of Psychology',
  EdD: 'Doctor of Education',
  DNP: 'Doctor of Nursing Practice',
  PharmD: 'Doctor of Pharmacy',
  // Master's
  MSW: 'Master of Social Work',
  MA: 'Master of Arts',
  MS: 'Master of Science',
  MEd: 'Master of Education',
  MFT: 'Master of Marriage and Family Therapy',
  MPH: 'Master of Public Health',
  // Licensed clinical
  LCSW: 'Licensed Clinical Social Worker',
  LMSW: 'Licensed Master Social Worker',
  LMFT: 'Licensed Marriage and Family Therapist',
  LPC: 'Licensed Professional Counselor',
  LPCC: 'Licensed Professional Clinical Counselor',
  LCPC: 'Licensed Clinical Professional Counselor',
  LMHC: 'Licensed Mental Health Counselor',
  // Nursing
  PMHNP: 'Psychiatric-Mental Health Nurse Practitioner',
  'PMHNP-BC': 'Psychiatric-Mental Health Nurse Practitioner — Board Certified',
  NP: 'Nurse Practitioner',
  RN: 'Registered Nurse',
  APRN: 'Advanced Practice Registered Nurse',
  // Board certifications & specializations
  ABPP: 'American Board of Professional Psychology',
  BCB: 'Board Certified in Biofeedback',
  BCBA: 'Board Certified Behavior Analyst',
  // Additional licensed titles (from Phase 1)
  LICSW: 'Licensed Independent Clinical Social Worker',
  LISW: 'Licensed Independent Social Worker',
  'LPC-S': 'Licensed Professional Counselor — Supervisor',
  LCMHC: 'Licensed Clinical Mental Health Counselor',
  'PA-C': 'Physician Assistant — Certified',
  // Addiction credentials (from Phase 1)
  CAC: 'Certified Addiction Counselor',
  CADC: 'Certified Alcohol and Drug Counselor',
  CASAC: 'Credentialed Alcoholism and Substance Abuse Counselor',
  // Phase 2 additions
  'LCSW-R': 'Licensed Clinical Social Worker — Registered',
  'LPC-MHSP': 'Licensed Professional Counselor — Mental Health Service Provider',
  LSCSW: 'Licensed Specialist Clinical Social Worker',
  LAC: 'Licensed Associate Counselor',
  LMHP: 'Licensed Mental Health Practitioner',
  LCADC: 'Licensed Clinical Alcohol and Drug Counselor',
  NCSP: 'Nationally Certified School Psychologist',
  CSW: 'Clinical Social Worker',
  ACSW: 'Academy of Certified Social Workers',
};

/**
 * Parses a credential string (e.g., "LCSW, PhD") and returns a formatted
 * explanation string (e.g., "Licensed Clinical Social Worker, Doctor of Philosophy").
 * Returns null if no credentials are recognized.
 */
export function explainCredential(credentialString: string | null | undefined): string | null {
  if (!credentialString) return null;

  const parts = credentialString
    .split(/[,;]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const expanded = parts
    .map((abbr) => CREDENTIAL_GLOSSARY[abbr] ?? null)
    .filter((v): v is string => v !== null);

  return expanded.length > 0 ? expanded.join(', ') : null;
}
