// Clarity Journal V2 — Report Data Computation Engine
// Transforms raw journal data into report-ready computed insights

import type {
  ClarityJournalData,
  ReportConfig,
  ReportData,
  DailyJournal,
  EmotionEntry,
  SafetyFlag,
} from '../types';
import { loadJournal, getDailyJournalsInRange } from '../storage';
import { classifyPHQ2, classifyGAD2 } from '../scoring';
import { COGNITIVE_DISTORTIONS } from '@/lib/safety/cognitiveDistortions';

/** Generate the full report data for a given configuration */
export function generateReportData(config: ReportConfig): ReportData {
  const data = loadJournal();
  const journals = getDailyJournalsInRange(config.periodStart, config.periodEnd);

  // Also pull V1 daily check-ins and weekly screenings in range
  const checkInsInRange = data.dailyCheckIns.filter(
    c => c.date >= config.periodStart && c.date <= config.periodEnd,
  );
  const screenersInRange = data.weeklyScreenings.filter(
    s => s.weekStartDate >= config.periodStart && s.weekStartDate <= config.periodEnd,
  );

  const totalEntries = journals.reduce((sum, j) => {
    return sum + j.moodCheckIns.length + (j.behavioralLog ? 1 : 0) +
      (j.sleepEntry ? 1 : 0) + j.stressors.length + j.copingUses.length +
      j.freeFormEntries.length + j.thoughtRecords.length;
  }, 0) + checkInsInRange.length;

  return {
    period: { start: config.periodStart, end: config.periodEnd },
    journalDays: new Set([...journals.map(j => j.date), ...checkInsInRange.map(c => c.date)]).size,
    totalEntries,
    mood: computeMoodAnalysis(journals, checkInsInRange),
    screeners: computeScreenerTrends(screenersInRange),
    thoughtRecords: computeThoughtRecordAnalysis(journals, data),
    behavioral: computeBehavioralAnalysis(journals, checkInsInRange),
    sleep: computeSleepAnalysis(journals, checkInsInRange),
    stressors: computeStressorAnalysis(journals),
    coping: computeCopingAnalysis(journals),
    safety: computeSafetySummary(data, config),
    sessionPrompts: generateSessionPrompts(journals, checkInsInRange, screenersInRange, data, config),
    freeFormExcerpts: extractFreeFormExcerpts(journals),
  };
}

// ── Mood Analysis ──

function computeMoodAnalysis(
  journals: DailyJournal[],
  checkIns: ClarityJournalData['dailyCheckIns'],
) {
  // Combine V1 check-in moods and V2 mood check-in data
  const dailyMoods: { date: string; values: number[] }[] = [];

  for (const ci of checkIns) {
    const existing = dailyMoods.find(d => d.date === ci.date);
    if (existing) existing.values.push(ci.mood);
    else dailyMoods.push({ date: ci.date, values: [ci.mood] });
  }

  for (const journal of journals) {
    for (const mc of journal.moodCheckIns) {
      const date = journal.date;
      const existing = dailyMoods.find(d => d.date === date);
      if (existing) existing.values.push(mc.overallMood);
      else dailyMoods.push({ date, values: [mc.overallMood] });
    }
  }

  const dailyAverages = dailyMoods
    .map(d => ({ date: d.date, avg: d.values.reduce((a, b) => a + b, 0) / d.values.length }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const allMoodValues = dailyAverages.map(d => d.avg);
  const averageMood = allMoodValues.length > 0
    ? allMoodValues.reduce((a, b) => a + b, 0) / allMoodValues.length
    : 0;

  // Trend via simple linear regression
  const moodTrend = computeTrend(allMoodValues);

  // Time-of-day analysis
  const morningMoods = journals.flatMap(j =>
    j.moodCheckIns.filter(m => m.timeOfDay === 'morning').map(m => m.overallMood),
  );
  const eveningMoods = journals.flatMap(j =>
    j.moodCheckIns.filter(m => m.timeOfDay === 'evening').map(m => m.overallMood),
  );
  const morningAvg = morningMoods.length > 0
    ? morningMoods.reduce((a, b) => a + b, 0) / morningMoods.length
    : null;
  const eveningAvg = eveningMoods.length > 0
    ? eveningMoods.reduce((a, b) => a + b, 0) / eveningMoods.length
    : null;

  // Day-of-week averages
  const dayOfWeekAverages: Record<string, number> = {};
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayBuckets: Record<string, number[]> = {};
  for (const da of dailyAverages) {
    const day = dayNames[new Date(da.date + 'T12:00:00').getDay()];
    if (!dayBuckets[day]) dayBuckets[day] = [];
    dayBuckets[day].push(da.avg);
  }
  for (const [day, values] of Object.entries(dayBuckets)) {
    dayOfWeekAverages[day] = values.reduce((a, b) => a + b, 0) / values.length;
  }

  // Top emotions
  const emotionCounts: Record<string, { count: number; totalIntensity: number; category: string }> = {};
  for (const journal of journals) {
    for (const mc of journal.moodCheckIns) {
      for (const em of mc.emotions) {
        if (!emotionCounts[em.name]) emotionCounts[em.name] = { count: 0, totalIntensity: 0, category: em.category };
        emotionCounts[em.name].count++;
        emotionCounts[em.name].totalIntensity += em.intensity;
      }
    }
  }
  const topEmotions = Object.entries(emotionCounts)
    .map(([name, d]) => ({ name, count: d.count, avgIntensity: Math.round(d.totalIntensity / d.count), category: d.category }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    averageMood: Math.round(averageMood * 10) / 10,
    moodTrend,
    dailyAverages,
    morningAvg: morningAvg ? Math.round(morningAvg * 10) / 10 : null,
    eveningAvg: eveningAvg ? Math.round(eveningAvg * 10) / 10 : null,
    topEmotions,
    dayOfWeekAverages,
  };
}

// ── Screener Trends ──

function computeScreenerTrends(screenings: ClarityJournalData['weeklyScreenings']) {
  const sorted = [...screenings].sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate));

  const phq2 = sorted.map(s => ({ date: s.weekStartDate, score: s.phq2.total }));
  const gad2 = sorted.map(s => ({ date: s.weekStartDate, score: s.gad2.total }));
  const pss4 = sorted.map(s => ({ date: s.weekStartDate, score: s.pss4.total }));
  const who5 = sorted.map(s => ({ date: s.weekStartDate, score: s.who5.total }));

  return {
    phq2,
    gad2,
    pss4,
    who5,
    phq2Trend: computeTrend(phq2.map(s => s.score), true),
    gad2Trend: computeTrend(gad2.map(s => s.score), true),
  };
}

// ── Thought Record Analysis ──

function computeThoughtRecordAnalysis(journals: DailyJournal[], data: ClarityJournalData) {
  // Journal thought records
  const journalRecords = journals.flatMap(j => j.thoughtRecords);
  const allRecords = [...journalRecords];
  const completedRecords = allRecords.filter((r: any) => r.completed);

  // Count distortions
  const distortionCounts: Record<string, number> = {};
  for (const record of allRecords) {
    for (const distId of (record.distortions || [])) {
      distortionCounts[distId] = (distortionCounts[distId] || 0) + 1;
    }
  }

  let distortionNames: Record<string, string> = {};
  try {
    if (COGNITIVE_DISTORTIONS) {
      for (const d of COGNITIVE_DISTORTIONS) {
        distortionNames[d.id] = d.name;
      }
    }
  } catch { /* ignore if not available */ }

  const topDistortions = Object.entries(distortionCounts)
    .map(([id, count]) => ({ id, name: distortionNames[id] || id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    count: allRecords.length,
    completionRate: allRecords.length > 0 ? completedRecords.length / allRecords.length : 0,
    topDistortions,
  };
}

// ── Behavioral Analysis ──

function computeBehavioralAnalysis(
  journals: DailyJournal[],
  checkIns: ClarityJournalData['dailyCheckIns'],
) {
  const logs = journals.filter(j => j.behavioralLog).map(j => j.behavioralLog!);

  const categoryDistribution: Record<string, number> = {};
  let totalEnjoyment = 0;
  let totalMastery = 0;
  let activityCount = 0;
  let socialSum = 0;

  for (const log of logs) {
    socialSum += log.socialInteractions;
    for (const activity of log.activities) {
      categoryDistribution[activity.category] = (categoryDistribution[activity.category] || 0) + 1;
      totalEnjoyment += activity.enjoyment;
      totalMastery += activity.mastery;
      activityCount++;
    }
  }

  const avgActivityLevel = logs.length > 0
    ? logs.reduce((s, l) => s + l.overallActivityLevel, 0) / logs.length
    : 0;

  // Mood-activity correlation
  let moodCorrelation: number | null = null;
  if (logs.length >= 3) {
    const pairs: [number, number][] = [];
    for (const journal of journals) {
      if (journal.behavioralLog && journal.moodCheckIns.length > 0) {
        const avgMood = journal.moodCheckIns.reduce((s, m) => s + m.overallMood, 0) / journal.moodCheckIns.length;
        pairs.push([journal.behavioralLog.overallActivityLevel, avgMood]);
      }
    }
    if (pairs.length >= 3) moodCorrelation = pearsonCorrelation(pairs);
  }

  const totalDays = new Set([...journals.map(j => j.date), ...checkIns.map(c => c.date)]).size;

  return {
    avgActivityLevel: Math.round(avgActivityLevel * 10) / 10,
    categoryDistribution,
    zeroDays: Math.max(0, totalDays - logs.length),
    avgEnjoyment: activityCount > 0 ? Math.round((totalEnjoyment / activityCount) * 10) / 10 : 0,
    avgMastery: activityCount > 0 ? Math.round((totalMastery / activityCount) * 10) / 10 : 0,
    socialInteractionAvg: logs.length > 0 ? Math.round((socialSum / logs.length) * 10) / 10 : 0,
    moodCorrelation,
  };
}

// ── Sleep Analysis ──

function computeSleepAnalysis(
  journals: DailyJournal[],
  checkIns: ClarityJournalData['dailyCheckIns'],
) {
  const sleepEntries = journals.filter(j => j.sleepEntry).map(j => j.sleepEntry!);

  if (sleepEntries.length === 0) {
    // Fall back to V1 check-in sleep data
    const sleepHours = checkIns.map(c => c.sleepHours).filter(h => h > 0);
    return {
      avgDuration: sleepHours.length > 0 ? Math.round((sleepHours.reduce((a, b) => a + b, 0) / sleepHours.length) * 10) / 10 : 0,
      avgQuality: 0,
      consistencyScore: 0,
      nightsBelow6: sleepHours.filter(h => h < 6).length,
      topFactors: [],
      moodCorrelation: null,
    };
  }

  // Calculate duration from bedtime/wakeTime
  const durations = sleepEntries.map(s => {
    const [bh, bm] = s.bedtime.split(':').map(Number);
    const [wh, wm] = s.wakeTime.split(':').map(Number);
    let bedMinutes = bh * 60 + bm;
    let wakeMinutes = wh * 60 + wm;
    if (wakeMinutes < bedMinutes) wakeMinutes += 24 * 60; // overnight
    return (wakeMinutes - bedMinutes) / 60;
  });

  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const avgQuality = sleepEntries.reduce((s, e) => s + e.sleepQuality, 0) / sleepEntries.length;

  // Consistency: standard deviation of bedtimes
  const bedtimeMinutes = sleepEntries.map(s => {
    const [h, m] = s.bedtime.split(':').map(Number);
    return h >= 12 ? h * 60 + m : (h + 24) * 60 + m; // normalize past midnight
  });
  const avgBedtime = bedtimeMinutes.reduce((a, b) => a + b, 0) / bedtimeMinutes.length;
  const bedtimeStdDev = Math.sqrt(
    bedtimeMinutes.reduce((s, v) => s + (v - avgBedtime) ** 2, 0) / bedtimeMinutes.length,
  );
  // Lower std dev = more consistent, map to 0-10
  const consistencyScore = Math.max(0, Math.min(10, 10 - (bedtimeStdDev / 30) * 10));

  // Top contributing factors
  const factorCounts: Record<string, number> = {};
  for (const entry of sleepEntries) {
    for (const f of entry.factors || []) {
      factorCounts[f] = (factorCounts[f] || 0) + 1;
    }
  }
  const topFactors = Object.entries(factorCounts)
    .map(([factor, count]) => ({ factor, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Sleep-mood correlation
  let moodCorrelation: number | null = null;
  const pairs: [number, number][] = [];
  for (const journal of journals) {
    if (journal.sleepEntry && journal.moodCheckIns.length > 0) {
      const avgMood = journal.moodCheckIns.reduce((s, m) => s + m.overallMood, 0) / journal.moodCheckIns.length;
      pairs.push([journal.sleepEntry.sleepQuality, avgMood]);
    }
  }
  if (pairs.length >= 3) moodCorrelation = pearsonCorrelation(pairs);

  return {
    avgDuration: Math.round(avgDuration * 10) / 10,
    avgQuality: Math.round(avgQuality * 10) / 10,
    consistencyScore: Math.round(consistencyScore * 10) / 10,
    nightsBelow6: durations.filter(d => d < 6).length,
    topFactors,
    moodCorrelation,
  };
}

// ── Stressor Analysis ──

function computeStressorAnalysis(journals: DailyJournal[]) {
  const allStressors = journals.flatMap(j => j.stressors);

  // Group by description similarity (exact match for now)
  const byDescription: Record<string, { count: number; totalIntensity: number; category: string }> = {};
  for (const s of allStressors) {
    const key = s.description.toLowerCase().trim();
    if (!byDescription[key]) byDescription[key] = { count: 0, totalIntensity: 0, category: s.category };
    byDescription[key].count++;
    byDescription[key].totalIntensity += s.intensity;
  }

  const topByFrequency = Object.entries(byDescription)
    .map(([description, d]) => ({ description, count: d.count, category: d.category }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topByIntensity = Object.entries(byDescription)
    .map(([description, d]) => ({
      description,
      avgIntensity: Math.round((d.totalIntensity / d.count) * 10) / 10,
      category: d.category,
    }))
    .sort((a, b) => b.avgIntensity - a.avgIntensity)
    .slice(0, 5);

  const categoryDistribution: Record<string, number> = {};
  for (const s of allStressors) {
    categoryDistribution[s.category] = (categoryDistribution[s.category] || 0) + 1;
  }

  return {
    topByFrequency,
    topByIntensity,
    recurringCount: allStressors.filter(s => s.isRecurring).length,
    categoryDistribution,
  };
}

// ── Coping Analysis ──

function computeCopingAnalysis(journals: DailyJournal[]) {
  const allCoping = journals.flatMap(j => j.copingUses);

  const toolStats: Record<string, { count: number; totalReduction: number }> = {};
  for (const c of allCoping) {
    if (!toolStats[c.tool]) toolStats[c.tool] = { count: 0, totalReduction: 0 };
    toolStats[c.tool].count++;
    toolStats[c.tool].totalReduction += c.distressBefore - c.distressAfter;
  }

  const toolUsage = Object.entries(toolStats)
    .map(([tool, d]) => ({
      tool,
      count: d.count,
      avgReduction: Math.round((d.totalReduction / d.count) * 10) / 10,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    toolUsage,
    mostEffective: toolUsage.length > 0
      ? [...toolUsage].sort((a, b) => b.avgReduction - a.avgReduction)[0].tool
      : null,
    leastEffective: toolUsage.length > 1
      ? [...toolUsage].sort((a, b) => a.avgReduction - b.avgReduction)[0].tool
      : null,
  };
}

// ── Safety Summary ──

function computeSafetySummary(data: ClarityJournalData, config: ReportConfig) {
  const flags = (data.safetyFlags || []).filter(
    f => f.date >= config.periodStart && f.date <= config.periodEnd,
  );

  // Also check weekly screeners for safety flags
  const screenerFlags: SafetyFlag[] = data.weeklyScreenings
    .filter(s => s.weekStartDate >= config.periodStart && s.weekStartDate <= config.periodEnd && s.safetyCheck?.crisisTriggered)
    .map(s => ({
      date: s.weekStartDate,
      source: 'screener' as const,
      details: 'Safety concern flagged during weekly screening',
    }));

  const allFlags = [...flags, ...screenerFlags];

  return {
    flags: allFlags,
    hasFlags: allFlags.length > 0,
  };
}

// ── Session Preparation Prompts ──

function generateSessionPrompts(
  journals: DailyJournal[],
  checkIns: ClarityJournalData['dailyCheckIns'],
  screenings: ClarityJournalData['weeklyScreenings'],
  data: ClarityJournalData,
  config: ReportConfig,
): string[] {
  const prompts: string[] = [];

  // Check screener trends
  const sortedScreenings = [...screenings].sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate));
  if (sortedScreenings.length >= 2) {
    const recent = sortedScreenings[sortedScreenings.length - 1];
    const previous = sortedScreenings[sortedScreenings.length - 2];

    if (recent.phq2.total > previous.phq2.total && classifyPHQ2(recent.phq2.total) !== 'low') {
      prompts.push(
        `Depression screening scores (PHQ-2) have increased from ${previous.phq2.total} to ${recent.phq2.total} over the past ${sortedScreenings.length} weeks. The client may benefit from exploring recent contributing factors.`,
      );
    }
    if (recent.gad2.total > previous.gad2.total && classifyGAD2(recent.gad2.total) !== 'low') {
      prompts.push(
        `Anxiety screening scores (GAD-2) have increased from ${previous.gad2.total} to ${recent.gad2.total}. It may be worth exploring current sources of worry or anxiety.`,
      );
    }
  }

  // Check mood trends
  const allMoods = [
    ...checkIns.map(c => c.mood),
    ...journals.flatMap(j => j.moodCheckIns.map(m => m.overallMood)),
  ];
  if (allMoods.length >= 3) {
    const trend = computeTrend(allMoods);
    if (trend === 'improving') {
      const avgMood = allMoods.reduce((a, b) => a + b, 0) / allMoods.length;
      prompts.push(
        `Overall mood has trended upward to an average of ${avgMood.toFixed(1)}/10 over the reporting period. The client may benefit from reflecting on what is contributing to this improvement.`,
      );
    } else if (trend === 'declining') {
      prompts.push(
        'Mood scores have shown a downward trend during this period. Consider exploring recent changes in routine, relationships, or stressors.',
      );
    }
  }

  // Check thought record patterns
  const allDistortions = journals.flatMap(j => j.thoughtRecords.flatMap(t => t.distortions));
  if (allDistortions.length > 0) {
    const distortionCounts: Record<string, number> = {};
    for (const d of allDistortions) distortionCounts[d] = (distortionCounts[d] || 0) + 1;
    const topDistortion = Object.entries(distortionCounts).sort((a, b) => b[1] - a[1])[0];
    if (topDistortion && topDistortion[1] >= 3) {
      prompts.push(
        `The client identified "${topDistortion[0]}" as a cognitive distortion in ${topDistortion[1]} thought records. Targeted cognitive restructuring exercises may be helpful.`,
      );
    }
  }

  // Check sleep patterns
  const sleepEntries = journals.filter(j => j.sleepEntry).map(j => j.sleepEntry!);
  if (sleepEntries.length >= 3) {
    const avgQuality = sleepEntries.reduce((s, e) => s + e.sleepQuality, 0) / sleepEntries.length;
    if (avgQuality < 5) {
      prompts.push(
        `Average sleep quality was ${avgQuality.toFixed(1)}/10 during this period. Sleep hygiene strategies or referral for sleep evaluation may be worth discussing.`,
      );
    }
  }

  // Check coping effectiveness
  const copingData = journals.flatMap(j => j.copingUses);
  if (copingData.length > 0) {
    const toolStats: Record<string, { count: number; totalReduction: number }> = {};
    for (const c of copingData) {
      if (!toolStats[c.tool]) toolStats[c.tool] = { count: 0, totalReduction: 0 };
      toolStats[c.tool].count++;
      toolStats[c.tool].totalReduction += c.distressBefore - c.distressAfter;
    }
    const ineffective = Object.entries(toolStats)
      .filter(([_, d]) => d.count >= 2 && d.totalReduction / d.count < 1)
      .map(([tool]) => tool);
    if (ineffective.length > 0) {
      prompts.push(
        `The client used "${ineffective[0]}" ${toolStats[ineffective[0]].count} times with minimal distress reduction. Alternative coping strategies may be worth exploring.`,
      );
    }
  }

  // If data is sparse
  if (prompts.length === 0) {
    if (journals.length < 3 && checkIns.length < 3) {
      prompts.push(
        'Limited journaling data available for this period. Consider discussing journaling consistency and any barriers to regular check-ins.',
      );
    } else {
      prompts.push(
        'The client has been journaling consistently during this period. Review the data together to identify patterns and areas for continued focus.',
      );
    }
  }

  return prompts.slice(0, 4);
}

// ── Free-Form Excerpts ──

function extractFreeFormExcerpts(journals: DailyJournal[]) {
  return journals
    .flatMap(j =>
      j.freeFormEntries
        .filter(f => f.includeInReport)
        .map(f => ({ date: j.date, content: f.content, prompt: f.prompt })),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
}

// ── Utilities ──

function computeTrend(values: number[], invertedBetter: true): 'improving' | 'stable' | 'worsening';
function computeTrend(values: number[], invertedBetter?: false): 'improving' | 'stable' | 'declining';
function computeTrend(values: number[], invertedBetter = false): 'improving' | 'stable' | 'declining' | 'worsening' {
  if (values.length < 2) return 'stable';

  const n = values.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += values[i];
    sumXY += i * values[i];
    sumX2 += i * i;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  const threshold = 0.1;
  if (Math.abs(slope) < threshold) return 'stable';

  if (invertedBetter) {
    // For screener scores: lower = better
    return slope < 0 ? 'improving' : 'worsening';
  }
  return slope > 0 ? 'improving' : 'declining';
}

function pearsonCorrelation(pairs: [number, number][]): number {
  const n = pairs.length;
  if (n < 3) return 0;

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  for (const [x, y] of pairs) {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100) / 100;
}
