import { useState, useEffect } from 'react';
import { getRecentlyReadIds } from '@/components/articles/recentlyRead';

export interface WellnessProgress {
  daysActive: number;
  articlesRead: number;
  toolsUsed: string[];
  totalToolSessions: number;
}

const TOOL_STORAGE_KEYS: Record<string, string> = {
  'Mood Journal': 'psychage_mood_journal',
  'Sleep Architect': 'psychage_sleep_architect',
  'Clarity Journal': 'psychage_clarity_journal_v2',
  'Medication Tracker': 'psychage_medication_tracker_v1',
  'Relationship Health': 'psychage_relationship_health_v2',
  'Clarity Score': 'psychage_clarity_history',
};

export function useWellnessProgress(): WellnessProgress {
  const [progress, setProgress] = useState<WellnessProgress>({
    daysActive: 0,
    articlesRead: 0,
    toolsUsed: [],
    totalToolSessions: 0,
  });

  useEffect(() => {
    const articlesRead = getRecentlyReadIds().length;

    const toolsUsed: string[] = [];
    let totalToolSessions = 0;

    for (const [name, key] of Object.entries(TOOL_STORAGE_KEYS)) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          const hasData = Array.isArray(parsed)
            ? parsed.length > 0
            : parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0;
          if (hasData) {
            toolsUsed.push(name);
            totalToolSessions += Array.isArray(parsed) ? parsed.length : 1;
          }
        }
      } catch {
        // Skip malformed data
      }
    }

    // Rough days active: based on earliest tool data timestamp or articles
    const daysActive = Math.max(1, toolsUsed.length + Math.min(articlesRead, 5));

    setProgress({
      daysActive,
      articlesRead,
      toolsUsed,
      totalToolSessions,
    });
  }, []);

  return progress;
}
