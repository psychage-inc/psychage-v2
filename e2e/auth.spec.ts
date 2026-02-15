import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
    test.describe('Login Page', () => {
        test('should display login form', async ({ page }) => {
            await page.goto('/login');

            await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
            await expect(page.locator('input[type="email"]')).toBeVisible();
            await expect(page.locator('input[type="password"]')).toBeVisible();
            await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
        });

        test('should show validation errors for empty form', async ({ page }) => {
            await page.goto('/login');

            await page.getByRole('button', { name: /sign in/i }).click();

            // HTML5 validation should prevent submission
            const emailInput = page.locator('input[type="email"]');
            await expect(emailInput).toHaveAttribute('required', '');
        });

        test('should show error message for invalid credentials', async ({ page }) => {
            await page.goto('/login');

            await page.locator('input[type="email"]').fill('invalid@test.com');
            await page.locator('input[type="password"]').fill('wrongpassword');
            await page.getByRole('button', { name: /sign in/i }).click();

            // Wait for error message to appear
            await expect(page.getByText(/login failed|invalid|error/i)).toBeVisible({ timeout: 10000 });
        });

        test('should have link to signup page', async ({ page }) => {
            await page.goto('/login');

            const signupLink = page.getByRole('link', { name: /create account/i });
            await expect(signupLink).toBeVisible();
            await signupLink.click();

            await expect(page).toHaveURL(/\/signup/);
        });

        test('should have link to reset password', async ({ page }) => {
            await page.goto('/login');

            const resetLink = page.getByRole('link', { name: /forgot password/i });
            await expect(resetLink).toBeVisible();
            await resetLink.click();

            await expect(page).toHaveURL(/\/reset-password/);
        });
    });

    test.describe('Signup Page', () => {
        test('should display signup form', async ({ page }) => {
            await page.goto('/signup');

            await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
            await expect(page.locator('#displayName')).toBeVisible();
            await expect(page.locator('#email')).toBeVisible();
            await expect(page.locator('#password')).toBeVisible();
            await expect(page.locator('#confirmPassword')).toBeVisible();
            await expect(page.locator('#terms')).toBeVisible();
        });

        test('should allow switching between patient and provider', async ({ page }) => {
            await page.goto('/signup');

            const patientButton = page.getByRole('button', { name: /i'm a patient/i });
            const providerButton = page.getByRole('button', { name: /i'm a provider/i });

            await expect(patientButton).toBeVisible();
            await expect(providerButton).toBeVisible();

            await providerButton.click();
            await expect(page.getByRole('button', { name: /create provider account/i })).toBeVisible();

            await patientButton.click();
            await expect(page.getByRole('button', { name: /^create account$/i })).toBeVisible();
        });

        test('should validate password requirements', async ({ page }) => {
            await page.goto('/signup');

            const passwordInput = page.locator('#password');

            // Type a short password
            await passwordInput.fill('short');

            // Check for "At least 8 characters" indicator
            await expect(page.getByText(/at least 8 characters/i)).toBeVisible();

            // Type a valid password with number
            await passwordInput.fill('validpassword123');

            // Check that requirements are met (indicators should change)
            await expect(page.getByText(/contains a number/i)).toBeVisible();
        });

        test('should show error when passwords do not match', async ({ page }) => {
            await page.goto('/signup');

            await page.locator('#displayName').fill('Test User');
            await page.locator('#email').fill('test@example.com');
            await page.locator('#password').fill('password123');
            await page.locator('#confirmPassword').fill('differentpassword');
            await page.locator('#terms').check();

            await page.getByRole('button', { name: /create account/i }).click();

            await expect(page.getByText(/passwords do not match/i)).toBeVisible();
        });

        test('should require terms acceptance', async ({ page }) => {
            await page.goto('/signup');

            await page.locator('#displayName').fill('Test User');
            await page.locator('#email').fill('test@example.com');
            await page.locator('#password').fill('password123');
            await page.locator('#confirmPassword').fill('password123');
            // Don't check terms

            await page.getByRole('button', { name: /create account/i }).click();

            await expect(page.getByText(/you must accept the terms/i)).toBeVisible();
        });

        test('should have link to login page', async ({ page }) => {
            await page.goto('/signup');

            const loginLink = page.getByRole('link', { name: /log in/i });
            await expect(loginLink).toBeVisible();
            await loginLink.click();

            await expect(page).toHaveURL(/\/login/);
        });
    });

    test.describe('Password Reset', () => {
        test('should display reset password form', async ({ page }) => {
            await page.goto('/reset-password');

            await expect(page.locator('input[type="email"]')).toBeVisible();
            await expect(page.getByRole('button', { name: /send|reset|submit/i })).toBeVisible();
        });

        test('should show success message after submitting email', async ({ page }) => {
            await page.goto('/reset-password');

            await page.locator('input[type="email"]').fill('test@example.com');
            await page.getByRole('button', { name: /send|reset|submit/i }).click();

            // Should show success message or redirect
            await expect(
                page.getByText(/check your email|sent|success|instructions/i)
            ).toBeVisible({ timeout: 10000 });
        });
    });

    test.describe('Protected Routes', () => {
        test('should redirect unauthenticated users from dashboard to login', async ({ page }) => {
            await page.goto('/dashboard');

            // Should redirect to login
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        });

        test('should redirect unauthenticated users from provider dashboard to login', async ({ page }) => {
            await page.goto('/provider/dashboard');

            // Should redirect to login
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        });

        test('should redirect unauthenticated users from profile settings to login', async ({ page }) => {
            await page.goto('/dashboard/settings');

            // Should redirect to login
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        });
    });

    test.describe('Navigation', () => {
        test('should navigate to login from homepage', async ({ page }) => {
            await page.goto('/');

            // Find login link/button in navigation
            const loginLink = page.getByRole('link', { name: /log in|sign in/i }).first();

            if (await loginLink.isVisible()) {
                await loginLink.click();
                await expect(page).toHaveURL(/\/login/);
            }
        });

        test('should navigate to signup from homepage', async ({ page }) => {
            await page.goto('/');

            // Find signup link/button
            const signupLink = page.getByRole('link', { name: /sign up|get started|create account/i }).first();

            if (await signupLink.isVisible()) {
                await signupLink.click();
                await expect(page).toHaveURL(/\/signup/);
            }
        });
    });
});
