
export interface TranscriptSegment {
  timestamp: string;
  text: string;
}

export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  category: string;
  videoUrl?: string; // YouTube or Vimeo URL
  videoType?: 'youtube' | 'vimeo' | 'direct';
  description?: string;
  transcript?: TranscriptSegment[];
}

export const videos: Video[] = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise for Immediate Anxiety Relief",
    thumbnail: "/images/videos/video-anxiety.svg",
    duration: 315,
    views: 1200000,
    category: "Anxiety",
    videoUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
    videoType: "youtube",
    description: "Learn a clinically proven breathing technique to quickly calm your nervous system and reduce anxiety symptoms in just 5 minutes.",
    transcript: [
      { timestamp: "00:00", text: "Welcome to this guided breathing session for anxiety relief." },
      { timestamp: "00:15", text: "Find a comfortable seated position and close your eyes if you feel comfortable." },
      { timestamp: "00:30", text: "We'll be using the 4-7-8 breathing technique, proven to activate your parasympathetic nervous system." },
      { timestamp: "00:45", text: "Start by exhaling completely through your mouth, making a whoosh sound." },
      { timestamp: "01:00", text: "Now inhale quietly through your nose for a count of four." },
      { timestamp: "01:20", text: "Hold your breath for a count of seven." },
      { timestamp: "01:40", text: "Exhale completely through your mouth for a count of eight." },
      { timestamp: "02:00", text: "This completes one breath cycle. Let's continue for three more cycles." },
      { timestamp: "03:00", text: "Notice how your body is beginning to relax. Your heart rate is slowing." },
      { timestamp: "04:00", text: "One final breath cycle. Inhale... hold... and exhale slowly." },
      { timestamp: "05:00", text: "Gently open your eyes. You've just reset your nervous system." }
    ]
  },
  {
    id: 2,
    title: "Understanding Depression: Symptoms & Treatment",
    thumbnail: "/images/videos/video-depression.svg",
    duration: 845,
    views: 850000,
    category: "Education",
    videoUrl: "https://www.youtube.com/watch?v=z-IR48Mb3W0",
    videoType: "youtube",
    description: "A comprehensive overview of depression, including common symptoms, causes, and evidence-based treatment options.",
    transcript: [
      { timestamp: "00:00", text: "Depression is more than just feeling sad. It's a serious mental health condition." },
      { timestamp: "00:30", text: "Common symptoms include persistent sadness, loss of interest in activities, and changes in sleep." },
      { timestamp: "01:30", text: "Physical symptoms can include fatigue, changes in appetite, and difficulty concentrating." },
      { timestamp: "03:00", text: "The causes of depression are complex, involving biological, psychological, and social factors." },
      { timestamp: "05:00", text: "Treatment options include therapy, medication, and lifestyle changes." },
      { timestamp: "07:00", text: "Cognitive behavioral therapy (CBT) is one of the most effective treatments." },
      { timestamp: "10:00", text: "If you're experiencing symptoms, please reach out to a mental health professional." }
    ]
  },
  {
    id: 3,
    title: "Guided Sleep Meditation for Deep Relaxation",
    thumbnail: "/images/videos/video-sleep.svg",
    duration: 1230,
    views: 2100000,
    category: "Sleep",
    videoUrl: "https://www.youtube.com/watch?v=rvaqPPjtxng",
    videoType: "youtube",
    description: "A calming guided meditation designed to help you fall asleep naturally and enjoy deeper, more restful sleep.",
    transcript: [
      { timestamp: "00:00", text: "Welcome to this sleep meditation. Settle into your bed and get comfortable." },
      { timestamp: "00:30", text: "Close your eyes and take three deep breaths." },
      { timestamp: "01:00", text: "Begin to relax your body, starting with your toes." },
      { timestamp: "02:00", text: "Feel the relaxation moving up through your legs." },
      { timestamp: "04:00", text: "Your entire lower body is now heavy and relaxed." },
      { timestamp: "06:00", text: "The relaxation spreads through your torso and arms." },
      { timestamp: "08:00", text: "Your neck and face muscles are releasing all tension." },
      { timestamp: "10:00", text: "Imagine yourself in a peaceful place. Perhaps a quiet beach or forest." },
      { timestamp: "15:00", text: "Allow yourself to drift deeper into relaxation with each breath." },
      { timestamp: "18:00", text: "You are safe, calm, and ready for restful sleep." }
    ]
  },
  {
    id: 4,
    title: "10 Daily Habits for Better Mental Health",
    thumbnail: "/images/videos/video-wellness.svg",
    duration: 620,
    views: 420000,
    category: "Wellness",
    videoUrl: "https://www.youtube.com/watch?v=3QIfkeA6HBY",
    videoType: "youtube",
    description: "Discover ten simple daily habits backed by science that can significantly improve your mental wellbeing.",
    transcript: [
      { timestamp: "00:00", text: "Small daily habits can have a profound impact on your mental health." },
      { timestamp: "00:30", text: "Habit 1: Start your day with 5 minutes of mindfulness." },
      { timestamp: "01:00", text: "Habit 2: Get at least 15 minutes of natural sunlight." },
      { timestamp: "01:45", text: "Habit 3: Move your body for 30 minutes daily." },
      { timestamp: "02:30", text: "Habit 4: Practice gratitude by writing three things you're thankful for." },
      { timestamp: "03:15", text: "Habit 5: Connect with someone you care about each day." },
      { timestamp: "04:00", text: "Habit 6: Limit social media to specific times." },
      { timestamp: "04:45", text: "Habit 7: Eat whole, nutritious foods." },
      { timestamp: "05:30", text: "Habit 8: Prioritize 7-9 hours of sleep." },
      { timestamp: "06:15", text: "Habit 9: Spend time in nature." },
      { timestamp: "07:00", text: "Habit 10: Practice self-compassion daily." }
    ]
  },
  {
    id: 5,
    title: "How to Support a Friend in Crisis",
    thumbnail: "/images/videos/video-support.svg",
    duration: 485,
    views: 150000,
    category: "Support",
    videoUrl: "https://www.youtube.com/watch?v=1Evwgu369Jw",
    videoType: "youtube",
    description: "Learn practical ways to support someone going through a mental health crisis while taking care of yourself.",
    transcript: [
      { timestamp: "00:00", text: "When someone you care about is struggling, knowing how to help can feel overwhelming." },
      { timestamp: "00:30", text: "First, listen without judgment. Just being present matters." },
      { timestamp: "01:30", text: "Avoid trying to fix or minimize their feelings." },
      { timestamp: "02:30", text: "Ask directly: 'Are you thinking about hurting yourself?'" },
      { timestamp: "03:30", text: "Help them connect with professional resources." },
      { timestamp: "04:30", text: "Know the crisis hotline numbers and when to call for help." },
      { timestamp: "05:30", text: "Remember to take care of your own mental health too." },
      { timestamp: "06:30", text: "Supporting someone doesn't mean carrying their burden alone." }
    ]
  },
  {
    id: 6,
    title: "Quick Stress Relief Yoga Flow",
    thumbnail: "/images/videos/video-yoga.svg",
    duration: 945,
    views: 670000,
    category: "Yoga",
    videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
    videoType: "youtube",
    description: "A gentle 15-minute yoga flow designed to release tension and reduce stress in your body and mind.",
    transcript: [
      { timestamp: "00:00", text: "Welcome to this stress-relief yoga flow. Start in a comfortable standing position." },
      { timestamp: "00:30", text: "Take three deep breaths, rolling your shoulders back." },
      { timestamp: "01:00", text: "Reach your arms overhead and stretch to the right, then left." },
      { timestamp: "02:00", text: "Fold forward, letting your head hang heavy." },
      { timestamp: "03:00", text: "Step back into downward dog. Pedal your feet." },
      { timestamp: "05:00", text: "Move through a gentle cat-cow sequence." },
      { timestamp: "07:00", text: "Come into child's pose. Rest here and breathe." },
      { timestamp: "09:00", text: "Transition to a seated position for some gentle twists." },
      { timestamp: "12:00", text: "Lie down in savasana. Close your eyes." },
      { timestamp: "14:00", text: "Take a moment to appreciate your body and breath." },
      { timestamp: "15:00", text: "Gently wiggle your fingers and toes. Namaste." }
    ]
  }
];
