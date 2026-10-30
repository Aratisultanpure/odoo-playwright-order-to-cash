import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { CreateInvoicePage } from '../../PageObject/CreateInvoicePage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

let createInvoicePage;

test.beforeEach(async ({ page }) => {
  await page.goto('/odoo');

  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();

  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(
    testData.productName,
    testData.quantity
  );

  createInvoicePage = new CreateInvoicePage(page);
  await createInvoicePage.expectOrderConfirmed();
});

// Test Case 1
test('Create invoice - open invoice wizard @integration', async () => {
  await createInvoicePage.clickCreateInvoice();
  await createInvoicePage.expectInvoiceWizardOpened();
});

// Test Case 2
test('Create invoice - generate draft invoice @integration', async () => {
  await createInvoicePage.clickCreateInvoice();
  await createInvoicePage.expectInvoiceWizardOpened();
  await createInvoicePage.createDraftInvoice();
  await createInvoicePage.expectDraftInvoiceCreated();
});