/**
 * Sleep Insights — Tab container for correlations and cross-tool links.
 */

import React from 'react';
import type { useSleepEntries } from '../hooks/useSleepEntries';
import SleepMoodBridge from './SleepMoodBridge';
import CrossToolLinks from './CrossToolLinks';
import ToolRecommendation from '../../shared/ToolRecommendation';

interface SleepInsightsProps {
  sleepData: ReturnType<typeof useSleepEntries>;
}

const SleepInsights: React.FC<SleepInsightsProps> = ({ sleepData }) => {
  return (
    <div className="space-y-8">
      <SleepMoodBridge sleepEntries={sleepData.entries} />
      <CrossToolLinks />
      <ToolRecommendation signal={{ toolSlug: 'sleep-architect' }} />
    </div>
  );
};

export default SleepInsights;
