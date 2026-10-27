const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const { QuotationPage } = require('../../PageObject/QuotationPage');
const { PostInvoicePage } = require('../../PageObject/PostInvoicePage');
const { CancelOrderPage } = require('../../PageObject/CancelOrderPage');
const { OrderToCashPage } = require('../../PageObject/OrderToCashPage');
const testData = require('../../utils/testData.json');

let quotationPage;

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

  quotationPage = new QuotationPage(page);
});

test('Order to cash - quotation to posted invoice @system', async ({ page }) => {
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(testData.productName, testData.quantity);

  const postInvoicePage = new PostInvoicePage(page);
  await postInvoicePage.createDraftInvoice();
  await postInvoicePage.postInvoice();
  await postInvoicePage.expectInvoicePosted();
  await postInvoicePage.expectInvoiceCustomer(testData.customerName);
});

test('Order to cash - confirm without customer is rejected @system', async ({ page }) => {
  // customer deliberately skipped
  await quotationPage.addOrderLine(testData.productName, testData.quantity);

  const orderToCashPage = new OrderToCashPage(page);
  await orderToCashPage.expectConfirmRejected();
});

test('Order to cash - cancelled order cannot be invoiced @system', async ({ page }) => {
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(testData.productName, testData.quantity);

  const cancelOrderPage = new CancelOrderPage(page);
  await cancelOrderPage.cancelOrder();
  await cancelOrderPage.expectOrderCancelled();
  await cancelOrderPage.expectCreateInvoiceNotAvailable();
});