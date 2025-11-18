import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage and display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check for hero section elements
    await expect(page).toHaveTitle(/SAVI/i);
    
    // Check for hero heading
    const heroText = page.getByRole('heading', { level: 1 }).first();
    await expect(heroText).toBeVisible();
    
    // Check for navigation
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    
    // Look for products navigation link
    await page.getByText(/Produk/i).click();
    
    // Should show products
    await expect(page.getByText(/Smart IoT|Hydroponic/i)).toBeVisible();
  });

  test('should navigate to forum page', async ({ page }) => {
    await page.goto('/');
    
    // Look for forum/community link
    await page.getByText(/Forum|Komunitas/i).click();
    
    // Should show forum content
    await expect(page.getByText(/Forum|Thread/i)).toBeVisible();
  });
});
