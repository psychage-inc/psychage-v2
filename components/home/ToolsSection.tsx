
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BrainCircuit, Activity, Moon, Wind, Users, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

// Data
const tools = [
  { id: 1, name: "Clarity", desc: "Focus Assessment", icon: BrainCircuit, color: "text-teal-400" },
  { id: 2, name: "Journal", desc: "Mood Tracking", icon: Activity, color: "text-amber-400" },
  { id: 3, name: "Sleep", desc: "Circadian Rhythm", icon: Moon, color: "text-indigo-400" },
  { id: 4, name: "Breath", desc: "Somatic Control", icon: Wind, color: "text-sky-400" },
  { id: 5, name: "Match", desc: "Provider Network", icon: Users, color: "text-rose-400" },
  { id: 6, name: "SOS", desc: "Crisis Support", icon: ShieldAlert, color: "text-red-400" },
];

const ToolsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#050505] py-32 text-white relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1]"
        style={{ 
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-none">
                The Periodic Table <br/>
                <span className="text-gray-500">of Mental Health.</span>
            </h2>
            <p className="text-gray-400 max-w-sm text-right mt-6 md:mt-0">
                A comprehensive suite of clinical-grade tools available at your fingertips.
            </p>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-800/50 border border-gray-800 rounded-2xl overflow-hidden">
            {tools.map((tool, idx) => (
                <div 
                    key={tool.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={clsx(
                        "relative bg-[#0A0A0A] p-6 h-64 flex flex-col justify-between transition-all duration-300 group cursor-pointer",
                        hoveredIndex !== null && hoveredIndex !== idx && "opacity-40 grayscale"
                    )}
                >
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-gray-600">0{tool.id}</span>
                        <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>

                    <div className="self-center transform group-hover:scale-110 transition-transform duration-300">
                        <tool.icon size={40} className={tool.color} strokeWidth={1.5} />
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-gray-200 group-hover:text-white">{tool.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{tool.desc}</p>
                    </div>

                    {/* Hover Glow */}
                    <div className={clsx(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none",
                        tool.color.replace('text-', 'bg-')
                    )} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
