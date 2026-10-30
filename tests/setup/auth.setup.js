// tests/auth/auth.setup.js

import { test } from '@playwright/test';
import { LoginPage } from '../../PageObject/LoginPage.js';

test('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.login(
    process.env.ODOO_USERNAME,
    process.env.ODOO_PASSWORD
  );

  await page.context().storageState({
    path: 'playwright/.auth/auth.json'
  });
});