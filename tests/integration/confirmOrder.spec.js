const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const { QuotationPage } = require('../../PageObject/QuotationPage');
const { ConfirmOrderPage } = require('../../PageObject/ConfirmOrderPage');
const testData = require('../../utils/testData.json');

test('Confirm order - quotation becomes sales order @integration', async ({ page }) => {
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
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(testData.productName, testData.quantity); // adds line + confirms

  const confirmOrderPage = new ConfirmOrderPage(page);
  await confirmOrderPage.expectSalesOrder();
  await confirmOrderPage.expectOrderNumberGenerated();
  await confirmOrderPage.expectCreateInvoiceAvailable();
});