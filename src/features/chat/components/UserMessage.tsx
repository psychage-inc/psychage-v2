import { motion } from 'framer-motion';

interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex justify-end mb-6"
    >
      <div className="max-w-[85%] md:max-w-[80%] bg-slate-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
        <p className="text-[15px] leading-relaxed text-slate-900 dark:text-neutral-100 whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </motion.div>
  );
}
