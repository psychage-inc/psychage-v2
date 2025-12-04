import React from 'react';
import { Article } from '../types';
import { Lightbulb, AlertCircle, Quote } from 'lucide-react';

export const articles: Article[] = [
  {
    id: 1,
    title: "Understanding Anxiety: A Complete Guide",
    description: "Learn about anxiety symptoms, causes, and evidence-based coping strategies that can help you regain control.",
    image: "https://images.unsplash.com/photo-1620002167909-b68c784da636?q=80&w=1000&auto=format&fit=crop",
    category: "Anxiety",
    readTime: 8,
    author: {
      name: "Dr. Sarah Chen",
      role: "Licensed Therapist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop"
    },
    date: "Jan 15, 2025",
    reviewedBy: "3 clinicians",
    tags: ["Mental Health", "Anxiety", "Wellness", "Therapy"],
    content: (
      <>
        <div id="what-is-anxiety" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
            Anxiety is more than just feeling stressed or worried. It is a natural body response designed to keep us safe, but when it becomes chronic or disproportionate to the situation, it can interfere with daily life.
          </p>
          <p className="mb-6">
            In this guide, we'll explore the biological mechanisms of anxiety, identify common triggers, and provide actionable, evidence-based strategies to manage symptoms effectively.
          </p>
        </div>

        <h2 id="common-symptoms" className="text-3xl font-display font-bold text-gray-900 mt-12 mb-6 scroll-mt-32">
          Common Symptoms
        </h2>
        <p className="mb-6">
            Anxiety manifests differently for everyone, but it typically affects both the mind and the body. Recognizing these signs is the first step toward management.
        </p>
        
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                    Physical Signs
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-teal-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        Rapid heart rate or palpitations
                    </li>
                    <li className="flex items-start gap-2 text-teal-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        Shortness of breath or chest tightness
                    </li>
                    <li className="flex items-start gap-2 text-teal-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        Muscle tension, especially in shoulders
                    </li>
                    <li className="flex items-start gap-2 text-teal-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        Digestive issues or nausea
                    </li>
                </ul>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
                    Psychological Signs
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-indigo-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        Excessive, uncontrollable worry
                    </li>
                    <li className="flex items-start gap-2 text-indigo-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        Feeling restless or "on edge"
                    </li>
                    <li className="flex items-start gap-2 text-indigo-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        Difficulty concentrating
                    </li>
                    <li className="flex items-start gap-2 text-indigo-900/80 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        Irritability or sleep disturbances
                    </li>
                </ul>
            </div>
        </div>

        <div className="my-10 p-6 bg-amber-50 rounded-xl border-l-4 border-amber-400 flex gap-4">
            <div className="shrink-0 text-amber-500 mt-1">
                <Lightbulb size={24} />
            </div>
            <div>
                <h4 className="font-bold text-amber-900 mb-1">Key Takeaway</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                    Physical symptoms often precede mental realization. If you notice your heart racing or palms sweating, your body might be signaling anxiety before your brain consciously registers worry.
                </p>
            </div>
        </div>

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
            Occasional anxiety is a normal part of life. However, you should consider speaking with a professional if:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700 ml-4">
            <li>Your anxiety interferes with your ability to work, study, or socialize.</li>
            <li>You feel unable to control your fear or worry.</li>
            <li>You develop unhealthy coping mechanisms, such as substance use.</li>
            <li>You experience panic attacks (sudden episodes of intense fear).</li>
        </ul>

        <figure className="my-12">
            <blockquote className="relative p-8 bg-gray-50 rounded-2xl border-l-4 border-teal-500 italic text-xl text-gray-700 leading-relaxed font-display">
                <Quote className="absolute top-4 left-4 text-teal-200 w-8 h-8 -z-10 opacity-50" />
                "The goal of therapy isn't to eliminate anxiety entirely, but to reduce it to a manageable level where it no longer dictates your choices."
            </blockquote>
            <figcaption className="mt-4 text-sm text-gray-500 font-medium text-right">— Dr. Emily Carter, Clinical Psychologist</figcaption>
        </figure>

        <h2 id="treatment-options" className="text-3xl font-display font-bold text-gray-900 mt-12 mb-6 scroll-mt-32">
          Treatment Options
        </h2>
        <p className="mb-6">
            Anxiety is highly treatable. The most effective approaches often combine therapy, lifestyle changes, and sometimes medication.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cognitive Behavioral Therapy (CBT)</h3>
        <p className="mb-6">
            CBT is the gold standard for treating anxiety disorders. It helps you identify and challenge negative thought patterns ("cognitive distortions") that fuel anxiety and replace them with more realistic perspectives.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mindfulness and Grounding</h3>
        <p className="mb-6">
            Techniques like the <strong>5-4-3-2-1 method</strong> help anchor you in the present moment, disrupting the cycle of worry about the future.
        </p>
        
        <div className="my-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
             <h4 className="font-bold text-blue-900 mb-3">Try It: The 5-4-3-2-1 Grounding Technique</h4>
             <p className="text-sm text-blue-800 mb-4">Acknowledge these things around you:</p>
             <ul className="space-y-2 text-sm text-blue-800">
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
    title: "The Science of Sleep and Mental Health",
    description: "Discover the bidirectional relationship between sleep quality and emotional well-being, and how to improve both.",
    image: "https://images.unsplash.com/photo-1517056037049-906cb5245842?q=80&w=1000&auto=format&fit=crop",
    category: "Wellness",
    readTime: 6
  },
  {
    id: 3,
    title: "Mindfulness Techniques for Busy Professionals",
    description: "Simple, effective mindfulness exercises you can practice at your desk to reduce stress and boost focus.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    category: "Mindfulness",
    readTime: 5
  },
  {
    id: 4,
    title: "Identifying Burnout Before It's Too Late",
    description: "Key warning signs of professional burnout and actionable steps to restore your work-life balance.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop",
    category: "Workplace",
    readTime: 7
  },
  {
    id: 5,
    title: "Cognitive Behavioral Therapy (CBT) Explained",
    description: "An overview of how CBT works to change negative thought patterns and why it's the gold standard for therapy.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    category: "Therapy",
    readTime: 10
  },
  {
    id: 6,
    title: "Building Resilience in Difficult Times",
    description: "Psychological strategies to help you bounce back from adversity and grow stronger through challenges.",
    image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1000&auto=format&fit=crop",
    category: "Resilience",
    readTime: 6
  }
];