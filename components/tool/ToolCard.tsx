
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Check, 
  BrainCircuit, 
  PenTool, 
  Moon, 
  Wind, 
  Users, 
  ShieldAlert,
  LucideIcon
} from 'lucide-react';
import Badge from '../ui/Badge';
import { Tool } from '../../data/tools';
import Button from '../ui/Button';

// Map string icon names to Lucide components
const IconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  PenTool,
  Moon,
  Wind,
  Users,
  ShieldAlert
};

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = IconMap[tool.iconName] || BrainCircuit;

  // Color mapping for gradients and text
  const colorStyles = {
    teal: {
      gradient: "from-teal-400 to-teal-600",
      text: "text-teal-600 dark:text-teal-400",
      border: "hover:border-teal-200 dark:hover:border-teal-800",
      shadow: "shadow-teal-500/20",
      buttonHover: "group-hover:bg-teal-600 dark:group-hover:bg-teal-500"
    },
    amber: {
      gradient: "from-amber-400 to-amber-600",
      text: "text-amber-600 dark:text-amber-400",
      border: "hover:border-amber-200 dark:hover:border-amber-800",
      shadow: "shadow-amber-500/20",
      buttonHover: "group-hover:bg-amber-500"
    },
    indigo: {
      gradient: "from-indigo-400 to-indigo-600",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "hover:border-indigo-200 dark:hover:border-indigo-800",
      shadow: "shadow-indigo-500/20",
      buttonHover: "group-hover:bg-indigo-600"
    },
    sky: {
      gradient: "from-sky-400 to-sky-600",
      text: "text-sky-600 dark:text-sky-400",
      border: "hover:border-sky-200 dark:hover:border-sky-800",
      shadow: "shadow-sky-500/20",
      buttonHover: "group-hover:bg-sky-500"
    },
    rose: {
      gradient: "from-rose-400 to-rose-600",
      text: "text-rose-600 dark:text-rose-400",
      border: "hover:border-rose-200 dark:hover:border-rose-800",
      shadow: "shadow-rose-500/20",
      buttonHover: "group-hover:bg-rose-500"
    },
    red: {
      gradient: "from-red-400 to-red-600",
      text: "text-red-600 dark:text-red-400",
      border: "hover:border-red-200 dark:hover:border-red-800",
      shadow: "shadow-red-500/20",
      buttonHover: "group-hover:bg-red-600"
    }
  };

  const styles = colorStyles[tool.color];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group flex flex-col h-full bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden ${styles.border}`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Icon Circle */}
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${styles.gradient} shadow-lg ${styles.shadow}`}>
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={32} className="text-white" />
          </motion.div>
        </div>
        
        <Badge variant={tool.color as any} className="mt-2">
            {tool.category}
        </Badge>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
        {tool.description}
      </p>

      {/* Action Area */}
      <div className="mt-auto space-y-6">
        <Button 
            variant="outline" 
            className={`w-full justify-between dark:border-gray-700 dark:text-white group-hover:text-white group-hover:border-transparent transition-all duration-300 ${styles.buttonHover}`}
            rightIcon={<ArrowRight size={18} />}
        >
            Try Tool
        </Button>

        {/* Features */}
        <div className="space-y-2">
            {tool.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Check size={14} className={`mr-2 ${styles.text}`} strokeWidth={3} />
                    <span>{feature}</span>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
