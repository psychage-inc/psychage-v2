import React from 'react';
import { Article } from '../../types';
import { categories } from '../categories';
import { CheckCircle } from 'lucide-react';
import Citation from '../../components/article/Citation';

// Helper to get category by ID safely
const getCat = (id: string) => categories.find(c => c.id === id) || categories[0];

export const articles: Article[] = [
  // --- ANXIETY ---
  {
    id: 1,
    slug: "understanding-anxiety-guide",
    title: "Understanding Anxiety: A Complete Guide",
    description: "Learn about anxiety symptoms, causes, and evidence-based coping strategies that can help you regain control.",
    image: "/images/articles/cover-anxiety.svg",
    category: getCat('anxiety'),
    readTime: 8,
    publishedAt: "2025-01-15",
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
          <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
            Anxiety is more than just feeling stressed or worried. It is a natural body response designed to keep us safe, but when it becomes chronic or disproportionate to the situation, it can interfere with daily life <Citation id="1" index={1} source="APA" year="2024" />.
          </p>
          <p className="mb-6">
            In this guide, we'll explore the biological mechanisms of anxiety, identify common triggers, and provide actionable, evidence-based strategies to manage symptoms effectively.
          </p>
        </div>

        <h2 id="common-symptoms" className="text-3xl font-display font-bold text-gray-900 mt-12 mb-6 scroll-mt-32">
          Common Symptoms
        </h2>
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
            <h3 className="font-bold text-teal-800 mb-4 flex items-center gap-2">Physical Signs</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-teal-900/80 text-sm">Rapid heart rate</li>
              <li className="flex items-start gap-2 text-teal-900/80 text-sm">Shortness of breath</li>
              <li className="flex items-start gap-2 text-teal-900/80 text-sm">Muscle tension</li>
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">Psychological Signs</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-indigo-900/80 text-sm">Excessive worry</li>
              <li className="flex items-start gap-2 text-indigo-900/80 text-sm">Restlessness</li>
              <li className="flex items-start gap-2 text-indigo-900/80 text-sm">Difficulty concentrating</li>
            </ul>
          </div>
        </div>
      </>
    )
  },
  {
    id: 2,
    slug: "panic-vs-anxiety",
    title: "Panic Attacks vs. Anxiety Attacks: What's the Difference?",
    description: "Clarifying the distinction between these two intense experiences and how to manage each.",
    image: "/images/articles/cover-panic.svg",
    category: getCat('anxiety'),
    readTime: 6,
    publishedAt: "2025-01-20",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    reviewedBy: {
      id: "clinical-board",
      name: "Clinical Review Board",
      role: "Medical Review",
      image: "/images/authors/author-team.svg"
    },
    tags: ["Panic", "Anxiety", "Symptoms"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          While people often use the terms interchangeably, panic attacks and anxiety attacks have distinct clinical features. Understanding these differences is key to effective management.
        </p>
        <div className="my-8 p-6 bg-red-50 rounded-xl border-l-4 border-red-400">
          <h3 className="font-bold text-red-900 mb-2">Key Distinction</h3>
          <p className="text-red-800">Panic attacks are sudden and intense, often feeling like a physical emergency. Anxiety attacks are typically more gradual, building up over time in response to a stressor.</p>
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Panic Attacks</h2>
        <p className="mb-4">Sudden onset of intense fear that peaks within minutes. Symptoms include:</p>
        <ul className="list-disc ml-6 mb-6 space-y-2">
          <li>Chest pain or palpitations</li>
          <li>Feeling detached from reality (derealization)</li>
          <li>Fear of dying or losing control</li>
        </ul>
      </>
    )
  },

  // --- MOOD (DEPRESSION) ---
  {
    id: 3,
    slug: "understanding-depression",
    title: "Understanding Depression: Beyond Sadness",
    description: "Depression is a complex medical condition. Learn about the types, symptoms, and paths to recovery.",
    image: "/images/articles/cover-depression.svg",
    category: getCat('mood'),
    readTime: 10,
    publishedAt: "2025-02-01",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["Depression", "Mood", "Mental Health"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Depression is not just 'feeling blue' or a character flaw. It is a real illness with real symptoms that affects how you think, feel, and manage daily activities.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Core Symptoms</h2>
        <ul className="space-y-3 mb-6">
          <li className="flex items-start gap-2"><CheckCircle className="text-blue-500 mt-1" size={18} /> Persistent sad, anxious, or "empty" mood</li>
          <li className="flex items-start gap-2"><CheckCircle className="text-blue-500 mt-1" size={18} /> Feelings of hopelessness or pessimism</li>
          <li className="flex items-start gap-2"><CheckCircle className="text-blue-500 mt-1" size={18} /> Loss of interest in hobbies and activities</li>
        </ul>
      </>
    )
  },
  {
    id: 4,
    slug: "bipolar-basics",
    title: "Bipolar Disorder Basics",
    description: "An overview of Bipolar I and II, mania, hypomania, and depressive episodes.",
    image: "/images/articles/cover-bipolar.svg",
    category: getCat('mood'),
    readTime: 9,
    publishedAt: "2025-02-15",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Bipolar", "Mood", "Mania"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Bipolar disorder causes unusual shifts in mood, energy, activity levels, and the ability to carry out day-to-day tasks.
        </p>
      </>
    )
  },

  // --- ADHD ---
  {
    id: 5,
    slug: "adult-adhd-signs",
    title: "Signs of ADHD in Adults",
    description: "ADHD isn't just for kids. Discover how it manifests in adulthood and strategies for executive function.",
    image: "/images/articles/cover-adhd.svg",
    category: getCat('neurodevelopmental'),
    readTime: 7,
    publishedAt: "2025-02-10",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["ADHD", "Focus", "Neurodiversity"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Many adults live their entire lives without knowing they have ADHD, attributing their struggles to laziness or disorganization.
        </p>
        <div className="my-8 p-6 bg-orange-50 rounded-xl border-l-4 border-orange-400">
          <h3 className="font-bold text-orange-900 mb-2">Executive Dysfunction</h3>
          <p className="text-orange-800">The core of ADHD is often trouble with executive functions: organizing, prioritizing, and sustaining effort.</p>
        </div>
      </>
    )
  },

  // --- SLEEP ---
  {
    id: 6,
    slug: "sleep-hygiene-101",
    title: "Sleep Hygiene 101",
    description: "Transform your sleep quality with these proven habits and environmental adjustments.",
    image: "/images/articles/cover-sleep.svg",
    category: getCat('sleep'),
    readTime: 5,
    publishedAt: "2025-01-25",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Sleep", "Insomnia", "Wellness"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Sleep is the foundation of mental health. Without restorative sleep, emotional regulation becomes nearly impossible.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">The Golden Rules</h2>
        <ul className="list-decimal ml-6 space-y-3">
          <li><strong>Consistent Schedule:</strong> Wake up at the same time every day, even weekends.</li>
          <li><strong>Cool & Dark:</strong> Keep your bedroom around 65°F (18°C).</li>
          <li><strong>No Screens:</strong> Avoid blue light 60 minutes before bed.</li>
        </ul>
      </>
    )
  },

  // --- TRAUMA ---
  {
    id: 7,
    slug: "healing-ptsd",
    title: "Healing from PTSD",
    description: "Understanding Post-Traumatic Stress Disorder and the path to reclaiming your life.",
    image: "/images/articles/cover-trauma.svg",
    category: getCat('trauma'),
    readTime: 12,
    publishedAt: "2025-03-01",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["PTSD", "Trauma", "Recovery"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Trauma is not just about what happened to you; it's about the imprint left on your mind and body.
        </p>
      </>
    )
  },

  // --- STRESS ---
  {
    id: 8,
    slug: "burnout-vs-stress",
    title: "Burnout vs. Stress: Knowing the Signs",
    description: "Burnout is more than just excessive stress. It's a state of emotional, physical, and mental exhaustion.",
    image: "/images/articles/cover-burnout.svg",
    category: getCat('workplace'),
    readTime: 6,
    publishedAt: "2025-03-05",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Burnout", "Stress", "Work"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Stress is about 'too much': too many pressures, too much demand. Burnout is about 'not enough': not enough energy, not enough motivation, not enough caring.
        </p>
      </>
    )
  },

  // --- WELLNESS ---
  {
    id: 9,
    slug: "nutrition-mental-health",
    title: "The Gut-Brain Connection",
    description: "How your diet influences your mood, anxiety, and cognitive function.",
    image: "/images/articles/cover-nutrition.svg",
    category: getCat('wellness'),
    readTime: 7,
    publishedAt: "2025-02-20",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["Nutrition", "Wellness", "Anxiety"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          95% of your serotonin is produced in your gastrointestinal tract. What you eat directly fuels your brain.
        </p>
      </>
    )
  },

  // --- MINDFULNESS ---
  {
    id: 10,
    slug: "intro-meditation",
    title: "Meditation for Skeptics",
    description: "You don't need to clear your mind to meditate. Learn practical ways to start.",
    image: "/images/articles/cover-meditation.svg",
    category: getCat('mindfulness'),
    readTime: 5,
    publishedAt: "2025-01-10",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Mindfulness", "Meditation", "Stress"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Meditation isn't about stopping your thoughts. It's about noticing them without judgment.
        </p>
      </>
    )
  },

  // --- RELATIONSHIPS ---
  {
    id: 11,
    slug: "setting-boundaries",
    title: "The Art of Setting Boundaries",
    description: "Healthy boundaries are essential for mental well-being and strong relationships.",
    image: "/images/articles/cover-boundaries.svg",
    category: getCat('relationships'),
    readTime: 8,
    publishedAt: "2025-02-25",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["Relationships", "Self-Care", "Communication"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Boundaries are the distance at which I can love you and me simultaneously.
        </p>
      </>
    )
  },

  // --- MEN'S HEALTH ---
  {
    id: 12,
    slug: "men-and-depression",
    title: "Men and Depression: The Silent Struggle",
    description: "Why depression often looks different in men, exhibiting as anger or risk-taking.",
    image: "/images/articles/cover-men.svg",
    category: getCat('mens-health'),
    readTime: 7,
    publishedAt: "2025-03-10",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Men's Health", "Depression", "Stigma"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Men are less likely to seek help for depression, often viewing it as a weakness rather than an illness.
        </p>
      </>
    )
  },

  // --- DIGITAL WELLBEING ---
  {
    id: 13,
    slug: "social-media-detox",
    title: "Do You Need a Digital Detox?",
    description: "Signs that social media is impacting your mental health and how to disconnect to reconnect.",
    image: "/images/articles/cover-digital.svg",
    category: getCat('digital-wellbeing'),
    readTime: 6,
    publishedAt: "2025-01-30",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["Social Media", "Anxiety", "Focus"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          In a hyper-connected world, the ability to disconnect is a superpower for your mental health.
        </p>
      </>
    )
  },

  // --- THERAPY TYPES ---
  {
    id: 14,
    slug: "cbt-explained",
    title: "What is CBT?",
    description: "Cognitive Behavioral Therapy explained simply: how changing your thoughts changes your feelings.",
    image: "/images/articles/cover-cbt.svg",
    category: getCat('therapy-types'),
    readTime: 6,
    publishedAt: "2025-02-05",
    author: {
      id: "david-kim",
      name: "Dr. David Kim",
      role: "Psychiatrist",
      image: "/images/authors/author-male-1.svg"
    },
    tags: ["Therapy", "CBT", "Psychology"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          CBT is based on the concept that your thoughts, feelings, and actions are interconnected.
        </p>
      </>
    )
  },

  // --- MOOD (SEASONAL) ---
  {
    id: 15,
    slug: "seasonal-affective-disorder",
    title: "SAD: More Than Just Winter Blues",
    description: "Strategies to manage Seasonal Affective Disorder during the darker months.",
    image: "/images/articles/cover-sad.svg",
    category: getCat('mood'),
    readTime: 5,
    publishedAt: "2025-11-10",
    author: {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "/images/authors/author-female-1.svg"
    },
    tags: ["SAD", "Depression", "Winter"],
    citations: [],
    content: (
      <>
        <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
          Reduced sunlight in winter can disrupt your body's internal clock and lead to a drop in serotonin.
        </p>
      </>
    )
  }
];