
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
    thumbnail: "/images/videos/video-anxiety.svg",
    duration: 315,
    views: 1200000,
    category: "Anxiety"
  },
  {
    id: 2,
    title: "Understanding Depression: Symptoms & Treatment",
    thumbnail: "/images/videos/video-depression.svg",
    duration: 845,
    views: 850000,
    category: "Education"
  },
  {
    id: 3,
    title: "Guided Sleep Meditation for Deep Relaxation",
    thumbnail: "/images/videos/video-sleep.svg",
    duration: 1230,
    views: 2100000,
    category: "Sleep"
  },
  {
    id: 4,
    title: "10 Daily Habits for Better Mental Health",
    thumbnail: "/images/videos/video-wellness.svg",
    duration: 620,
    views: 420000,
    category: "Wellness"
  },
  {
    id: 5,
    title: "How to Support a Friend in Crisis",
    thumbnail: "/images/videos/video-support.svg",
    duration: 485,
    views: 150000,
    category: "Support"
  },
  {
    id: 6,
    title: "Quick Stress Relief Yoga Flow",
    thumbnail: "/images/videos/video-yoga.svg",
    duration: 945,
    views: 670000,
    category: "Yoga"
  }
];
