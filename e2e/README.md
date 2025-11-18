# E2E Tests with Playwright

This directory contains end-to-end tests for the SAVI application using **Playwright**.

## Files

- **homepage.spec.ts** - Tests for homepage navigation and basic flows
- **auth.spec.ts** - Tests for login/register flows and validation
- **products.spec.ts** - Tests for product catalog, search, and cart interactions

## Running Tests

### Interactive Mode (UI)
```bash
npm run test:e2e -- --ui
```

### Headless Mode
```bash
npm run test:e2e
```

### Run Specific Test File
```bash
npm run test:e2e -- e2e/homepage.spec.ts
```

### Debug Mode
```bash
npm run test:e2e -- --debug
```

## Configuration

Tests are configured in `playwright.config.ts` with:
- **Base URL**: `http://localhost:5173` (dev server)
- **Browsers**: Chromium (can be extended to Firefox, Safari)
- **Screenshots**: On failure only
- **Traces**: On first retry for debugging

## Notes

- Tests assume the dev server is running (`npm run dev`)
- Tests use flexible selectors (role-based, text matching) to reduce brittleness
- Timeout: 5000ms for dynamic content (adjust if needed)
- All tests are non-destructive and can be run repeatedly

## Example: Add a New Test

```typescript
test('should perform action', async ({ page }) => {
  await page.goto('/');
  await page.getByText(/Search Term/i).click();
  await expect(page.getByText(/Expected Result/i)).toBeVisible();
});
```

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run E2E Tests
  run: npm run test:e2e
```
