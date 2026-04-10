/**
 * Wind-Down — Tab container for pre-sleep tools and CBT-I education.
 */

import React from 'react';
import SleepDisclaimer from '../shared/SleepDisclaimer';
import BreathingExercise from './BreathingExercise';
import PMRGuide from './PMRGuide';
import BrainDump from './BrainDump';
import RacingThoughtsInterceptor from './RacingThoughtsInterceptor';
import CBTICards from './CBTICards';

const WindDown: React.FC = () => {
  return (
    <div className="space-y-8">
      <SleepDisclaimer variant="therapy" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BreathingExercise />
        <PMRGuide />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BrainDump />
        <RacingThoughtsInterceptor />
      </div>

      <CBTICards />
    </div>
  );
};

export default WindDown;
