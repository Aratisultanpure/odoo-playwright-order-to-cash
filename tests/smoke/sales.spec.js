import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';

test('Sales smoke test @smoke', async ({ page }) => {
  const salesPage = new SalesPage(page);

  await page.goto('/odoo');

  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();
});