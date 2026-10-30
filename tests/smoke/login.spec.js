import { test, expect } from '@playwright/test';

test('Login validation @smoke', async ({ page }) => {
  await page.goto('/odoo');

  await expect(page).toHaveURL(/odoo/);

  // Verify user is actually logged in
  await expect(page.getByText('Sales')).toBeVisible();
});