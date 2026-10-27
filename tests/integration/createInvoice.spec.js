const { test } = require('@playwright/test');
const { LoginPage } = require('../../PageObject/LoginPage');
const { SalesPage } = require('../../PageObject/SalesPage');
const { QuotationPage } = require('../../PageObject/QuotationPage');
const { CreateInvoicePage } = require('../../PageObject/CreateInvoicePage');
const testData = require('../../utils/testData.json');

let createInvoicePage;

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

  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(testData.productName, testData.quantity); // adds line + confirms

  createInvoicePage = new CreateInvoicePage(page);
  await createInvoicePage.expectOrderConfirmed();
});
//testcase-1
test('Create invoice - open invoice wizard @integration', async () => {
  await createInvoicePage.clickCreateInvoice();
  await createInvoicePage.expectInvoiceWizardOpened();
});
//testcase-2
test('Create invoice - generate draft invoice @integration', async () => {
  await createInvoicePage.clickCreateInvoice();
  await createInvoicePage.expectInvoiceWizardOpened();
  await createInvoicePage.createDraftInvoice();
  await createInvoicePage.expectDraftInvoiceCreated();
});