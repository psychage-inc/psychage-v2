import React from 'react';
import {
    Brain, Heart, Activity, CloudRain, Sun, Shield,
    AlertTriangle, Moon, Anchor, Smartphone, Leaf,
    Fingerprint, Scale, Home, Briefcase,
    Users, Sparkles, MessageCircle, LifeBuoy
} from 'lucide-react';

// Icon mapper for Supabase categories
export const iconMap: Record<string, React.ReactNode> = {
    'anxiety': <CloudRain size={24} />,
    'mood-disorders': <Moon size={24} />,
    'trauma-stress': <Shield size={24} />,
    'neurodiversity': <Brain size={24} />,
    'personality-disorders': <Fingerprint size={24} />,
    'addiction': <Anchor size={24} />,
    'eating-disorders': <Scale size={24} />,
    'psychosis': <Activity size={24} />,
    'sleep': <Moon size={24} />,
    'wellness': <Sun size={24} />,
    'mindfulness': <Leaf size={24} />,
    'digital-wellbeing': <Smartphone size={24} />,
    'relationships': <Heart size={24} />,
    'workplace': <Briefcase size={24} />,
    'parenting': <Home size={24} />,
    'grief': <CloudRain size={24} />,
    'anger': <AlertTriangle size={24} />,
    'mens-health': <Users size={24} />,
    'womens-health': <Users size={24} />,
    'lgbtq': <Sparkles size={24} />,
    'therapy-types': <MessageCircle size={24} />,
    'medication': <LifeBuoy size={24} />
};

export const defaultIcon = <Brain size={24} />;
