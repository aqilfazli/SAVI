import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/');
    
    // Click login button/link
    const loginBtn = page.getByRole('button').filter({ hasText: /Login|Masuk/i }).first();
    if (await loginBtn.isVisible()) {
      await loginBtn.click();
    } else {
      // Try finding link
      await page.getByText(/Login|Masuk/i).first().click();
    }
    
    // Should show login form
    await expect(page.getByLabel(/Email|Username/i)).toBeVisible();
    await expect(page.getByLabel(/Password|Kata Sandi/i)).toBeVisible();
  });

  test('should show register page', async ({ page }) => {
    await page.goto('/');
    
    // Click register button/link
    const registerBtn = page.getByRole('button').filter({ hasText: /Register|Daftar/i }).first();
    if (await registerBtn.isVisible()) {
      await registerBtn.click();
    } else {
      await page.getByText(/Register|Daftar/i).first().click();
    }
    
    // Should show registration form
    await expect(page.getByLabel(/Email|Username/i)).toBeVisible();
    await expect(page.getByLabel(/Password|Kata Sandi/i)).toBeVisible();
    await expect(page.getByLabel(/Confirm|Ulangi/i)).toBeVisible();
  });

  test('should reject invalid login attempt', async ({ page }) => {
    await page.goto('/');
    
    const loginBtn = page.getByRole('button').filter({ hasText: /Login|Masuk/i }).first();
    if (await loginBtn.isVisible()) await loginBtn.click();
    
    // Fill empty credentials
    const emailInput = page.getByLabel(/Email|Username/i);
    const passwordInput = page.getByLabel(/Password|Kata Sandi/i);
    const submitBtn = page.getByRole('button', { name: /Login|Masuk|Submit/i }).first();
    
    if (await emailInput.isVisible()) {
      await emailInput.fill('');
      await passwordInput.fill('');
      await submitBtn.click();
      
      // Should show error message
      await expect(page.getByText(/required|wajib|must fill/i)).toBeVisible({ timeout: 5000 });
    }
  });
});
