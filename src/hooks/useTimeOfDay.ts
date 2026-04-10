import { Sun, Sunset, Moon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TimePeriod = 'morning' | 'afternoon' | 'evening';

interface TimeOfDay {
    greeting: string;
    period: TimePeriod;
    icon: LucideIcon;
}

export function useTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return { greeting: 'Good morning', period: 'morning', icon: Sun };
    }
    if (hour >= 12 && hour < 17) {
        return { greeting: 'Good afternoon', period: 'afternoon', icon: Sun };
    }
    return { greeting: 'Good evening', period: 'evening', icon: Sunset };
}
