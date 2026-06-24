/**
 * Tool route + coming-soon maps, shared by the mobile tool tile (`MobileToolCard`)
 * and the Home preview. Kept in a plain module (no component exports) so React
 * Fast Refresh stays happy. Mirrors the desktop `/tools` page maps exactly.
 */

export const getToolLink = (toolId: number): string => {
    switch (toolId) {
        case 1:
            return '/clarity-score';
        case 2:
            return '/tools/mood-journal';
        case 3:
            return '/tools/sleep-architect';
        case 4:
            return '#'; // Breathwork - Coming soon
        case 5:
            return '/providers';
        case 6:
            return '/crisis';
        case 7:
            return '/tools/symptom-navigator';
        case 8:
            return '/tools/mindmate';
        case 10:
            return '/tools/clarity-journal';
        case 11:
            return '/tools/relationship-health';
        case 12:
            return '/tools/medication-tracker';
        default:
            return '#'; // Coming soon
    }
};

export const isComingSoon = (toolId: number): boolean =>
    ![1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12].includes(toolId);
