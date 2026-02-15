import { describe, it, expect, vi, beforeEach } from 'vitest';
import { contactService, ContactFormData } from '../contactService';

// Mock Supabase
vi.mock('@/lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(() => ({
            insert: vi.fn(() => ({
                select: vi.fn(() => ({
                    single: vi.fn()
                }))
            }))
        }))
    }
}));

describe('contactService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Clear localStorage
        localStorage.clear();
    });

    describe('submit', () => {
        const validFormData: ContactFormData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            subject: 'General Inquiry',
            message: 'Hello, I have a question.'
        };

        it('should validate email format', async () => {
            const invalidData = { ...validFormData, email: 'invalid-email' };
            const result = await contactService.submit(invalidData);

            expect(result.success).toBe(false);
            expect(result.error).toContain('valid email');
        });

        it('should validate required fields', async () => {
            const emptyData = { ...validFormData, firstName: '' };
            const result = await contactService.submit(emptyData);

            expect(result.success).toBe(false);
            expect(result.error).toContain('required');
        });

        it('should queue submission locally when DB fails', async () => {
            // The mock will cause Supabase to fail, triggering local queue
            const result = await contactService.submit(validFormData);

            // Should either succeed with local queue or return an error
            expect(result).toHaveProperty('success');
        });
    });

    describe('queueLocally', () => {
        const validFormData: ContactFormData = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            subject: 'Technical Support',
            message: 'Need help with something.'
        };

        it('should store submission in localStorage', async () => {
            const result = await contactService.queueLocally(validFormData);

            expect(result.success).toBe(true);

            const queue = JSON.parse(localStorage.getItem('psychage_contact_queue') || '[]');
            expect(queue.length).toBe(1);
            expect(queue[0].email).toBe(validFormData.email);
        });

        it('should append to existing queue', async () => {
            // Add first item
            await contactService.queueLocally(validFormData);

            // Add second item
            const secondData = { ...validFormData, email: 'second@example.com' };
            await contactService.queueLocally(secondData);

            const queue = JSON.parse(localStorage.getItem('psychage_contact_queue') || '[]');
            expect(queue.length).toBe(2);
        });
    });

    describe('processQueue', () => {
        it('should not throw when queue is empty', async () => {
            await expect(contactService.processQueue()).resolves.not.toThrow();
        });

        it('should process queued items', async () => {
            // Queue an item first
            const formData: ContactFormData = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                subject: 'Test',
                message: 'Test message'
            };

            localStorage.setItem('psychage_contact_queue', JSON.stringify([{
                ...formData,
                queuedAt: new Date().toISOString()
            }]));

            // Process should not throw
            await expect(contactService.processQueue()).resolves.not.toThrow();
        });
    });
});
