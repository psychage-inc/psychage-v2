export interface Review {
  id: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

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
  // New fields for profile
  bio: string;
  education: string[];
  languages: string[];
  approach: string;
  yearsExperience: number;
  reviewsList: Review[];
  nextAvailable?: string;
  isVideoVisit?: boolean;
}

export const providers: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist, PhD",
    image: "/images/authors/author-female-1.svg",
    rating: 4.9,
    reviews: 127,
    specialties: ["Anxiety", "Depression", "CBT", "Stress Management"],
    location: "San Francisco, CA (Hybrid)",
    availability: "Available this week",
    insurance: ["Blue Cross", "Aetna", "Cigna"],
    verified: true,
    yearsExperience: 12,
    languages: ["English", "Mandarin"],
    bio: "Dr. Sarah Chen is a licensed clinical psychologist with over a decade of experience helping individuals navigate anxiety and depression. She is passionate about making evidence-based mental health care accessible and personalized.",
    approach: "I believe in a collaborative, evidence-based approach. My goal is to empower you with practical tools to manage anxiety and build resilience. I integrate Cognitive Behavioral Therapy (CBT) with mindfulness techniques to help you understand the connection between your thoughts, feelings, and behaviors.",
    education: [
      "PhD in Clinical Psychology, Stanford University",
      "Postdoctoral Fellowship, UCSF Medical Center",
      "BA in Psychology, UC Berkeley"
    ],
    nextAvailable: "Tomorrow, 10:00 AM",
    isVideoVisit: true,
    reviewsList: [
      {
        id: "r1",
        user: "Michael R.",
        date: "2 weeks ago",
        rating: 5,
        comment: "Dr. Chen is incredibly empathetic and practical. She helped me navigate a very difficult career transition with clarity."
      },
      {
        id: "r2",
        user: "Jessica L.",
        date: "1 month ago",
        rating: 5,
        comment: "I've seen several therapists, but Dr. Chen's CBT approach finally gave me the tools I needed to manage my panic attacks."
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Marcus Rivera",
    role: "Psychiatrist, MD",
    image: "/images/authors/author-male-1.svg",
    rating: 4.8,
    reviews: 84,
    specialties: ["Medication Management", "ADHD", "Bipolar Disorder"],
    location: "New York, NY (Virtual)",
    availability: "Next opening: Feb 12",
    insurance: ["UnitedHealthcare", "Cigna", "Aetna"],
    verified: true,
    yearsExperience: 15,
    languages: ["English", "Spanish"],
    bio: "Dr. Marcus Rivera is a board-certified psychiatrist specializing in adult psychiatry. He has extensive experience in diagnosing and treating complex mood disorders and ADHD.",
    approach: "As a psychiatrist, I focus on the biological foundations of mental health while respecting the psychological and social factors. I work carefully to find the right medication balance when necessary, always prioritizing the lowest effective dose.",
    education: [
      "MD, Columbia University Vagelos College of Physicians and Surgeons",
      "Residency in Psychiatry, Mount Sinai Hospital",
      "BS in Biology, Yale University"
    ],
    nextAvailable: "Feb 12, 2:00 PM",
    isVideoVisit: true,
    reviewsList: [
      {
        id: "r3",
        user: "David K.",
        date: "3 weeks ago",
        rating: 5,
        comment: "Dr. Rivera really listens. He didn't just rush to prescribe; he took the time to understand my full history."
      }
    ]
  },
  {
    id: 3,
    name: "Elena Rostova, LMFT",
    role: "Licensed Marriage & Family Therapist",
    image: "/images/authors/author-female-2.svg",
    rating: 5.0,
    reviews: 42,
    specialties: ["Relationships", "Trauma", "Family Dynamics", "Couples Therapy"],
    location: "Chicago, IL (In-person)",
    availability: "Accepting new patients",
    insurance: ["Blue Cross", "Self-pay"],
    verified: true,
    yearsExperience: 8,
    languages: ["English", "Russian"],
    bio: "Elena Rostova is a dedicated LMFT who helps couples and families rebuild trust and communication. She creates a safe space for difficult conversations.",
    approach: "I view problems through a systemic lens, looking at how relationships and family dynamics influence individual well-being. My sessions provide a safe, non-judgmental space to explore deep-seated patterns and foster healthier connections.",
    education: [
      "MA in Marital and Family Therapy, Northwestern University",
      "BA in Sociology, University of Chicago"
    ],
    isVideoVisit: false,
    reviewsList: [
      {
        id: "r4",
        user: "Sarah & Tom",
        date: "1 month ago",
        rating: 5,
        comment: "Elena saved our marriage. Her ability to mediate and help us hear each other was transformative."
      }
    ]
  },
  {
    id: 4,
    name: "James Wilson, LCSW",
    role: "Licensed Clinical Social Worker",
    image: "/images/authors/author-male-2.svg",
    rating: 4.7,
    reviews: 156,
    specialties: ["Addiction", "Grief", "Men's Issues", "Trauma"],
    location: "Austin, TX (Hybrid)",
    availability: "Available tomorrow",
    insurance: ["Aetna", "Humana", "Medicare"],
    verified: true,
    yearsExperience: 20,
    languages: ["English"],
    bio: "James Wilson is a seasoned social worker with a background in crisis intervention and addiction recovery. He is committed to helping men find their emotional voice.",
    approach: "I bring a practical, strength-based perspective to therapy. Having worked in various clinical settings, I help clients navigate life's toughest transitions—whether it's loss, addiction, or identity crises—with compassion and grit.",
    education: [
      "MSW, University of Texas at Austin",
      "BSW, Baylor University"
    ],
    nextAvailable: "Tomorrow, 9:00 AM",
    isVideoVisit: true,
    reviewsList: []
  },
  {
    id: 5,
    name: "Dr. Amara Okeke",
    role: "Clinical Psychologist, PsyD",
    image: "/images/authors/author-female-3.svg",
    rating: 4.9,
    reviews: 93,
    specialties: ["Cultural Identity", "Stress", "Workplace Burnout", "Anxiety"],
    location: "Seattle, WA (Virtual)",
    availability: "Available this week",
    insurance: ["Kaiser", "Premera", "Blue Cross"],
    verified: true,
    yearsExperience: 10,
    languages: ["English", "Igbo"],
    bio: "Dr. Amara Okeke is a psychologist who understands the unique pressures faced by high-achieving professionals. She helps clients find sustainable success.",
    approach: "I specialize in helping high-achievers navigate burnout and cultural identity issues. My approach is culturally sensitive and solution-focused, helping you find balance without sacrificing your ambitions.",
    education: [
      "PsyD, Seattle Pacific University",
      "BA in Psychology, University of Washington"
    ],
    nextAvailable: "Thursday, 4:00 PM",
    isVideoVisit: true,
    reviewsList: []
  },
  {
    id: 6,
    name: "Thomas Anderson",
    role: "Holistic Therapist",
    image: "/images/authors/author-male-3.svg",
    rating: 4.6,
    reviews: 28,
    specialties: ["Mindfulness", "Somatic Experiencing", "Anxiety", "Holistic Health"],
    location: "Denver, CO (In-person)",
    availability: "Waitlist",
    insurance: ["Self-pay"],
    verified: true,
    yearsExperience: 6,
    languages: ["English"],
    bio: "Thomas Anderson combines traditional therapy with somatic practices to treat the whole person. He believes in the body's innate ability to heal.",
    approach: "I believe healing involves the whole person—mind, body, and spirit. I use somatic experiencing and mindfulness to help release stored trauma and restore nervous system regulation.",
    education: [
      "MA in Counseling Psychology, Naropa University",
      "Certified Somatic Experiencing Practitioner"
    ],
    isVideoVisit: false,
    reviewsList: []
  }
];
