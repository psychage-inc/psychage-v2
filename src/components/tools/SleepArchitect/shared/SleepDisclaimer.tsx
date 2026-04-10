import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepDisclaimerProps {
  variant?: 'default' | 'therapy';
  className?: string;
}

const SleepDisclaimer: React.FC<SleepDisclaimerProps> = ({
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 flex items-start gap-3',
        'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700',
        className
      )}
    >
      <Info
        size={18}
        className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5"
      />
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {variant === 'therapy' ? (
          <>
            <p className="font-bold text-gray-600 dark:text-gray-300 mb-1">
              Educational Content
            </p>
            <p>
              These techniques are based on cognitive behavioral therapy for
              insomnia (CBT-I) research. They are provided for educational
              purposes and are not a substitute for professional evaluation or
              treatment. If you have persistent sleep difficulties, please
              consult a healthcare provider.
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-gray-600 dark:text-gray-300 mb-1">
              About Sleep Architect
            </p>
            <p>
              This tool provides estimates based on typical adult sleep patterns
              and the ~90-minute sleep cycle model. Actual sleep architecture
              varies by individual, health status, medications, and other
              factors.
            </p>
            <p className="mt-2 font-medium">
              This is not medical advice. If you have persistent sleep problems,
              consult a healthcare provider or sleep specialist.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SleepDisclaimer;
