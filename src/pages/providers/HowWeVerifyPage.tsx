import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { TrustBadge } from '@/components/providers/shared/TrustBadge';

const HowWeVerifyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="How We Verify Providers | Psychage"
        description="Learn how Psychage verifies provider credentials, what NPI verification means, and how to interpret trust badges in our mental health provider directory."
        canonical="https://psychage.com/how-we-verify"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Page Header */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-4">
          How We Verify Providers
        </h1>
        <p className="text-lg text-text-secondary mb-12 leading-relaxed">
          We believe finding the right mental health support starts with trust.
          Here&rsquo;s how we work to earn yours.
        </p>

        {/* Section 1: Where Our Data Comes From */}
        <section id="data-source" className="mb-4">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            Where Our Data Comes From
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              You might be wondering: where do 400,000+ provider listings come from?
            </p>
            <p>
              The answer starts with something called the NPPES — the National Plan
              and Provider Enumeration System. It&rsquo;s a federal database run by the
              Centers for Medicare &amp; Medicaid Services (the same agency that
              oversees Medicare and Medicaid). Every healthcare provider who bills
              insurance in the United States is required to register for a unique
              10-digit National Provider Identifier, or NPI.
            </p>
            <p>
              We pull mental health provider records from this registry —
              psychiatrists, psychologists, licensed counselors, social workers,
              therapists, and psychiatric nurses — and create profiles with the
              publicly available information: names, credentials, practice addresses,
              and professional classifications.
            </p>
            <p>
              Think of it this way: the NPPES is like the phonebook of U.S. healthcare
              providers. We&rsquo;ve taken the mental health section and made it searchable,
              filterable, and more useful.
            </p>
            <p className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
              <strong>One important thing to know:</strong> Having an NPI means a
              provider registered with the federal government — it doesn&rsquo;t tell you
              whether their state license is current right now, or whether they&rsquo;ve had
              any disciplinary actions. We always recommend double-checking with your
              state&rsquo;s licensing board before starting care.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Section 2: What "Unclaimed" Means */}
        <section id="unclaimed" className="mb-4">
          <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary mb-4">
            What &ldquo;Unclaimed&rdquo; Means
            <TrustBadge type="unclaimed" interactive={false} />
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              When you see <strong>Unclaimed</strong> on a provider&rsquo;s card, it means
              their profile was created from federal registry data — they haven&rsquo;t
              personally set up or updated their information on Psychage yet.
            </p>
            <div>
              <p className="font-semibold text-text-primary mb-2">What you&rsquo;ll see:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Their name and credentials (as reported to the government)</li>
                <li>Practice address from federal records</li>
                <li>Professional classification (like &ldquo;Clinical Social Worker&rdquo; or &ldquo;Psychiatry&rdquo;)</li>
                <li>Their NPI number, which you can use to look them up on other databases too</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-2">What you won&rsquo;t see:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A personal bio or description of their approach</li>
                <li>Which insurance they currently accept</li>
                <li>Their specific specialties or areas of focus</li>
                <li>Whether they&rsquo;re currently accepting new patients</li>
              </ul>
            </div>
            <p>
              These profiles have less detail because the information comes from a
              registry, not from the provider themselves. It&rsquo;s real data from a
              legitimate source — just not the complete picture.
            </p>
            <p className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/50 rounded-xl p-4 text-sm text-teal-800 dark:text-teal-300">
              <strong>Are you this provider?</strong> If you see your listing and want
              to add your specialties, insurance, and a personal bio, you can{' '}
              <Link to="/for-providers/claim" className="underline font-medium">
                claim your profile
              </Link>{' '}
              and make it yours.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Section 3: What "Claimed" Means */}
        <section id="claimed" className="mb-4">
          <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary mb-4">
            What &ldquo;Claimed&rdquo; Means
            <TrustBadge type="claimed" interactive={false} />
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              A <strong>Claimed</strong> profile means the provider has found their
              listing on Psychage and said, &ldquo;That&rsquo;s me — let me take it from here.&rdquo;
            </p>
            <div>
              <p className="font-semibold text-text-primary mb-2">Here&rsquo;s what they did:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Created a Psychage account</li>
                <li>Found their existing listing in our directory</li>
                <li>
                  Confirmed their identity by entering their NPI number (we check it
                  against the federal registry in real time)
                </li>
              </ol>
            </div>
            <p>
              Once they&rsquo;ve claimed their profile, they can add all the things that
              help you make a better decision: a personal bio, the insurance plans they
              accept, their treatment specialties, languages they speak, and whether
              they&rsquo;re taking new patients.
            </p>
            <p>
              A Claimed profile tells you something important: this provider cares
              enough about their online presence to actively manage it. That said,
              &ldquo;Claimed&rdquo; doesn&rsquo;t mean we&rsquo;ve independently verified their license beyond
              the NPI check — that happens at the Verified level.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Section 4: What "Verified" Means */}
        <section id="verified" className="mb-4">
          <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary mb-4">
            What &ldquo;Verified&rdquo; Means
            <TrustBadge type="verified" interactive={false} />
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              <strong>Verified</strong> is our highest trust level. When you see this
              badge, it means:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Their NPI checks out.</strong> We&rsquo;ve confirmed their National
                Provider Identifier against the federal registry.
              </li>
              <li>
                <strong>We&rsquo;ve reviewed their profile.</strong> The Psychage team has
                looked at their submitted credentials, practice information, and
                profile content.
              </li>
              <li>
                <strong>They passed our review.</strong> Everything checked out, and
                we&rsquo;ve given them our stamp of approval.
              </li>
            </ol>
            <p>
              Verified providers have the most complete and reliable profiles in our
              directory. They&rsquo;ve gone through our review process, and their information
              has been independently confirmed.
            </p>
            <p className="bg-surface border border-border rounded-xl p-4 text-sm">
              <strong>A note on timing:</strong> We verify information as of the review
              date (shown on each provider&rsquo;s profile). We don&rsquo;t monitor every license
              across all 50 states in real time — if something changes for a provider
              after their last verification, there might be a short delay before
              it&rsquo;s reflected. That&rsquo;s one reason we always recommend confirming details
              directly with the provider.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Section 5: What "Featured" Means */}
        <section id="featured" className="mb-4">
          <h2 className="flex items-center gap-3 text-2xl font-display font-bold text-text-primary mb-4">
            What &ldquo;Featured&rdquo; Means
            <TrustBadge type="featured" interactive={false} />
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Providers with a <strong>Featured</strong> badge have a premium
              subscription with Psychage. We want to be upfront about what that means.
            </p>
            <div>
              <p className="font-semibold text-text-primary mb-2">
                What Featured providers get:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  They appear higher in search results when you&rsquo;re browsing with the
                  default sort
                </li>
                <li>
                  They can write longer bios and upload more practice photos
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-text-primary mb-2">
                What Featured does NOT mean:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  It doesn&rsquo;t change their verification level. A Featured provider can
                  be Verified, Claimed, or Unclaimed.
                </li>
                <li>
                  It doesn&rsquo;t mean we endorse them more than other providers.
                </li>
                <li>
                  It doesn&rsquo;t affect how we review or verify their credentials.
                </li>
              </ul>
            </div>
            <p>
              Featured placement is a paid service — it&rsquo;s how providers support the
              platform while reaching more potential patients. We believe in being
              transparent about this: when you see &ldquo;Featured,&rdquo; you know there&rsquo;s a
              commercial relationship involved.
            </p>
            <p className="bg-surface border border-border rounded-xl p-4 text-sm">
              <strong>Want to see results without premium sorting?</strong> Switch to
              &ldquo;Name (A-Z)&rdquo; in the sort dropdown to remove the Featured boost.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Bridge sentence */}
        <p className="text-text-secondary italic mb-8">
          We want to be upfront about our limitations.
        </p>

        {/* Section 6: What We Can't Verify — Variant A (clinical) */}
        <section id="limitations" className="mb-4">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            What We Can&rsquo;t Verify
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Psychage makes reasonable efforts to ensure the accuracy of provider
              information but cannot guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Current licensure status.</strong> Licensing is managed by
                individual state boards. A provider&rsquo;s license may lapse, be
                restricted, or be revoked after their last verification on Psychage. We
                recommend checking your state&rsquo;s licensing board directly.
              </li>
              <li>
                <strong>Insurance acceptance.</strong> Insurance networks change
                frequently. Even if a provider lists an insurance plan, confirm coverage
                directly with the provider and your insurer before scheduling.
              </li>
              <li>
                <strong>Clinical outcomes.</strong> Psychage does not evaluate or endorse
                any provider&rsquo;s clinical methods, treatment effectiveness, or patient
                outcomes.
              </li>
              <li>
                <strong>Availability.</strong> Providers may stop accepting new patients
                or change their practice hours without updating their Psychage profile.
              </li>
            </ul>
            <p>
              For the most current information, contact the provider directly using the
              contact information on their profile.
            </p>
          </div>
        </section>

        <hr className="border-border my-10" />

        {/* Section 7: See Something Wrong? — Variant B (warm) */}
        <section id="report" className="mb-4">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            See Something Wrong?
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Spotted something that doesn&rsquo;t look right? We genuinely want to hear
              about it. Every report helps us keep this directory accurate and
              trustworthy.
            </p>
            <div className="bg-surface border border-border rounded-xl p-6">
              <p className="mb-2">
                <strong>Drop us a line:</strong>{' '}
                <a
                  href="mailto:info@psychage.com?subject=Provider Profile Concern"
                  className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
                >
                  info@psychage.com
                </a>
              </p>
              <p className="text-sm">
                Tell us which provider, what looks wrong, and anything else that might
                help. We read every report and take action.
              </p>
            </div>
            <p>
              If you&rsquo;re a provider and your own information is off, the fastest fix is
              to{' '}
              <Link
                to="/for-providers/claim"
                className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
              >
                claim your profile
              </Link>{' '}
              and update it yourself.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowWeVerifyPage;
