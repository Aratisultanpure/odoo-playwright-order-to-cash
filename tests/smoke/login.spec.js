const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');

test('Login smoke test @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.login(
    process.env.ODOO_USERNAME,
    process.env.ODOO_PASSWORD
  );
});