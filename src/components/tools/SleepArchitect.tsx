import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, CheckCircle2, ArrowLeft, Sun, Coffee, Smartphone, Thermometer } from 'lucide-react';
import Button from '../ui/Button';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

const SleepArchitect: React.FC = () => {
    const navigate = useNavigate();
    const [wakeTime, setWakeTime] = useState('07:00');
    const [calculatedBedtimes, setCalculatedBedtimes] = useState<string[]>([]);
    const [hygieneScore, setHygieneScore] = useState(0);
    const [checkedHabits, setCheckedHabits] = useState<string[]>([]);

    const calculateBedtimes = () => {
        const [hours, minutes] = wakeTime.split(':').map(Number);
        const wakeDate = new Date();
        wakeDate.setHours(hours, minutes, 0);

        // Calculate 4, 5, and 6 sleep cycles (90 mins each) backwards
        // + 15 mins to fall asleep
        const cycles = [6, 5, 4];
        const times = cycles.map(cycle => {
            const bedtime = new Date(wakeDate.getTime() - (cycle * 90 * 60 * 1000) - (15 * 60 * 1000));
            return {
                time: bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                cycles: cycle,
                label: cycle === 5 ? 'Recommended' : cycle === 6 ? 'Optimal' : 'Minimum'
            };
        });

        setCalculatedBedtimes(times.map(t => t.time));
    };

    const habits = [
        { id: 'screens', text: 'No screens 1 hour before bed', icon: Smartphone },
        { id: 'caffeine', text: 'No caffeine after 2 PM', icon: Coffee },
        { id: 'temp', text: 'Room temperature 65-68°F', icon: Thermometer },
        { id: 'dark', text: 'Room is completely dark', icon: Moon },
        { id: 'sun', text: 'Morning sunlight exposure', icon: Sun },
    ];

    const toggleHabit = (id: string) => {
        let newChecked;
        if (checkedHabits.includes(id)) {
            newChecked = checkedHabits.filter(h => h !== id);
        } else {
            newChecked = [...checkedHabits, id];
        }
        setCheckedHabits(newChecked);
        setHygieneScore(Math.round((newChecked.length / habits.length) * 100));
    };

    return (
        <div className="min-h-screen bg-indigo-50/30 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-6">
                    <Breadcrumbs />
                </div>
                <button onClick={() => navigate('/tools')} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 font-bold text-sm uppercase tracking-wider">
                    <ArrowLeft size={16} /> Back to Tools
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Calculator Section */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-[80px] rounded-full" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <Clock size={32} />
                            </div>
                            <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
                                Sleep Cycle Calculator
                            </h1>
                            <p className="text-gray-500 mb-8">
                                We calculate bedtimes based on 90-minute sleep cycles. Waking up at the end of a cycle helps you feel more refreshed.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    I want to wake up at:
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="time"
                                        value={wakeTime}
                                        onChange={(e) => setWakeTime(e.target.value)}
                                        className="flex-1 p-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-2xl text-gray-900"
                                    />
                                    <Button onClick={calculateBedtimes} className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600">
                                        Calculate
                                    </Button>
                                </div>
                            </div>

                            {calculatedBedtimes.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <h3 className="font-bold text-gray-900">You should fall asleep at:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {calculatedBedtimes.map((time, i) => (
                                            <div key={i} className={`p-4 rounded-2xl text-center border-2 ${i === 1 ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 bg-white'}`}>
                                                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                                                    {i === 0 ? '9 Hours' : i === 1 ? '7.5 Hours' : '6 Hours'}
                                                </div>
                                                <div className={`text-xl font-bold ${i === 1 ? 'text-indigo-600' : 'text-gray-900'}`}>
                                                    {time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-center text-gray-400 mt-4">
                                        *Includes 15 minutes to fall asleep
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Hygiene Section */}
                    <div>
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white mb-8 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 p-32 bg-indigo-500/20 blur-[80px] rounded-full" />

                            <div className="relative z-10 flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="font-display font-bold text-2xl mb-1">Sleep Hygiene Score</h2>
                                    <p className="text-gray-400 text-sm">Daily habits check</p>
                                </div>
                                <div className="text-4xl font-display font-bold text-indigo-400">
                                    {hygieneScore}%
                                </div>
                            </div>

                            <div className="space-y-3">
                                {habits.map(habit => (
                                    <button
                                        key={habit.id}
                                        onClick={() => toggleHabit(habit.id)}
                                        className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${checkedHabits.includes(habit.id)
                                            ? 'bg-indigo-600/20 border border-indigo-500/50 text-white'
                                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${checkedHabits.includes(habit.id) ? 'border-indigo-400 bg-indigo-400' : 'border-gray-500'
                                            }`}>
                                            {checkedHabits.includes(habit.id) && <CheckCircle2 size={14} className="text-white" />}
                                        </div>
                                        <span className="font-medium">{habit.text}</span>
                                        <habit.icon size={18} className="ml-auto opacity-50" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Moon size={20} className="text-indigo-500" />
                                Did you know?
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Consistency is key. Going to bed and waking up at the same time every day (even on weekends) can improve the quality of your sleep by up to 30% by regulating your circadian rhythm.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SleepArchitect;
