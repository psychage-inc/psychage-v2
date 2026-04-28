import React, { useEffect } from 'react';
import SEO from '../SEO';

type LegalType = 'privacy' | 'terms' | 'accessibility';

interface LegalPageProps {
    type: LegalType;
}

const TITLES: Record<LegalType, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    accessibility: 'Accessibility Statement',
};

const DESCRIPTIONS: Record<LegalType, string> = {
    privacy: 'Read our Privacy Policy to understand how we operate and protect your data.',
    terms: 'Read our Terms of Service to understand how we operate and protect your data.',
    accessibility: 'Psychage is committed to digital accessibility. Read about our WCAG 2.1 AA compliance, known limitations, and how to contact us.',
};

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const title = TITLES[type];
    const description = DESCRIPTIONS[type];
    const lastUpdated = 'April 28, 2026';

    return (
        <div className="min-h-screen bg-surface pt-28 pb-20 px-6">
            <SEO
                title={`${title} - Psychage`}
                description={description}
                canonical={`https://psychage.com/legal/${type === 'accessibility' ? 'accessibility' : type}`}
            />

            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-16 border-b border-border pb-12">
                    <h1 className="font-display font-bold text-4xl text-text-primary mb-4">{title}</h1>
                    <p className="text-text-tertiary font-medium">Last updated: {lastUpdated}</p>
                </div>

                <div className="prose prose-lg prose-teal max-w-none text-text-secondary">
                    {type === 'privacy' && (
                        <>
                            <h3>1. Introduction</h3>
                            <p>
                                At Psychage, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website including any other media form, media channel, mobile website, or mobile application related or connected thereto.
                            </p>

                            <h3>2. Collection of Your Information</h3>
                            <p>
                                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                            </p>
                            <ul>
                                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                            </ul>

                            <h3>3. Use of Your Information</h3>
                            <p>
                                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                            </p>
                            <ul>
                                <li>Create and manage your account.</li>
                                <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                                <li>Email you regarding your account or order.</li>
                                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                            </ul>

                            <h3>4. Health Data Privacy</h3>
                            <p>
                                Any health-related data entered into tools like the &ldquo;Clarity Score&rdquo; or &ldquo;Mood Journal&rdquo; is stored locally on your device or encrypted with industry-standard protocols if an account is created. We do not sell your health data to third parties.
                            </p>

                            <h3 id="cookies">5. Cookies & Local Storage</h3>
                            <p>
                                Psychage uses a small set of strictly-necessary local storage entries to keep you signed in and remember your tool preferences (e.g., your draft Mood Journal entry, your Clarity Journal progress). These are stored on your device and are not shared with third parties.
                            </p>
                            <p>
                                We use <strong>Plausible Analytics</strong>, a privacy-first, cookie-free analytics service, to understand which pages and tools are useful to our community. Plausible does not set cookies, does not track you across sites, and does not collect personally identifiable information.
                            </p>
                            <p>
                                If you create an account, our authentication provider (Supabase) sets a session cookie or local-storage token strictly to keep you signed in. You can clear it at any time by signing out or clearing your browser&rsquo;s site data.
                            </p>
                            <p>
                                We do not use advertising, retargeting, or social-media tracking cookies.
                            </p>
                        </>
                    )}

                    {type === 'terms' && (
                        <>
                            <h3>1. Agreement to Terms</h3>
                            <p>
                                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) and Psychage Health, Inc. (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), concerning your access to and use of the Psychage website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &ldquo;Site&rdquo;).
                            </p>

                            <h3>2. Medical Disclaimer</h3>
                            <p className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm italic font-medium">
                                The Site offers health, wellness, and nutritional information and is designed for educational purposes only. You should not rely on this information as a substitute for, nor does it replace, professional medical advice, diagnosis, or treatment. If you have any concerns or questions about your health, you should always consult with a physician or other health-care professional.
                            </p>

                            <h3>3. Intellectual Property Rights</h3>
                            <p>
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &ldquo;Content&rdquo;) and the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                            </p>

                            <h3>4. User Representations</h3>
                            <p>
                                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside.
                            </p>
                        </>
                    )}

                    {type === 'accessibility' && (
                        <>
                            <h3>1. Our Commitment</h3>
                            <p>
                                Psychage is committed to providing a digital experience that is accessible to people of all abilities. Mental health information should be reachable by everyone, regardless of how they navigate the web.
                            </p>

                            <h3>2. Conformance Target</h3>
                            <p>
                                We design and build to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>. This standard covers a wide range of recommendations for making web content accessible to people with visual, auditory, motor, cognitive, and neurological differences.
                            </p>

                            <h3>3. What We Do</h3>
                            <ul>
                                <li>Semantic HTML and ARIA labels on interactive elements.</li>
                                <li>Keyboard navigation for every interactive surface, with visible focus indicators.</li>
                                <li>Color contrast that meets 4.5:1 for body text and 3:1 for large text and interactive elements.</li>
                                <li>Respect for the operating-system &ldquo;reduce motion&rdquo; preference; animations are minimized when this is set.</li>
                                <li>Screen-reader-compatible navigation, search, and tool flows.</li>
                                <li>Resizable text without loss of content or function up to 200% zoom.</li>
                            </ul>

                            <h3>4. Known Limitations</h3>
                            <p>
                                Some areas of the Site are still being polished for full WCAG 2.1 AA conformance. Where we know of a gap, we are working on it. If you encounter a barrier that is not listed here, please tell us so we can prioritize it.
                            </p>

                            <h3>5. Crisis Resources</h3>
                            <p>
                                Crisis resources at <a href="/crisis">/crisis</a> are kept simple and skimmable on purpose: large tap targets, no animations, no required interactions before reaching a phone number or text line. They are reachable from every page footer and from a dedicated nav link.
                            </p>

                            <h3>6. Contact</h3>
                            <p>
                                If something on Psychage is not working with your assistive technology, or you cannot access information you need, please contact us at <a href="mailto:accessibility@psychage.com">accessibility@psychage.com</a> or via our <a href="/contact">contact form</a>. We aim to respond within 5 business days.
                            </p>

                            <h3>7. Formal Complaints</h3>
                            <p>
                                If you are unsatisfied with our response to an accessibility concern, you may also file a complaint with the relevant disability-rights body in your jurisdiction (for example, the U.S. Department of Justice ADA hotline, or your country&rsquo;s equivalent regulator).
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
