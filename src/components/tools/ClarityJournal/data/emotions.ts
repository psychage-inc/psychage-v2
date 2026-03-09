// Clarity Journal V2 — Curated emotion vocabulary
// Organized by category, designed for daily use without overwhelming the user

export interface Emotion {
  id: string;
  name: string;
  category: 'positive' | 'negative' | 'neutral';
  color: string; // Tailwind color for visualization
  emoji: string;
}

export const EMOTIONS: Emotion[] = [
  // Positive (12)
  { id: 'happy', name: 'Happy', category: 'positive', color: '#10b981', emoji: '😊' },
  { id: 'grateful', name: 'Grateful', category: 'positive', color: '#14b8a6', emoji: '🙏' },
  { id: 'calm', name: 'Calm', category: 'positive', color: '#06b6d4', emoji: '😌' },
  { id: 'hopeful', name: 'Hopeful', category: 'positive', color: '#22c55e', emoji: '🌱' },
  { id: 'confident', name: 'Confident', category: 'positive', color: '#8b5cf6', emoji: '💪' },
  { id: 'energized', name: 'Energized', category: 'positive', color: '#f59e0b', emoji: '⚡' },
  { id: 'content', name: 'Content', category: 'positive', color: '#0d9488', emoji: '☺️' },
  { id: 'proud', name: 'Proud', category: 'positive', color: '#a855f7', emoji: '🏆' },
  { id: 'loved', name: 'Loved', category: 'positive', color: '#ec4899', emoji: '💕' },
  { id: 'excited', name: 'Excited', category: 'positive', color: '#f97316', emoji: '🎉' },
  { id: 'relieved', name: 'Relieved', category: 'positive', color: '#34d399', emoji: '😮‍💨' },
  { id: 'peaceful', name: 'Peaceful', category: 'positive', color: '#67e8f9', emoji: '🕊️' },

  // Negative (18)
  { id: 'anxious', name: 'Anxious', category: 'negative', color: '#ef4444', emoji: '😰' },
  { id: 'sad', name: 'Sad', category: 'negative', color: '#3b82f6', emoji: '😢' },
  { id: 'angry', name: 'Angry', category: 'negative', color: '#dc2626', emoji: '😠' },
  { id: 'frustrated', name: 'Frustrated', category: 'negative', color: '#f97316', emoji: '😤' },
  { id: 'overwhelmed', name: 'Overwhelmed', category: 'negative', color: '#7c3aed', emoji: '🤯' },
  { id: 'lonely', name: 'Lonely', category: 'negative', color: '#6366f1', emoji: '🥺' },
  { id: 'guilty', name: 'Guilty', category: 'negative', color: '#78716c', emoji: '😔' },
  { id: 'ashamed', name: 'Ashamed', category: 'negative', color: '#a1a1aa', emoji: '😳' },
  { id: 'fearful', name: 'Fearful', category: 'negative', color: '#eab308', emoji: '😨' },
  { id: 'irritable', name: 'Irritable', category: 'negative', color: '#e11d48', emoji: '😒' },
  { id: 'exhausted', name: 'Exhausted', category: 'negative', color: '#64748b', emoji: '😩' },
  { id: 'helpless', name: 'Helpless', category: 'negative', color: '#94a3b8', emoji: '😞' },
  { id: 'hopeless', name: 'Hopeless', category: 'negative', color: '#475569', emoji: '😶' },
  { id: 'numb', name: 'Numb', category: 'negative', color: '#9ca3af', emoji: '😶‍🌫️' },
  { id: 'restless', name: 'Restless', category: 'negative', color: '#fb923c', emoji: '😬' },
  { id: 'insecure', name: 'Insecure', category: 'negative', color: '#a78bfa', emoji: '🫣' },
  { id: 'jealous', name: 'Jealous', category: 'negative', color: '#84cc16', emoji: '😒' },
  { id: 'disgusted', name: 'Disgusted', category: 'negative', color: '#65a30d', emoji: '🤢' },

  // Neutral (5)
  { id: 'neutral', name: 'Neutral', category: 'neutral', color: '#94a3b8', emoji: '😐' },
  { id: 'bored', name: 'Bored', category: 'neutral', color: '#cbd5e1', emoji: '😑' },
  { id: 'indifferent', name: 'Indifferent', category: 'neutral', color: '#d1d5db', emoji: '😶' },
  { id: 'contemplative', name: 'Contemplative', category: 'neutral', color: '#818cf8', emoji: '🤔' },
  { id: 'distracted', name: 'Distracted', category: 'neutral', color: '#fbbf24', emoji: '🫠' },
];

export const EMOTION_CATEGORIES = [
  { id: 'positive' as const, label: 'Positive', color: '#10b981' },
  { id: 'negative' as const, label: 'Difficult', color: '#ef4444' },
  { id: 'neutral' as const, label: 'Neutral', color: '#94a3b8' },
];

export function getEmotionById(id: string): Emotion | undefined {
  return EMOTIONS.find(e => e.id === id);
}

export function getEmotionsByCategory(category: 'positive' | 'negative' | 'neutral'): Emotion[] {
  return EMOTIONS.filter(e => e.category === category);
}
