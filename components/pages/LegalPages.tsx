import React, { useEffect } from 'react';

type LegalType = 'privacy' | 'terms';

interface LegalPageProps {
  type: LegalType;
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const lastUpdated = 'January 15, 2025';

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 border-b border-gray-100 pb-12">
            <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-500 font-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-lg prose-teal max-w-none text-gray-600">
            {type === 'privacy' ? (
                <>
                    <h3>1. Introduction</h3>
                    <p>
                        At Psychage, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website including any other media form, media channel, mobile website, or mobile application related or connected thereto.
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
                        Any health-related data entered into tools like the "Clarity Score" or "Mood Journal" is stored locally on your device or encrypted with industry-standard protocols if an account is created. We do not sell your health data to third parties.
                    </p>
                </>
            ) : (
                <>
                    <h3>1. Agreement to Terms</h3>
                    <p>
                        These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Psychage Health, Inc. ("Company", “we”, “us”, or “our”), concerning your access to and use of the Psychage website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                    </p>

                    <h3>2. Medical Disclaimer</h3>
                    <p className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm italic font-medium">
                        The Site offers health, wellness, and nutritional information and is designed for educational purposes only. You should not rely on this information as a substitute for, nor does it replace, professional medical advice, diagnosis, or treatment. If you have any concerns or questions about your health, you should always consult with a physician or other health-care professional.
                    </p>

                    <h3>3. Intellectual Property Rights</h3>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>

                    <h3>4. User Representations</h3>
                    <p>
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not a minor in the jurisdiction in which you reside.
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;