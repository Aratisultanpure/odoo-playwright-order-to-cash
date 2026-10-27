// tests/smoke/sales.spec.js
const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const testData = require('../../utils/testData.json');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(
  process.env.ODOO_USERNAME,
  process.env.ODOO_PASSWORD
);
});

test('Sales smoke test @smoke', async ({ page }) => {
  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();        // Step 2: click Sales tile
  await salesPage.createNewQuotation();  // Step 3: click New → Quotation
});
