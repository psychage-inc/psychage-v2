import { motion } from 'framer-motion';
import { Brain, Moon, MessageCircle, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface WelcomeStateProps {
  onSuggestionClick: (text: string) => void;
}

function getGreeting(name?: string): string {
  const hour = new Date().getHours();
  let greeting: string;

  if (hour >= 6 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 18) greeting = 'Good afternoon';
  else if (hour >= 18 && hour < 24) greeting = 'Good evening';
  else greeting = "Can't sleep?";

  return name ? `${greeting}, ${name}.` : `${greeting}.`;
}

function getSuggestions(hour: number) {
  if (hour >= 6 && hour < 12) {
    return [
      { icon: Brain, text: 'What is anxiety and how does it affect the body?' },
      { icon: Moon, text: 'How can I build a morning routine for better mental health?' },
      { icon: MessageCircle, text: 'How do I know if I need to talk to someone?' },
      { icon: Search, text: 'Find a therapist near me' },
    ];
  }
  if (hour >= 12 && hour < 18) {
    return [
      { icon: Brain, text: 'Tell me about cognitive behavioral therapy' },
      { icon: Moon, text: 'Why can\'t I sleep well lately?' },
      { icon: MessageCircle, text: 'What\'s the difference between stress and anxiety?' },
      { icon: Search, text: 'What tools does Psychage offer?' },
    ];
  }
  if (hour >= 18 && hour < 24) {
    return [
      { icon: Brain, text: 'How can I manage evening anxiety?' },
      { icon: Moon, text: 'Tips for winding down before bed' },
      { icon: MessageCircle, text: 'I want to understand my mood patterns' },
      { icon: Search, text: 'Find crisis support resources' },
    ];
  }
  // Late night (12am - 6am)
  return [
    { icon: Brain, text: 'I can\'t stop my racing thoughts' },
    { icon: Moon, text: 'What are some calming breathing techniques?' },
    { icon: MessageCircle, text: 'Why do I feel more anxious at night?' },
    { icon: Search, text: 'Talk to someone right now' },
  ];
}

export default function WelcomeState({ onSuggestionClick }: WelcomeStateProps) {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = getGreeting(user?.display_name?.split(' ')[0]);
  const suggestions = getSuggestions(hour);

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-semibold text-slate-900 dark:text-white mb-2"
        >
          {greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base text-slate-500 dark:text-neutral-400 max-w-md mx-auto mb-4"
        >
          Ask me anything about mental health. I'm here to help you learn and understand — not to diagnose.
        </motion.p>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="max-w-md mx-auto mb-8 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30"
        >
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Important:</strong> Psyche AI is an educational tool, not a medical professional. It does not diagnose conditions or replace professional advice. AI can make mistakes. For clinical guidance, please consult a licensed mental health provider.
          </p>
        </motion.div>

        {/* Suggestion cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map(({ icon: Icon, text }, idx) => (
            <motion.button
              key={text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              onClick={() => onSuggestionClick(text)}
              className="group flex items-start gap-3 border border-slate-200 dark:border-neutral-700 rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors text-left"
            >
              <Icon
                size={18}
                className="text-slate-400 dark:text-neutral-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0 mt-0.5"
              />
              <span className="text-sm text-slate-700 dark:text-neutral-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                {text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
