import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.goto('/odoo');

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
  await quotationPage.addOrderLine(
    testData.productName,
    testData.quantity
  );
});