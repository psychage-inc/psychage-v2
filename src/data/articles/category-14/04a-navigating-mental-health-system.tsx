import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_THERAPY_NAVIGATION, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleAccordion,
  ComparisonTable,
  StatCard,
  ProgressSteps,
  QuoteBlock,
} from '../../../components/article/blocks';

export const navigatingMentalHealthSystemArticlesA: Article[] = [
  {
    id: catId(31),
    slug: 'understanding-mental-health-insurance-coverage-what-included-not',
    title: `Understanding Mental Health Insurance Coverage: What's Included and What's Not`,
    description: `Decode your insurance benefits for therapy, psychiatry, and mental health treatment — what's covered, what's not, and how to maximize your benefits.`,
    image: '/images/articles/cat14/cover-031.svg',
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Insurance', 'Mental Health Coverage', 'Healthcare', 'Costs'],
    citations: [
      {
        id: '1',
        text: 'Mental Health Parity and Addiction Equity Act: Implementation and impact',
        source: 'JAMA',
        year: '2021',
        link: 'https://doi.org/10.1001/jama.2021.8935',
        tier: 1,
      },
      {
        id: '2',
        text: 'Out-of-network mental health care: Costs and access',
        source: 'Health Affairs',
        year: '2022',
        link: 'https://doi.org/10.1377/hlthaff.2021.01666',
        tier: 1,
      },
      {
        id: '3',
        text: 'Navigating health insurance for mental health services',
        source: 'National Alliance on Mental Illness (NAMI)',
        year: '2022',
        link: 'https://www.nami.org/Your-Journey/Individuals-with-Mental-Illness/Understanding-Health-Insurance',
        tier: 3,
      },
      {
        id: '4',
        text: 'Prior authorization for mental health: Barriers to care',
        source: 'Psychiatric Services',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ps.202000475',
        tier: 1,
      },
      {
        id: '5',
        text: 'Mental health coverage under the Affordable Care Act',
        source: 'Kaiser Family Foundation',
        year: '2022',
        link: 'https://www.kff.org/mental-health/issue-brief/mental-health-coverage-under-aca/',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mental health insurance coverage is confusing. Terms like "deductible,", "copay,", "in-network," and "prior authorization" make it hard to know what you'll actually pay for therapy or medication. But understanding your benefits can save you hundreds or thousands of dollars — and help you access the care you need.
          </p>
          <p className="mb-6">
            Here's a practical guide to decoding your mental health coverage, knowing what's covered, and navigating common insurance barriers.
          </p>
        </div>

        <h2 id="mental-health-parity" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Mental Health Parity: Your Legal Right to Equal Coverage
        </h2>
        <p className="mb-6">
          The Mental Health Parity and Addiction Equity Act (MHPAEA) of 2008 requires most health plans to cover mental health and substance use treatment the same way they cover physical health conditions <Citation id="1" index={1} source="JAMA" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="What Parity Means">
          <p className="mb-4">Insurance can't impose stricter limits on mental health coverage than physical health. For example:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>If unlimited doctor visits are covered for physical conditions, therapy visits can't have a cap</li>
            <li>If copays for specialists are $30, copays for therapists must be the same</li>
            <li>Prior authorization requirements can't be more stringent for mental health than physical health</li>
          </ul>
          <p className="mt-4"><strong>Reality:</strong> Many insurers still violate parity laws. Knowing your rights helps you advocate for proper coverage <Citation id="5" index={5} source="Kaiser Family Foundation" year="2022" tier={2} />.</p>
        </ArticleCallout>

        <h2 id="key-terms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Key Insurance Terms You Need to Know
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'premium',
              title: 'Premium',
              content: (
                <p>The monthly cost you pay for insurance, whether you use it or not. This doesn't count toward your deductible or out-of-pocket maximum.</p>
              ),
            },
            {
              id: 'deductible',
              title: 'Deductible',
              content: (
                <div>
                  <p className="mb-4">The amount you pay out-of-pocket before insurance starts covering costs. Once you meet your deductible, insurance kicks in.</p>
                  <p className="mb-4"><strong>Example:</strong> $1,500 deductible means you pay the first $1,500 of medical costs yourself. After that, you pay copays/coinsurance.</p>
                  <p><strong>Important:</strong> Some plans have separate mental health deductibles — check your Summary of Benefits.</p>
                </div>
              ),
            },
            {
              id: 'copay',
              title: 'Copay',
              content: (
                <div>
                  <p className="mb-4">A fixed amount you pay per visit after meeting your deductible. Common copays for therapy: $20-50.</p>
                  <p><strong>Copay vs. coinsurance:</strong> Copay is a fixed amount ($30/session); coinsurance is a percentage (20% of session cost).</p>
                </div>
              ),
            },
            {
              id: 'out-of-pocket-max',
              title: 'Out-of-Pocket Maximum',
              content: (
                <div>
                  <p className="mb-4">The most you'll pay in a year. After you hit this limit, insurance covers 100% of covered services.</p>
                  <p><strong>Example:</strong> $5,000 out-of-pocket max means after you've paid $5,000 in deductibles, copays, and coinsurance combined, everything is free for the rest of the year.</p>
                </div>
              ),
            },
            {
              id: 'in-network-vs-out',
              title: 'In-Network vs. Out-of-Network',
              content: (
                <div>
                  <p className="mb-4"><strong>In-network:</strong> Providers who have a contract with your insurance. Costs are lower.</p>
                  <p className="mb-4"><strong>Out-of-network:</strong> Providers who don't have a contract. You pay more (often 40-50% coinsurance instead of a copay) or full cost.</p>
                  <p><strong>Problem for mental health:</strong> Many therapists don't take insurance, making them 'out-of-network' <Citation id="2" index={2} source="Health Affairs" year="2022" tier={1} />.</p>
                </div>
              ),
            },
            {
              id: 'prior-authorization',
              title: 'Prior Authorization',
              content: (
                <div>
                  <p className="mb-4">Approval from insurance before certain treatments are covered. Common for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Intensive outpatient programs (IOP)</li>
                    <li>Partial hospitalization (PHP)</li>
                    <li>Certain medications</li>
                    <li>Extended therapy (beyond 20-30 sessions)</li>
                  </ul>
                  <p className="mt-4"><strong>Barrier:</strong> Prior auth can delay or deny necessary care <Citation id="4" index={4} source="Psychiatric Services" year="2021" tier={1} />. Your provider can appeal denials.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-is-covered" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What's Typically Covered
        </h2>

        <ComparisonTable
          title="Mental Health Services: Coverage"
          columns={['Service', 'Usually Covered?', 'Notes']}
          items={[
            { feature: 'Outpatient therapy (in-network)', values: ['Yes', 'Copay or coinsurance after deductible'] },
            { feature: 'Psychiatry visits', values: ['Yes', 'Often higher copay than therapy ($50-100)'] },
            { feature: 'Psychiatric medications', values: ['Yes', 'Generic preferred; brand may require prior auth'] },
            { feature: 'Inpatient hospitalization', values: ['Yes', 'Subject to medical necessity review'] },
            { feature: 'Intensive outpatient (IOP)', values: ['Yes (with prior auth)', 'May require step-down from higher level of care'] },
            { feature: 'Psychological testing', values: ['Sometimes', 'Often requires prior authorization'] },
            { feature: 'Online therapy platforms', values: ['Varies', 'Some plans cover BetterHelp, Talkspace, etc.'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="not-covered" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What's Usually NOT Covered
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Court-ordered evaluations</strong> (custody, forensic assessments)</li>
          <li><strong>Couples or marriage counseling</strong> (unless diagnosed mental health condition is being treated)</li>
          <li><strong>Life coaching, career counseling, or personal growth therapy</strong> (without a mental health diagnosis)</li>
          <li><strong>Alternative treatments</strong> (acupuncture, reiki, art therapy in some cases)</li>
          <li><strong>Executive function coaching for ADHD</strong> (sometimes not covered)</li>
          <li><strong>Experimental treatments</strong> (psychedelic-assisted therapy, TMS in some cases)</li>
        </ul>

        <ArticleCallout variant="warning" title="The Diagnosis Requirement">
          <p className="mb-4">To bill insurance, your therapist must give you a mental health diagnosis (depression, anxiety, PTSD, etc.). This is documented in your insurance claims.</p>
          <p><strong>Privacy concern:</strong> Some people prefer to pay out-of-pocket to avoid having a mental health diagnosis on record. This is a personal choice based on your comfort with documentation.</p>
        </ArticleCallout>

        <h2 id="how-to-check-coverage" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Check Your Mental Health Coverage
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Call the Number on Your Insurance Card',
              description: (
                <div>
                  <p className="mb-4">Ask these specific questions:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>"Do I have mental health and substance use coverage?"</li>
                    <li>"What's my deductible for mental health services?"</li>
                    <li>"What's my copay or coinsurance for outpatient therapy?"</li>
                    <li>"Is there a session limit per year?"</li>
                    <li>"Do I need a referral from my primary care doctor?"</li>
                    <li>"Does [specific provider name] participate in my network?"</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Review Your Summary of Benefits (SOB)',
              description: (
                <p>This document (provided when you enroll) outlines what's covered. Look for the 'Mental Health' or "Behavioral Health" section.</p>
              ),
            },
            {
              title: 'Check the Provider Directory',
              description: (
                <div>
                  <p className="mb-4">Most insurers have an online directory of in-network mental health providers. Search by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provider type (therapist, psychiatrist, psychologist)</li>
                    <li>Specialty (trauma, OCD, LGBTQ+ affirming, etc.)</li>
                    <li>Location or telehealth availability</li>
                  </ul>
                  <p className="mt-4"><strong>Warning:</strong> Directories are often outdated. Always call the provider to confirm they're still in-network and accepting new patients <Citation id="3" index={3} source="National Alliance on Mental Illness (NAMI)" year="2022" tier={3} />.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="out-of-network-reimbursement" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Out-of-Network Reimbursement: How to Get Partial Coverage
        </h2>
        <p className="mb-6">
          If you want to see an out-of-network therapist, you may still get partial reimbursement:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Check if Your Plan Has Out-of-Network Benefits',
              description: (
                <p>Some plans (PPOs especially) cover out-of-network providers at a reduced rate (e.g., 50-60% after you meet a higher deductible).</p>
              ),
            },
            {
              title: 'Pay the Therapist Upfront',
              description: (
                <p>Out-of-network therapists typically don't bill insurance directly. You pay the full session fee upfront.</p>
              ),
            },
            {
              title: 'Get a Superbill',
              description: (
                <p>Ask your therapist for a 'superbill' — an itemized receipt with CPT codes, diagnosis, and session details.</p>
              ),
            },
            {
              title: 'Submit the Superbill to Insurance',
              description: (
                <p>Mail or upload the superbill through your insurance portal to request reimbursement. You'll get a check for the covered percentage (minus deductible/coinsurance).</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="tip" title="Out-of-Network Can Be Worth It">
          <p>Even if you only get 50% reimbursed, an out-of-network therapist who's the right fit may be more effective (and worth the extra cost) than an in-network therapist who isn't helping.</p>
        </ArticleCallout>

        <h2 id="common-problems" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Insurance Problems (And How to Fix Them)
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'claim-denied',
              title: 'Your Claim Was Denied',
              content: (
                <div>
                  <p className="mb-4"><strong>Reasons:</strong> Not medically necessary, out-of-network, service not covered, missing prior authorization</p>
                  <p className="mb-4"><strong>Solution:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request a written explanation (Explanation of Benefits - EOB)</li>
                    <li>File an appeal — your therapist can provide supporting documentation</li>
                    <li>Contact your state insurance commissioner if the denial violates parity laws</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'no-in-network',
              title: 'No In-Network Providers Available',
              content: (
                <div>
                  <p className="mb-4">If there are no in-network therapists accepting new patients in your area, your insurer may grant a "single-case agreement" to cover an out-of-network provider at in-network rates.</p>
                  <p><strong>How:</strong> Call your insurance and say "There are no available in-network providers for my condition. Can you approve a single-case agreement?"</p>
                </div>
              ),
            },
            {
              id: 'session-limits',
              title: 'Hit Your Session Limit',
              content: (
                <div>
                  <p className="mb-4">If your plan caps therapy sessions (e.g., 20/year), your therapist can request authorization for additional sessions by submitting clinical documentation showing ongoing need.</p>
                  <p><strong>Parity violation:</strong> If physical therapy has no cap but mental health does, that's illegal. File a complaint.</p>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 40, suffix: '%', label: `Therapists who don't accept insurance at all` },
            { value: 18, suffix: '%', label: 'Americans with mental health coverage have trouble finding in-network providers' },
            { value: 25, suffix: '%', label: 'Average coinsurance for out-of-network mental health (vs. 10-20% for physical health)' },
          ]}
          source="Health Affairs, 2022 & NAMI, 2022"
        />

        <QuoteBlock
          quote="I spent hours calling therapists on my insurance list. None were accepting new patients. Finally, I called my insurance and demanded a single-case agreement for an out-of-network therapist. They approved it. I wish I'd known to ask for that from the start."
          attribution="Person Navigating Insurance"
          role="Patient Perspective"
          variant="large"
        />

        <h2 id="alternatives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          If You Don't Have Insurance or Coverage Is Inadequate
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sliding scale therapists:</strong> Adjust fees based on income</li>
          <li><strong>Community mental health centers:</strong> Free or low-cost care</li>
          <li><strong>Training clinics:</strong> University counseling centers with supervised grad students</li>
          <li><strong>Online platforms:</strong> BetterHelp, Talkspace (~$260-360/month for unlimited messaging + weekly video)</li>
          <li><strong>Open Path Collective:</strong> $30-80/session with vetted therapists</li>
          <li><strong>Employee Assistance Programs (EAP):</strong> Many employers offer 3-8 free sessions</li>
        </ul>

        <p className="mb-6 mt-6">
          Navigating mental health insurance is frustrating. But knowing your rights, asking the right questions, and advocating for yourself can unlock coverage you didn't know you had.
        </p>
      </>
    ),
  },
  {
    id: catId(32),
    slug: 'sliding-scale-therapy-how-to-find-affordable-mental-health-care',
    title: 'Sliding Scale Therapy: How to Find Affordable Mental Health Care',
    description: 'Practical strategies for finding low-cost therapy, sliding scale providers, and free mental health resources.',
    image: "/images/articles/cat14/cover-032.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Affordable Therapy', 'Sliding Scale', 'Low-Cost Care', 'Access'],
    citations: [
      {
        id: '1',
        text: 'Cost as a barrier to mental health treatment',
        source: 'Psychiatric Services',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ps.202000410',
        tier: 1,
      },
      {
        id: '2',
        text: 'Effectiveness of low-cost community mental health services',
        source: 'Community Mental Health Journal',
        year: '2020',
        link: 'https://doi.org/10.1007/s10597-020-00632-2',
        tier: 1,
      },
      {
        id: '3',
        text: 'Open Path Collective: Affordable therapy network outcomes',
        source: 'Journal of Clinical Psychology',
        year: '2021',
        link: 'https://doi.org/10.1002/jclp.23145',
        tier: 1,
      },
      {
        id: '4',
        text: 'Sliding scale fees in private practice: Ethical considerations',
        source: 'Professional Psychology: Research and Practice',
        year: '2020',
        link: 'https://doi.org/10.1037/pro0000329',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Therapy is expensive. Full-fee sessions cost $100-250+ per week. Without insurance, that's $400-1,000/month — unaffordable for most people. But affordable options exist: sliding scale therapy, community clinics, training programs, and online platforms can bring costs down to $0-80/session <Citation id="1" index={1} source="Psychiatric Services" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            Here's how to find low-cost mental health care when money is tight.
          </p>
        </div>

        <h2 id="what-is-sliding-scale" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is Sliding Scale Therapy?
        </h2>
        <p className="mb-6">
          Sliding scale means therapists adjust their fee based on your income. Instead of a fixed $150/session, you might pay $50-80/session if you earn below a certain threshold <Citation id="4" index={4} source="Professional Psychology: Research and Practice" year="2020" tier={4} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="How It Works">
          <p className="mb-4">You provide proof of income (pay stubs, tax return, or self-report), and the therapist offers a reduced rate. Rates typically range from $30-100/session based on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Household income</li>
            <li>Number of dependents</li>
            <li>Student status</li>
            <li>Unemployment or disability</li>
          </ul>
        </ArticleCallout>

        <h2 id="where-to-find" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Where to Find Sliding Scale Therapy
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'private-practice',
              title: '1. Private Practice Therapists',
              content: (
                <div>
                  <p className="mb-4">Many therapists reserve 1-5 sliding scale spots in their caseload. They don't always advertise this — you have to ask.</p>
                  <p className="mb-4"><strong>How to ask:</strong> "Do you offer sliding scale rates? My budget is [amount]."</p>
                  <p className="mb-4"><strong>Where to look:</strong></p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Psychology Today directory — filter by "Sliding Scale: Yes"</li>
                    <li>TherapyDen.com — many therapists list sliding scale availability</li>
                    <li>Inclusive Therapists — social justice-focused directory with sliding scale options</li>
                  </ul>
                </div>
              ),
            },
            {
              id: 'open-path',
              title: '2. Open Path Collective',
              content: (
                <div>
                  <p className="mb-4"><strong>Website:</strong> openpathcollective.org</p>
                  <p className="mb-4"><strong>Cost:</strong> $30-80/session (after a one-time $65 lifetime membership)</p>
                  <p className="mb-4"><strong>How it works:</strong> Network of vetted therapists committed to affordable care. Quality is comparable to full-fee therapy <Citation id="3" index={3} source="Journal of Clinical Psychology" year="2021" tier={1} />.</p>
                  <p><strong>Best for:</strong> People without insurance or with high deductibles who need consistent, long-term therapy.</p>
                </div>
              ),
            },
            {
              id: 'community-centers',
              title: '3. Community Mental Health Centers',
              content: (
                <div>
                  <p className="mb-4">Federally funded centers that provide mental health services regardless of ability to pay. Fees based on income, often $0-30/session <Citation id="2" index={2} source="Community Mental Health Journal" year="2020" tier={1} />.</p>
                  <p className="mb-4"><strong>Services:</strong> Therapy, psychiatry, case management, crisis intervention</p>
                  <p className="mb-4"><strong>Find one:</strong> SAMHSA Treatment Locator (samhsa.gov/find-help)</p>
                  <p><strong>Drawback:</strong> Often long waitlists, limited appointment availability</p>
                </div>
              ),
            },
            {
              id: 'training-clinics',
              title: '4. University Training Clinics',
              content: (
                <div>
                  <p className="mb-4">Grad students in psychology, counseling, or social work provide therapy under licensed supervision. Costs are much lower — often $5-40/session.</p>
                  <p className="mb-4"><strong>Quality:</strong> Students are learning, but they're closely supervised by experienced clinicians. Research shows outcomes are comparable to licensed therapists.</p>
                  <p><strong>Find one:</strong> Search "[your city] university counseling clinic" or contact local grad programs in psychology/social work.</p>
                </div>
              ),
            },
            {
              id: 'nonprofit-orgs',
              title: '5. Nonprofit Mental Health Organizations',
              content: (
                <div>
                  <p className="mb-4">Organizations like NAMI, local mental health associations, or condition-specific nonprofits often offer:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Free support groups</li>
                    <li>Low-cost therapy programs</li>
                    <li>Peer support services</li>
                    <li>Educational workshops</li>
                  </ul>
                  <p className="mt-4"><strong>Find local resources:</strong> NAMI Helpline (1-800-950-6264) or nami.org</p>
                </div>
              ),
            },
            {
              id: 'employee-assistance',
              title: '6. Employee Assistance Programs (EAP)',
              content: (
                <div>
                  <p className="mb-4">Many employers offer EAPs — free, confidential counseling (typically 3-8 sessions) for employees and sometimes family members.</p>
                  <p className="mb-4"><strong>Check:</strong> HR department or benefits portal</p>
                  <p><strong>Limitation:</strong> Short-term only; you'll need another option after your sessions run out.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="online-platforms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Online Therapy Platforms (Lower Cost, More Accessible)
        </h2>

        <ComparisonTable
          title="Online Therapy Platform Costs"
          columns={['Platform', 'Cost', 'What You Get']}
          items={[
            { feature: 'BetterHelp', values: ['$260-360/month', 'Unlimited messaging + 1 live session/week'] },
            { feature: 'Talkspace', values: ['$260-400/month', 'Unlimited messaging + video/audio sessions'] },
            { feature: 'Cerebral', values: ['$325/month', 'Medication management + therapy (if needed)'] },
            { feature: 'Open Path (online)', values: ['$30-80/session', 'Video sessions with vetted therapists'] },
            { feature: 'Woebot', values: ['Free or ~$40/month', 'AI-powered CBT chatbot (not a therapist)'] },
          ]}
          highlightColumn={0}
        />

        <ArticleCallout variant="tip" title="Financial Assistance Programs">
          <p className="mb-4">Some platforms offer financial aid:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>BetterHelp Financial Aid:</strong> Apply through their site for reduced rates</li>
            <li><strong>Talkspace Scholarships:</strong> Limited availability for low-income users</li>
          </ul>
        </ArticleCallout>

        <h2 id="free-resources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Free Mental Health Resources
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Support Groups',
              description: (
                <div>
                  <p className="mb-4">NAMI, DBSA (Depression and Bipolar Support Alliance), AA/NA, grief groups — peer support is free and evidence-based.</p>
                  <p><strong>Find groups:</strong> NAMI.org, DBSA alliance.org, local hospitals</p>
                </div>
              ),
            },
            {
              title: 'Crisis Lines',
              description: (
                <div>
                  <p className="mb-4"><strong>988 Suicide & Crisis Lifeline:</strong> 24/7 support, free</p>
                  <p className="mb-4"><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                  <p><strong>NAMI Helpline:</strong> 1-800-950-6264 (not a crisis line, but provides resources and support)</p>
                </div>
              ),
            },
            {
              title: 'Self-Help Apps',
              description: (
                <div>
                  <p className="mb-4">Free or low-cost apps with evidence-based content:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Woebot:</strong> AI CBT chatbot (free version available)</li>
                    <li><strong>Sanvello:</strong> Mood tracking + CBT tools (free tier)</li>
                    <li><strong>Headspace/Calm:</strong> Meditation and mindfulness (some free content)</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Online CBT Programs',
              description: (
                <div>
                  <p className="mb-4"><strong>MoodGYM:</strong> Free online CBT program for depression/anxiety (moodgym.com.au)</p>
                  <p><strong>SilverCloud:</strong> Free through some employers, insurers, or universities</p>
                </div>
              ),
            },
          ]}
        />

        <StatCard
          stats={[
            { value: 60, suffix: '%', label: 'People who say cost is a barrier to mental health treatment' },
            { value: 30, suffix: '–80', label: 'Dollar range for sliding scale therapy sessions (vs. $150-250 full fee)' },
            { value: 0, suffix: '', label: 'Cost of many community mental health center services' },
          ]}
          source="Psychiatric Services, 2021"
        />

        <h2 id="how-to-ask" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Ask for Sliding Scale Without Awkwardness
        </h2>
        <p className="mb-6">
          Many people feel embarrassed asking for reduced fees. Don't be. Therapists expect this question and many want to help.
        </p>

        <ArticleCallout variant="tip" title="Scripts for Asking">
          <p className="mb-4"><strong>Via email or phone:</strong></p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>"Do you offer sliding scale rates? My budget is around $[amount] per session."</li>
            <li>"I'm interested in working with you but I'm on a limited budget. Do you have any reduced-fee spots available?"</li>
          </ul>
          <p className="mb-4"><strong>If they say no:</strong></p>
          <p>"No problem — do you know of any colleagues who offer sliding scale or low-cost options?"</p>
        </ArticleCallout>

        <QuoteBlock
          quote={`I was terrified to ask about sliding scale. But my therapist said "Of course — I hold sliding scale spots specifically for people who need them." I pay $60/session instead of $175. It's the only way I can afford consistent therapy.`}
          attribution="Sliding Scale Therapy Client"
          role="Patient Perspective"
          variant="large"
        />

        <p className="mb-6 mt-6">
          Affordable therapy exists. It takes more effort to find, but you deserve support regardless of your income. Keep searching — the right fit is out there.
        </p>
      </>
    ),
  },
  {
    id: catId(33),
    slug: 'community-mental-health-centers-free-low-cost-treatment-options',
    title: 'Community Mental Health Centers: Free and Low-Cost Treatment Options',
    description: 'How federally funded community mental health centers provide free or sliding-scale therapy, psychiatry, and crisis services.',
    image: "/images/articles/cat14/cover-033.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Community Mental Health', 'Free Care', 'Affordable Treatment', 'Access'],
    citations: [
      {
        id: '1',
        text: 'Community mental health centers: Role and effectiveness',
        source: 'Psychiatric Services',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ps.202000603',
        tier: 1,
      },
      {
        id: '2',
        text: 'Federally Qualified Health Centers mental health services',
        source: 'Journal of Health Care for the Poor and Underserved',
        year: '2020',
        link: 'https://doi.org/10.1353/hpu.2020.0152',
        tier: 1,
      },
      {
        id: '3',
        text: 'Access to care at community mental health centers',
        source: 'Community Mental Health Journal',
        year: '2022',
        link: 'https://doi.org/10.1007/s10597-022-00978-3',
        tier: 1,
      },
      {
        id: '4',
        text: 'SAMHSA treatment locator: Connecting people to services',
        source: 'Substance Abuse and Mental Health Services Administration',
        year: '2022',
        link: 'https://www.samhsa.gov/find-help',
        tier: 2,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Community Mental Health Centers (CMHCs) are federally funded clinics that provide mental health and substance use services regardless of ability to pay. If you're uninsured, underinsured, or can't afford private therapy, CMHCs offer free or extremely low-cost treatment <Citation id="1" index={1} source="Psychiatric Services" year="2021" tier={1} />.
          </p>
          <p className="mb-6">
            Here's what CMHCs offer, how to find one, and what to expect.
          </p>
        </div>

        <h2 id="what-are-cmhcs" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Are Community Mental Health Centers?
        </h2>
        <p className="mb-6">
          CMHCs are nonprofit clinics funded by federal, state, and local governments to serve people with mental illness and substance use disorders — especially those who can't afford private care <Citation id="2" index={2} source="Journal of Health Care for the Poor and Underserved" year="2020" tier={1} />.
        </p>

        <ArticleCallout variant="key-takeaway" title="Core Principle">
          <p><strong>No one is turned away due to inability to pay.</strong> Services are offered on a sliding scale based on income, and many people pay $0 for care.</p>
        </ArticleCallout>

        <h2 id="services-offered" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Services Offered at CMHCs
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'outpatient-therapy',
              title: 'Outpatient Therapy',
              content: (
                <div>
                  <p className="mb-4">Individual, group, and family therapy for depression, anxiety, trauma, bipolar disorder, and other conditions.</p>
                  <p><strong>Modalities:</strong> CBT, DBT, trauma-focused therapy, supportive counseling</p>
                </div>
              ),
            },
            {
              id: 'psychiatry',
              title: 'Psychiatric Services',
              content: (
                <div>
                  <p className="mb-4">Medication management with psychiatrists, nurse practitioners, or physician assistants.</p>
                  <p><strong>Common for:</strong> Depression, anxiety, bipolar disorder, schizophrenia, ADHD</p>
                </div>
              ),
            },
            {
              id: 'case-management',
              title: 'Case Management',
              content: (
                <p>Help with housing, disability benefits, Medicaid enrollment, transportation, and connecting to resources.</p>
              ),
            },
            {
              id: 'crisis-services',
              title: 'Crisis Intervention',
              content: (
                <div>
                  <p className="mb-4">24/7 crisis hotlines, walk-in crisis services, mobile crisis teams.</p>
                  <p><strong>For:</strong> Suicidal ideation, psychotic episodes, acute mental health crises</p>
                </div>
              ),
            },
            {
              id: 'substance-use',
              title: 'Substance Use Treatment',
              content: (
                <div>
                  <p className="mb-4">Outpatient programs, medication-assisted treatment (MAT for opioid/alcohol use), support groups.</p>
                  <p><strong>Note:</strong> Some CMHCs specialize in co-occurring disorders (mental health + substance use).</p>
                </div>
              ),
            },
            {
              id: 'peer-support',
              title: 'Peer Support Services',
              content: (
                <p>Support groups led by people with lived experience of mental illness — often free and open to the community.</p>
              ),
            },
          ]}
        />

        <h2 id="cost" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Much Does It Cost?
        </h2>
        <p className="mb-6">
          CMHCs use a sliding fee scale based on household income and family size (Federal Poverty Level guidelines). Many people pay nothing.
        </p>

        <ComparisonTable
          title="Sample Sliding Scale Fees"
          columns={['Income Level (% of Federal Poverty Level)', 'Therapy Cost Per Session', 'Psychiatry Cost Per Visit']}
          items={[
            { feature: 'Below 100% FPL', values: ['$0', '$0'] },
            { feature: '100-150% FPL', values: ['$5-10', '$10-20'] },
            { feature: '150-200% FPL', values: ['$10-25', '$20-40'] },
            { feature: 'Above 200% FPL', values: ['$25-50', '$40-75'] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6 mt-6">
          <strong>Note:</strong> Exact fees vary by center. Some accept Medicaid, Medicare, and private insurance too — so you may pay your copay instead of sliding scale.
        </p>

        <h2 id="how-to-find" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How to Find a Community Mental Health Center
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'SAMHSA Treatment Locator',
              description: (
                <div>
                  <p className="mb-4"><strong>Website:</strong> samhsa.gov/find-help/national-helpline or findtreatment.gov</p>
                  <p className="mb-4"><strong>Phone:</strong> 1-800-662-4357 (24/7, free, confidential)</p>
                  <p><strong>How it works:</strong> Enter your zip code to find CMHCs, substance use programs, and crisis services near you <Citation id="4" index={4} source="Substance Abuse and Mental Health Services Administration" year="2022" tier={2} />.</p>
                </div>
              ),
            },
            {
              title: `Search "Community Mental Health Center [Your City]`,
              description: (
                <p>Google this phrase to find local centers. Many have websites with intake forms and service descriptions.</p>
              ),
            },
            {
              title: 'Contact Your County Health Department',
              description: (
                <p>County health departments often run or fund CMHCs. Call and ask: 'Do you have mental health services or can you refer me to a community mental health center?'</p>
              ),
            },
            {
              title: 'Ask 211',
              description: (
                <div>
                  <p className="mb-4">Dial 211 (in most states) for a free referral service that connects you to local resources, including mental health services.</p>
                  <p><strong>Website:</strong> 211.org</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-to-expect" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What to Expect at Your First Visit
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Intake Appointment',
              description: (
                <div>
                  <p className="mb-4">You'll complete paperwork (medical history, income verification, consent forms) and meet with an intake worker who assesses your needs.</p>
                  <p><strong>Bring:</strong> ID, proof of income (pay stubs, tax return, or self-attestation if unemployed), insurance card if you have one</p>
                </div>
              ),
            },
            {
              title: 'Assessment',
              description: (
                <p>The intake worker asks about symptoms, history, current stressors, and what you're hoping to address. This helps determine the right level of care (therapy, psychiatry, case management, etc.).</p>
              ),
            },
            {
              title: 'Waitlist (Often)',
              description: (
                <div>
                  <p className="mb-4">CMHCs are often overwhelmed with demand. You may be placed on a waitlist for therapy (weeks to months) or psychiatry.</p>
                  <p className="mb-4"><strong>Crisis exception:</strong> If you're in crisis or at high risk, you'll be prioritized for immediate services <Citation id="3" index={3} source="Community Mental Health Journal" year="2022" tier={1} />.</p>
                </div>
              ),
            },
            {
              title: 'Assignment to Provider',
              description: (
                <p>Once off the waitlist, you'll be matched with a therapist, psychiatrist, or case manager based on availability and your needs.</p>
              ),
            },
          ]}
        />

        <h2 id="pros-and-cons" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Pros and Cons of CMHCs
        </h2>

        <ComparisonTable
          title="Benefits vs. Limitations"
          columns={['Benefits', 'Limitations']}
          items={[
            { feature: 'Free or extremely low-cost', values: ['Long waitlists (weeks to months)'] },
            { feature: 'No one turned away for inability to pay', values: ['Limited appointment availability'] },
            { feature: 'Comprehensive services (therapy, meds, case management)', values: ['Providers may have high caseloads'] },
            { feature: 'Serve uninsured and underinsured', values: ['Less choice in therapist (assigned based on availability)'] },
            { feature: 'Crisis services often available', values: ['May not have specialized trauma or OCD therapists'] },
          ]}
          highlightColumn={0}
        />

        <ArticleCallout variant="key-takeaway" title="When CMHCs Are Best">
          <p className="mb-4">CMHCs are ideal if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You have no insurance or can't afford private therapy</li>
            <li>You need comprehensive services (therapy + psychiatry + case management)</li>
            <li>You have Medicaid or Medicare (many CMHCs accept these)</li>
            <li>You need crisis services or intensive support</li>
          </ul>
          <p className="mt-4"><strong>Consider other options if:</strong> You need immediate access (CMHCs often have waitlists) or highly specialized treatment (e.g., intensive OCD therapy).</p>
        </ArticleCallout>

        <StatCard
          stats={[
            { value: 10, suffix: 'M', label: 'Americans served by community mental health centers annually' },
            { value: 60, suffix: '%', label: 'CMHC clients who are uninsured or on Medicaid' },
            { value: 0, suffix: '', label: 'Cost for many clients due to sliding scale' },
          ]}
          source="Psychiatric Services, 2021 & SAMHSA, 2022"
        />

        <QuoteBlock
          quote="I had no insurance and no money for therapy. The community mental health center saved my life. I waited six weeks for an intake, but once I was in, I got therapy, medication, and a case manager who helped me apply for disability. All for free."
          attribution="CMHC Client"
          role="Patient Perspective"
          variant="large"
        />

        <h2 id="alternatives" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Other Free or Low-Cost Options
        </h2>
        <p className="mb-6">
          If your local CMHC has a long waitlist or doesn't meet your needs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Federally Qualified Health Centers (FQHCs):</strong> Primary care clinics that also offer mental health services (find via findahealthcenter.hrsa.gov)</li>
          <li><strong>University training clinics:</strong> Low-cost therapy from supervised grad students</li>
          <li><strong>Open Path Collective:</strong> $30-80/session online or in-person therapy</li>
          <li><strong>NAMI support groups:</strong> Free peer support</li>
          <li><strong>Crisis lines:</strong> 988 Suicide & Crisis Lifeline (free, 24/7)</li>
        </ul>

        <p className="mb-6 mt-6">
          Community mental health centers are a vital safety net. If cost is a barrier, start here — they're designed specifically for people who can't afford private care.
        </p>
      </>
    ),
  },
  {
    id: catId(34),
    slug: 'crisis-services-what-happens-call-988-go-to-er',
    title: 'Crisis Services: What Happens When You Call 988 or Go to the ER',
    description: 'Understand your options during a mental health crisis, including what to expect from 988, crisis teams, and emergency rooms.',
    image: "/images/articles/cat14/cover-034.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Crisis', '988 Lifeline', 'Emergency Care', 'Mental Health Crisis'],
    citations: [
      {
        id: '1',
        text: '988 Suicide & Crisis Lifeline: First year outcomes',
        source: 'JAMA Psychiatry',
        year: '2023',
        link: 'https://doi.org/10.1001/jamapsychiatry.2023.0123',
        tier: 1,
      },
      {
        id: '2',
        text: 'Emergency department use for mental health crises',
        source: 'New England Journal of Medicine',
        year: '2022',
        link: 'https://doi.org/10.1056/NEJMp2202878',
        tier: 1,
      },
      {
        id: '3',
        text: 'Mobile crisis intervention teams: Effectiveness and outcomes',
        source: 'Psychiatric Services',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ps.202000721',
        tier: 1,
      },
      {
        id: '4',
        text: 'Crisis services guide for patients and families',
        source: 'National Alliance on Mental Illness (NAMI)',
        year: '2023',
        link: 'https://www.nami.org/Support-Education/Publications-Reports/Guides/Crisis-Guide',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mental health crises happen. Suicidal thoughts, psychotic episodes, panic attacks, manic episodes — when you or someone you love is in crisis, you need to know your options. The 988 Lifeline, mobile crisis teams, and emergency rooms all provide crisis care, but they work differently <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} />.
          </p>
          <p className="mb-6">
            Here's what to expect from each option so you can make informed decisions in a crisis.
          </p>
        </div>

        <h2 id="what-is-crisis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is a Mental Health Crisis?
        </h2>
        <p className="mb-6">A mental health crisis is any situation where someone's mental state puts them or others at immediate risk. This includes:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Suicidal thoughts with a plan or intent to act</li>
          <li>Psychotic episode (hallucinations, delusions, severe disorganization)</li>
          <li>Severe manic episode (dangerous impulsivity, no sleep for days)</li>
          <li>Violent thoughts or behavior toward others</li>
          <li>Severe panic or dissociation where you can't function or feel unsafe</li>
        </ul>

        <ArticleCallout variant="warning" title="Call 911 If">
          <ul className="list-disc pl-6 space-y-2">
            <li>Someone has attempted suicide or is actively trying to harm themselves</li>
            <li>Someone is violent or threatening imminent harm to others</li>
            <li>Someone has overdosed on medication or substances</li>
            <li>Medical emergency alongside mental health crisis (e.g., seizure, unconsciousness)</li>
          </ul>
        </ArticleCallout>

        <h2 id="option-988" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Option 1: Call or Text 988 (Suicide & Crisis Lifeline)
        </h2>
        <p className="mb-6">
          988 is the national crisis line — like 911 for mental health emergencies. Available 24/7, free, confidential.
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'how-988-works',
              title: 'How 988 Works',
              content: (
                <div>
                  <p className="mb-4"><strong>Call 988:</strong> Talk to a trained crisis counselor</p>
                  <p className="mb-4"><strong>Text 988:</strong> Text-based crisis support</p>
                  <p className="mb-4"><strong>Chat online:</strong> 988lifeline.org</p>
                  <p className="mb-4"><strong>Spanish:</strong> Press 2 for Spanish-language support</p>
                  <p><strong>Veterans:</strong> Press 1 for Veterans Crisis Line</p>
                </div>
              ),
            },
            {
              id: 'what-happens',
              title: 'What Happens When You Call',
              content: (
                <div>
                  <p className="mb-4">A trained counselor will:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Listen without judgment</li>
                    <li>Ask about your current situation and safety</li>
                    <li>Help you create a safety plan</li>
                    <li>Provide resources (local crisis centers, therapists, support groups)</li>
                    <li>Stay on the line as long as you need</li>
                  </ul>
                  <p><strong>Goal:</strong> De-escalate crisis, provide support, connect you to resources — not automatically send police or hospitalize you <Citation id="1" index={1} source="JAMA Psychiatry" year="2023" tier={1} />.</p>
                </div>
              ),
            },
            {
              id: 'will-police-come',
              title: 'Will Police Be Called?',
              content: (
                <div>
                  <p className="mb-4">Usually no. 988 counselors only dispatch emergency services if you're in imminent danger and refuse help (e.g., you say you're about to jump off a bridge and hang up).</p>
                  <p><strong>In most cases:</strong> The call remains confidential. No police, no forced intervention. You're in control.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="mobile-crisis" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Option 2: Mobile Crisis Teams
        </h2>
        <p className="mb-6">
          Some communities have mobile crisis teams — mental health professionals who come to you during a crisis <Citation id="3" index={3} source="Psychiatric Services" year="2021" tier={1} />.
        </p>

        <ComparisonTable
          title="Mobile Crisis Teams"
          columns={['What They Do', 'When to Use']}
          items={[
            { feature: 'Come to your home, school, or location', values: ['Crisis is severe but not life-threatening'] },
            { feature: 'Mental health professionals (not police)', values: ['You need in-person support but not hospitalization'] },
            { feature: 'Assess safety, de-escalate, create plan', values: ["You're overwhelmed but willing to accept help"] },
            { feature: 'Can connect you to immediate services', values: ["You need resources but don't know where to start"] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6 mt-6"><strong>How to access:</strong> Call 988 and ask if mobile crisis is available in your area, or search "[your city] mobile crisis team."</p>

        <h2 id="emergency-room" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Option 3: Go to the Emergency Room
        </h2>
        <p className="mb-6">
          The ER is for acute mental health emergencies when you need immediate medical evaluation or are at high risk <Citation id="2" index={2} source="New England Journal of Medicine" year="2022" tier={1} />.
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Arrival and Triage',
              description: (
                <p>You'll be triaged like any ER patient. Mental health crises are taken seriously, but wait times can be long if not life-threatening.</p>
              ),
            },
            {
              title: 'Medical Clearance',
              description: (
                <p>Doctors rule out medical causes (drug intoxication, head injury, metabolic issues) before psychiatric evaluation.</p>
              ),
            },
            {
              title: 'Psychiatric Evaluation',
              description: (
                <p>A psychiatrist, social worker, or crisis counselor assesses your mental state, suicide risk, and need for hospitalization.</p>
              ),
            },
            {
              title: 'Disposition',
              description: (
                <div>
                  <p className="mb-4"><strong>If safe to go home:</strong> Discharged with crisis plan, referrals, maybe short-term medication</p>
                  <p className="mb-4"><strong>If high risk:</strong> Admitted to psychiatric unit (voluntary or involuntary hold)</p>
                  <p><strong>If intermediate:</strong> May go to crisis stabilization unit for 1-3 days instead of inpatient</p>
                </div>
              ),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway" title="ER Pros and Cons">
          <p className="mb-4"><strong>Pros:</strong></p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Available 24/7</li>
            <li>Medical and psychiatric evaluation</li>
            <li>Can admit you for safety if needed</li>
          </ul>
          <p className="mb-4"><strong>Cons:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Long wait times (4-12+ hours common)</li>
            <li>Chaotic, overstimulating environment</li>
            <li>Expensive (even with insurance)</li>
            <li>Risk of involuntary hold if deemed unsafe</li>
          </ul>
        </ArticleCallout>

        <h2 id="involuntary-hold" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Is an Involuntary Hold?
        </h2>
        <p className="mb-6">
          If you're deemed a danger to yourself or others and refuse voluntary hospitalization, you can be placed on an involuntary psychiatric hold (varies by state: 72-hour hold, 5150 in California, etc.).
        </p>

        <StatCard
          stats={[
            { value: 72, suffix: 'hrs', label: 'Typical maximum involuntary hold without court hearing' },
            { value: 50, suffix: '%', label: 'ER mental health visits result in admission (voluntary or involuntary)' },
            { value: 3, suffix: 'M', label: 'Calls to 988 in first year of operation' },
          ]}
          source="JAMA Psychiatry, 2023 & NEJM, 2022"
        />

        <QuoteBlock
          quote="I called 988 during a really dark moment. I wasn't sure what to expect, but the counselor just listened. She didn't judge, didn't try to fix me. She helped me see I could get through the night. I didn't need the ER — I just needed someone to hear me."
          attribution="988 Caller"
          role="Lived Experience"
          variant="large"
        />

        <h2 id="decision-guide" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Which Option to Choose?
        </h2>

        <ComparisonTable
          title="Crisis Resource Decision Guide"
          columns={['If...', 'Then...']}
          items={[
            { feature: 'Suicidal thoughts but no immediate plan/intent', values: ['Call/text 988'] },
            { feature: 'Severe distress, need to talk, unsure what to do', values: ['Call/text 988'] },
            { feature: 'Crisis at home, need in-person support', values: ['Ask 988 for mobile crisis team'] },
            { feature: 'Actively suicidal with means/plan', values: ['Go to ER or call 911'] },
            { feature: "Psychotic episode, can't think clearly", values: ['Go to ER or call 911'] },
            { feature: 'Violent or harming self/others right now', values: ['Call 911'] },
          ]}
          highlightColumn={1}
        />

        <p className="mb-6 mt-6">Crisis services exist to help you survive the hardest moments. You don't have to face a crisis alone. Reach out — these resources are designed for exactly this <Citation id="4" index={4} source="National Alliance on Mental Illness (NAMI)" year="2023" tier={3} />.</p>
      </>
    ),
  },
  {
    id: catId(35),
    slug: 'psychiatric-hospitalization-what-to-expect-admitted',
    title: 'Psychiatric Hospitalization: What to Expect If You or Someone You Love Is Admitted',
    description: 'Demystify inpatient psychiatric care with this guide to what happens during hospitalization, your rights, and how to prepare.',
    image: "/images/articles/cat14/cover-035.svg",
    category: CATEGORY_THERAPY_NAVIGATION,
    readTime: 9,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Hospitalization', 'Inpatient Care', 'Psychiatric Unit', 'Mental Health'],
    citations: [
      {
        id: '1',
        text: 'Psychiatric hospitalization: Outcomes and patient experience',
        source: 'Psychiatric Services',
        year: '2021',
        link: 'https://doi.org/10.1176/appi.ps.202000654',
        tier: 1,
      },
      {
        id: '2',
        text: 'Voluntary vs. involuntary psychiatric admission',
        source: 'JAMA Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1001/jamapsychiatry.2020.3156',
        tier: 1,
      },
      {
        id: '3',
        text: 'Patient rights in psychiatric facilities',
        source: 'American Psychological Association',
        year: '2022',
        link: 'https://www.apa.org/topics/mental-health/patient-rights',
        tier: 4,
      },
      {
        id: '4',
        text: 'Length of stay and readmission rates in psychiatric hospitals',
        source: 'The Lancet Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1016/S2215-0366(21)00098-2',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Psychiatric hospitalization is scary and often misunderstood. Movies show locked wards, restraints, and loss of control. Reality is different: most psychiatric units are safe, structured environments focused on stabilization <Citation id="1" index={1} source="Psychiatric Services" year="2021" tier={1} />. But not knowing what to expect makes it more frightening.
          </p>
          <p className="mb-6">Here's what actually happens during a psychiatric hospital stay — from admission to discharge.</p>
        </div>

        <h2 id="when-hospitalization" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Is Hospitalization Necessary?
        </h2>
        <p className="mb-6">Inpatient psychiatric care is for acute crises that can't be managed outpatient:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Active suicidal ideation with plan/intent</li>
          <li>Severe psychosis (unable to distinguish reality)</li>
          <li>Manic episode with dangerous behavior</li>
          <li>Severe depression preventing basic self-care</li>
          <li>Medication adjustments requiring close monitoring</li>
          <li>Substance withdrawal requiring medical supervision</li>
        </ul>

        <p className="mb-6"><strong>Goal:</strong> Stabilize in the short term (3-10 days), not long-term treatment. Think of it like intensive care for mental health <Citation id="4" index={4} source="The Lancet Psychiatry" year="2021" tier={1} />.</p>

        <h2 id="voluntary-vs-involuntary" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Voluntary vs. Involuntary Admission
        </h2>

        <ComparisonTable
          title="Types of Admission"
          columns={['Voluntary', 'Involuntary']}
          items={[
            { feature: 'You agree to hospitalization', values: ["You're hospitalized against your will"] },
            { feature: 'You can request discharge (with doctor approval)', values: ['You cannot leave until hold expires or doctor clears you'] },
            { feature: 'More autonomy and rights', values: ['Held for 72 hours (varies by state) for evaluation'] },
            { feature: 'Often better treatment outcomes', values: ['Can be extended via court order if still dangerous'] },
          ]}
          highlightColumn={0}
        />

        <p className="mb-6 mt-6"><strong>Tip:</strong> If possible, choose voluntary admission. You retain more rights and can participate actively in your care <Citation id="2" index={2} source="JAMA Psychiatry" year="2020" tier={1} />.</p>

        <h2 id="admission-process" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Happens During Admission
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Intake Assessment',
              description: (
                <p>A psychiatrist or social worker interviews you about symptoms, history, medications, and immediate safety concerns. This determines your treatment plan.</p>
              ),
            },
            {
              title: 'Search and Confiscation',
              description: (
                <div>
                  <p className="mb-4">For safety, prohibited items are removed:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sharp objects (razors, scissors, nail clippers)</li>
                    <li>Belts, shoelaces, drawstrings (ligature risk)</li>
                    <li>Medications (hospital dispenses all meds)</li>
                    <li>Electronics (phones, laptops — varies by facility)</li>
                  </ul>
                  <p className="mt-4"><strong>You'll get these back at discharge.</strong></p>
                </div>
              ),
            },
            {
              title: 'Vitals and Medical Clearance',
              description: (
                <p>Blood pressure, weight, blood work, urine drug screen. Ensuring you're medically stable.</p>
              ),
            },
            {
              title: 'Room Assignment',
              description: (
                <p>You'll be assigned a room (shared or private, depending on the unit). Rooms are simple: bed, small closet, bathroom (sometimes shared).</p>
              ),
            },
          ]}
        />

        <h2 id="daily-routine" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Daily Routine on a Psychiatric Unit
        </h2>
        <p className="mb-6">Psych units are highly structured. Here's a typical day:</p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'morning',
              title: '7:00 AM — Wake-Up and Vitals',
              content: (<p>Staff take vitals, dispense morning meds. Breakfast in communal dining area.</p>),
            },
            {
              id: 'groups',
              title: '9:00 AM — Group Therapy',
              content: (<p>CBT skills, coping strategies, psychoeducation. Attendance usually required.</p>),
            },
            {
              id: 'doctor-rounds',
              title: '10:00 AM — Doctor Rounds',
              description: (<p>Brief check-in with psychiatrist. You discuss symptoms, medication changes, discharge planning.</p>),
            },
            {
              id: 'afternoon',
              title: 'Afternoon — Activities and Free Time',
              content: (<p>Art therapy, recreation therapy, reading, TV in day room. Some units have outdoor time.</p>),
            },
            {
              id: 'evening',
              title: 'Evening — Dinner, Evening Meds, Wind-Down',
              content: (<p>Evening group or relaxation activities. Lights out around 10-11 PM (varies).</p>),
            },
          ]}
        />

        <ArticleCallout variant="key-takeaway" title="What You Can Expect">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Safety checks:</strong> Staff check on you regularly (every 15-30 min for high-risk patients)</li>
            <li><strong>Visitors:</strong> Visiting hours (usually limited to 1-2 hours/day)</li>
            <li><strong>Phone calls:</strong> Limited phone access (shared unit phone, specific hours)</li>
            <li><strong>Meals:</strong> Provided (cafeteria-style, consider dietary restrictions)</li>
            <li><strong>Clothing:</strong> You wear your own clothes (no drawstrings) or hospital-provided scrubs</li>
          </ul>
        </ArticleCallout>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment During Hospitalization
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Medication management:</strong> Starting, adjusting, or stabilizing psychiatric meds</li>
          <li><strong>Individual therapy:</strong> Brief sessions with social worker or psychologist (not in-depth therapy)</li>
          <li><strong>Group therapy:</strong> Skills-based groups (DBT, CBT, mindfulness)</li>
          <li><strong>Discharge planning:</strong> Connecting you to outpatient care, housing, resources</li>
        </ul>

        <p className="mb-6"><strong>What hospitalization is NOT:</strong> Long-term therapy, luxury retreat, or "cure." It's crisis stabilization so you're safe enough to continue treatment outpatient.</p>

        <h2 id="your-rights" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Your Rights as a Psychiatric Patient
        </h2>
        <p className="mb-6">You retain most civil rights even in a psychiatric hospital <Citation id="3" index={3} source="American Psychological Association" year="2022" tier={4} />:</p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Right to treatment:</strong> Receive appropriate care, not just be warehoused</li>
          <li><strong>Right to refuse treatment:</strong> You can refuse medication (except in emergencies or court-ordered treatment)</li>
          <li><strong>Right to privacy:</strong> Confidentiality applies (with standard exceptions)</li>
          <li><strong>Right to communication:</strong> Make phone calls, send mail (may be monitored)</li>
          <li><strong>Right to appeal involuntary hold:</strong> Request a hearing to challenge detention</li>
        </ul>

        <h2 id="discharge" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Discharge and Aftercare
        </h2>
        <p className="mb-6">Average stay: 5-10 days (varies by condition and insurance). You're discharged when:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>No longer a danger to yourself or others</li>
          <li>Symptoms stabilized (not cured, just manageable)</li>
          <li>Outpatient plan in place</li>
        </ul>

        <p className="mb-6"><strong>Discharge plan includes:</strong></p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Outpatient therapy referral</li>
          <li>Psychiatry follow-up (within 1-2 weeks)</li>
          <li>Medication prescriptions (7-30 day supply)</li>
          <li>Crisis plan and emergency contacts</li>
          <li>Community resources (housing, support groups)</li>
        </ul>

        <StatCard
          stats={[
            { value: 7, suffix: '', label: 'Days average psychiatric hospital stay' },
            { value: 20, suffix: '%', label: 'Readmission rate within 30 days (often due to lack of outpatient follow-up)' },
            { value: 70, suffix: '%', label: 'Patients report hospitalization helped stabilize crisis' },
          ]}
          source="Psychiatric Services, 2021 & The Lancet Psychiatry, 2021"
        />

        <QuoteBlock
          quote="Being hospitalized was terrifying at first. But it saved my life. I was so deep in suicidal ideation I couldn't see a way out. The unit gave me space to breathe, adjust my meds, and connect with outpatient care. It wasn't perfect, but it was what I needed."
          attribution="Former Psychiatric Inpatient"
          role="Lived Experience"
          variant="large"
        />

        <h2 id="supporting-someone" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Supporting Someone Who's Hospitalized
        </h2>

        <ArticleCallout variant="tip" title="How to Help">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Visit:</strong> During visiting hours (call ahead for rules)</li>
            <li><strong>Bring comfort items:</strong> Books, photos, soft clothing without drawstrings (check with unit first)</li>
            <li><strong>Don't judge:</strong> Hospitalization is healthcare, not failure</li>
            <li><strong>Help with discharge plan:</strong> Assist with scheduling outpatient appointments, picking up meds</li>
            <li><strong>Stay connected:</strong> Post-discharge support is critical for preventing readmission</li>
          </ul>
        </ArticleCallout>

        <p className="mb-6 mt-6">Psychiatric hospitalization is intense and disorienting, but it's temporary. It exists to keep people safe through the worst moments — and for many, it's a turning point toward recovery.</p>
      </>
    ),
  },
];
