import { Metadata } from 'next';
export const dynamic = 'force-dynamic';

import AssessmentFlow from '@/components/clarity-score/AssessmentFlow';

export const metadata: Metadata = {
    title: 'Assess | Clarity Score',
    description: 'Complete your mental wellness assessment.',
};

export default function AssessPage() {
    return <AssessmentFlow />;
}
