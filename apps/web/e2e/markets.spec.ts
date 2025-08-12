import { test, expect } from '@playwright/test';

test('markets table navigates to asset page', async ({ page }) => {
  await page.goto('/markets');
  const firstRow = page.locator('tbody tr').first();
  await expect(firstRow).toBeVisible();
  await firstRow.click();
  await expect(page.locator('h1')).toBeVisible();
});
