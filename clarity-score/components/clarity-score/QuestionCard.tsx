'use client';

import { motion } from 'framer-motion';
import { Question } from '@/lib/data/questions';
import ScaleOption from './ScaleOption';

interface QuestionCardProps {
    question: Question;
    selectedValue?: number;
    onSelect: (value: number) => void;
    direction: number;
}

export default function QuestionCard({ question, selectedValue, onSelect, direction }: QuestionCardProps) {
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.98
        })
    };

    return (
        <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex w-full justify-center"
            role="radiogroup"
            aria-label={question.text}
        >
            <div className="w-full max-w-xl">
                <h2 className="font-heading mb-10 text-center text-2xl leading-tight text-white md:text-3xl" style={{ textWrap: 'balance' }}>
                    {question.text}
                </h2>

                <div className="flex flex-col gap-3">
                    {question.options.map((option, idx) => (
                        <ScaleOption
                            key={`${question.id}-${option.value}-${idx}`}
                            label={option.label}
                            index={idx}
                            selected={selectedValue === option.value}
                            onClick={() => onSelect(option.value)}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
