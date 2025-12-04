
export interface Provider {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  reviews: number;
  specialties: string[];
  location: string;
  availability: string;
  insurance: string[];
  verified: boolean;
}

export const providers: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist, PhD",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 127,
    specialties: ["Anxiety", "Depression", "CBT"],
    location: "San Francisco, CA (Hybrid)",
    availability: "Available this week",
    insurance: ["Blue Cross", "Aetna"],
    verified: true
  },
  {
    id: 2,
    name: "Dr. Marcus Rivera",
    role: "Psychiatrist, MD",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 84,
    specialties: ["Medication Management", "ADHD", "Bipolar"],
    location: "New York, NY (Virtual)",
    availability: "Next opening: Feb 12",
    insurance: ["UnitedHealthcare", "Cigna"],
    verified: true
  },
  {
    id: 3,
    name: "Elena Rostova, LMFT",
    role: "Licensed Marriage & Family Therapist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    rating: 5.0,
    reviews: 42,
    specialties: ["Relationships", "Trauma", "Family Dynamics"],
    location: "Chicago, IL (In-person)",
    availability: "Accepting new patients",
    insurance: ["Blue Cross", "Self-pay"],
    verified: true
  },
  {
    id: 4,
    name: "James Wilson, LCSW",
    role: "Licensed Clinical Social Worker",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 156,
    specialties: ["Addiction", "Grief", "Men's Issues"],
    location: "Austin, TX (Hybrid)",
    availability: "Available tomorrow",
    insurance: ["Aetna", "Humana", "Medicare"],
    verified: true
  },
  {
    id: 5,
    name: "Dr. Amara Okeke",
    role: "Clinical Psychologist, PsyD",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 93,
    specialties: ["Cultural Identity", "Stress", "Workplace Burnout"],
    location: "Seattle, WA (Virtual)",
    availability: "Available this week",
    insurance: ["Kaiser", "Premera"],
    verified: true
  },
  {
    id: 6,
    name: "Thomas Anderson",
    role: "Holistic Therapist",
    image: "https://images.unsplash.com/photo-1566492031773-4fbc7176b8c9?q=80&w=400&auto=format&fit=crop",
    rating: 4.6,
    reviews: 28,
    specialties: ["Mindfulness", "Somatic Experiencing", "Anxiety"],
    location: "Denver, CO (In-person)",
    availability: "Waitlist",
    insurance: ["Self-pay"],
    verified: true
  }
];
