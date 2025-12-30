import React from 'react';
import { Article } from '../types';
import { categories } from './categories';
import { Lightbulb, Quote } from 'lucide-react';
import Citation from '../components/article/Citation';

// Helper to get category by ID safely
const getCat = (id: string) => categories.find(c => c.id === id) || categories[0];

export const articles: Article[] = [
  {
    id: 1,
    slug: "understanding-anxiety-guide",
    title: "Understanding Anxiety: A Complete Guide",
    description: "Learn about anxiety symptoms, causes, and evidence-based coping strategies that can help you regain control.",
    image: "/images/articles/cover-anxiety.svg",
    category: getCat('anxiety'),
    readTime: 8,
    publishedAt: "2025-01-15",
    views: 12500,
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    reviewedBy: {
      id: "clinical-board",
      name: "Clinical Review Board",
      role: "Medical Review",
      image: "/images/authors/author-team.svg"
    },
    tags: ["Mental Health", "Anxiety", "Wellness", "Therapy"],
    citations: [
      { id: "1", text: "Understanding Anxiety Disorders", source: "American Psychological Association", year: "2024", link: "https://www.apa.org/topics/anxiety" },
      { id: "2", text: "Anxiety Symptoms and Treatments", source: "National Institute of Mental Health", year: "2023", link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders" },
      { id: "3", text: "Efficacy of CBT in treating GAD", source: "Journal of Clinical Psychology", year: "2024" }
    ],
    content: (
      <>
        <div id="what-is-anxiety" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Anxiety is more than just feeling stressed or worried. It is a natural body response designed to keep us safe, but when it becomes chronic or disproportionate to the situation, it can interfere with daily life <Citation id="1" index={1} source="APA" year="2024" />.
          </p>
          <p className="mb-6">
            In this guide, we'll explore the biological mechanisms of anxiety, identify common triggers, and provide actionable, evidence-based strategies to manage symptoms effectively.
          </p>
        </div>

        <h2 id="common-symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Symptoms
        </h2>
        <p className="mb-6">
          Anxiety manifests differently for everyone, but it typically affects both the mind and the body. Recognizing these signs is the first step toward management <Citation id="2" index={2} source="NIMH" year="2023" />.
        </p>

        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-6 border border-teal-100 dark:border-teal-800">
            <h3 className="font-bold text-teal-800 dark:text-teal-200 mb-4 flex items-center gap-2">
              Physical Signs
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-teal-900/80 dark:text-teal-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                Rapid heart rate or palpitations
              </li>
              <li className="flex items-start gap-2 text-teal-900/80 dark:text-teal-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                Shortness of breath or chest tightness
              </li>
              <li className="flex items-start gap-2 text-teal-900/80 dark:text-teal-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                Muscle tension, especially in shoulders
              </li>
              <li className="flex items-start gap-2 text-teal-900/80 dark:text-teal-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                Digestive issues or nausea
              </li>
            </ul>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
            <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
              Psychological Signs
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-indigo-900/80 dark:text-indigo-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Excessive, uncontrollable worry
              </li>
              <li className="flex items-start gap-2 text-indigo-900/80 dark:text-indigo-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Feeling restless or "on edge"
              </li>
              <li className="flex items-start gap-2 text-indigo-900/80 dark:text-indigo-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Difficulty concentrating
              </li>
              <li className="flex items-start gap-2 text-indigo-900/80 dark:text-indigo-100/80 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                Irritability or sleep disturbances
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-l-4 border-amber-400 flex gap-4">
          <div className="shrink-0 text-amber-500 mt-1">
            <Lightbulb size={24} />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Key Takeaway</h4>
            <p className="text-amber-800 dark:text-amber-200/80 text-sm leading-relaxed">
              Physical symptoms often precede mental realization. If you notice your heart racing or palms sweating, your body might be signaling anxiety before your brain consciously registers worry.
            </p>
          </div>
        </div>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
          Occasional anxiety is a normal part of life. However, you should consider speaking with a professional if:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li>Your anxiety interferes with your ability to work, study, or socialize.</li>
          <li>You feel unable to control your fear or worry.</li>
          <li>You develop unhealthy coping mechanisms, such as substance use.</li>
          <li>You experience panic attacks (sudden episodes of intense fear).</li>
        </ul>

        <figure className="my-12">
          <blockquote className="relative p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-teal-500 italic text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-display">
            <Quote className="absolute top-4 left-4 text-teal-200 dark:text-teal-800 w-8 h-8 -z-10 opacity-50" />
            "The goal of therapy isn't to eliminate anxiety entirely, but to reduce it to a manageable level where it no longer dictates your choices."
          </blockquote>
          <figcaption className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium text-right">— Dr. Emily Carter, Clinical Psychologist</figcaption>
        </figure>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <p className="mb-6">
          Anxiety is highly treatable. The most effective approaches often combine therapy, lifestyle changes, and sometimes medication.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Cognitive Behavioral Therapy (CBT)</h3>
        <p className="mb-6">
          CBT is the gold standard for treating anxiety disorders. It helps you identify and challenge negative thought patterns ("cognitive distortions") that fuel anxiety and replace them with more realistic perspectives <Citation id="3" index={3} source="JCP" year="2024" />.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Mindfulness and Grounding</h3>
        <p className="mb-6">
          Techniques like the <strong>5-4-3-2-1 method</strong> help anchor you in the present moment, disrupting the cycle of worry about the future.
        </p>

        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Try It: The 5-4-3-2-1 Grounding Technique</h4>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">Acknowledge these things around you:</p>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li><strong>5</strong> things you can see</li>
            <li><strong>4</strong> things you can touch</li>
            <li><strong>3</strong> things you can hear</li>
            <li><strong>2</strong> things you can smell</li>
            <li><strong>1</strong> thing you can taste</li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: 2,
    slug: "science-of-sleep",
    title: "The Science of Sleep and Mental Health",
    description: "Discover the bidirectional relationship between sleep quality and emotional well-being, and how to improve both.",
    image: "/images/articles/cover-sleep.svg",
    category: getCat('wellness'),
    readTime: 6,
    publishedAt: "2025-01-10",
    views: 9800,
    author: {
      id: "dr-james-wilson",
      name: "Dr. James Wilson",
      role: "Sleep Specialist",
      image: "/images/authors/author-male-2.svg"
    },
    tags: ["Sleep", "Wellness", "Health"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Sleep is not just a passive state of rest; it is an active, vital process that restores the body and mind. The link between sleep and mental health is bidirectional: poor sleep can worsen mental health conditions, and mental health challenges can disrupt sleep.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The Architecture of Sleep</h2>
        <p className="mb-6">
          Understanding sleep cycles is key to optimizing rest. A typical night consists of 4-6 cycles, each lasting about 90 minutes, moving between NREM (Non-Rapid Eye Movement) and REM (Rapid Eye Movement) sleep.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>Stage 1 (Light Sleep):</strong> The transition from wakefulness to sleep.</li>
          <li><strong>Stage 2 (Deep Relaxation):</strong> Body temperature drops, and heart rate slows.</li>
          <li><strong>Stage 3 (Deep Sleep):</strong> Critical for physical repair and immune function.</li>
          <li><strong>REM Sleep:</strong> Essential for emotional regulation, memory, and learning.</li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Sleep Hygiene Basics</h2>
        <p className="mb-6">
          Improving sleep often starts with "sleep hygiene"—the habits and environment that set the stage for rest.
        </p>
        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Quick Tips for Better Sleep</h4>
          <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
            <li>• Stick to a consistent sleep schedule, even on weekends.</li>
            <li>• Keep your bedroom cool, dark, and quiet.</li>
            <li>• Avoid screens (blue light) at least an hour before bed.</li>
            <li>• Limit caffeine and alcohol intake, especially in the evening.</li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: 3,
    slug: "mindfulness-for-busy-professionals",
    title: "Mindfulness Techniques for Busy Professionals",
    description: "Simple, effective mindfulness exercises you can practice at your desk to reduce stress and boost focus.",
    image: "/images/articles/cover-mindfulness.svg",
    category: getCat('mindfulness'),
    readTime: 5,
    publishedAt: "2025-01-05",
    views: 15000,
    author: {
      id: "maya-patel",
      name: "Maya Patel",
      role: "Mindfulness Coach",
      image: "/images/authors/author-female-3.svg"
    },
    tags: ["Mindfulness", "Stress", "Work"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          In a world that glorifies "hustle culture," finding moments of stillness can feel impossible. However, mindfulness doesn't require a 30-minute meditation session on a cushion. It can be integrated seamlessly into your busy workday.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Micro-Mindfulness</h2>
        <p className="mb-6">
          Micro-mindfulness involves taking short, intentional pauses throughout the day to reset your nervous system. These practices take less than a minute but can significantly reduce cumulative stress.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. The "Doorway" Trigger</h3>
        <p className="mb-6">
          Every time you walk through a doorway (or open a new browser tab), take one deep, conscious breath. Use this physical transition as a mental reset button.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Sensory Check-in</h3>
        <p className="mb-6">
          While waiting for a meeting to start or a file to download, tune into your senses. Feel your feet on the floor, the temperature of the air, or the hum of your computer. This grounds you in the present moment.
        </p>

        <div className="my-10 p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl border-l-4 border-teal-400">
          <h4 className="font-bold text-teal-900 dark:text-teal-100 mb-1">Why it works</h4>
          <p className="text-teal-800 dark:text-teal-200/80 text-sm leading-relaxed">
            These brief pauses interrupt the "fight or flight" response, lowering cortisol levels and allowing your prefrontal cortex (the logical brain) to stay online.
          </p>
        </div>
      </>
    )
  },
  {
    id: 4,
    slug: "identifying-burnout",
    title: "Identifying Burnout Before It's Too Late",
    description: "Key warning signs of professional burnout and actionable steps to restore your work-life balance.",
    image: "/images/articles/cover-burnout.svg",
    category: getCat('workplace'),
    readTime: 7,
    publishedAt: "2024-12-28",
    views: 11200,
    author: {
      id: "david-kim",
      name: "David Kim",
      role: "Organizational Psychologist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Burnout", "Workplace", "Mental Health"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Burnout is not just stress; it is a state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress. It occurs when you feel overwhelmed, emotionally drained, and unable to meet constant demands.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The Three Dimensions of Burnout</h2>
        <p className="mb-6">
          Psychologists define burnout by three main characteristics:
        </p>
        <ul className="list-disc list-inside space-y-4 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li>
            <strong>Exhaustion:</strong> Feeling completely drained, unable to cope, and tired even after sleep.
          </li>
          <li>
            <strong>Cynicism (Depersonalization):</strong> Feeling detached from your job, negative towards colleagues or clients, and generally disillusioned.
          </li>
          <li>
            <strong>Inefficacy:</strong> Feeling like you can't accomplish anything, lack of achievement, and loss of confidence in your abilities.
          </li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Recovery Strategies</h2>
        <p className="mb-6">
          Recovering from burnout requires a multi-faceted approach. It's not just about taking a vacation; it's about structural changes to your relationship with work.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Re-evaluate Boundaries</h3>
        <p className="mb-6">
          Learn to say "no" to non-essential tasks. Turn off notifications after work hours. Protect your personal time fiercely.
        </p>
      </>
    )
  },
  {
    id: 5,
    slug: "cbt-explained",
    title: "Cognitive Behavioral Therapy (CBT) Explained",
    description: "An overview of how CBT works to change negative thought patterns and why it's the gold standard for therapy.",
    image: "/images/articles/cover-cbt.svg",
    category: getCat('therapy'),
    readTime: 10,
    publishedAt: "2024-12-20",
    views: 8500,
    author: {
      id: "dr-sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["CBT", "Therapy", "Psychology"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Cognitive Behavioral Therapy (CBT) is a form of psychological treatment that has been demonstrated to be effective for a range of problems including depression, anxiety disorders, alcohol and drug use problems, marital problems, eating disorders, and severe mental illness.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The Core Concept</h2>
        <p className="mb-6">
          CBT is based on the concept that your thoughts, feelings, and physical sensations are interconnected, and that negative thoughts and feelings can trap you in a vicious cycle.
        </p>

        <div className="my-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <p className="font-display text-2xl font-bold text-gray-800 dark:text-white mb-4">Situation → Thought → Emotion → Behavior</p>
          <p className="text-gray-600 dark:text-gray-400">CBT intervenes at the "Thought" stage to change the downstream Emotion and Behavior.</p>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Common Cognitive Distortions</h2>
        <p className="mb-6">
          CBT helps you identify "cognitive distortions"—irrational thought patterns that fuel anxiety and depression.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>All-or-Nothing Thinking:</strong> Seeing things in black and white categories.</li>
          <li><strong>Catastrophizing:</strong> Expecting the worst-case scenario to happen.</li>
          <li><strong>Personalization:</strong> Believing that everything others do or say is some kind of direct, personal reaction to you.</li>
        </ul>
      </>
    )
  },
  {
    id: 6,
    slug: "building-resilience",
    title: "Building Resilience in Difficult Times",
    description: "Psychological strategies to help you bounce back from adversity and grow stronger through challenges.",
    image: "/images/articles/cover-resilience.svg",
    category: getCat('resilience'),
    readTime: 6,
    publishedAt: "2024-12-15",
    views: 18000,
    author: {
      id: "elena-rodriguez",
      name: "Elena Rodriguez",
      role: "Life Coach",
      image: "/images/authors/author-female-2.svg"
    },
    tags: ["Resilience", "Growth", "Self-Improvement"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Resilience is not a fixed trait that you either have or don't have. It's a set of behaviors, thoughts, and actions that can be learned and developed by anyone. It's the ability to bounce back from adversity, trauma, tragedy, threats, or significant sources of stress.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Building Your Resilience Muscle</h2>
        <p className="mb-6">
          Like building physical muscle, building resilience takes practice and consistency. Here are key strategies to cultivate it.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Accept Change</h3>
        <p className="mb-6">
          Accept that change is a part of living. Certain goals may no longer be attainable as a result of adverse situations. Accepting circumstances that cannot be changed can help you focus on circumstances that you can alter.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Maintain Perspective</h3>
        <p className="mb-6">
          Even when facing very painful events, try to consider the stressful situation in a broader context and keep a long-term perspective. Avoid blowing the event out of proportion.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Take Decisive Actions</h3>
        <p className="mb-6">
          Act on adverse situations as much as you can. Take decisive actions, rather than detaching completely from problems and stresses and wishing they would just go away.
        </p>
      </>
    )
  },
  // --- NEW MOCK ARTICLES ---
  {
    id: 7,
    slug: "social-anxiety-tips",
    title: "Overcoming Social Anxiety: Small Steps",
    description: "Practical tips for navigating social situations when you feel overwhelmed or self-conscious.",
    image: "/images/articles/cover-social.svg",
    category: getCat('anxiety'),
    readTime: 5,
    publishedAt: "2024-12-10",
    views: 21000,
    author: { id: "sarah-chen", name: "Dr. Sarah Chen", role: "Licensed Therapist", image: "/images/authors/author-female-1.svg" },
    tags: ["Anxiety", "Social", "Self-Help"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Social anxiety is more than just shyness. It's an intense fear of being watched and judged by others. This fear can affect work, school, and other daily activities. But it is treatable, and small steps can lead to big changes.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Challenge Negative Thoughts</h2>
        <p className="mb-6">
          Social anxiety is often fueled by negative predictions. "They'll think I'm stupid," or "I'll spill my drink and everyone will laugh."
        </p>
        <p className="mb-6">
          <strong>Try this:</strong> When you catch yourself predicting a disaster, ask yourself:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li>"What is the evidence for this thought?"</li>
          <li>"How many times has this actually happened before?"</li>
          <li>"If the worst did happen, could I cope?"</li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Practice "External Focusing"</h2>
        <p className="mb-6">
          When we're anxious, we tend to focus inward: on our racing heart, our shaky hands, or our thoughts. This makes us more self-conscious.
        </p>
        <p className="mb-6">
          Instead, try to focus <strong>outward</strong>. Look at the person you're talking to. Listen to what they are saying. Notice the color of the walls. By shifting your attention away from yourself, you can reduce the intensity of your anxiety.
        </p>
      </>
    )
  },
  {
    id: 8,
    slug: "depression-vs-sadness",
    title: "Depression vs. Sadness: Knowing the Difference",
    description: "How to distinguish between normal human emotion and clinical depression that requires treatment.",
    image: "/images/articles/cover-depression.svg",
    category: getCat('depression'),
    readTime: 7,
    publishedAt: "2024-12-05",
    views: 10500,
    author: { id: "clinical-board", name: "Clinical Review Board", role: "Medical Review", image: "/images/authors/author-team.svg" },
    tags: ["Depression", "Mental Health", "Education"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Sadness is a normal human emotion that everyone experiences. It's usually triggered by a specific event, like a loss or disappointment. Depression, however, is a clinical condition that is more persistent and pervasive.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Key Differences</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">Sadness</th>
                <th className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">Depression</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Usually passes with time</td>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Persists for at least 2 weeks</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Related to specific events</td>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Can occur without a clear trigger</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Mood fluctuates</td>
                <td className="p-4 border-b border-gray-100 dark:border-gray-800">Mood is constantly low</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">When to Seek Help</h2>
        <p className="mb-6">
          If your low mood interferes with your daily life—your ability to work, sleep, eat, or enjoy things you used to love—it's time to speak with a professional. Depression is highly treatable with therapy, medication, or a combination of both.
        </p>
      </>
    )
  },
  {
    id: 9,
    slug: "morning-routine-wellness",
    title: "The Perfect Morning Routine for Mental Wellness",
    description: "Start your day with intention using this science-backed morning routine designed to boost mood.",
    image: "/images/articles/cover-morning.svg",
    category: getCat('wellness'),
    readTime: 4,
    publishedAt: "2024-12-01",
    views: 25000,
    author: { id: "elena-rodriguez", name: "Elena Rodriguez", role: "Life Coach", image: "/images/authors/author-female-2.svg" },
    tags: ["Wellness", "Routine", "Lifestyle"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          How you start your morning often sets the tone for the rest of your day. A chaotic morning can lead to a stressful day, while a calm, intentional morning can build resilience against stress.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The "SAVERS" Method</h2>
        <p className="mb-6">
          Popularized by Hal Elrod, this framework provides a structured way to start your day with purpose:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>S - Silence:</strong> Meditation or prayer.</li>
          <li><strong>A - Affirmations:</strong> Positive self-talk.</li>
          <li><strong>V - Visualization:</strong> Imagining your goals.</li>
          <li><strong>E - Exercise:</strong> Moving your body.</li>
          <li><strong>R - Reading:</strong> Learning something new.</li>
          <li><strong>S - Scribing:</strong> Journaling your thoughts.</li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Start Small</h2>
        <p className="mb-6">
          You don't need to do all of these for an hour. Even 5 minutes of intentionality can make a difference. Try waking up 15 minutes earlier and spending 5 minutes on movement, 5 minutes on reading, and 5 minutes on silence.
        </p>
      </>
    )
  },
  {
    id: 10,
    slug: "meditation-101",
    title: "Meditation 101: A Beginner's Guide",
    description: "Everything you need to know to start a meditation practice, even if you think you can't sit still.",
    image: "/images/articles/cover-meditation.svg",
    category: getCat('mindfulness'),
    readTime: 8,
    publishedAt: "2024-11-28",
    views: 19000,
    author: { id: "maya-patel", name: "Maya Patel", role: "Mindfulness Coach", image: "/images/authors/author-female-3.svg" },
    tags: ["Meditation", "Mindfulness", "Beginner"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Meditation is simple, but it's not easy. It's the practice of training your attention and awareness, and achieving a mentally clear and emotionally calm and stable state.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">How to Meditate: A Simple Guide</h2>
        <ol className="list-decimal list-inside space-y-4 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li>
            <strong>Sit comfortably.</strong> Find a quiet spot where you won't be disturbed. You can sit on a chair or on the floor. Keep your back straight.
          </li>
          <li>
            <strong>Focus on your breath.</strong> Close your eyes and bring your attention to the sensation of breathing. Feel the air entering your nostrils and filling your lungs.
          </li>
          <li>
            <strong>Notice when your mind wanders.</strong> It will wander. That's what minds do. When you notice you're thinking about dinner or an email, gently bring your attention back to your breath.
          </li>
          <li>
            <strong>Be kind to yourself.</strong> Don't judge yourself for having thoughts. The act of noticing and returning <em>is</em> the meditation.
          </li>
        </ol>

        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <p className="text-blue-900 dark:text-blue-100 font-medium text-center">
            "Meditation is not about stopping thoughts, but recognizing that we are more than our thoughts and our feelings." — Arianna Huffington
          </p>
        </div>
      </>
    )
  },
  {
    id: 11,
    slug: "workplace-boundaries",
    title: "Setting Healthy Boundaries at Work",
    description: "Learn to say no without guilt and protect your energy in a demanding professional environment.",
    image: "/images/articles/cover-workplace.svg",
    category: getCat('workplace'),
    readTime: 6,
    publishedAt: "2024-11-25",
    views: 13000,
    author: { id: "david-kim", name: "David Kim", role: "Organizational Psychologist", image: "/images/authors/author-male-1.svg" },
    tags: ["Workplace", "Boundaries", "Career"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          In today's "always-on" work culture, setting boundaries is an act of radical self-care. Without them, we risk burnout, resentment, and reduced productivity.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Types of Work Boundaries</h2>
        <ul className="list-disc list-inside space-y-4 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>Physical:</strong> Your workspace, your body, your privacy.</li>
          <li><strong>Emotional:</strong> Separating your feelings from your work tasks.</li>
          <li><strong>Time:</strong> When you work and when you don't.</li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">How to Say "No" Professionally</h2>
        <p className="mb-6">
          You can decline requests without being rude. Try these scripts:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4">
          <p><em>"I'd love to help, but I don't have the capacity right now."</em></p>
          <p><em>"I can do this, but it will mean delaying [Project X]. Which would you prefer I prioritize?"</em></p>
          <p><em>"I'm not checking emails after 6 PM, but I'll get back to you first thing tomorrow."</em></p>
        </div>
      </>
    )
  },
  {
    id: 12,
    slug: "types-of-therapy",
    title: "Which Type of Therapy is Right for You?",
    description: "A comparison of CBT, DBT, EMDR, and other common therapeutic modalities to help you choose.",
    image: "/images/articles/cover-therapy.svg",
    category: getCat('therapy'),
    readTime: 9,
    publishedAt: "2024-11-20",
    views: 7500,
    author: { id: "sarah-chen", name: "Dr. Sarah Chen", role: "Licensed Therapist", image: "/images/authors/author-female-1.svg" },
    tags: ["Therapy", "Mental Health", "Guide"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Therapy is not one-size-fits-all. Different approaches work for different people and different issues. Here is a breakdown of the most common types.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Common Modalities</h2>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CBT (Cognitive Behavioral Therapy)</h3>
        <p className="mb-6">Focuses on changing negative thought patterns. Best for anxiety, depression, and phobias.</p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">DBT (Dialectical Behavior Therapy)</h3>
        <p className="mb-6">Teaches skills for emotional regulation and interpersonal effectiveness. Best for borderline personality disorder and self-harm.</p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">EMDR (Eye Movement Desensitization and Reprocessing)</h3>
        <p className="mb-6">Uses eye movements to help the brain process traumatic memories. Best for PTSD and trauma.</p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Psychodynamic Therapy</h3>
        <p className="mb-6">Explores how past experiences and the unconscious mind affect current behavior. Best for deep-seated emotional patterns.</p>
      </>
    )
  },
  {
    id: 13,
    slug: "panic-attack-help",
    title: "How to Stop a Panic Attack in Its Tracks",
    description: "Emergency grounding techniques to use when you feel a panic attack coming on.",
    image: "/images/articles/cover-panic.svg",
    category: getCat('anxiety'),
    readTime: 4,
    publishedAt: "2024-11-15",
    views: 22000,
    author: { id: "clinical-board", name: "Clinical Review Board", role: "Medical Review", image: "/images/authors/author-team.svg" },
    tags: ["Anxiety", "Panic", "Help"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          A panic attack can feel like you're dying or losing your mind. But physically, it's an adrenaline surge. The key to stopping it is to signal safety to your body.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The 5-4-3-2-1 Grounding Technique</h2>
        <p className="mb-6">
          Use your senses to anchor yourself in the present moment:
        </p>
        <ul className="list-none space-y-4 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li>👀 <strong>5 things you can see:</strong> A chair, a plant, a crack in the wall.</li>
          <li>✋ <strong>4 things you can touch:</strong> The fabric of your shirt, the cool table, your hair.</li>
          <li>👂 <strong>3 things you can hear:</strong> Traffic, a clock ticking, your own breath.</li>
          <li>👃 <strong>2 things you can smell:</strong> Coffee, soap, fresh air.</li>
          <li>👅 <strong>1 thing you can taste:</strong> Gum, water, or just the inside of your mouth.</li>
        </ul>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Box Breathing</h2>
        <p className="mb-6">
          Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat until your heart rate slows.
        </p>
      </>
    )
  },
  {
    id: 14,
    slug: "seasonal-affective-disorder",
    title: "Coping with Seasonal Affective Disorder (SAD)",
    description: "Strategies to keep your mood stable during the darker, colder months of the year.",
    image: "/images/articles/cover-sad.svg",
    category: getCat('depression'),
    readTime: 6,
    publishedAt: "2024-11-10",
    views: 6000,
    author: { id: "sarah-chen", name: "Dr. Sarah Chen", role: "Licensed Therapist", image: "/images/authors/author-female-1.svg" },
    tags: ["Depression", "SAD", "Winter"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          As the days get shorter, many people feel their mood dip. Seasonal Affective Disorder (SAD) is a type of depression that's related to changes in seasons.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Light Therapy</h2>
        <p className="mb-6">
          One of the most effective treatments for SAD is light therapy. Sitting in front of a special "light box" for 30 minutes each morning can mimic sunlight and boost serotonin levels.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Movement and Outdoors</h2>
        <p className="mb-6">
          Even if it's cold, try to get outside during daylight hours. A 20-minute walk at noon can expose you to natural light and release endorphins.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Vitamin D</h2>
        <p className="mb-6">
          Low levels of Vitamin D are linked to depression. Since we get less sun in winter, talk to your doctor about a supplement.
        </p>
      </>
    )
  },
  {
    id: 15,
    slug: "nutrition-mental-health",
    title: "The Gut-Brain Connection: Nutrition for Mental Health",
    description: "How your diet influences your mood and what foods to eat for optimal brain health.",
    image: "/images/articles/cover-nutrition.svg",
    category: getCat('wellness'),
    readTime: 7,
    publishedAt: "2024-11-05",
    views: 9000,
    author: { id: "clinical-board", name: "Clinical Review Board", role: "Medical Review", image: "/images/authors/author-team.svg" },
    tags: ["Nutrition", "Wellness", "Health"],
    content: (
      <>
        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Your brain is always "on." It requires a constant supply of fuel. That "fuel" comes from the foods you eat, and what's in that fuel makes all the difference.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">The Gut-Brain Axis</h2>
        <p className="mb-6">
          Your gut and brain are physically linked via the vagus nerve. 95% of your serotonin (a neurotransmitter that regulates mood) is produced in your gastrointestinal tract.
        </p>

        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6">Brain Foods</h2>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 dark:text-gray-300 ml-4">
          <li><strong>Omega-3 Fatty Acids:</strong> Found in salmon, walnuts, and flaxseeds. Essential for brain health.</li>
          <li><strong>Probiotics:</strong> Yogurt, kefir, kimchi. Support a healthy gut microbiome.</li>
          <li><strong>Leafy Greens:</strong> Spinach, kale. Rich in folate, which is important for dopamine production.</li>
          <li><strong>Complex Carbs:</strong> Whole grains, oats. Provide a steady supply of energy (glucose) to the brain.</li>
        </ul>
      </>
    )
  }
];
