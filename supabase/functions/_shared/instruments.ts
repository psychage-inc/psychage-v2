/**
 * ASSESSMENT INSTRUMENT DEFINITIONS
 *
 * Static definitions for all assessment instruments and items
 * These are returned by the start endpoint
 */

export interface InstrumentScale {
  value: number;
  label: string;
}

export interface InstrumentItem {
  id: string;
  text: string;
  reverse?: boolean; // For PSS-4 reverse-scored items
}

export interface Instrument {
  id: string;
  label: string;
  timeframe: string;
  scale: InstrumentScale[];
  items: InstrumentItem[];
}

/**
 * Get all instrument definitions
 * This is the single source of truth for assessment structure
 */
export function getInstrumentDefinitions(): Instrument[] {
  return [
    {
      id: 'phq4',
      label: 'Emotional Wellness',
      timeframe: 'Over the last 2 weeks, how often have you been bothered by the following?',
      scale: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
      items: [
        { id: 'phq2_1', text: 'Little interest or pleasure in doing things' },
        { id: 'phq2_2', text: 'Feeling down, depressed, or hopeless' },
        { id: 'gad2_1', text: 'Feeling nervous, anxious, or on edge' },
        { id: 'gad2_2', text: 'Not being able to stop or control worrying' },
      ],
    },
    {
      id: 'who5',
      label: 'Vitality & Wellbeing',
      timeframe: 'Over the last 2 weeks...',
      scale: [
        { value: 0, label: 'At no time' },
        { value: 1, label: 'Some of the time' },
        { value: 2, label: 'Less than half the time' },
        { value: 3, label: 'More than half the time' },
        { value: 4, label: 'Most of the time' },
        { value: 5, label: 'All of the time' },
      ],
      items: [
        { id: 'who5_1', text: 'I have felt cheerful and in good spirits' },
        { id: 'who5_2', text: 'I have felt calm and relaxed' },
        { id: 'who5_3', text: 'I have felt active and vigorous' },
        { id: 'who5_4', text: 'I woke up feeling fresh and rested' },
        { id: 'who5_5', text: 'My daily life has been filled with things that interest me' },
      ],
    },
    {
      id: 'ucla3',
      label: 'Social Connection',
      timeframe: 'How often do you feel...',
      scale: [
        { value: 1, label: 'Hardly ever' },
        { value: 2, label: 'Some of the time' },
        { value: 3, label: 'Often' },
      ],
      items: [
        { id: 'ucla_1', text: 'How often do you feel that you lack companionship?' },
        { id: 'ucla_2', text: 'How often do you feel left out?' },
        { id: 'ucla_3', text: 'How often do you feel isolated from others?' },
      ],
    },
    {
      id: 'pss4',
      label: 'Cognitive Clarity',
      timeframe: 'In the last month, how often have you...',
      scale: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Almost never' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Fairly often' },
        { value: 4, label: 'Very often' },
      ],
      items: [
        { id: 'pss_1', text: 'Felt that you were unable to control the important things in your life?', reverse: false },
        { id: 'pss_2', text: 'Felt confident about your ability to handle your personal problems?', reverse: true },
        { id: 'pss_3', text: 'Felt that things were going your way?', reverse: true },
        { id: 'pss_4', text: 'Felt difficulties were piling up so high that you could not overcome them?', reverse: false },
      ],
    },
    {
      id: 'functioning',
      label: 'Daily Functioning',
      timeframe: 'Over the last 2 weeks, how much difficulty have you had with...',
      scale: [
        { value: 0, label: 'No difficulty' },
        { value: 1, label: 'Mild difficulty' },
        { value: 2, label: 'Moderate difficulty' },
        { value: 3, label: 'Severe difficulty' },
        { value: 4, label: 'Extreme difficulty / cannot do' },
      ],
      items: [
        { id: 'func_1', text: 'Carrying out your work, school, or household responsibilities?' },
        { id: 'func_2', text: 'Maintaining your usual daily routines and self-care?' },
        { id: 'func_3', text: 'Concentrating on doing something for ten minutes?' },
        { id: 'func_4', text: 'Dealing with people you do not know?' },
      ],
    },
  ];
}

/**
 * Get total number of items across all instruments
 */
export function getTotalItemCount(): number {
  return getInstrumentDefinitions().reduce(
    (sum, instrument) => sum + instrument.items.length,
    0
  );
}

/**
 * Validate that an item ID belongs to the correct instrument
 */
export function validateItemInstrumentMapping(
  itemId: string,
  instrumentId: string
): boolean {
  const instrument = getInstrumentDefinitions().find(i => i.id === instrumentId);
  if (!instrument) return false;

  return instrument.items.some(item => item.id === itemId);
}
