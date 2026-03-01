// Navigator feature flags and configuration
// TODO: Product/Legal review required for age gate implementation

export interface NavigatorConfig {
    // Age gate configuration
    // NOTE: Requires product/legal approval before enabling
    // See COPPA compliance requirements: https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy
    enableAgeGate: boolean;
    ageGateMinimumAge: number; // Default: 13 (COPPA threshold in US)

    // Other feature flags
    enableAnalytics: boolean;
    enablePrefetch: boolean;
}

// Default configuration
export const navigatorConfig: NavigatorConfig = {
    // Age gate is DISABLED by default pending legal review
    // To enable: set VITE_NAVIGATOR_AGE_GATE=true in .env
    enableAgeGate: import.meta.env.VITE_NAVIGATOR_AGE_GATE === 'true',
    ageGateMinimumAge: parseInt(import.meta.env.VITE_NAVIGATOR_AGE_GATE_MIN_AGE || '13', 10),

    enableAnalytics: import.meta.env.VITE_NAVIGATOR_ANALYTICS !== 'false',
    enablePrefetch: import.meta.env.VITE_NAVIGATOR_PREFETCH !== 'false',
};

// Legal/compliance TODO items:
// - [ ] Review age gate language with legal team
// - [ ] Determine appropriate minimum age for jurisdiction(s)
// - [ ] Define data collection policies for minors
// - [ ] Implement parental consent flow if required
// - [ ] Add age verification audit logging
// - [ ] Review COPPA, GDPR-K, and other child privacy regulations
