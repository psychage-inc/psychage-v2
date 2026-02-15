export const navigationConfig = {
    learn: {
        sections: [
            {
                title: 'Topics',
                items: [
                    {
                        id: 'conditions',
                        label: 'Mental Health Conditions',
                        description: 'Anxiety, depression, ADHD...',
                        href: '/learn/conditions',
                        icon: 'brain'
                    },
                    {
                        id: 'wellness',
                        label: 'Wellness & Lifestyle',
                        description: 'Sleep, nutrition, exercise',
                        href: '/learn/wellness',
                        icon: 'leaf'
                    },
                    {
                        id: 'work',
                        label: 'Work & Life',
                        description: 'Burnout, boundaries, growth',
                        href: '/learn/work-life',
                        icon: 'briefcase'
                    },
                    {
                        id: 'treatment',
                        label: 'Treatment & Therapy',
                        description: 'Types of therapy, finding help',
                        href: '/learn/treatment',
                        icon: 'heart'
                    },
                ]
            }
        ],
        quickActions: [
            { label: 'Browse All Articles', href: '/learn' },
            { label: 'Most Popular', href: '/learn?sort=popular' },
            { label: 'Recently Added', href: '/learn?sort=recent' },
        ]
    },
    tools: {
        sections: [
            {
                title: 'Assessments',
                items: [
                    {
                        id: 'clarity',
                        label: 'Clarity Score',
                        description: 'Cognitive assessment',
                        href: '/tools/clarity-score',
                        icon: 'chart',
                        cta: 'Take Assessment'
                    }
                ]
            },
            {
                title: 'Daily Tools',
                items: [
                    {
                        id: 'mood',
                        label: 'Mood Journal',
                        description: 'Track patterns & triggers',
                        href: '/tools/mood-journal',
                        icon: 'edit'
                    },
                    {
                        id: 'sleep',
                        label: 'Sleep Architect',
                        description: 'Optimize your sleep',
                        href: '/tools/sleep-architect',
                        icon: 'moon'
                    }
                ]
            }
        ],

        quickActions: [
            { label: 'All Tools', href: '/tools' },
            { label: 'Clarity Score', href: '/tools/clarity-score' },
            { label: 'Mood Journal', href: '/tools/mood-journal' },
        ]
    }
};
