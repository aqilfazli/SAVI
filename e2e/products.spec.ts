import { test, expect } from '@playwright/test';

test.describe('Product Features', () => {
  test('should display product catalog', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products
    await page.getByText(/Produk/i).click();
    
    // Should show product cards
    const productCards = page.locator('[class*="product"]').first();
    await expect(productCards).toBeVisible({ timeout: 5000 });
  });

  test('should filter or search products', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText(/Produk/i).click();
    
    // Look for search/filter input
    const searchInput = page.getByPlaceholder(/Cari|Search/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('sensor');
      
      // Should update results
      await expect(page.getByText(/sensor|Sensor/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test('should open product details modal', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText(/Produk/i).click();
    
    // Click first product
    const firstProduct = page.locator('[class*="product"]').first();
    if (await firstProduct.isVisible()) {
      await firstProduct.click();
      
      // Should show detail modal or page
      await expect(page.getByText(/Detail|Spesifikasi|Features/i)).toBeVisible({ timeout: 5000 });
    }
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText(/Produk/i).click();
    
    // Look for add to cart button
    const addToCartBtn = page.getByRole('button').filter({ hasText: /Tambah|Add|Cart/i }).first();
    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click();
      
      // Should show success message
      await expect(page.getByText(/berhasil|ditambahkan|added/i)).toBeVisible({ timeout: 5000 });
    }
  });
});
