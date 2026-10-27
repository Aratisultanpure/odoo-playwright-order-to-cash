const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const { QuotationPage } = require('../../PageObject/QuotationPage');
const testData = require('../../utils/testData.json');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login(
  process.env.ODOO_USERNAME,
  process.env.ODOO_PASSWORD
);
  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();
});

test('Quotation smoke test - enter customer @smoke', async ({ page }) => {
  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);
});

test('Quotation smoke test - enter customer and payment term @smoke', async ({ page }) => {
  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
});

test('Quotation smoke test - full quotation @smoke', async ({ page }) => {
  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(testData.productName, testData.quantity);
});
