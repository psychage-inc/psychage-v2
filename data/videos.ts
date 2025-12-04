
export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  category: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise for Immediate Anxiety Relief",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    duration: 315,
    views: 1200000,
    category: "Anxiety"
  },
  {
    id: 2,
    title: "Understanding Depression: Symptoms & Treatment",
    thumbnail: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1000&auto=format&fit=crop",
    duration: 845,
    views: 850000,
    category: "Education"
  },
  {
    id: 3,
    title: "Guided Sleep Meditation for Deep Relaxation",
    thumbnail: "https://images.unsplash.com/photo-1517056037049-906cb5245842?q=80&w=1000&auto=format&fit=crop",
    duration: 1230,
    views: 2100000,
    category: "Sleep"
  },
  {
    id: 4,
    title: "10 Daily Habits for Better Mental Health",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    duration: 620,
    views: 420000,
    category: "Wellness"
  },
  {
    id: 5,
    title: "How to Support a Friend in Crisis",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    duration: 485,
    views: 150000,
    category: "Support"
  },
  {
    id: 6,
    title: "Quick Stress Relief Yoga Flow",
    thumbnail: "https://images.unsplash.com/photo-1544367563-12123d8975b9?q=80&w=1000&auto=format&fit=crop",
    duration: 945,
    views: 670000,
    category: "Yoga"
  }
];
