import { describe, it, expect } from 'vitest';
import {
    fadeIn,
    slideUp,
    slideDown,
    scaleIn,
    staggerContainer,
    glassCardHover,
    navigatorSlide,
    navigatorFade,
} from './animations';

describe('Animation Variants', () => {
    describe('fadeIn', () => {
        it('should start hidden with opacity 0', () => {
            expect(fadeIn.hidden).toEqual({ opacity: 0 });
        });

        it('should animate to visible with opacity 1', () => {
            expect(fadeIn.visible.opacity).toBe(1);
            expect(fadeIn.visible.transition.duration).toBe(0.5);
        });
    });

    describe('slideUp', () => {
        it('should start hidden below with opacity 0', () => {
            expect(slideUp.hidden).toEqual({ opacity: 0, y: 20 });
        });

        it('should animate to visible at y=0', () => {
            expect(slideUp.visible.opacity).toBe(1);
            expect(slideUp.visible.y).toBe(0);
        });
    });

    describe('slideDown', () => {
        it('should start hidden above with opacity 0', () => {
            expect(slideDown.hidden).toEqual({ opacity: 0, y: -20 });
        });

        it('should animate to visible at y=0', () => {
            expect(slideDown.visible.opacity).toBe(1);
            expect(slideDown.visible.y).toBe(0);
        });
    });

    describe('scaleIn', () => {
        it('should start hidden at 90% scale', () => {
            expect(scaleIn.hidden).toEqual({ opacity: 0, scale: 0.9 });
        });

        it('should animate to full scale', () => {
            expect(scaleIn.visible.scale).toBe(1);
            expect(scaleIn.visible.opacity).toBe(1);
        });
    });

    describe('staggerContainer', () => {
        it('should stagger children with delay', () => {
            expect(staggerContainer.visible.transition.staggerChildren).toBe(0.1);
            expect(staggerContainer.visible.transition.delayChildren).toBe(0.2);
        });
    });

    describe('glassCardHover', () => {
        it('should have rest state at scale 1', () => {
            expect(glassCardHover.rest).toEqual({ scale: 1, y: 0 });
        });

        it('should scale up and lift on hover', () => {
            expect(glassCardHover.hover.scale).toBe(1.02);
            expect(glassCardHover.hover.y).toBe(-5);
        });
    });

    describe('navigatorSlide', () => {
        it('should slide in from right for forward direction', () => {
            const enterState = navigatorSlide.enter(1);
            expect(enterState.x).toBe(60);
            expect(enterState.opacity).toBe(0);
        });

        it('should slide in from left for backward direction', () => {
            const enterState = navigatorSlide.enter(-1);
            expect(enterState.x).toBe(-60);
            expect(enterState.opacity).toBe(0);
        });

        it('should exit to left for forward direction', () => {
            const exitState = navigatorSlide.exit(1);
            expect(exitState.x).toBe(-60);
        });

        it('should exit to right for backward direction', () => {
            const exitState = navigatorSlide.exit(-1);
            expect(exitState.x).toBe(60);
        });

        it('should center at x=0 with full opacity', () => {
            expect(navigatorSlide.center.x).toBe(0);
            expect(navigatorSlide.center.opacity).toBe(1);
        });
    });

    describe('navigatorFade', () => {
        it('should enter with opacity 0', () => {
            expect(navigatorFade.enter).toEqual({ opacity: 0 });
        });

        it('should center with opacity 1', () => {
            expect(navigatorFade.center.opacity).toBe(1);
        });

        it('should exit with opacity 0', () => {
            expect(navigatorFade.exit.opacity).toBe(0);
        });
    });
});
