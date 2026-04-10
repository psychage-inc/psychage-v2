/**
 * Sleep Architect V2 — Weekly Digest Template Engine
 *
 * Generates natural-language weekly summaries from sleep data.
 * All text is assembled client-side from conditional sentence fragments.
 */

import type { SleepEntry, SleepMetrics } from './types';
import { calculateMetrics, formatDuration } from './calculations';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function generateWeeklyDigest(
  thisWeek: SleepEntry[],
  lastWeek: SleepEntry[]
): string {
  if (thisWeek.length === 0) {
    return 'Start logging your sleep to see a weekly summary here.';
  }

  const sentences: string[] = [];

  const thisMetrics = thisWeek.map(calculateMetrics);
  const lastMetrics = lastWeek.map(calculateMetrics);

  // Duration
  const avgDurThis = average(thisMetrics.map((m) => m.total_sleep_minutes));
  const avgDurLast = average(lastMetrics.map((m) => m.total_sleep_minutes));
  const durDiff = avgDurThis - avgDurLast;

  if (lastWeek.length === 0) {
    sentences.push(
      `This week you averaged ${formatDuration(avgDurThis)} of sleep across ${thisWeek.length} night${thisWeek.length !== 1 ? 's' : ''} logged.`
    );
  } else if (Math.abs(durDiff) < 10) {
    sentences.push(
      `This week you averaged ${formatDuration(avgDurThis)} of sleep, holding steady from last week.`
    );
  } else if (durDiff > 0) {
    sentences.push(
      `This week you averaged ${formatDuration(avgDurThis)} of sleep \u2014 up ${formatDuration(Math.abs(durDiff))} from last week.`
    );
  } else {
    sentences.push(
      `This week you averaged ${formatDuration(avgDurThis)} of sleep \u2014 down ${formatDuration(Math.abs(durDiff))} from last week.`
    );
  }

  // Efficiency
  const avgEffThis = average(thisMetrics.map((m) => m.sleep_efficiency));
  const avgEffLast = average(lastMetrics.map((m) => m.sleep_efficiency));

  if (avgEffThis >= 85) {
    const effDiff = avgEffThis - avgEffLast;
    if (lastWeek.length > 0 && effDiff > 2) {
      sentences.push(
        `Your sleep efficiency improved to ${Math.round(avgEffThis)}%, up from ${Math.round(avgEffLast)}% last week.`
      );
    } else {
      sentences.push(
        `Your sleep efficiency is a healthy ${Math.round(avgEffThis)}%.`
      );
    }
  } else {
    sentences.push(
      `Your sleep efficiency is ${Math.round(avgEffThis)}% \u2014 the target is 85% or higher. Spending less time awake in bed can help.`
    );
  }

  // Quality
  const avgQualThis = average(thisWeek.map((e) => e.sleep_quality));
  if (avgQualThis >= 4) {
    sentences.push('You rated your sleep quality as good to excellent this week.');
  } else if (avgQualThis >= 3) {
    sentences.push('Your self-rated sleep quality was moderate this week.');
  } else {
    sentences.push(
      'Your self-rated sleep quality was on the lower side. Consider reviewing your sleep hygiene habits.'
    );
  }

  // Consistency
  if (thisWeek.length >= 3) {
    const bedtimes = thisWeek.map((e) => {
      const [h, m] = e.bedtime.split(':').map(Number);
      const mins = h * 60 + m;
      return mins > 720 ? mins - 1440 : mins;
    });
    const meanBed = average(bedtimes);
    const variance =
      bedtimes.reduce((sum, t) => sum + (t - meanBed) ** 2, 0) /
      bedtimes.length;
    const stddev = Math.sqrt(variance);

    if (stddev < 30) {
      sentences.push(
        'Your bedtime was consistent, with less than 30 minutes variance most nights.'
      );
    } else if (stddev < 60) {
      sentences.push(
        'Your bedtime varied moderately this week. A more consistent schedule can improve sleep quality.'
      );
    } else {
      sentences.push(
        'Your bedtime was quite variable this week. Try to keep it within a 30-minute window for better results.'
      );
    }
  }

  // Substance observations
  const noScreenNights = thisWeek.filter(
    (e) => !e.substances.screens_before_bed_minutes || e.substances.screens_before_bed_minutes === 0
  );
  const screenNights = thisWeek.filter(
    (e) => e.substances.screens_before_bed_minutes && e.substances.screens_before_bed_minutes > 0
  );

  if (noScreenNights.length > 0 && screenNights.length > 0) {
    const noScreenMetrics = noScreenNights.map(calculateMetrics);
    const screenMetrics = screenNights.map(calculateMetrics);
    const avgLatencyNoScreen = average(
      noScreenNights.map((e) => e.sleep_onset_minutes)
    );
    const avgLatencyScreen = average(
      screenNights.map((e) => e.sleep_onset_minutes)
    );

    if (avgLatencyScreen - avgLatencyNoScreen > 5) {
      sentences.push(
        'One area to watch: you fell asleep faster on nights without screen time in the last hour.'
      );
    }
  }

  // Caffeine observation
  const caffeineNights = thisWeek.filter(
    (e) => e.substances.caffeine_last_time
  );
  if (caffeineNights.length > thisWeek.length / 2) {
    sentences.push(
      'You logged caffeine consumption most days \u2014 monitor whether late caffeine is affecting your sleep onset.'
    );
  }

  return sentences.join(' ');
}
