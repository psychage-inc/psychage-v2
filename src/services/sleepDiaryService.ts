/**
 * Sleep Diary Service — Supabase CRUD for V2 sleep diary entries.
 *
 * Handles the mapping between TypeScript SleepEntry interfaces and
 * the Supabase sleep_diary_entries table rows.
 */

import { supabase } from '@/lib/supabaseClient';
import type { SleepEntry, SleepSettings } from '@/lib/sleep/types';
import { calculateMetrics } from '@/lib/sleep/calculations';

// ─── Supabase Row Types ─────────────────────────────────────────────────────

interface SleepDiaryRow {
  id: string;
  user_id: string;
  date: string;
  bedtime: string;
  lights_out: string;
  sleep_onset_minutes: number;
  wake_time: string;
  out_of_bed_time: string;
  night_wakings: number;
  night_waking_duration_minutes: number;
  sleep_quality: number;
  morning_mood: number;
  dream_recall: boolean;
  dream_notes: string | null;
  naps: any;
  substances: any;
  notes: string | null;
  total_sleep_minutes: number | null;
  sleep_efficiency: number | null;
  created_at: string;
  updated_at: string;
}

interface SleepSettingsRow {
  user_id: string;
  target_sleep_minutes: number;
  chronotype: string | null;
  target_bedtime: string | null;
  target_wake_time: string | null;
  age_range: string;
  updated_at: string;
}

// ─── Dashboard Stats ────────────────────────────────────────────────────────

export interface SleepV2DashboardStats {
  averageHours: number;
  averageQuality: number;
  averageEfficiency: number;
  totalEntries: number;
  trend: 'up' | 'down' | 'stable';
  currentStreak: number;
}

// ─── Row <-> Entry Mapping ──────────────────────────────────────────────────

function toRow(
  userId: string,
  entry: SleepEntry
): Omit<SleepDiaryRow, 'id' | 'created_at'> {
  const metrics = calculateMetrics(entry);
  return {
    user_id: userId,
    date: entry.date,
    bedtime: entry.bedtime,
    lights_out: entry.lights_out,
    sleep_onset_minutes: entry.sleep_onset_minutes,
    wake_time: entry.wake_time,
    out_of_bed_time: entry.out_of_bed_time,
    night_wakings: entry.night_wakings,
    night_waking_duration_minutes: entry.night_waking_duration_minutes,
    sleep_quality: entry.sleep_quality,
    morning_mood: entry.morning_mood,
    dream_recall: entry.dream_recall,
    dream_notes: entry.dream_notes ?? null,
    naps: entry.naps,
    substances: entry.substances,
    notes: entry.notes ?? null,
    total_sleep_minutes: metrics.total_sleep_minutes,
    sleep_efficiency: Math.round(metrics.sleep_efficiency * 100) / 100,
    updated_at: entry.updated_at || new Date().toISOString(),
  };
}

function fromRow(row: SleepDiaryRow): SleepEntry {
  return {
    id: row.id,
    date: row.date,
    bedtime: row.bedtime,
    lights_out: row.lights_out,
    sleep_onset_minutes: row.sleep_onset_minutes,
    wake_time: row.wake_time,
    out_of_bed_time: row.out_of_bed_time,
    night_wakings: row.night_wakings,
    night_waking_duration_minutes: row.night_waking_duration_minutes,
    sleep_quality: row.sleep_quality as 1 | 2 | 3 | 4 | 5,
    morning_mood: row.morning_mood as 1 | 2 | 3 | 4 | 5,
    dream_recall: row.dream_recall,
    dream_notes: row.dream_notes ?? undefined,
    naps: row.naps ?? [],
    substances: row.substances ?? {},
    notes: row.notes ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// ─── Service ────────────────────────────────────────────────────────────────

export const sleepDiaryService = {
  /**
   * Upsert a sleep diary entry. Uses ON CONFLICT (user_id, date) DO UPDATE.
   */
  upsertEntry: async (
    userId: string,
    entry: SleepEntry
  ): Promise<SleepEntry | null> => {
    try {
      const row = toRow(userId, entry);
      const { data, error } = await supabase
        .from('sleep_diary_entries')
        .upsert(row, { onConflict: 'user_id,date' })
        .select()
        .single();

      if (error) {
        console.error('Error upserting sleep diary entry:', error);
        return null;
      }
      return fromRow(data as SleepDiaryRow);
    } catch (error) {
      console.error('Failed to upsert sleep diary entry:', error);
      return null;
    }
  },

  /**
   * Upsert multiple entries in a batch.
   */
  upsertEntries: async (
    userId: string,
    entries: SleepEntry[]
  ): Promise<number> => {
    if (entries.length === 0) return 0;
    try {
      const rows = entries.map((e) => toRow(userId, e));
      const { error } = await supabase
        .from('sleep_diary_entries')
        .upsert(rows, { onConflict: 'user_id,date' });

      if (error) {
        console.error('Error batch upserting sleep diary entries:', error);
        return 0;
      }
      return entries.length;
    } catch (error) {
      console.error('Failed to batch upsert sleep diary entries:', error);
      return 0;
    }
  },

  /**
   * Delete a sleep diary entry by user_id + date.
   */
  deleteEntry: async (userId: string, date: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('sleep_diary_entries')
        .delete()
        .eq('user_id', userId)
        .eq('date', date);

      if (error) {
        console.error('Error deleting sleep diary entry:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to delete sleep diary entry:', error);
      return false;
    }
  },

  /**
   * Fetch all entries for a user, ordered by date DESC.
   */
  getEntries: async (
    userId: string,
    limit?: number
  ): Promise<SleepEntry[]> => {
    try {
      let query = supabase
        .from('sleep_diary_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching sleep diary entries:', error);
        return [];
      }
      return (data as SleepDiaryRow[]).map(fromRow);
    } catch (error) {
      console.error('Failed to fetch sleep diary entries:', error);
      return [];
    }
  },

  /**
   * Fetch entries from the last N days.
   */
  getRecentEntries: async (
    userId: string,
    days: number
  ): Promise<SleepEntry[]> => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const cutoffStr = cutoff.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('sleep_diary_entries')
        .select('*')
        .eq('user_id', userId)
        .gte('date', cutoffStr)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching recent sleep diary entries:', error);
        return [];
      }
      return (data as SleepDiaryRow[]).map(fromRow);
    } catch (error) {
      console.error('Failed to fetch recent sleep diary entries:', error);
      return [];
    }
  },

  /**
   * Get dashboard stats for the user (last 7 days).
   * Returns data compatible with the UserDashboard WellnessSnapshotCards.
   */
  getDashboardStats: async (
    userId: string
  ): Promise<SleepV2DashboardStats | null> => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      const { data: recentRows, error: recentErr } = await supabase
        .from('sleep_diary_entries')
        .select('total_sleep_minutes, sleep_efficiency, sleep_quality, date')
        .eq('user_id', userId)
        .gte('date', fourteenDaysAgo.toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (recentErr || !recentRows || recentRows.length === 0) return null;

      const sevenStr = sevenDaysAgo.toISOString().split('T')[0];
      const thisWeek = recentRows.filter((r: any) => r.date >= sevenStr);
      const lastWeek = recentRows.filter((r: any) => r.date < sevenStr);

      if (thisWeek.length === 0) return null;

      const avg = (arr: number[]) =>
        arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

      const avgMinutes = avg(thisWeek.map((r: any) => r.total_sleep_minutes ?? 0));
      const avgQuality = avg(thisWeek.map((r: any) => r.sleep_quality));
      const avgEfficiency = avg(thisWeek.map((r: any) => r.sleep_efficiency ?? 0));
      const avgMinutesLast = avg(lastWeek.map((r: any) => r.total_sleep_minutes ?? 0));

      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (lastWeek.length >= 3) {
        const diff = avgMinutes - avgMinutesLast;
        if (diff > 15) trend = 'up';
        else if (diff < -15) trend = 'down';
      }

      // Streak: count consecutive days with entries working backward from today
      const { data: allDates } = await supabase
        .from('sleep_diary_entries')
        .select('date')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(90);

      let currentStreak = 0;
      if (allDates && allDates.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const firstDate = new Date(allDates[0].date);
        firstDate.setHours(0, 0, 0, 0);
        const daysSince = Math.floor(
          (today.getTime() - firstDate.getTime()) / 86400000
        );

        if (daysSince <= 1) {
          currentStreak = 1;
          for (let i = 1; i < allDates.length; i++) {
            const prev = new Date(allDates[i - 1].date);
            const curr = new Date(allDates[i].date);
            const diff = Math.floor(
              (prev.getTime() - curr.getTime()) / 86400000
            );
            if (diff === 1) currentStreak++;
            else break;
          }
        }
      }

      // Count total entries
      const { count } = await supabase
        .from('sleep_diary_entries')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      return {
        averageHours: Math.round((avgMinutes / 60) * 10) / 10,
        averageQuality: Math.round(avgQuality * 10) / 10,
        averageEfficiency: Math.round(avgEfficiency * 10) / 10,
        totalEntries: count ?? thisWeek.length,
        trend,
        currentStreak,
      };
    } catch (error) {
      console.error('Failed to get sleep dashboard stats:', error);
      return null;
    }
  },

  /**
   * Upsert user sleep settings.
   */
  upsertSettings: async (
    userId: string,
    settings: SleepSettings
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.from('sleep_user_settings').upsert({
        user_id: userId,
        target_sleep_minutes: settings.target_sleep_minutes,
        chronotype: settings.chronotype ?? null,
        target_bedtime: settings.target_bedtime ?? null,
        target_wake_time: settings.target_wake_time ?? null,
        age_range: settings.age_range,
        updated_at: new Date().toISOString(),
      });
      if (error) {
        console.error('Error upserting sleep settings:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Failed to upsert sleep settings:', error);
      return false;
    }
  },

  /**
   * Fetch user sleep settings.
   */
  getSettings: async (userId: string): Promise<SleepSettings | null> => {
    try {
      const { data, error } = await supabase
        .from('sleep_user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !data) return null;
      const row = data as SleepSettingsRow;
      return {
        target_sleep_minutes: row.target_sleep_minutes,
        chronotype: row.chronotype as any,
        target_bedtime: row.target_bedtime ?? undefined,
        target_wake_time: row.target_wake_time ?? undefined,
        age_range: row.age_range,
      };
    } catch (error) {
      console.error('Failed to fetch sleep settings:', error);
      return null;
    }
  },
};
