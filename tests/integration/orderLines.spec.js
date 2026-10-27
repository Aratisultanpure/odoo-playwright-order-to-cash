const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const { QuotationPage } = require('../../PageObject/QuotationPage');
const { OrderLinesPage } = require('../../PageObject/OrderLinesPage');
const testData = require('../../utils/testData.json');

test('Order lines - add two product lines @integration', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(
  process.env.ODOO_USERNAME,
  process.env.ODOO_PASSWORD
);

  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();

  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);

  const orderLinesPage = new OrderLinesPage(page);
  await orderLinesPage.showProductColumn();
  await orderLinesPage.addProductLine(testData.productSearchTerm, 1);
  await orderLinesPage.addProductLine(testData.secondProductSearchTerm, 2);
  await orderLinesPage.expectLineCount(2);
});