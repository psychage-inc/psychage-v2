export interface Tool {
  id: number;
  name: string;
  description: string;
  iconName: string;
  category: string;
  color: 'teal' | 'amber' | 'indigo' | 'sky' | 'rose' | 'red';
  features: string[];
}

export const tools: Tool[] = [
  {
    id: 1,
    name: "Clarity Score",
    description: "A comprehensive assessment to understand your current mental well-being and stress levels.",
    iconName: "BrainCircuit",
    category: "Assessment",
    color: "teal",
    features: ["Free analysis", "10 minutes", "Immediate results"]
  },
  {
    id: 2,
    name: "Mood Journal",
    description: "Track your emotional patterns over time with our intelligent journaling tool that identifies triggers.",
    iconName: "PenTool",
    category: "Self-Care",
    color: "amber",
    features: ["Daily prompts", "Mood charts", "Private & secure"]
  },
  {
    id: 3,
    name: "Sleep Architect",
    description: "Optimize your rest with personalized sleep schedules and hygiene recommendations based on your habits.",
    iconName: "Moon",
    category: "Wellness",
    color: "indigo",
    features: ["Sleep tracking", "Smart alarm", "Weekly reports"]
  },
  {
    id: 4,
    name: "Breathwork",
    description: "Guided breathing exercises designed to reduce anxiety, lower blood pressure, and improve focus.",
    iconName: "Wind",
    category: "Relaxation",
    color: "sky",
    features: ["Visual guides", "Audio cues", "5 techniques"]
  },
  {
    id: 5,
    name: "Provider Finder",
    description: "Connect with licensed therapists and psychiatrists who match your specific needs and insurance.",
    iconName: "Users",
    category: "Professional",
    color: "rose",
    features: ["Verified pros", "Insurance filter", "Book online"]
  },
  {
    id: 6,
    name: "Crisis Support",
    description: "Immediate access to emergency resources, hotlines, and safety planning tools for urgent situations.",
    iconName: "ShieldAlert",
    category: "Emergency",
    color: "red",
    features: ["24/7 Hotlines", "Safety plan", "Local resources"]
  }
];