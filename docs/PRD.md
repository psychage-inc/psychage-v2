# Project Psychage V1 - Product Requirements Document

**Author:** Ryan
**Date:** 2025-11-10
**Version:** 1.0

---

## Executive Summary

**Psychage is the "Mental Health Operating System"** - the definitive global infrastructure for mental health clarity and education. We solve a fundamental problem: the mental health space is fragmented, filled with misinformation, and lacks a trusted, comprehensive, evidence-based educational resource that serves global audiences with cultural sensitivity.

Nearly 1 billion people globally struggle with mental health challenges, yet there's no "Wikipedia for mental health" that combines evidence-first education with guided tools, provider connections, and culturally-native support within one seamless hub.

Psychage delivers:
- **Evidence-first education** (peer-reviewed, 8th-10th grade reading level)
- **Global provider directory** with verified professionals
- **Gamified self-assessment tools** (Clarity Score)
- **Viral educational content** (Spark content engine)
- **Premium community features** (Spark+ subscription)
- **Global mental health data intelligence** (Clarity Index)

We position ourselves as **"Wikipedia for Mental Health" + Guided Experience + Provider Network** - educational, not clinical; guiding, not diagnosing; global, not local.

### What Makes This Special

**"Clarity without overwhelming"** - This is the magic thread that runs through everything we build.

Mental health is complex, but understanding it shouldn't feel like drowning in information. Psychage gives users **exactly enough** to understand their situation and take meaningful next steps - never too little (leaving them confused), never too much (creating analysis paralysis).

This principle manifests in:
- **Clarity Score**: 10-minute assessment, not hour-long clinical interview
- **Hub-and-Spoke Navigation**: Focused entry points, not overwhelming mega-menus
- **Provider Directory**: Smart filters that narrow choices, not endless scrolling
- **Educational Content**: Digestible articles (8th-10th grade), not academic papers
- **Spark Content**: 30-60 second insights, not documentaries

**The Moment of Clarity**: Users should experience a "spark" - that emotional moment where something clicks, where confusion transforms into understanding. This happens when information is **just right** - clear, actionable, and empowering without being reductive or overwhelming.

---

## Project Classification

**Technical Type:** Web Application + Content Platform + SaaS
**Domain:** Healthcare / Mental Health Education
**Complexity:** HIGH

**MVP Strategy:** UI-First Approach
- **Phase 1:** Establish award-winning visual foundation (Epic 0)
- **Phase 2:** Build features using established design system (Epics 1-7)
- **Rationale:** Visual excellence is a trust signal in healthcare - users judge credibility by design quality. Better to establish a distinctive, portfolio-worthy design system before building features than to retrofit design later.

### Technical Classification

**Primary Type**: Progressive Web Application (PWA)
- Next.js 14+ (React framework)
- Server-side rendering + Static generation
- Mobile-first responsive design
- Offline-capable (future phase)

**Secondary Types**:
- **Content Management Platform**: Sanity.io headless CMS for educational content
- **SaaS B2B**: Provider directory subscriptions + certifications
- **Community Platform**: Spark+ private communities
- **Data Product**: Clarity Index annual reports

### Domain Context

**Healthcare Domain Complexity**: This is a **HIGH COMPLEXITY** healthcare domain project with critical regulatory and ethical considerations:

**Regulatory Landscape**:
- **GDPR Compliance**: Required (global platform, EU users)
- **CCPA/CPRA**: Required (California + US users)
- **HIPAA Status**: **EXEMPT** - Critical boundary we maintain
  - We do NOT collect Protected Health Information (PHI)
  - We do NOT provide diagnosis or treatment
  - We are an educational platform, not a covered entity
  - Must maintain this boundary through clear disclaimers and product design

**Domain-Specific Risks**:
- **Medical Liability**: Risk of users misinterpreting educational content as medical advice
- **Crisis Situations**: Users in mental health crisis may use platform
- **Data Sensitivity**: Mental health data is highly sensitive even when anonymized
- **Cultural Sensitivity**: Mental health stigma varies dramatically across cultures
- **Misinformation Risk**: Incorrect health information can cause harm

**Quality Standards Required**:
- All clinical content must be evidence-based (WHO, CDC, APA, NIMH, peer-reviewed sources)
- Periodic expert audits by licensed clinicians
- Clear "this is education, not diagnosis" disclaimers throughout
- Crisis resources prominently displayed
- Provider verification process (license checks, credential validation)

---

## Success Criteria

### Primary Success: The Clarity Moment

**"Psychage helped me understand my anxiety for the first time."**

This is the moment we're building toward - when someone who has been struggling with mental health confusion finally experiences clarity. Success means users can articulate:
- What they're experiencing (without medical jargon)
- Why it might be happening (evidence-based context)
- What they can do about it (actionable next steps)
- When to seek professional help (clear guidance)

**Measurement**:
- User testimonials mentioning "clarity," "understand," "finally makes sense"
- Clarity Score completion rate >70% (users find value in assessment)
- Content engagement: Average 3+ page views per session (exploring beyond entry point)
- Return rate: 40%+ of users return within 30 days (ritualized use)

### Secondary Success: Award-Winning User Experience

**"This is the most beautiful mental health platform I've ever used."**

Visual excellence is a competitive differentiator and trust signal in healthcare. Users judge credibility by design quality. Psychage must deliver:

- **Bold, distinctive aesthetics** that avoid generic health-tech design patterns
- **Memorable visual language** that makes Psychage instantly recognizable
- **Sophisticated UI craft** that signals professionalism and attention to detail
- **Accessible beauty** that maintains WCAG 2.1 AA while being visually striking

**Quality Bar:** Psychage UI should be portfolio-worthy, award-submission quality, and conversation-worthy ("Have you seen Psychage's design?").

**Measurement**:
- User testimonials mentioning "beautiful," "love the design," "stunning interface"
- Design community recognition (Product Hunt, Awwwards, CSS Design Awards)
- Developer satisfaction: Team proud to showcase in portfolios
- Competitive differentiation: Visually distinct from all mental health platforms

### Scale Success (3-Year Horizon)

**Provider Network**:
- **750 verified providers** across 5+ cities (US focus initially)
- Geographic coverage: San Francisco, NYC, LA, Austin, Seattle
- Provider retention: >85% year-over-year
- Provider satisfaction: NPS >50

**Patient/User Reach**:
- **12,000 active patients** engaging with provider directory
- **100,000+ monthly visitors** to educational content
- **500,000+ Clarity Score assessments** completed
- Platform available in **3 languages** (English, Spanish, Mandarin)

**Content Authority**:
- **500+ evidence-based articles** covering major mental health topics
- **50+ provider/academic citations** of Clarity Index data
- **10+ media mentions** (major publications referencing Psychage)

### Business Success: Sustainable Impact

**Financial Sustainability**:
- **Profitability by Month 27** (Year 2, Q3)
- **$3.37M ARR by Year 3** across 8 revenue streams
- **Positive unit economics**: Provider LTV:CAC ratio >10:1
- **Cash flow positive**: Able to reinvest in growth without external capital

**Business Model Validation**:
- Multiple revenue streams working (not dependent on single source)
- Provider subscriptions: 60% of providers on paid tiers
- Spark+ subscriptions: 5,000+ paid subscribers
- Certification program: 100+ certified providers/institutions

**Mission Alignment**:
- Revenue enables continued free access to educational content
- Evidence-first standards maintained across all content
- No compromise on clinical quality for commercial growth
- Sustainable business that can operate indefinitely as public good

### What "Winning" Looks Like

**Year 3 Success Vision**:

Psychage is recognized as the **trusted educational resource** for mental health - the place people go first when they want to understand their mental health, before (or alongside) seeking professional help.

Mental health professionals **cite Clarity Index data** in research and policy recommendations. Patients tell their therapists, "I learned about this on Psychage" and providers respond, "Good resource, that's evidence-based."

The platform has created a **virtuous cycle**:
1. Free educational content attracts users seeking clarity
2. Clarity Score helps them understand their situation
3. Provider directory connects them with verified professionals
4. Paid tiers (Spark+, certifications) sustain the platform
5. Data insights (Clarity Index) reinforce authority
6. Authority drives more users → cycle continues

The business is **sustainably profitable**, allowing continued investment in content quality, global expansion, and maintaining the highest evidence-based standards - proving that mental health education can be both mission-driven AND commercially viable.

---

## Product Scope

### MVP - Minimum Viable Product

**Launch Timeline**: Months 0-6 (Solo dev + Claude Code)
**Goal**: Validate the core value proposition - "Clarity without overwhelming"

#### 1. Learn (Educational Hub) - CORE MVP

**Content Requirements**:
- **50 evidence-based articles** covering major mental health topics:
  - Top 10 conditions: Anxiety, Depression, PTSD, ADHD, OCD, Bipolar, Eating Disorders, Substance Use, Personality Disorders, Schizophrenia
  - 5 articles per condition: Overview, Symptoms, Causes, Treatment Options, Living With
- **Reading level**: 8th-10th grade (Flesch-Kincaid score 60-70)
- **Evidence citations**: Every clinical claim linked to WHO, CDC, APA, NIMH, or peer-reviewed source
- **Clear disclaimers**: "Educational resource, not medical advice" on every page

**Information Architecture**:
- **Hub-and-Spoke navigation**: Homepage as hub, Learn as primary spoke
- **3-level hierarchy**: Category (Anxiety) → Topic (GAD) → Content (Symptoms of GAD)
- **Related content links**: Each article suggests 3-5 related articles
- **Search functionality**: Basic keyword search across all content

**Technical Implementation**:
- Sanity.io CMS for content management
- Markdown-based articles with rich media support
- SEO-optimized (schema markup, meta tags, open graph)
- Mobile-responsive (mobile-first design)

#### 2. Connect (Provider Directory) - CORE MVP

**Initial Scale**:
- **20-50 verified providers** (SF Bay Area focus)
- **Manual verification** process for MVP (license checks, credential validation)
- **Basic provider profiles**: Name, credentials, specialties, contact info, location

**Search & Filter**:
- **Location-based search**: Zip code + radius
- **Specialty filter**: Anxiety, Depression, Trauma, ADHD, Couples, etc.
- **Discipline filter**: Therapist, Psychologist, Psychiatrist, Counselor
- **Session type**: In-person, Telehealth, Hybrid
- **Simple list view**: No map integration in MVP

**Provider Onboarding**:
- **Self-service signup form**: Providers submit credentials
- **Manual review**: Admin reviews and approves (no automation in MVP)
- **Free tier only**: No paid subscriptions in MVP (validate demand first)

**Compliance**:
- Clear disclaimer: "Directory for informational purposes, not referral service"
- No booking functionality in MVP (users contact providers directly)
- Provider verification badge displayed

#### 3. Tools (Clarity Score) - CORE MVP

**Assessment Design**:
- **10-minute questionnaire**: 20-30 questions covering key mental health dimensions
- **Validated frameworks**: Based on GAD-7, PHQ-9, PSS derivatives (non-diagnostic)
- **Score output**: 0-100 scale with breakdown by area (anxiety, depression, stress)
- **Personalized insights**: Brief interpretation of score with recommendations

**User Experience**:
- **Anonymous by default**: No login required for basic assessment
- **Optional account**: Save scores over time (requires email only)
- **Visual progress**: Progress bar during assessment, chart visualization for results
- **Action prompts**: Based on score, suggest relevant Learn articles or Provider Directory

**Critical Boundaries**:
- **Never diagnoses**: Clear disclaimer "This is not a diagnosis"
- **Crisis detection**: If severe scores detected, prominently display crisis resources (988 Suicide Hotline, local emergency services)
- **Privacy-first**: Scores stored anonymously, no PHI collected

#### 4. About (Company Pages) - CORE MVP

**Essential Pages**:
- **Homepage**: Hero section, value proposition, navigation to 3 satellites
- **About Us**: Mission, vision, "The Sage" brand identity
- **How It Works**: Explanation of platform and "clarity without overwhelming" principle
- **Privacy Policy**: GDPR/CCPA compliant privacy practices
- **Terms of Service**: User agreements, disclaimers, limitations of liability
- **Contact**: info@psychageinc.com, basic contact form

**Brand Elements**:
- **Orbit + Spark logo**: Visual identity present throughout
- **Consistent messaging**: "Mental Health Operating System," "Evidence-first," "Clarity"
- **Simple footer**: Links to all pages, crisis resources, social media placeholders

#### 5. Technical Foundation - MVP Infrastructure

**Core Stack**:
- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **CMS**: Sanity.io (headless CMS for Learn content)
- **Database**: Firebase (user accounts, Clarity Score data)
- **Hosting**: Vercel (CDN, edge caching, serverless functions)
- **Analytics**: Plausible Analytics (GDPR-compliant)

**Performance Targets**:
- Page load <2 seconds (Lighthouse LCP)
- Mobile-first responsive design
- HTTPS everywhere
- Basic SEO optimization

**What's NOT in MVP**:
- ❌ Spark viral content (no TikTok/Instagram content yet)
- ❌ Spark+ premium subscriptions (no community features)
- ❌ Provider paid tiers (all providers free in MVP)
- ❌ Booking/scheduling functionality
- ❌ AI chatbot
- ❌ Multilingual support (English only in MVP)
- ❌ Clarity Index data product
- ❌ Certifications program
- ❌ Mobile app

---

### Growth Features (Post-MVP)

**Timeline**: Months 7-18
**Goal**: Scale validated features, add revenue streams

#### Phase 2: Months 7-12

**1. Spark Viral Content Engine**:
- Launch TikTok, Instagram Reels, YouTube Shorts accounts
- Produce 3-5 viral content pieces per week
- Drive traffic back to platform
- Build social media following (10K+ followers)

**2. Provider Paid Tiers**:
- Free tier (basic listing)
- Growth tier: $49/mo (featured placement, analytics)
- Premium tier: $99/mo (top placement, full analytics)
- Provider dashboard for managing subscriptions

**3. Enhanced Provider Directory**:
- Map integration (show providers on map)
- Provider reviews & ratings
- Availability calendar
- Insurance filter
- More providers (100+ providers, expand to Oakland/San Jose)

**4. Clarity Score Enhancements**:
- Progress tracking over time (trend charts)
- Weekly check-ins (habit tracking)
- Personalized recommendations based on score
- Export score report (PDF)

**5. Learn Content Expansion**:
- 200+ articles (from 50 in MVP)
- Symptom Navigator (searchable symptoms → potential causes)
- Self-help resources (coping strategies, mindfulness exercises)
- Video content (expert interviews, educational series)

#### Phase 3: Months 13-18

**1. Spark+ Premium Subscription** ($9.99-14.99/mo):
- Private digital communities (Spark Circles)
- Exclusive content library (advanced guides, workshops)
- Advanced Clarity Score analytics
- Ad-free experience
- Offline access

**2. Provider Certifications** ($299-499/year):
- Psychage Certified Provider program
- Evidence-first principles training
- Cultural competency certification
- Enhanced directory visibility
- Official badge/seal

**3. Spark+ Pro (Practice Management)** ($149/mo):
- Scheduling & calendar sync
- Session notes (HIPAA-compliant)
- Client progress tracking
- Payment processing
- Client portal

**4. Multi-City Expansion**:
- NYC launch (100 providers)
- LA launch (100 providers)
- Geographic coverage across 3 major metros

---

### Vision (Future)

**Timeline**: Months 19-36+
**Goal**: Global scale, institutional partnerships, data authority

#### 1. Clarity Index - Global Data Product

**Annual Report**:
- Comprehensive mental health trends report
- Global stigma levels, adoption rates, intervention effectiveness
- Policy recommendations
- Anonymized data from Clarity Score assessments

**Revenue Model**:
- Free public summary (generates PR)
- Full report licensing ($15K-50K for institutions)
- API access (premium tier)
- Custom analysis (consulting)

**Distribution**:
- Media outlets (citations drive authority)
- Researchers & policymakers
- Healthcare organizations
- Corporations (employee wellness insights)

#### 2. Institutional Certifications

**Psychage Certified Institution** ($5K-25K/year):
- Universities & colleges
- Student mental well-being programs
- Campus awareness toolkits
- Access to specialized resources

**Psychage Certified Workplace** ($10K-100K/year):
- Corporate mental health programs
- Employee wellness toolkits
- Training programs
- EAP integration

#### 3. Global Expansion

**Multilingual Platform**:
- Spanish (Year 3, Q1)
- Mandarin (Year 3, Q2)
- French, Arabic, Hindi (Year 4+)

**Cultural Adaptation**:
- Culturally-specific content
- Local provider networks
- Region-specific mental health considerations

**International Markets**:
- Canada (English-speaking, similar healthcare)
- UK (NHS partnership potential)
- Australia
- Latin America (Spanish content)

#### 4. Advanced Features

**AI-Powered Features**:
- Chatbot for guided support (Claude API)
- Personalized content recommendations
- Symptom checker (non-diagnostic)
- Crisis detection & intervention

**Mobile App**:
- iOS & Android native apps
- Offline access to content
- Push notifications for check-ins
- App store presence

**Community Features**:
- User-generated content (moderated)
- Peer support forums
- Expert Q&A sessions
- Virtual events & workshops

#### 5. Partnerships & Integrations

**Healthcare Integrations**:
- EHR systems (for providers using Spark+ Pro)
- Telehealth platforms
- Insurance verification APIs
- Prescription tracking (for psychiatrists)

**NGO & Government Partnerships**:
- WHO collaboration (global mental health data)
- NIMH research partnerships (validation studies)
- City/state government contracts (public mental health education)
- University partnerships (student mental health programs)

**Corporate Partnerships**:
- HR software integrations (Workday, BambooHR)
- Employee wellness programs
- Insurance providers (mental health screening)

---

### Scope Decision Principles

**When deciding if a feature belongs in MVP, Growth, or Vision:**

1. **MVP Features Must**:
   - Prove the core value proposition ("clarity without overwhelming")
   - Be buildable by solo dev + Claude Code in 6 months
   - Require no external dependencies (partnerships, integrations)
   - Have clear success metrics for validation

2. **Growth Features Should**:
   - Build on validated MVP features
   - Add revenue streams once demand is proven
   - Scale existing capabilities (more providers, more content, more cities)
   - Require modest team expansion (1-3 additional people)

3. **Vision Features Are**:
   - Ambitious, long-term goals (12-36 months)
   - Require significant resources (team, capital, partnerships)
   - Dependent on prior phases' success
   - Strategic, not urgent (can wait without hurting core business)

---

## Domain-Specific Requirements

**Healthcare Domain Complexity**: Psychage operates in a HIGH COMPLEXITY healthcare domain that requires rigorous compliance, ethical standards, and risk mitigation strategies. These requirements shape every feature, design decision, and operational process.

### 1. HIPAA-Exempt Status Maintenance

**Critical Boundary**: Psychage MUST remain HIPAA-exempt by never becoming a "covered entity." This requires strict architectural and operational boundaries.

**Design Requirements**:
- **No PHI Collection**: Platform must NOT collect Protected Health Information as defined by HIPAA:
  - ❌ Medical history, diagnoses, or treatment plans
  - ❌ Provider notes about patients
  - ❌ Insurance information
  - ❌ Identifiable health data linked to individual identity
  - ✅ Anonymous Clarity Scores (not linked to identity)
  - ✅ General educational content consumption (anonymized analytics)

**Technical Safeguards**:
- Clarity Score stored anonymously (even if user has account, score data separated from identity)
- No "session notes" or "treatment records" functionality in MVP/Growth phases
- Provider Directory is informational only - no referrals, no tracking of who contacted whom
- Clear data architecture: User accounts (Firebase) separate from health data (anonymized)

**Operational Safeguards**:
- Regular audits of data collection practices
- Legal review before adding any new feature that touches user health data
- Employee training on HIPAA boundaries and why we maintain exempt status

**Disclaimers Required**:
- Homepage: "Educational platform, not a healthcare provider"
- Clarity Score: "This is not a diagnosis or medical advice"
- Provider Directory: "Informational directory, not a referral service"
- Every article footer: "Consult qualified healthcare professional for medical advice"

### 2. Medical Liability Risk Mitigation

**Risk Profile**: Users may misinterpret educational content as medical advice, leading to harm and potential liability.

**Content Standards**:
- **Evidence-Based Only**: Every clinical claim must cite WHO, CDC, APA, NIMH, or peer-reviewed research
- **Clarity of Limitations**: Content must explicitly state what it is NOT:
  - "This article explains symptoms of depression; it does not diagnose your condition"
  - "These coping strategies are educational; they are not a treatment plan"
- **Call-to-Action for Professional Help**: Every article ends with: "If experiencing these symptoms, consult a qualified mental health professional"

**Crisis Detection & Intervention**:
- **Clarity Score Triggers**: If score indicates severe depression, anxiety, or suicidal ideation:
  - Immediate prominent display of crisis resources
  - 988 Suicide & Crisis Lifeline (US)
  - Crisis Text Line: Text HOME to 741741
  - Local emergency services (911)
- **Crisis Resources Footer**: Every page footer includes "In crisis? 988 Lifeline" link
- **No False Reassurance**: Never minimize crisis indicators ("You'll be fine" is dangerous)

**Legal Protection**:
- Terms of Service includes liability limitations and dispute resolution
- Clear disclaimer on every page: "Not medical advice"
- Professional liability insurance (E&O insurance) for the company
- Legal review of all educational content before publication

### 3. Content Quality Assurance Process

**Quality Standards**: All clinical content must meet evidence-based medicine standards to prevent misinformation harm.

**Content Review Pipeline**:

**Phase 1: Research & Writing**
- Writer uses peer-reviewed sources (PubMed, CDC, WHO, APA)
- Every claim includes inline citation
- Reading level validated (Flesch-Kincaid 60-70)
- Clarity principle applied: "Just enough" information

**Phase 2: Expert Review**
- Licensed clinician (PhD, PsyD, MD) reviews content
- Checks for clinical accuracy, appropriate disclaimers, and completeness
- Verifies citations are correctly interpreted
- Approves or requests revisions

**Phase 3: Legal Review (for sensitive topics)**
- Legal counsel reviews content for liability risk
- Ensures disclaimers are adequate
- Approves language around crisis situations, self-harm, suicide

**Phase 4: Publication & Monitoring**
- Content published with "Last reviewed: [date]" and "Reviewed by: [credential]"
- Annual re-review schedule (clinical guidelines change)
- User feedback monitoring (flagging inaccuracies)

**Expert Advisory Board** (Growth Phase):
- Assemble advisory board of 3-5 licensed clinicians
- Quarterly content audits
- Review new features for clinical appropriateness
- Provide credibility for institutional partnerships

### 4. Provider Verification & Quality Control

**Risk**: Unverified or unqualified providers listed could harm users and expose platform to liability.

**Verification Requirements**:

**Tier 1: Basic Verification (MVP)**
- Valid professional license in state of practice
- License status: Active, not suspended or revoked
- Credential validation (PhD, PsyD, LCSW, LMFT, MD, etc.)
- Professional liability insurance (malpractice coverage)
- No disciplinary actions on public record

**Verification Process (MVP)**:
1. Provider submits credentials via form
2. Admin manually verifies:
   - State licensing board database check
   - Psychology Today or other directory cross-reference
   - Google search for disciplinary actions
3. Approval or rejection (with reason)
4. Verified badge displayed on profile

**Tier 2: Enhanced Verification (Growth Phase)**
- Background check (criminal record)
- Education verification (degree from accredited institution)
- Reference checks (2 professional references)
- Specialty certification validation (board certification)

**Ongoing Monitoring**:
- Annual license renewal verification
- User complaint process (flag providers for review)
- Removal process for providers who lose licensure
- Provider code of conduct (terms of directory listing)

**Quality Standards for Paid Tiers**:
- Growth/Premium tiers require:
  - Minimum 2 years post-licensure experience
  - No disciplinary actions in past 5 years
  - Professional liability insurance ≥$1M/$3M
  - Continuing education compliance

### 5. Data Privacy & Sensitivity

**Context**: Mental health data is highly sensitive and stigmatized. Privacy breaches can cause significant harm (employment discrimination, social stigma, insurance impacts).

**Privacy Principles**:
- **Minimize Data Collection**: Collect only what's essential
- **Anonymous by Default**: Clarity Score works without account
- **User Control**: Users can delete their data at any time
- **Transparency**: Clear privacy policy in plain language

**Regulatory Compliance**:

**GDPR (EU users)**:
- Right to access: Users can export their data
- Right to deletion: Users can delete account and all data
- Right to portability: Data exported in standard format (JSON)
- Consent mechanisms: Clear opt-in for data processing
- Data minimization: No excessive data collection

**CCPA/CPRA (California users)**:
- Disclosure of data collected and purposes
- Right to opt-out of data "sale" (we don't sell data, but must disclose)
- Right to deletion and access
- Privacy policy includes CCPA disclosures

**Data Security Measures**:
- Encryption in transit (HTTPS everywhere, TLS 1.3)
- Encryption at rest (Firebase encryption, Sanity.io secure)
- Access controls (role-based access for admin)
- Audit logs (track who accessed what data)
- Regular security audits (penetration testing in Growth phase)

**Anonymization Strategy**:
- Clarity Score data collected without identifiers
- Analytics use aggregated data only (no individual tracking)
- If user creates account, explicit consent for linking scores to account
- Research data (Clarity Index) fully anonymized and aggregated

### 6. Cultural Sensitivity & Global Considerations

**Challenge**: Mental health stigma, symptom expression, and help-seeking behavior vary dramatically across cultures.

**Content Localization** (Vision Phase):
- Not just translation - cultural adaptation
- Recognition that anxiety symptoms may be expressed differently (somatic vs. cognitive)
- Awareness of cultural stigma (e.g., Asian cultures may stigmatize mental illness more heavily)
- Different attitudes toward therapy (some cultures prefer family/religious support)

**Inclusive Language Standards**:
- Gender-neutral language throughout ("they/them" pronouns)
- Avoid assumptions about family structure, religion, socioeconomic status
- Represent diverse identities in examples and case studies
- Cultural humility: "This perspective is common in Western psychology" (acknowledge limitations)

**Provider Directory Diversity**:
- Recruit providers from diverse backgrounds
- Filter by: BIPOC therapists, LGBTQ+ affirming, Spanish-speaking, faith-based
- Cultural competency as quality criterion (not just clinical credentials)

**Crisis Resources Localization**:
- US: 988 Suicide & Crisis Lifeline
- International: Local crisis numbers (e.g., UK: 116 123 Samaritans)
- Multilingual crisis resources where available

### 7. Ethical Content Moderation (Future: Spark+ Community)

**Context**: When community features launch (Spark+ subscriptions), user-generated content introduces new risks.

**Moderation Requirements**:
- **Prohibited Content**: Self-harm promotion, suicide methods, pro-anorexia content, medical misinformation
- **Community Guidelines**: Clear rules about respectful discourse, no diagnoses of others, no medical advice
- **Moderation Team**: Trained moderators with mental health awareness
- **Escalation Protocols**: Concerning posts flagged to crisis team
- **User Safety Tools**: Block, report, mute functionality

**AI Moderation (Vision Phase)**:
- Automated flagging of concerning content (self-harm, crisis)
- Human review of flagged content (never fully automated decisions)
- Proactive crisis outreach (user posts concerning content → crisis resources sent)

### 8. Regulatory Monitoring & Adaptability

**Healthcare regulations evolve - Psychage must adapt.**

**Monitoring Requirements**:
- **Legal Counsel Retainer** (Growth Phase): Healthcare attorney on retainer for regulatory guidance
- **Regulatory Scan**: Quarterly review of new healthcare regulations (HIPAA updates, state laws, FDA guidance)
- **Industry Associations**: Join Digital Health Coalition or similar for regulatory updates
- **Compliance Audits**: Annual audit of GDPR, CCPA, HIPAA-exempt status

**Adaptability Planning**:
- If HIPAA rules change affecting educational platforms → compliance strategy update
- If new state laws regulate mental health apps → legal review and feature adjustments
- If FDA begins regulating mental health assessment tools → Clarity Score redesign or disclaimers

---

**Domain Requirements Summary**:

These healthcare-specific requirements are **non-negotiable** and shape every product decision:

1. **HIPAA-exempt status** drives data architecture (anonymous scores, no PHI)
2. **Medical liability risk** drives content quality standards (evidence-based, expert review)
3. **Crisis safety** drives UX patterns (crisis resources prominent, score triggers)
4. **Provider quality** drives verification processes (license checks, ongoing monitoring)
5. **Data sensitivity** drives privacy-first design (minimal collection, user control)
6. **Cultural diversity** drives content localization and inclusive language
7. **Regulatory compliance** drives operational processes (audits, monitoring, legal review)

Every functional and non-functional requirement below must be evaluated through this healthcare domain lens. When in doubt, choose the more cautious, privacy-protective, legally conservative approach.

---

## Innovation & Novel Patterns

Psychage introduces several novel approaches to mental health education and provider connection that differentiate it from existing solutions.

### 1. Hub-and-Spoke Navigation Architecture

**Innovation**: Most mental health websites use traditional top-nav mega-menus or linear flows. Psychage uses a **hub-and-spoke model** where the homepage is the central hub and 6 satellites radiate outward.

**Why Novel**:
- **Reduces Overwhelm**: Users aren't confronted with all options at once (no 20-item navigation menu)
- **Clear Entry Points**: Each satellite has singular purpose (Learn = education, Connect = providers, Tools = assessment)
- **Intentional Journeys**: Users choose their path based on need, not navigate complex site structure
- **Memorable Mental Model**: Users conceptualize platform as "6 distinct places" rather than one large website

**Comparison to Alternatives**:
- **Traditional Mental Health Sites** (PsychCentral, Verywell Mind): Mega-menu navigation with 50+ links → overwhelming
- **Therapy Directories** (Psychology Today, Zocdoc): Single-purpose (find therapist) → narrow
- **Assessment Tools** (Mental Health America screening): Single-purpose (take test) → isolated
- **Psychage**: Integrates all three with intentional separation and connection

**Risk**: Users may not understand the hub model initially (requires onboarding).

### 2. "Clarity Without Overwhelming" as Design System

**Innovation**: Most mental health resources either oversimplify (losing nuance) or over-explain (causing information overload). Psychage operationalizes "just enough" clarity as a **measurable design principle**.

**Implementation**:
- **Content Design**: Articles capped at 8-10 minute read time, 8th-10th grade reading level, 3-5 actionable takeaways max
- **Clarity Score**: 10-minute assessment (not 45-minute clinical interview), simple 0-100 score (not complex multi-axis report)
- **Provider Directory**: Smart filters narrow to 5-10 matches (not 500 options), no endless scrolling
- **Spark Content**: 30-60 second insights (not 10-minute videos), single concept per piece

**Measurable Criteria**:
- Flesch-Kincaid score 60-70 (validated readability)
- Cognitive load testing (how many decisions per page?)
- Time-to-clarity metric (how long to get actionable insight?)
- Bounce rate vs. depth (do users explore or leave confused?)

**Validation**: User testing with question: "After using Psychage, do you feel you understand your situation better?" Target: 80%+ yes.

### 3. Assessment-to-Provider Pipeline

**Innovation**: Most platforms separate assessment tools from provider directories. Psychage creates a **guided pipeline** from self-understanding to professional help.

**User Journey**:
1. User arrives seeking clarity (doesn't know what they're experiencing)
2. Takes Clarity Score (10 minutes, identifies anxiety/depression/stress levels)
3. Receives personalized insights and educational recommendations
4. **Seamless handoff**: "Based on your score, here are 5 local therapists specializing in anxiety"
5. User can immediately search providers filtered by their needs

**Why Novel**:
- **Warm Introduction**: Provider directory isn't cold start ("search therapists") but personalized recommendation
- **Contextual Matching**: Provider filters pre-selected based on assessment results
- **Reduces Decision Fatigue**: User doesn't need to self-diagnose then search, assessment guides them

**Market Gap**:
- **Assessment tools** (Mental Health America, Anxiety & Depression Association): Take test, get score, "see a doctor" (no directory)
- **Provider directories** (Psychology Today, Zocdoc): Search therapists (requires knowing what you need)
- **Psychage**: Assessment → Understanding → Providers (continuous journey)

### 4. Two-Sided Marketplace with Free Core

**Innovation**: Most mental health marketplaces monetize patient-side (subscription, booking fees). Psychage offers **free patient experience**, monetizes provider subscriptions and certifications.

**Business Model Novelty**:
- **Patient-side**: Always free (Learn articles, Clarity Score, basic provider search)
- **Provider-side**: Freemium (free basic listing, paid Growth/Premium tiers for visibility)
- **Institution-side**: Certifications ($5K-100K/year for universities, corporations)
- **Data-side**: Clarity Index licensing (research, policy, corporate insights)

**Why Novel**:
- **Aligns incentives**: Free for patients increases usage → more providers pay for access
- **Ethical positioning**: Mental health education should be free (mission-driven)
- **Multiple revenue streams**: Not dependent on single source (provider subscriptions + certifications + data)

**Comparison**:
- **BetterHelp/Talkspace**: Patient pays $260-400/month (high barrier)
- **Psychology Today**: Provider pays (~$30/mo), but no patient engagement tools
- **Headspace/Calm**: Patient subscription ($70/year), but no provider connection
- **Psychage**: Free for patients, comprehensive for providers, data monetization

### 5. Evidence-First Content as Competitive Moat

**Innovation**: While many health sites claim "evidence-based," few enforce rigorous clinical review. Psychage makes **expert-reviewed, cited content** the core differentiator.

**Quality Standards**:
- Every claim cited (WHO, CDC, APA, NIMH, peer-reviewed)
- Licensed clinician review before publication
- Annual re-review schedule (clinical guidelines change)
- "Last reviewed: [date], Reviewed by: [credential]" transparency

**Why This Matters**:
- **Trust Signal**: Users know content is reliable (not blogger opinion)
- **Institutional Credibility**: Universities, researchers cite Psychage content
- **SEO Advantage**: Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) rewards expert-reviewed health content
- **Legal Protection**: Reduces misinformation liability

**Comparison**:
- **WebMD**: Physician-reviewed (credible)
- **PsychCentral, Verywell Mind**: Editorial review (not always clinician-reviewed)
- **Reddit, Quora**: Peer anecdotes (not evidence-based)
- **Psychage**: Licensed clinician + legal review + citation standard (highest rigor)

---

### Validation Approach

**How we'll validate these innovations work:**

**1. Hub-and-Spoke Navigation**:
- **Metric**: Time to first meaningful action (Learn article read, Clarity Score started, Provider searched)
- **Target**: <60 seconds from homepage
- **User Testing**: "Can you find information about anxiety?" → observe navigation path
- **Iteration**: If users confused, add onboarding tour or clearer hub labels

**2. "Clarity Without Overwhelming"**:
- **Metric**: User sentiment survey after content consumption
- **Question**: "Did this article give you enough information to understand [topic]?"
- **Target**: 80%+ "Yes, just enough" (not "too little" or "too much")
- **A/B Testing**: Test different article lengths (500 words vs. 1,000 vs. 2,000) → find sweet spot

**3. Assessment-to-Provider Pipeline**:
- **Metric**: Clarity Score completion → Provider Directory visit rate
- **Target**: >40% of users who complete score subsequently visit provider directory
- **Conversion**: Of those who visit directory, >10% contact a provider
- **Feedback**: Post-score survey: "Was the provider recommendation helpful?"

**4. Two-Sided Marketplace Model**:
- **Metric**: Provider conversion to paid tiers
- **Target**: >60% of providers on paid tier within 12 months of joining
- **Patient Engagement**: Monthly active users (MAU) growth >10% MoM in first year
- **Revenue Validation**: Multiple revenue streams contributing (not 90%+ from single source)

**5. Evidence-First Content**:
- **Metric**: External citations of Psychage content (Google Scholar, media mentions)
- **Target**: >50 citations by Year 3
- **SEO**: Organic search traffic growth (evidence-reviewed content ranks higher)
- **Trust Signal**: User survey: "Do you trust Psychage content?" → >85% "Yes"

**Pivot Triggers** (if innovations aren't working):
- If hub-and-spoke confuses users (navigation heat maps show confusion) → revert to traditional nav
- If "clarity without overwhelming" doesn't resonate → test more detailed content
- If assessment-to-provider pipeline has <10% conversion → redesign handoff
- If provider freemium fails (providers don't upgrade) → test different pricing or patient-side monetization
- If evidence-first content doesn't drive trust → audit review process, increase transparency

---

## Web Application + SaaS B2B Specific Requirements

Psychage is a **Progressive Web Application (PWA)** with **multi-tenant SaaS architecture** supporting three distinct user types: patients (free users), providers (freemium B2B), and administrators.

### Platform Support

**Primary Platform**: Web (Desktop + Mobile Web)
- **Framework**: Next.js 14+ (React framework)
- **Rendering Strategy**: Hybrid SSR (Server-Side Rendering) + SSG (Static Site Generation) + CSR (Client-Side Rendering)
  - **SSG**: Educational content (Learn articles) → pre-rendered, SEO-optimized, fast load
  - **SSR**: Provider directory search → dynamic, personalized, crawlable
  - **CSR**: Clarity Score assessment, user dashboard → interactive, real-time

**Mobile-First Design**:
- 60%+ of mental health searches happen on mobile (Google data)
- Responsive breakpoints: Mobile (320-768px), Tablet (768-1024px), Desktop (1024px+)
- Touch-optimized interactions (large tap targets, swipe gestures)
- Performance budget: First Contentful Paint <1.5s on 3G

**Progressive Web App (PWA) - Future Phase**:
- Service workers for offline content caching
- Add-to-home-screen capability (icon, splash screen)
- Push notifications (Clarity Score reminders, provider responses)
- Offline mode: Cached articles, saved Clarity Scores

**Browser Support**:
- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers**: iOS Safari, Chrome Android
- **No IE11 support**: Modern JS/CSS features, reduced bundle size

**Accessibility Standards**:
- **WCAG 2.1 Level AA compliance** (minimum)
- Screen reader compatible (NVDA, JAWS, VoiceOver)
- Keyboard navigation throughout (no mouse-only interactions)
- Color contrast ratios ≥4.5:1 for text
- Semantic HTML (proper heading hierarchy, ARIA labels)

---

### Multi-Tenancy Architecture

Psychage supports **three user types** with distinct data models, permissions, and workflows.

#### 1. Patient Users (Free Tier)

**Account Model**:
- **Optional accounts**: Can use platform anonymously (no login required for Learn content, Clarity Score)
- **Account benefits**: Save Clarity Score history, bookmark articles, receive email updates
- **Registration**: Email + password (simple, no complex onboarding)
- **Data stored**: Email, name (optional), Clarity Score history, bookmarks

**User Journey**:
1. Browse educational content (no account needed)
2. Take Clarity Score anonymously (results stored in local storage)
3. **Optional**: Create account to save scores over time
4. Search provider directory (no account needed)
5. **Optional**: Save favorite providers (requires account)

**Data Isolation**:
- Patient data stored in Firebase Auth + Firestore
- Clarity Score data stored separately (anonymized, linked by score_id)
- Even with account, health data (scores) separated from identity (email)

#### 2. Provider Users (Freemium B2B)

**Account Model**:
- **Required accounts**: Providers must create account to list in directory
- **Onboarding**: Multi-step verification process (credentials, license, insurance)
- **Subscription tiers**: Free → Growth ($49/mo) → Premium ($99/mo)
- **Data stored**: Professional credentials, license info, practice details, subscription status

**Provider Dashboard** (MVP: basic, Growth: enhanced):
- View profile analytics (profile views, search impressions)
- Edit profile (specialties, bio, contact info, availability)
- Manage subscription (upgrade, downgrade, billing)
- View leads (users who contacted them - Growth/Premium only)

**Data Isolation**:
- Provider accounts stored in Firebase Auth + Firestore
- Provider profiles publicly visible in directory (name, credentials, specialties, contact)
- Private data (license numbers, insurance policies, payment info) not publicly visible
- Subscription/billing data isolated (Stripe integration)

#### 3. Administrator Users (Internal)

**Account Model**:
- **Internal only**: Admins are company employees
- **Role-based access**: Super Admin (full access), Content Admin (CMS only), Provider Admin (directory management only)

**Admin Dashboard**:
- **Content Management**: Approve/publish articles, manage CMS (Sanity.io)
- **Provider Management**: Review provider applications, verify credentials, manage listings
- **User Management**: View user accounts, resolve support tickets, export data (GDPR requests)
- **Analytics Dashboard**: Platform metrics, user behavior, provider conversions
- **System Configuration**: Feature flags, A/B tests, maintenance mode

**Data Isolation**:
- Admin accounts stored separately (elevated Firebase roles)
- Audit logs for all admin actions (who changed what, when)
- No access to patient health data (Clarity Scores) even as admin - anonymized

---

### Authentication & Authorization

**Authentication Model**:

**Patients**:
- **Firebase Authentication** (email/password)
- **Optional OAuth**: Google Sign-In, Apple Sign-In (future phase)
- **Anonymous mode**: No authentication required for basic features
- **Session management**: JWT tokens, 30-day session, refresh tokens

**Providers**:
- **Firebase Authentication** (email/password, required)
- **Two-factor authentication** (Growth/Premium tiers - enhanced security)
- **Email verification**: Required before profile goes live
- **Session management**: JWT tokens, 7-day session (more restrictive for B2B)

**Administrators**:
- **Firebase Authentication** (email/password, required)
- **Two-factor authentication**: Required for all admins
- **IP whitelisting**: Admin dashboard only accessible from approved IPs (office, VPN)
- **Session timeout**: 4-hour idle timeout (security)

**Authorization Model** (Role-Based Access Control):

**Permissions Matrix**:

| Feature | Anonymous | Patient (Logged In) | Provider (Free) | Provider (Growth) | Provider (Premium) | Admin |
|---------|-----------|---------------------|-----------------|-------------------|-------------------|-------|
| Read Learn articles | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Take Clarity Score | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Save Clarity Score history | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Search Provider Directory | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Save favorite providers | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| List in Provider Directory | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| View profile analytics | ❌ | ❌ | Basic | Full | Full + insights | ❌ |
| Featured placement | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| View lead contact info | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Access admin dashboard | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Manage provider listings | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Publish content (CMS) | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

**Security Boundaries**:
- Patients cannot access provider dashboards
- Providers cannot access patient data (Clarity Scores, account info)
- Admins cannot access patient health data (Clarity Scores anonymized)
- Role-based firewall rules (Firebase Security Rules enforce permissions)

---

### API Specification

**Internal APIs** (MVP - Next.js API routes):

**Patient APIs**:
- `POST /api/clarity-score/submit` - Submit assessment, get score
- `GET /api/clarity-score/history` - Retrieve user's score history (auth required)
- `POST /api/user/bookmark` - Bookmark article or provider (auth required)
- `GET /api/providers/search` - Search provider directory (public)

**Provider APIs**:
- `POST /api/provider/onboard` - Submit provider application
- `GET /api/provider/profile` - Get provider's own profile (auth required)
- `PUT /api/provider/profile` - Update profile (auth required)
- `GET /api/provider/analytics` - Get profile performance metrics (auth required)
- `POST /api/provider/subscription` - Manage subscription (Stripe integration)

**Admin APIs**:
- `GET /api/admin/providers/pending` - List pending provider applications (admin only)
- `PUT /api/admin/providers/:id/approve` - Approve provider (admin only)
- `GET /api/admin/analytics` - Platform analytics (admin only)

**External APIs** (Future - Vision Phase):

**Clarity Index Data API** (licensed to institutions):
- `GET /api/v1/clarity-index/trends` - Aggregated mental health trends
- `GET /api/v1/clarity-index/demographics` - Anonymized demographic breakdowns
- **Authentication**: API key + OAuth 2.0
- **Rate limiting**: 1,000 requests/day (standard tier), 10,000/day (enterprise tier)

**Provider Integration API** (Spark+ Pro practice management):
- `POST /api/v1/providers/:id/availability` - Update provider availability calendar
- `GET /api/v1/providers/:id/bookings` - Retrieve bookings (if booking feature added)
- **Authentication**: OAuth 2.0, provider-specific tokens

**Webhook Events** (Future):
- `provider.subscription.created` - New provider subscription
- `provider.subscription.cancelled` - Provider cancellation
- `clarity-score.completed` - User completed assessment (anonymized, for analytics)

---

### Data Models & Storage

**Technology Stack**:
- **Firebase Firestore**: User accounts, provider profiles, Clarity Score data
- **Sanity.io**: Educational content (Learn articles), CMS
- **Stripe**: Payment processing, subscription management (provider tiers)
- **Vercel Edge Config**: Feature flags, A/B test configuration
- **Plausible Analytics**: GDPR-compliant web analytics (no cookies)

**Key Data Models**:

**Patient User**:
```
User {
  uid: string (Firebase UID)
  email: string
  name?: string (optional)
  created_at: timestamp
  bookmarks: {
    articles: string[] (article IDs)
    providers: string[] (provider IDs)
  }
}

ClarityScore {
  score_id: string (UUID)
  user_id?: string (optional, if logged in)
  score: number (0-100)
  breakdown: {
    anxiety: number
    depression: number
    stress: number
  }
  completed_at: timestamp
  anonymized: boolean
}
```

**Provider User**:
```
Provider {
  provider_id: string (Firebase UID)
  email: string
  name: string
  credentials: string[] (PhD, LCSW, etc.)
  license: {
    number: string (private)
    state: string
    expiration: date
    verified: boolean
  }
  practice: {
    name?: string
    address: string
    phone: string
    website?: string
  }
  specialties: string[] (anxiety, depression, etc.)
  session_types: string[] (in-person, telehealth)
  tier: "free" | "growth" | "premium"
  subscription: {
    stripe_customer_id: string
    stripe_subscription_id: string
    status: "active" | "canceled" | "past_due"
  }
  analytics: {
    profile_views: number
    search_impressions: number
    lead_count: number
  }
  created_at: timestamp
  verified_at?: timestamp
}
```

---

### Integration Requirements

**MVP Integrations**:
- **Sanity.io CMS**: Content management for Learn articles
- **Firebase**: Authentication, database, hosting rules
- **Vercel**: Deployment, serverless functions, edge caching
- **Plausible Analytics**: Privacy-friendly web analytics

**Growth Phase Integrations**:
- **Stripe**: Payment processing for provider subscriptions
- **SendGrid/Resend**: Transactional emails (account creation, password reset, provider approvals)
- **Cloudflare**: CDN, DDoS protection, image optimization

**Vision Phase Integrations**:
- **Claude API**: AI chatbot for guided support
- **Google Maps API**: Provider location mapping
- **Twilio**: SMS notifications for crisis detection
- **Zapier/Make**: No-code integrations for providers (calendar sync, CRM)

---

## User Experience Principles

Psychage's UX embodies **"The Sage"** archetype - warmly authoritative, trustworthy, and clarifying. The interface should feel like a wise guide who simplifies complexity without patronizing.

### Visual Personality

**Brand Archetype: The Sage**
- **Warmly Authoritative**: Professional but not clinical, approachable but not casual
- **Clarity-First**: Every design decision reduces cognitive load
- **Evidence-Based Aesthetic**: Visual credibility through clean, organized layouts
- **Emotionally Attuned**: Recognizes user vulnerability without being overly sentimental

**Design Language**:
- **Color Palette**:
  - **Primary (Trust)**: Deep blues (#1E3A8A to #3B82F6) - conveys authority, calm
  - **Secondary (Warmth)**: Soft coral (#FB923C) - humanizes, invites engagement
  - **Neutrals**: Off-white backgrounds (#F9FAFB), warm grays (#6B7280)
  - **Crisis Alert**: Warm orange (#F59E0B) for crisis resources (not alarming red)
- **Typography**:
  - **Headings**: Inter (geometric, modern, readable) - weighted 600-700
  - **Body**: Inter 400 (same family for consistency) - optimized for reading (16-18px base)
  - **Reading level visual**: Generous line-height (1.7), wide line-length (60-80ch)
- **Iconography**:
  - **Orbit + Spark logo**: Central orbiting pattern symbolizing mental health ecosystem
  - **Minimalist icons**: Outline style (not filled), consistent 2px stroke
  - **Purposeful illustration**: Occasional abstract illustrations (not clinical diagrams, not childish cartoons)

**Spacing & Layout**:
- **Generous whitespace**: Never cramped, breathing room between elements
- **Clear visual hierarchy**: H1 → H2 → Body, no more than 3 levels per page
- **Card-based design**: Content grouped in cards (digestible chunks)
- **Responsive grid**: 12-column on desktop, single column on mobile

### "Clarity Without Overwhelming" in UI Design

**Operationalizing the Core Principle**:

**1. Progressive Disclosure**:
- **Don't show everything at once**: Reveal complexity gradually
- **Example - Learn Article**:
  - Start with 3-sentence summary ("What is anxiety?")
  - Expandable sections for deeper detail ("Causes," "Treatment Options")
  - Optional "Learn More" links to related topics
- **Example - Clarity Score Results**:
  - Start with single overall score (0-100)
  - Click "Breakdown" to see anxiety/depression/stress components
  - Click "What this means" for interpretation

**2. Decision Minimization**:
- **Limit choices at each step**: 3-5 options max per decision point
- **Example - Provider Search**:
  - Step 1: Location (zip code)
  - Step 2: Specialty (5 most common)
  - Step 3: Session type (in-person, telehealth, hybrid)
  - Results: 5-10 providers (not 500)
- **Example - Homepage Hub**:
  - 6 satellites (not 20 navigation items)
  - Each satellite = single clear purpose

**3. Guided Pathways**:
- **Don't make users figure it out**: Provide clear next steps
- **Example - Clarity Score Completion**:
  - Score displayed → "What does this mean?" button
  - Interpretation shown → "Find a therapist" button (pre-filtered)
  - Therapist list → "Contact [Name]" button (direct action)
- **Example - Learn Article Footer**:
  - Always ends with: "Next steps: [Action]" (take assessment, find provider, read related article)

**4. Visual Calm**:
- **No aggressive design**: No flashing, no auto-playing videos, no pop-ups
- **Subtle animations**: Gentle transitions (200-300ms ease-out), no jarring effects
- **Consistent patterns**: Same components reused (button styles, card layouts)
- **Accessible color contrast**: 4.5:1 minimum, easy on the eyes

### Key User Flows

**User Flow 1: Patient Journey - "I'm confused about my mental health"**

1. **Homepage Entry**:
   - Lands on hub (6 satellites visible)
   - Hero text: "Understand your mental health. Find support. All evidence-based."
   - Primary CTA: "Take Clarity Score" (10-minute assessment)
   - Secondary paths: Browse Learn, Find a Provider

2. **Clarity Score Assessment** (Main path):
   - Click "Take Clarity Score" → Assessment page
   - Progress bar (20-30 questions, ~10 minutes)
   - Questions designed for 8th-10th grade comprehension
   - No jargon (e.g., "Do you feel nervous?" not "Do you experience generalized anxiety?")

3. **Results & Interpretation**:
   - Overall score displayed prominently (0-100, color-coded: green/yellow/orange zones)
   - Breakdown by area (anxiety, depression, stress) - click to expand
   - Personalized insights: "Your score suggests moderate anxiety. Here's what that means..."
   - **Crisis detection**: If severe → prominent crisis resources (988 Lifeline)

4. **Guided Next Steps**:
   - "Learn more about anxiety" → Recommended Learn articles
   - "Find a therapist" → Provider Directory pre-filtered (anxiety specialists, user's location)
   - "Save your score" → Optional account creation (email only)

5. **Provider Directory** (if user clicks "Find a therapist"):
   - Filters pre-selected based on score (anxiety specialty)
   - Location auto-filled (or prompt for zip code)
   - Results: 5-10 providers (manageable list)
   - Provider cards: Name, credentials, specialties, session type, "Contact" button

6. **Contact Provider** (endpoint):
   - Click "Contact" → Provider's contact info displayed (phone, email, website)
   - No booking in MVP (user contacts directly)
   - Optional: "Save to favorites" (requires account)

**User Flow 2: Patient Journey - "I want to learn about [topic]"**

1. **Homepage Entry**:
   - Clicks "Learn" satellite
   - Enters Learn hub

2. **Learn Hub**:
   - Search bar: "What are you looking for?" (autocomplete suggestions)
   - Category browsing: 10 major categories (Anxiety, Depression, PTSD, etc.)
   - Featured articles: 3-5 most popular/recent

3. **Article Selection**:
   - Clicks category (e.g., "Anxiety") → Subcategory list (GAD, Panic, Social, etc.)
   - Clicks subcategory (e.g., "Generalized Anxiety") → Article page

4. **Article Page**:
   - **Structure**:
     - 3-sentence summary at top ("What is GAD?")
     - Sections: Symptoms, Causes, Treatment, Living With
     - Evidence citations inline (e.g., "[CDC, 2023]")
   - **Sidebar**:
     - Related articles
     - "Take Clarity Score" CTA
   - **Footer**:
     - Disclaimer: "This is education, not diagnosis"
     - Next steps: "Find a therapist," "Explore related topics"

5. **Optional Actions**:
   - Bookmark article (requires account)
   - Share article (social links)
   - Take Clarity Score (if relevant to topic)

**User Flow 3: Provider Journey - "I want to list my practice"**

1. **Homepage Entry**:
   - Clicks "For Providers" link (footer or top nav)
   - Enters Provider Onboarding page

2. **Provider Onboarding** (Multi-step form):
   - **Step 1: Account Creation**
     - Email, password, name
     - Email verification sent
   - **Step 2: Professional Info**
     - Credentials (PhD, LCSW, MD, etc.)
     - License number, state, expiration date
     - Professional liability insurance info
   - **Step 3: Practice Details**
     - Practice name, address, phone, website
     - Specialties (multi-select: anxiety, depression, trauma, etc.)
     - Session types (in-person, telehealth, hybrid)
   - **Step 4: Bio & Photo**
     - Short bio (250 words max)
     - Professional headshot upload
   - **Step 5: Review & Submit**
     - Preview profile
     - Agree to directory terms
     - Submit for admin review

3. **Admin Review** (Internal - not visible to provider):
   - Admin verifies license (state licensing board database)
   - Admin approves or rejects
   - Email sent to provider (approval or rejection with reason)

4. **Provider Dashboard** (after approval):
   - **Profile View**: See public profile as users see it
   - **Analytics**: Profile views, search impressions (basic in MVP)
   - **Edit Profile**: Update bio, specialties, contact info
   - **Subscription**: Upgrade to Growth/Premium (future phase)

5. **Ongoing Use**:
   - Monthly email: Profile performance summary
   - Quarterly: License renewal reminder (verify still valid)
   - Annual: Re-verification of credentials

**User Flow 4: Hub-and-Spoke Navigation Pattern**

**The Hub (Homepage)**:
- **Visual**: Circular layout with 6 satellites around central Psychage logo
- **Interaction**: Hover over satellite → brief description appears
- **Click satellite** → Enter that satellite's dedicated space

**The Spokes (6 Satellites)**:
1. **Learn** (Educational Hub)
   - Purpose: Browse evidence-based articles
   - Entry: Search bar or category grid
   - Exit: Related articles, Clarity Score CTA, Provider Directory

2. **Connect** (Provider Directory)
   - Purpose: Find verified mental health providers
   - Entry: Search filters (location, specialty, session type)
   - Exit: Contact provider, save favorites, return to Learn

3. **Tools** (Clarity Score)
   - Purpose: Take self-assessment
   - Entry: Start assessment button
   - Exit: Results → Learn articles or Provider Directory

4. **About** (Company Info)
   - Purpose: Learn about Psychage mission, team, policies
   - Entry: Navigation links (About, Privacy, Terms, Contact)
   - Exit: Return to hub or other satellites

5. **Spark** (Viral Content - Future)
   - Purpose: Short-form educational videos
   - Entry: Video grid or social media embeds
   - Exit: Related Learn articles, Clarity Score

6. **Community** (Spark+ Premium - Future)
   - Purpose: Private digital communities
   - Entry: Login required (subscription gate)
   - Exit: Exclusive content, workshops, forums

**Navigation Principles**:
- **Persistent hub access**: "Home" button always visible (return to hub from any satellite)
- **Breadcrumbs**: Learn → Anxiety → GAD → Symptoms (clear navigation path)
- **Cross-satellite connections**: Learn articles link to Clarity Score, Clarity Score links to Provider Directory
- **No dead ends**: Every page has clear next action

---

### Interaction Patterns & Micro-UX

**1. Progressive Loading**:
- **Skeleton screens**: Show content structure while loading (no blank white screens)
- **Lazy loading**: Images load as user scrolls (performance optimization)
- **Instant feedback**: Button clicks show loading state immediately (no "did it work?" confusion)

**2. Form Design**:
- **Single-column forms**: One question at a time (mobile-friendly, reduces overwhelm)
- **Inline validation**: Real-time feedback (e.g., "Email format invalid" as user types)
- **Clear error messages**: "Email required" (not generic "Error: field_1 invalid")
- **Progress indicators**: Multi-step forms show progress (Step 2 of 5)

**3. Search & Filter**:
- **Autocomplete**: Search suggestions as user types (Learn content, providers)
- **Filter chips**: Selected filters displayed as removable chips (visual clarity)
- **Smart defaults**: Pre-select common options (e.g., "Telehealth" if user is remote)
- **Results count**: "Showing 8 providers in San Francisco" (sets expectations)

**4. Crisis Resources Visibility**:
- **Persistent footer**: Every page footer includes "In crisis? 988 Lifeline" link
- **Clarity Score triggers**: Severe scores → prominent crisis banner at top of results
- **Non-alarming design**: Warm orange (not panic-inducing red), supportive language
- **Multiple contact options**: Phone (988), text (741741), chat, local emergency

**5. Accessibility Interactions**:
- **Keyboard navigation**: Tab order logical, focus indicators visible (blue outline)
- **Screen reader announcements**: Status updates announced ("Score calculated")
- **Skip links**: "Skip to main content" link at top of page
- **ARIA labels**: All icons and buttons labeled for assistive technology

---

### Mobile-Specific UX Considerations

**60%+ of users on mobile - mobile experience is primary:**

**1. Touch Targets**:
- **Minimum 44x44px**: All clickable elements (iOS HIG standard)
- **Spacing**: 8px minimum between adjacent touch targets
- **Thumb-friendly**: Primary actions in bottom-right (right-handed users) or centered

**2. Mobile Navigation**:
- **Hamburger menu**: Collapsed navigation for top-level links
- **Bottom tab bar** (future): Quick access to Learn, Tools, Connect, Profile
- **Swipe gestures**: Swipe between sections (e.g., Clarity Score questions)

**3. Content Adaptation**:
- **Single column**: No side-by-side content on mobile
- **Condensed cards**: Provider cards stack vertically, abbreviated info
- **Expandable sections**: Long content hidden in accordions (tap to expand)

**4. Performance**:
- **Image optimization**: WebP format, responsive srcset, lazy loading
- **Code splitting**: Only load JavaScript needed for current page
- **Prefetching**: Predict next page (e.g., after Clarity Score, prefetch provider directory)

**5. Forms on Mobile**:
- **Appropriate keyboards**: Email input → email keyboard, phone → numeric keyboard
- **Autofill support**: Name, email, address autofill from device
- **Minimal typing**: Use select dropdowns instead of free text where possible

---

## Functional Requirements

Functional requirements organized by capability area. Each requirement includes ID, description, acceptance criteria, and domain constraints.

### 1. Learn - Educational Content System

**FR-L01: Article Content Management**
- System must integrate with Sanity.io headless CMS for educational content
- Content editors can create, edit, publish, unpublish, archive articles
- Acceptance Criteria:
  - Articles support markdown with rich media (images, videos, embeds)
  - Version control: Track changes, revert to previous versions
  - Scheduled publishing: Set future publish dates
  - Content preview before publishing
- Domain Constraint: All content requires expert review before publication (FR-L09)

**FR-L02: Article Structure & Organization**
- Articles must follow standardized structure: Summary, Sections, Citations, Disclaimers
- Minimum article components:
  - 3-sentence summary at top
  - Logical sections (Symptoms, Causes, Treatment, Living With)
  - Inline evidence citations
  - Disclaimer footer
- Acceptance Criteria:
  - CMS template enforces required fields
  - Maximum 8-10 minute estimated read time (2,000-2,500 words)
  - 8th-10th grade reading level (Flesch-Kincaid 60-70)
- Domain Constraint: Reading level must be validated before publishing

**FR-L03: Evidence Citation System**
- Every clinical claim must link to evidence source (WHO, CDC, APA, NIMH, peer-reviewed)
- Acceptance Criteria:
  - Inline citations with source name and year ([CDC, 2023])
  - Citation hovercards show full source details
  - Reference list at article bottom with external links
  - Broken link detection (quarterly check)
- Domain Constraint: Citations required for medical claims per liability mitigation (Section: Domain Requirements)

**FR-L04: Content Categories & Taxonomy**
- Articles organized by condition categories: Anxiety, Depression, PTSD, ADHD, OCD, Bipolar, Eating Disorders, Substance Use, Personality Disorders, Schizophrenia (10 major categories)
- Each category contains subcategories (e.g., Anxiety → GAD, Panic, Social)
- Acceptance Criteria:
  - 3-level hierarchy: Category → Subcategory → Article
  - Articles can belong to multiple categories (tagging system)
  - Category pages show article count and featured content
  - Consistent category naming across platform

**FR-L05: Article Search Functionality**
- Users can search all educational content by keyword
- Acceptance Criteria:
  - Autocomplete suggestions as user types (top 5 matches)
  - Search covers article titles, summaries, and content body
  - Results ranked by relevance (title match > summary > body)
  - "No results" state suggests related categories or Clarity Score
  - Search analytics tracked (what users search for)
- Performance: Search results return within 500ms

**FR-L06: Related Articles Recommendations**
- Each article displays 3-5 related articles in sidebar
- Acceptance Criteria:
  - Related articles based on: Same category, similar tags, content similarity
  - Never show the same article user is currently reading
  - Related articles update when article is updated
- Goal: Increase avg pages per session (target 3+ articles)

**FR-L07: Article Engagement Features**
- Users can bookmark articles (requires account), share articles (social links), rate helpfulness
- Acceptance Criteria:
  - Bookmark button visible on article page (auth required)
  - Share buttons: Twitter, Facebook, LinkedIn, Copy Link
  - "Was this helpful?" Yes/No buttons at article bottom (anonymous)
  - Bookmarks saved to user profile, accessible from dashboard

**FR-L08: Content Disclaimers (Medical Liability)**
- Every article must display disclaimers per liability requirements
- Acceptance Criteria:
  - Disclaimer text: "This article provides educational information about [topic]. It is not medical advice and does not replace consultation with a qualified healthcare professional."
  - Disclaimer visible at article bottom (above footer)
  - Cannot be removed or hidden by user
  - Footer includes: "Last reviewed: [date]" and "Reviewed by: [credential]"
- Domain Constraint: Required for HIPAA-exempt status and liability protection

**FR-L09: Expert Review Workflow**
- All articles must be reviewed by licensed clinician before publication
- Acceptance Criteria:
  - CMS workflow states: Draft → In Review → Approved → Published
  - Reviewer can approve, reject (with comments), or request revisions
  - Notification sent to writer when review complete
  - Admin dashboard shows pending reviews (queue management)
  - Published articles show reviewer credential (PhD, PsyD, MD)
- Domain Constraint: Required for content quality assurance (Section: Domain Requirements)

**FR-L10: Annual Content Re-Review**
- Published articles must be re-reviewed annually
- Acceptance Criteria:
  - System flags articles >365 days since last review
  - Admin dashboard shows re-review queue
  - Re-review follows same workflow as initial review
  - "Last reviewed: [date]" updates on re-approval
- Domain Constraint: Clinical guidelines change; outdated content is liability risk

---

### 2. Connect - Provider Directory System

**FR-C01: Provider Profile Creation**
- Providers can create account and submit profile for directory listing
- Profile fields (required): Name, credentials, license info, practice details, specialties, session types, bio, photo
- Acceptance Criteria:
  - Multi-step onboarding form (5 steps per UX section)
  - Form validation (required fields, format checks)
  - License number, state, expiration date captured (private data)
  - Professional liability insurance info captured (private data)
  - Bio max 250 words, photo upload (JPEG/PNG, max 2MB)
- Domain Constraint: License verification required before profile goes live (FR-C03)

**FR-C02: Provider Profile Public View**
- Verified providers appear in searchable directory with public profile page
- Public profile displays: Name, credentials, photo, specialties, session types, practice address, phone, email, website, bio
- Private data NOT displayed: License number, insurance policy details, application notes
- Acceptance Criteria:
  - Profile accessible at /providers/[provider-id] or /providers/[slug]
  - SEO-optimized (schema markup for local business)
  - "Verified" badge displayed prominently
  - "Contact" button displays contact info (no booking in MVP)
  - Responsive design (mobile-friendly cards)

**FR-C03: Provider Verification Process**
- Submitted provider applications reviewed and verified by admin before listing goes live
- Verification checks: Active license, no disciplinary actions, valid credentials, liability insurance
- Acceptance Criteria:
  - Admin receives notification when new application submitted
  - Admin dashboard shows pending applications queue
  - Admin can approve (profile goes live) or reject (email sent with reason)
  - Verification includes:
    - Manual license check (state licensing board database search)
    - Cross-reference with Psychology Today or similar directory
    - Google search for disciplinary actions
  - Verified badge added to profile upon approval
  - Email sent to provider (approval or rejection notification)
- Domain Constraint: Verification required to prevent unqualified providers (Section: Domain Requirements)

**FR-C04: Provider Search & Filter**
- Users can search provider directory by location, specialty, discipline, session type
- Acceptance Criteria:
  - **Location filter**: Zip code + radius (5, 10, 25, 50 miles)
  - **Specialty filter**: Multi-select (Anxiety, Depression, Trauma, ADHD, Couples, etc.)
  - **Discipline filter**: Therapist, Psychologist, Psychiatrist, Counselor, Social Worker
  - **Session type filter**: In-person, Telehealth, Hybrid
  - Search returns 5-10 results per page (pagination if more)
  - Results sorted by: Relevance (specialty match), Distance (closest first), or Alphabetical
  - No results state: "No providers found. Try expanding your search radius or removing filters."
- Performance: Search returns within 1 second

**FR-C05: Provider Analytics Dashboard (Basic - MVP)**
- Verified providers can access basic analytics about their profile performance
- Metrics displayed: Profile views (last 30 days), Search impressions (how many searches showed profile)
- Acceptance Criteria:
  - Analytics dashboard accessible from provider account
  - Data refreshed daily (not real-time in MVP)
  - Simple charts (line graph for views over time)
  - No personally identifiable patient data displayed (HIPAA boundary)
- Future: Growth/Premium tiers get enhanced analytics (leads, contact click-through rate)

**FR-C06: Provider Profile Editing**
- Providers can update their profile after approval (bio, specialties, contact info, photo)
- Acceptance Criteria:
  - Edit form pre-populated with current data
  - Changes to critical fields (credentials, license) require re-verification
  - Changes to bio, phone, website go live immediately (no re-review)
  - Change history tracked (audit log for admin)
- Domain Constraint: License changes require admin re-verification

**FR-C07: Provider Annual Re-Verification**
- Provider licenses must be re-verified annually
- Acceptance Criteria:
  - System flags providers whose license expiration is approaching (90 days out)
  - Email sent to provider: "Please update license expiration date"
  - Admin dashboard shows re-verification queue
  - If provider doesn't update within 30 days of expiration, profile unpublished (hidden from directory)
  - Re-verification follows same process as initial verification
- Domain Constraint: Expired licenses are liability risk (Section: Domain Requirements)

**FR-C08: Provider Subscription Management (Future - Growth Phase)**
- Providers can upgrade to paid tiers: Growth ($49/mo), Premium ($99/mo)
- Acceptance Criteria:
  - Tier comparison page shows features (basic free, Growth, Premium)
  - Stripe integration for payment processing
  - Subscription management dashboard (upgrade, downgrade, cancel)
  - Billing history accessible
  - Auto-renewal with email notification 7 days before charge
- Not in MVP: All providers on free tier initially

---

### 3. Tools - Clarity Score Assessment System

**FR-T01: Clarity Score Questionnaire**
- 10-minute assessment with 20-30 questions covering anxiety, depression, stress dimensions
- Questions based on validated frameworks: GAD-7, PHQ-9, PSS derivatives (non-diagnostic)
- Acceptance Criteria:
  - Single-page assessment or paginated (1 question per screen for mobile)
  - Progress bar shows completion percentage
  - Questions written at 8th-10th grade reading level (no jargon)
  - Example: "How often do you feel nervous or worried?" (Not: "Do you experience generalized anxiety symptoms?")
  - Question types: Likert scale (Not at all, Several days, More than half the days, Nearly every day)
  - All questions required (cannot submit incomplete assessment)
- Domain Constraint: Assessment is educational, NOT diagnostic (disclaimer required)

**FR-T02: Clarity Score Calculation**
- System calculates overall score (0-100) and breakdown by dimension (anxiety, depression, stress)
- Acceptance Criteria:
  - Scoring algorithm based on validated clinical scales (weighted questions)
  - Overall score calculated as composite of dimensions
  - Dimension scores: Anxiety (0-100), Depression (0-100), Stress (0-100)
  - Score zones: Green (0-33 low), Yellow (34-66 moderate), Orange (67-100 high)
  - Calculation happens instantly upon submission (< 1 second)

**FR-T03: Clarity Score Results Display**
- User receives personalized score with interpretation and recommendations
- Acceptance Criteria:
  - Overall score displayed prominently with color coding (green/yellow/orange)
  - Breakdown by dimension (click to expand, shows individual scores)
  - Interpretation text: "Your score suggests [low/moderate/high] [dimension]. Here's what that means..."
  - Personalized insights based on highest dimension (e.g., "Your anxiety score is elevated")
  - Visual representation: Circle chart or bar graph
  - Results page includes "What does this mean?" expandable section

**FR-T04: Crisis Detection & Resources**
- If score indicates severe depression, anxiety, or suicidal ideation, display prominent crisis resources
- Trigger thresholds: Depression >80, Specific suicidal ideation question answered "Nearly every day"
- Acceptance Criteria:
  - Crisis banner displays at top of results page (warm orange, not alarming red)
  - Banner text: "Your responses suggest you may be in distress. Help is available 24/7."
  - Crisis resources displayed:
    - 988 Suicide & Crisis Lifeline (call or text)
    - Crisis Text Line: Text HOME to 741741
    - Local emergency: 911
    - Link to find nearest emergency room
  - Banner cannot be dismissed until user acknowledges ("I understand, show me my results")
  - Crisis detection logged for analytics (anonymized)
- Domain Constraint: Critical for user safety and liability protection (Section: Domain Requirements)

**FR-T05: Anonymous Clarity Score (No Account)**
- Users can take assessment without creating account (anonymous mode)
- Acceptance Criteria:
  - No login required to start assessment
  - Results stored in browser local storage (not database)
  - User can view results immediately after completion
  - Results persist in browser until cleared or expired (30 days)
  - Banner at bottom of results: "Create account to save your score and track progress over time"
- Domain Constraint: Supports HIPAA-exempt status (no PHI collection without consent)

**FR-T06: Clarity Score History (With Account)**
- Users with accounts can save scores and view history over time
- Acceptance Criteria:
  - After completing assessment, prompt: "Save this score to your account?" (requires login or signup)
  - Scores saved to user profile in database (Firebase Firestore)
  - User dashboard shows score history: Date taken, Overall score, Trend (up/down/stable)
  - Line chart visualizing scores over time (anxiety, depression, stress dimensions)
  - Click score to view full results from that date
  - User can delete individual scores or entire history (GDPR right to deletion)
- Domain Constraint: Score data separated from identity (anonymization strategy, Section: Domain Requirements)

**FR-T07: Clarity Score Recommendations**
- After receiving score, user sees personalized recommendations for next steps
- Acceptance Criteria:
  - Based on highest dimension score, recommend relevant Learn articles
  - Example: High anxiety → "Learn more about anxiety: [3 article links]"
  - If score indicates need for professional help: "Find a therapist" CTA (pre-filtered to relevant specialty)
  - Provider search pre-filtered based on top dimension (anxiety → anxiety specialists)
  - If low scores: "Explore self-care strategies: [article links]"
- Connects to "Assessment-to-Provider Pipeline" innovation (Section: Innovation)

**FR-T08: Clarity Score Disclaimer**
- Assessment results must include clear disclaimer that this is NOT a diagnosis
- Acceptance Criteria:
  - Disclaimer text: "This assessment provides educational insights into your mental well-being. It is NOT a medical diagnosis and does not replace consultation with a qualified healthcare professional."
  - Disclaimer visible above and below results (cannot be missed)
  - "Learn about the science behind Clarity Score" link (methodology page)
- Domain Constraint: Required for HIPAA-exempt status and liability protection (Section: Domain Requirements)

---

### 4. User Management & Authentication

**FR-U01: Patient Account Creation**
- Patients can create optional accounts to save scores, bookmark content, save favorite providers
- Acceptance Criteria:
  - Registration form: Email, password (min 8 characters, 1 uppercase, 1 number), name (optional)
  - Email verification required before account fully activated
  - Verification email sent immediately upon signup
  - Account created upon email verification click
  - Firebase Authentication handles account creation and management
- No account required for: Reading Learn articles, taking Clarity Score anonymously, searching provider directory

**FR-U02: Patient Login & Session Management**
- Users can log in with email and password
- Acceptance Criteria:
  - Login form: Email, password
  - "Forgot password" link → password reset email sent
  - JWT token issued upon successful login (30-day session)
  - Refresh token for extended sessions (auto-renew)
  - "Remember me" checkbox (optional, extends session to 90 days)
  - Logout button clears session and redirects to homepage

**FR-U03: Patient Profile Dashboard**
- Logged-in patients can access personal dashboard
- Dashboard includes: Clarity Score history, Bookmarked articles, Favorite providers, Account settings
- Acceptance Criteria:
  - Accessible at /dashboard or /profile
  - Quick stats: Total scores taken, Articles bookmarked, Providers saved
  - Most recent Clarity Score displayed prominently
  - "Take new assessment" CTA button
  - Profile settings: Update email, password, name, delete account

**FR-U04: Provider Account Creation**
- Providers create accounts through provider onboarding flow (distinct from patient accounts)
- Acceptance Criteria:
  - Registration requires: Email, password, full name, professional credentials
  - Email verification required
  - Account type set to "provider" (role-based access control)
  - After email verification, multi-step profile form (FR-C01)
  - Account pending until admin approval (FR-C03)
  - Firebase Authentication with elevated "provider" role

**FR-U05: Admin Account Management**
- Admin accounts for internal team members (Content Admin, Provider Admin, Super Admin)
- Acceptance Criteria:
  - Admin accounts created manually by Super Admin (not public signup)
  - Role-based access control (RBAC):
    - Content Admin: Access Sanity.io CMS, approve articles
    - Provider Admin: Verify providers, manage directory
    - Super Admin: Full access (content, providers, users, system config)
  - Two-factor authentication required for all admins
  - IP whitelisting for admin dashboard (office, VPN only)
  - 4-hour idle timeout (security)
- Domain Constraint: Admin audit logs tracked (who did what, when)

**FR-U06: Data Privacy & Deletion (GDPR/CCPA Compliance)**
- Users can export their data (right to access) and delete their account (right to deletion)
- Acceptance Criteria:
  - **Export data**: User clicks "Export my data" → JSON file downloads (profile, scores, bookmarks)
  - **Delete account**: User clicks "Delete account" → confirmation modal → account and all associated data deleted within 30 days
  - Deleted data includes: Profile, Clarity Scores, bookmarks, favorites
  - Anonymized analytics data retained (no personally identifiable information)
  - Deletion confirmation email sent
- Domain Constraint: GDPR/CCPA compliance (Section: Domain Requirements)

**FR-U07: Password Security & Recovery**
- Passwords must meet security requirements, users can reset forgotten passwords
- Acceptance Criteria:
  - Password requirements: Min 8 characters, 1 uppercase, 1 lowercase, 1 number
  - Passwords hashed (bcrypt) before storage (never plain text)
  - Password reset flow: User enters email → reset link sent → click link → set new password → confirmation email
  - Reset links expire after 1 hour
  - Password strength indicator during registration (weak/medium/strong)

---

### 5. Admin Operations & Management

**FR-A01: Content Management Dashboard**
- Content Admins can manage Learn articles through Sanity.io CMS integration
- Acceptance Criteria:
  - Admin access to Sanity.io CMS (dedicated dashboard or embedded iframe)
  - Article workflow: Draft → In Review → Approved → Published → Archived
  - Admin can: Create, edit, delete, publish, unpublish, archive articles
  - Preview articles before publishing
  - Schedule future publish dates
  - View article analytics: Views, avg time on page, bounce rate

**FR-A02: Provider Verification Dashboard**
- Provider Admins can review and verify pending provider applications
- Acceptance Criteria:
  - Dashboard shows pending applications queue (sorted by submission date)
  - Each application displays: Provider name, credentials, license info, practice details, submitted date
  - Admin actions: Approve (profile goes live), Reject (with reason), Request more info
  - Verification checklist visible: License check, credential validation, disciplinary search
  - Approval/rejection triggers email notification to provider
  - Audit log: Who approved/rejected, when, why (if rejected)

**FR-A03: Platform Analytics Dashboard**
- Super Admins can view platform-wide analytics and performance metrics
- Key metrics:
  - **User metrics**: Total users, New users (last 30 days), Active users (last 7 days)
  - **Content metrics**: Total articles, Most popular articles, Avg time on page
  - **Assessment metrics**: Total Clarity Scores taken, Avg score, Crisis triggers (count)
  - **Provider metrics**: Total providers, Pending applications, Provider tier distribution
- Acceptance Criteria:
  - Dashboard accessible at /admin/analytics
  - Charts and graphs for trend visualization
  - Date range selector (last 7 days, 30 days, 90 days, all time)
  - Export data as CSV for deeper analysis

**FR-A04: User Management Tools**
- Admins can view user accounts, handle support requests, manage GDPR data requests
- Acceptance Criteria:
  - User search: Find user by email or name
  - View user profile: Account details, Clarity Score history, bookmarks
  - Admin actions: Reset password, Delete account (GDPR request), Export user data
  - Support ticket system integration (Zendesk or similar) - Future phase
  - Audit logs for all admin actions on user accounts

**FR-A05: System Configuration & Feature Flags**
- Super Admins can configure platform settings and toggle features
- Acceptance Criteria:
  - Feature flags: Enable/disable features without code deploy (Vercel Edge Config)
  - Examples: Crisis detection threshold adjustment, Provider paid tiers toggle, A/B test configs
  - Maintenance mode: Display "Under maintenance" page to all users except admins
  - System health monitoring: Uptime, error rates, API response times

---

### 6. Foundation - Platform Infrastructure

**FR-F01: Homepage Hub Design**
- Homepage implements hub-and-spoke navigation architecture
- Acceptance Criteria:
  - 6 satellites visible: Learn, Connect, Tools, About, Spark (future), Community (future)
  - Circular or grid layout with clear visual separation
  - Each satellite has: Icon, Name, 1-sentence description
  - Hover interaction: Satellite description expands or animates
  - Click satellite → Navigate to that section
  - Mobile: Satellites stack vertically (no circular layout on small screens)
  - Hero section: Value proposition text, Primary CTA ("Take Clarity Score")
- Implements "Hub-and-Spoke Navigation" innovation (Section: Innovation)

**FR-F02: Responsive Design (Mobile-First)**
- All pages must be fully responsive and mobile-optimized
- Acceptance Criteria:
  - Breakpoints: Mobile (320-768px), Tablet (768-1024px), Desktop (1024px+)
  - Mobile: Single-column layout, hamburger menu, touch-optimized (44x44px min)
  - Tablet: Two-column where appropriate (e.g., provider cards 2-up)
  - Desktop: Multi-column, expanded navigation, sidebars
  - All images responsive (srcset, WebP format)
  - Touch gestures on mobile: Swipe for carousels, pull-to-refresh (future)
- Performance: First Contentful Paint <1.5s on 3G

**FR-F03: SEO Optimization**
- Platform must be optimized for search engine visibility
- Acceptance Criteria:
  - All pages have: Unique title tags, meta descriptions, Open Graph tags
  - Schema markup for: Articles (Article schema), Providers (LocalBusiness schema), Organization
  - Semantic HTML: Proper heading hierarchy (H1 → H2 → H3), alt text for images
  - Sitemap.xml auto-generated (includes all Learn articles, provider profiles, key pages)
  - Robots.txt configured (allow all except admin routes)
  - Canonical URLs for duplicate content prevention
  - Page speed optimized: Lighthouse score >90

**FR-F04: Analytics & Tracking (Privacy-First)**
- Platform must track user behavior for optimization while respecting privacy
- Acceptance Criteria:
  - Plausible Analytics integration (GDPR-compliant, no cookies)
  - Events tracked: Page views, Clarity Score completions, Provider searches, Article bookmarks
  - No personally identifiable information (PII) tracked
  - Analytics dashboard for admins (FR-A03)
  - Cookie banner NOT required (Plausible doesn't use cookies)
  - User can opt-out of analytics (Do Not Track header respected)

**FR-F05: Error Handling & User Feedback**
- System must gracefully handle errors and provide clear user feedback
- Acceptance Criteria:
  - 404 page: "Page not found" with helpful links (homepage, Learn, Clarity Score)
  - 500 page: "Something went wrong" with error ID, "Try again" button, contact support link
  - Form errors: Clear inline validation, field-level error messages
  - Loading states: Skeleton screens, spinners, progress indicators
  - Success messages: Toast notifications for actions (bookmark saved, profile updated)
  - Error logging: Sentry or similar for monitoring (admin alerts for critical errors)

**FR-F06: Accessibility (WCAG 2.1 AA Compliance)**
- Platform must be accessible to users with disabilities
- Acceptance Criteria:
  - Keyboard navigation: All interactive elements accessible via Tab, Enter, Space
  - Focus indicators: Visible outline on focused elements (blue 2px solid)
  - Screen reader compatible: ARIA labels, alt text, semantic HTML, skip links
  - Color contrast: ≥4.5:1 for normal text, ≥3:1 for large text
  - Form labels: All inputs have associated labels (explicit or ARIA)
  - Heading hierarchy: Logical order (no skipping levels)
  - Automated testing: Axe DevTools or Pa11y integration in CI/CD

**FR-F07: Performance Optimization**
- Platform must load quickly and perform smoothly
- Performance targets:
  - First Contentful Paint (FCP): <1.5s on 3G
  - Largest Contentful Paint (LCP): <2.5s
  - Cumulative Layout Shift (CLS): <0.1
  - Time to Interactive (TTI): <3.5s
- Optimization strategies:
  - Code splitting: Only load JavaScript needed for current page
  - Image optimization: WebP, lazy loading, responsive srcset
  - CDN: Vercel Edge Network for static assets
  - Caching: Browser caching headers, service workers (future PWA)
  - Minification: Terser for JavaScript, CSS minification

**FR-F08: Cross-Browser Compatibility**
- Platform must work on all modern browsers
- Supported browsers:
  - Chrome, Firefox, Safari, Edge (latest 2 versions)
  - iOS Safari, Chrome Android
- Acceptance Criteria:
  - Core functionality works on all supported browsers
  - Graceful degradation for older browsers (basic content accessible)
  - Automated browser testing: BrowserStack or Percy for visual regression
  - No IE11 support (modern JS/CSS features used)

---

**Total Functional Requirements**: 55 detailed requirements across 6 capability areas

These requirements comprehensively cover MVP scope and set foundation for Growth/Vision phases. Each requirement is measurable, includes clear acceptance criteria, and notes relevant domain constraints (HIPAA, liability, quality standards).

---

## Non-Functional Requirements

Non-functional requirements define system qualities, constraints, and cross-cutting concerns that apply across all features.

### Performance

**Load Time & Speed**:
- **First Contentful Paint (FCP)**: <1.5s on 3G network (mobile priority)
- **Largest Contentful Paint (LCP)**: <2.5s on typical connection
- **Time to Interactive (TTI)**: <3.5s (user can interact within 3.5s)
- **Cumulative Layout Shift (CLS)**: <0.1 (minimal visual instability)
- **First Input Delay (FID)**: <100ms (instant response to user interaction)

**Page-Specific Targets**:
- **Homepage**: Load within 2s (critical first impression)
- **Learn articles**: Content visible within 1.5s (SSG pre-rendered)
- **Clarity Score assessment**: Question renders <500ms per screen
- **Provider search**: Results return within 1s of filter change

**API Response Times**:
- **Read operations** (GET): <200ms (articles, provider profiles)
- **Write operations** (POST): <500ms (Clarity Score submission, provider signup)
- **Search operations**: <500ms (article search, provider search)
- **Complex operations** (analytics dashboard): <2s (acceptable for admin tools)

**Optimization Strategies**:
- Next.js Static Site Generation (SSG) for Learn articles (pre-rendered at build time)
- Server-Side Rendering (SSR) for dynamic pages (provider search, Clarity Score results)
- Code splitting (load only JavaScript needed for current page)
- Image optimization: WebP format, responsive srcset, lazy loading below-the-fold
- CDN caching: Vercel Edge Network for static assets (images, CSS, JS)
- Database query optimization: Indexed fields (Firebase Firestore composite indexes)
- Prefetching: Predict next page (e.g., after Clarity Score, prefetch provider directory)

**Performance Monitoring**:
- Lighthouse CI integration (automated performance audits on every deploy)
- Real User Monitoring (RUM): Plausible Analytics tracks Core Web Vitals
- Performance budgets enforced: Max bundle size 200KB (initial JS), 500KB (total page weight)
- Alerts triggered if Lighthouse score drops below 90

---

### Security

**Authentication & Authorization**:
- Firebase Authentication with industry-standard security (OAuth 2.0, JWT tokens)
- Password requirements enforced: Min 8 characters, 1 uppercase, 1 number, 1 lowercase
- Passwords hashed with bcrypt (salt rounds ≥10) before storage
- Session tokens: JWT with 30-day expiration, refresh tokens for extended sessions
- Two-factor authentication (2FA) required for: Admin accounts, Provider paid tiers (Growth+)
- Role-Based Access Control (RBAC): Patient, Provider, Admin roles with distinct permissions
- IP whitelisting for admin dashboard (office, VPN IPs only)

**Data Encryption**:
- **In transit**: HTTPS everywhere, TLS 1.3 minimum (no HTTP, no downgrade attacks)
- **At rest**: Firebase Firestore encryption at rest (AES-256), Sanity.io encrypted storage
- Sensitive data (license numbers, insurance info) stored in separate encrypted collection

**HIPAA-Exempt Data Boundaries** (Critical):
- No Protected Health Information (PHI) collected or stored
- Clarity Score data anonymized (score_id UUID, no linkage to identity without explicit user consent)
- Even with user accounts, health data (scores) architecturally separated from identity (email)
- Provider directory is informational only (no referrals tracked, no patient-provider linkage)
- Admin users cannot access patient health data (Clarity Scores anonymized in analytics)

**Input Validation & Sanitization**:
- All user inputs validated (client-side and server-side)
- SQL injection prevention: Firebase Firestore NoSQL (no SQL queries)
- XSS prevention: React auto-escapes output, Content Security Policy (CSP) headers
- CSRF protection: SameSite cookies, CSRF tokens for state-changing operations
- Rate limiting: API requests limited (100 req/min per IP for public endpoints, 10 req/min for sensitive ops like signup)

**Security Headers**:
- Content Security Policy (CSP): Restrict script sources, prevent inline scripts
- X-Frame-Options: DENY (prevent clickjacking)
- X-Content-Type-Options: nosniff (prevent MIME sniffing)
- Referrer-Policy: strict-origin-when-cross-origin (privacy)
- Permissions-Policy: Restrict browser features (camera, microphone not needed)

**Vulnerability Management**:
- Dependency scanning: npm audit or Snyk on every build (fail build if critical vulnerabilities)
- Security updates: Patch critical vulnerabilities within 7 days of disclosure
- Penetration testing: Annual pen test by third-party security firm (Growth phase)
- Bug bounty program: Public bug bounty for responsible disclosure (Vision phase)

**Compliance & Auditing**:
- GDPR compliance: Right to access, right to deletion, data minimization, consent management
- CCPA compliance: Privacy policy disclosures, opt-out of data "sale" (we don't sell data)
- Audit logs: Track all admin actions (who did what, when) for accountability
- Security incident response plan: Document breach notification procedures (GDPR 72-hour rule)

---

### Scalability

**Current Scale (MVP - Year 1)**:
- **Users**: 10,000 monthly active users (MAU)
- **Providers**: 50 verified providers
- **Content**: 50 Learn articles
- **Assessments**: 5,000 Clarity Scores per month

**Target Scale (Year 3)**:
- **Users**: 100,000+ monthly active users
- **Providers**: 750 verified providers across 5 cities
- **Content**: 500+ Learn articles
- **Assessments**: 50,000+ Clarity Scores per month

**Infrastructure Scalability**:
- **Vercel Edge Network**: Auto-scales to handle traffic spikes (no manual intervention)
- **Firebase Firestore**: Horizontally scalable NoSQL database (Google-managed, scales automatically)
- **Serverless functions**: Next.js API routes deployed as serverless (scale to zero, scale to thousands)
- **CDN caching**: Static assets cached globally (reduces origin server load)

**Database Optimization**:
- Composite indexes for common queries (provider search by location+specialty)
- Pagination for large result sets (10 items per page, not loading 1,000 at once)
- Denormalization where appropriate (duplicate data to avoid joins, Firebase best practice)
- Read replicas for analytics queries (if Firebase grows large, separate analytics DB)

**Cost Scalability**:
- Serverless model: Pay per request (no idle server costs)
- Firebase pricing tiers: Free tier → Blaze (pay-as-you-go) as usage grows
- Vercel pricing: Hobby free → Pro ($20/mo) → Enterprise (custom pricing)
- Estimated infrastructure costs:
  - Year 1 (MVP): $50-100/mo (Vercel Pro, Firebase Blaze, Sanity.io)
  - Year 2 (Growth): $200-500/mo (increased usage, Stripe fees)
  - Year 3 (Scale): $1,000-2,000/mo (100K+ MAU, optimization needed)

**Performance at Scale**:
- Load testing: Simulate 10x current traffic (if 1,000 users/day, test 10,000 users/day)
- Stress testing: Identify breaking point (Firebase Firestore limits, serverless function concurrency)
- Caching strategy: Redis or Cloudflare KV for expensive queries (provider search, analytics)
- Database sharding strategy (if needed): Shard by region (SF providers separate from NYC)

**Monitoring & Alerting**:
- Real-time monitoring: Vercel Analytics, Firebase dashboard, Plausible Analytics
- Alerts triggered: Error rate >1%, API response time >2s, downtime >5 minutes
- On-call rotation: Pagerduty or similar for critical incidents (Growth phase, when revenue-dependent)

---

### Accessibility

**WCAG 2.1 Level AA Compliance** (Minimum):
- All functional requirements met per FR-F06 (keyboard navigation, screen readers, color contrast, etc.)
- Accessibility is not optional - it's a core requirement for every feature

**Additional Accessibility Considerations**:
- **Reading level**: 8th-10th grade content benefits users with cognitive disabilities
- **Plain language**: No jargon, clear instructions throughout
- **Error recovery**: Clear error messages help users understand what went wrong and how to fix it
- **Cognitive load reduction**: "Clarity without overwhelming" principle benefits neurodivergent users
- **Crisis resources**: Highly visible crisis resources benefit users in distress

**Accessibility Testing**:
- Automated: Axe DevTools integration in CI/CD (fail build if accessibility violations)
- Manual: Keyboard-only navigation testing before each release
- Screen reader testing: NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android)
- User testing: Include users with disabilities in usability testing (Growth phase)

**Accessibility Statement**:
- Public accessibility statement page: Documents commitment, known issues, contact for feedback
- Continuous improvement: Accessibility is ongoing, not one-time compliance

---

### Integration Requirements

**MVP Integrations** (Required for launch):

**Sanity.io (Content Management)**:
- Headless CMS for Learn articles
- API integration: Fetch articles via Sanity.io Content API (GraphQL or GROQ)
- Real-time preview: Content editors see changes live before publishing
- Webhook integration: Trigger Next.js rebuild when content published

**Firebase (Authentication & Database)**:
- Firebase Authentication: User accounts (patients, providers, admins)
- Firebase Firestore: NoSQL database (user profiles, Clarity Scores, provider data)
- Firebase Security Rules: Enforce access control (patients can't see others' scores)
- Firebase Admin SDK: Server-side operations (provider verification, admin actions)

**Vercel (Hosting & Deployment)**:
- Next.js deployment platform (auto-deploy from Git)
- Edge functions: Serverless API routes
- Edge caching: CDN for static assets
- Analytics: Vercel Analytics for performance monitoring

**Plausible Analytics (Privacy-Friendly Analytics)**:
- Event tracking: Page views, Clarity Score completions, provider searches
- No cookies, GDPR-compliant
- JavaScript snippet integration
- API for custom event tracking

---

**Growth Phase Integrations** (Months 7-12):

**Stripe (Payment Processing)**:
- Provider subscription billing (Growth $49/mo, Premium $99/mo)
- Stripe Customer Portal integration (providers manage subscriptions)
- Webhook handling: subscription.created, subscription.canceled, payment.failed
- PCI compliance handled by Stripe (we don't store credit cards)

**SendGrid or Resend (Transactional Emails)**:
- Account verification emails
- Password reset emails
- Provider approval/rejection notifications
- Monthly provider analytics reports
- Email templates with branding

**Cloudflare (CDN & Security)**:
- Enhanced CDN caching (beyond Vercel)
- DDoS protection
- Image optimization (Cloudflare Images or similar)
- Rate limiting (protect against API abuse)

---

**Vision Phase Integrations** (Year 2-3):

**Claude API (AI Chatbot)**:
- Guided mental health support chatbot
- Context-aware responses based on user's Clarity Score
- Crisis detection in chat conversations
- Integration with Learn content (chatbot recommends articles)

**Google Maps API (Provider Mapping)**:
- Display providers on interactive map
- Distance calculations (user location to provider)
- Geocoding (zip code → lat/long)

**Twilio (SMS Notifications)**:
- Crisis detection → SMS with crisis resources
- Provider lead notifications (user contacted you)
- Two-factor authentication SMS codes

**Zapier/Make (No-Code Integrations)**:
- Allow providers to connect Psychage to their CRM (Salesforce, HubSpot)
- Calendar sync (Google Calendar, Outlook)
- Email marketing (Mailchimp, ConvertKit)

---

### Reliability & Uptime

**Uptime Target**:
- **MVP**: 99% uptime (7.2 hours downtime per month acceptable)
- **Growth**: 99.9% uptime (43 minutes downtime per month)
- **Vision**: 99.95% uptime (21 minutes downtime per month)

**Disaster Recovery**:
- Firebase Firestore: Auto-backup enabled (daily backups, 7-day retention)
- Sanity.io: Cloud-hosted, redundant storage, auto-backup
- Vercel: Multi-region deployment (automatic failover)
- Recovery Time Objective (RTO): <4 hours (restore service within 4 hours of outage)
- Recovery Point Objective (RPO): <24 hours (max 24 hours of data loss)

**Incident Response**:
- Monitoring: Vercel, Firebase, Plausible dashboards monitored
- Alerting: Email/Slack alerts for downtime, error spikes
- Incident commander: Designated person to coordinate response (Growth phase)
- Post-mortem: Document incidents, root cause, prevention measures

---

### Maintainability & Developer Experience

**Code Quality**:
- TypeScript strict mode enforced (no implicit any)
- ESLint configuration (code style consistency)
- Prettier formatting (auto-format on save)
- Pre-commit hooks: Lint, format, type-check before commit (Husky + lint-staged)

**Testing Strategy**:
- Unit tests: Vitest for utility functions, business logic
- Component tests: React Testing Library for UI components
- Integration tests: Test API routes, database interactions
- E2E tests: Playwright for critical user flows (Clarity Score, provider signup)
- Accessibility tests: Jest-Axe integration in component tests
- Target coverage: 70%+ code coverage (not 100%, focus on critical paths)

**Documentation**:
- README.md: Setup instructions, architecture overview, deployment process
- Component documentation: Storybook for UI component library (Growth phase)
- API documentation: OpenAPI/Swagger spec for API endpoints (if external API)
- Architecture Decision Records (ADRs): Document major technical decisions

**CI/CD Pipeline**:
- GitHub Actions or similar for automated testing
- On pull request: Run lint, type-check, tests, accessibility checks
- On merge to main: Auto-deploy to Vercel production
- Staging environment: Deploy to staging before production (Growth phase)

**Dependency Management**:
- Dependabot: Auto-create PRs for dependency updates
- Security updates: Critical patches merged within 7 days
- Major version updates: Tested in staging before production
- Lock files: package-lock.json committed (reproducible builds)

---

**Non-Functional Requirements Summary**:

These NFRs ensure Psychage is:
- **Fast**: <2s page loads, instant interactions
- **Secure**: HIPAA-exempt boundaries maintained, data encrypted, vulnerabilities patched
- **Scalable**: 10x growth capacity, auto-scaling infrastructure
- **Accessible**: WCAG 2.1 AA compliant, usable by everyone
- **Integrated**: Seamless connections to CMS, auth, analytics, payments
- **Reliable**: 99%+ uptime, disaster recovery plan
- **Maintainable**: Clean code, automated testing, clear documentation

NFRs are enforced through automated checks (CI/CD pipeline), monitoring (alerts), and regular audits (quarterly reviews).

---

## Implementation Planning

### Epic Breakdown Required

This PRD contains **55 functional requirements** and comprehensive non-functional requirements across 6 major capability areas:

1. **Learn** (Educational Content System) - 10 requirements
2. **Connect** (Provider Directory System) - 8 requirements
3. **Tools** (Clarity Score Assessment System) - 8 requirements
4. **User Management & Authentication** - 7 requirements
5. **Admin Operations & Management** - 5 requirements
6. **Foundation** (Platform Infrastructure) - 8 requirements

Plus comprehensive **non-functional requirements** covering performance, security, scalability, accessibility, integrations, reliability, and maintainability.

**Scope Complexity**: This is a **HIGH COMPLEXITY** project requiring:
- Multi-tenant SaaS architecture (patients, providers, admins)
- Healthcare compliance (HIPAA-exempt boundaries, crisis detection, liability mitigation)
- Evidence-based content with expert review workflows
- Provider verification and credentialing processes
- Real-time assessment scoring with crisis intervention
- Multiple third-party integrations (CMS, auth, analytics, payments)

Requirements must be decomposed into **epics and bite-sized stories** (200k context limit per story for AI-assisted development).

**Next Step:** Run `/bmad:bmm:workflows:create-epics-and-stories` to create the implementation breakdown.

---

## References

**Source Documents**:
- **Brainstorming Session**: [docs/bmm-brainstorming-session-2025-11-09.md](bmm-brainstorming-session-2025-11-09.md)
  - Contains: Revenue optimization strategies, marketplace GTM, financial modeling sessions
- **Project Context**: [docs/context.txt](context.txt)
  - Contains: Full platform vision, technical architecture, satellite specifications
- **Financial Model**: Created during brainstorming (36-month P&L projections, 3 scenarios)
  - Recommended: Modified Balanced $1.5M raise, profitability Month 27
- **Workflow Status**: [docs/bmm-workflow-status.yaml](bmm-workflow-status.yaml)
  - Tracks: BMM methodology progress (Discovery → Planning → Solutioning → Implementation)

**Technical Stack References**:
- **Next.js 14+ Documentation**: https://nextjs.org/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **Sanity.io Documentation**: https://www.sanity.io/docs
- **Vercel Documentation**: https://vercel.com/docs
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

**Domain Knowledge References**:
- **HIPAA Compliance**: https://www.hhs.gov/hipaa/index.html
- **GDPR Compliance**: https://gdpr.eu/
- **CCPA Compliance**: https://oag.ca.gov/privacy/ccpa
- **Mental Health Crisis Resources**: 988 Suicide & Crisis Lifeline (https://988lifeline.org/)
- **Evidence-Based Sources**: WHO, CDC, APA, NIMH (linked in articles)

---

## Next Steps

### Immediate Next Steps (BMM Methodology)

**1. Epic & Story Breakdown** (Required before development)
- **Command**: `/bmad:bmm:workflows:create-epics-and-stories`
- **Purpose**: Decompose 55 functional requirements into implementable epics and bite-sized stories
- **Output**:
  - Epic overview document (high-level feature groups)
  - Individual epic files (detailed requirements, acceptance criteria, tech specs)
  - Story breakdown (small, focused development tasks)
- **Estimated Duration**: 2-3 hours (AI-assisted, interactive)

**2. UX Design** (Recommended, can run in parallel with epics)
- **Command**: `/bmad:bmm:workflows:create-ux-design`
- **Purpose**: Create detailed UX design, wireframes, and component specifications
- **Output**:
  - Hub-and-spoke navigation design
  - Learn article page design
  - Clarity Score assessment flow design
  - Provider directory interface design
  - Mobile-responsive component specifications
- **Estimated Duration**: 3-4 hours (AI-assisted)
- **Note**: UX principles defined in this PRD serve as starting point

**3. Architecture** (Required before implementation)
- **Command**: `/bmad:bmm:workflows:architecture`
- **Purpose**: Define technical architecture, data models, API specifications
- **Output**:
  - System architecture diagram
  - Database schema (Firebase Firestore collections)
  - API endpoint specifications
  - Integration architecture (Sanity.io, Firebase, Vercel, Plausible)
  - Security architecture (authentication flows, data encryption)
  - Technical decision records (ADRs)
- **Estimated Duration**: 4-5 hours (AI-assisted)

**4. Solutioning Gate Check** (Quality gate before development)
- **Command**: `/bmad:bmm:workflows:solutioning-gate-check`
- **Purpose**: Validate all planning artifacts are complete, aligned, and gap-free
- **Validates**:
  - PRD completeness ✅ (this document)
  - Epic breakdown complete (pending step 1)
  - Architecture document complete (pending step 3)
  - No contradictions between PRD, epics, architecture
  - All requirements have clear acceptance criteria
  - Technical feasibility validated
- **Estimated Duration**: 30-60 minutes (automated checks + manual review)

---

### Development Phase (After Planning Complete)

**5. Sprint Planning**
- **Command**: `/bmad:bmm:workflows:sprint-planning`
- **Purpose**: Create sprint status tracking file, prioritize stories for implementation
- **Output**: sprint-status.yaml tracking file (tracks story progress through TODO → IN PROGRESS → READY FOR REVIEW → DONE)

**6. Story Development** (Iterative, per story)
- **Command**: `/bmad:bmm:workflows:dev-story`
- **Purpose**: Implement individual story with AI-assisted development
- **Process**: Load story context → write code → write tests → validate → update story file

**7. Code Review** (After each story completion)
- **Command**: `/bmad:bmm:workflows:code-review`
- **Purpose**: Senior developer review of completed story code
- **Validates**: Code quality, test coverage, acceptance criteria met, security best practices

---

### Recommended Workflow Sequence

```
✅ 1. PRD Complete (YOU ARE HERE)
↓
2. Epic Breakdown (/bmad:bmm:workflows:create-epics-and-stories)
   ↓ (parallel)
   3a. UX Design (/bmad:bmm:workflows:create-ux-design)
   3b. Architecture (/bmad:bmm:workflows:architecture)
↓
4. Solutioning Gate Check (/bmad:bmm:workflows:solutioning-gate-check)
↓
5. Sprint Planning (/bmad:bmm:workflows:sprint-planning)
↓
6. Story Development Loop (dev-story → code-review → next story)
```

**Estimated Total Planning Time** (before first line of code): **8-12 hours** (AI-assisted, interactive)

**Estimated MVP Development Time** (solo dev + Claude Code): **4-6 months** (based on 55 functional requirements, HIGH complexity)

---

## Project Summary

_This PRD captures the essence of **Project Psychage V1** - a mental health education platform that embodies **"Clarity without overwhelming."**_

Psychage solves a fundamental problem: mental health information is fragmented, overwhelming, and often untrustworthy. We deliver **evidence-first education**, **verified provider connections**, and **self-assessment tools** within a **hub-and-spoke navigation** architecture that guides users without drowning them in options.

**What makes Psychage special**:
- **The Clarity Moment**: That emotional spark when confusion transforms into understanding
- **Just Enough Information**: 8-10 minute articles, 10-minute assessments, 5-10 provider results (never overwhelming)
- **Evidence-Based Trust**: Every claim cited, every article expert-reviewed, transparency in quality standards
- **HIPAA-Exempt by Design**: Educational platform maintaining strict boundaries (no PHI, no diagnoses)
- **Free for Patients, Paid for Providers**: Ethical business model aligns incentives

**Success in Year 3**:
- **750 verified providers** across 5 cities
- **12,000 active patients** engaged with the platform
- **100,000+ monthly visitors** to educational content
- **$3.37M ARR** across 8 revenue streams
- **Profitability by Month 27** - sustainable, mission-driven business

_Created through collaborative discovery between Ryan and AI facilitator._
_Date: 2025-11-10_
_Version: 1.0_
