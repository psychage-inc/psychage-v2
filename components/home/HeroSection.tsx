
import React from 'react';
import { ArrowRight, Play, Activity, Brain, Globe, MessageCircle } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import BentoCard from './hero/BentoCard';
import { NeuralMesh, CircularData, MediaShapes, DocFlow, MorphingBlob, PeopleNet } from './hero/HeroAssets';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[110vh] pt-32 pb-20 px-4 md:px-6 flex flex-col items-center overflow-hidden">
      <HeroBackground />

      <div className="container mx-auto max-w-[1280px] relative z-10">
        
        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-auto md:grid-rows-3 gap-6 auto-rows-[minmax(200px,auto)]">

            {/* --- 1. HERO TEXT (Top Left) --- */}
            <BentoCard 
                colSpan="md:col-span-8" 
                rowSpan="md:row-span-2" 
                variant="surface"
                className="flex flex-col justify-end min-h-[400px]"
            >
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-8 w-fit">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-700">OS 2.0 Live</span>
                    </div>
                    
                    <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-gray-900 leading-[0.9] mb-8">
                        Intelligence for <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                            your inner world.
                        </span>
                    </h1>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                         <button className="h-14 px-8 rounded-full bg-gray-900 text-white font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-teal-900/10 flex items-center gap-2">
                             Start Assessment <ArrowRight size={20} />
                         </button>
                         <button className="h-14 px-8 rounded-full bg-white/50 border border-white text-gray-900 font-bold text-lg hover:bg-white transition-colors flex items-center gap-2">
                             <Play size={20} fill="currentColor" /> Watch Demo
                         </button>
                    </div>
                </div>
            </BentoCard>

            {/* --- 2. IDENTITY CARD (Top Right) --- */}
            <BentoCard 
                colSpan="md:col-span-4" 
                rowSpan="md:row-span-1" 
                variant="primary"
                delay={0.1}
                className="justify-between"
            >
                <div className="flex justify-between items-start">
                    <Brain className="text-teal-300" size={32} />
                    <Activity className="text-teal-400 opacity-50" size={20} />
                </div>
                <div>
                    <div className="text-4xl font-display font-bold mb-1">98/100</div>
                    <div className="text-teal-200 text-sm font-medium">Cognitive Clarity Score</div>
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-30 pointer-events-none">
                    <NeuralMesh className="w-48 h-48 text-white" />
                </div>
            </BentoCard>

             {/* --- 3. TOOLS / WIDGET (Middle Right) --- */}
            <BentoCard 
                colSpan="md:col-span-4" 
                rowSpan="md:row-span-2" 
                variant="depth"
                delay={0.2}
                className="justify-end p-0 overflow-hidden"
            >
                {/* Simulated Chat Interface */}
                <div className="absolute inset-x-6 top-8 bottom-0 flex flex-col gap-3">
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-teal-400">
                             <Brain size={16} />
                         </div>
                         <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-300 max-w-[80%] border border-gray-700">
                             How are you feeling today?
                         </div>
                     </div>
                     <div className="flex gap-3 flex-row-reverse">
                         <div className="bg-teal-600 rounded-2xl rounded-tr-sm p-3 text-sm text-white max-w-[80%] shadow-lg shadow-teal-900/50">
                             A bit anxious about work.
                         </div>
                     </div>
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-teal-400">
                             <Brain size={16} />
                         </div>
                         <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-300 max-w-[80%] border border-gray-700">
                             I can help. Let's try a quick breathing exercise.
                         </div>
                     </div>
                </div>
                
                {/* Gradient Fade at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
                
                <div className="relative z-10 p-6 pt-0 mt-auto">
                     <button className="w-full h-12 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                         <MessageCircle size={16} /> Open Assistant
                     </button>
                </div>
            </BentoCard>

            {/* --- 4. STATS (Bottom Left) --- */}
            <BentoCard 
                colSpan="md:col-span-3" 
                variant="surface"
                delay={0.3}
                className="items-center justify-center text-center"
            >
                <div className="relative w-32 h-32 mb-4">
                     <CircularData className="w-full h-full text-teal-500" />
                     <div className="absolute inset-0 flex items-center justify-center flex-col">
                         <span className="text-3xl font-display font-bold text-gray-900">12k</span>
                         <span className="text-[10px] uppercase font-bold text-gray-400">Users</span>
                     </div>
                </div>
                <div className="text-sm font-bold text-gray-600">Live Community</div>
            </BentoCard>

             {/* --- 5. MEDIA (Bottom Mid-Left) --- */}
            <BentoCard 
                colSpan="md:col-span-3" 
                variant="vibrant"
                delay={0.4}
                className="group cursor-pointer"
            >
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <Play size={20} fill="currentColor" />
                </div>
                <div className="mt-auto">
                    <div className="text-teal-100 text-xs font-bold uppercase mb-1">New Masterclass</div>
                    <div className="text-xl font-display font-bold leading-tight">Sleep Architecture</div>
                </div>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <MediaShapes className="w-full h-full text-white" />
                </div>
            </BentoCard>
            
             {/* --- 6. URGENT CARE (Bottom Mid-Right - Spans into prev space on mobile) --- */}
             <BentoCard 
                colSpan="md:col-span-2" 
                variant="red"
                delay={0.5}
                className="items-center justify-center text-center"
            >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Globe size={24} />
                </div>
                <div className="font-bold text-lg">SOS</div>
                <div className="text-rose-100 text-xs">24/7 Support</div>
            </BentoCard>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
