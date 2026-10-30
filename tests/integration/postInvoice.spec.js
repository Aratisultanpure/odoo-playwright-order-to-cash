import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { PostInvoicePage } from '../../PageObject/PostInvoicePage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

test('Post invoice - draft invoice becomes posted @integration', async ({ page }) => {

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

  const postInvoicePage = new PostInvoicePage(page);

  await postInvoicePage.createDraftInvoice();
  await postInvoicePage.postInvoice();
  await postInvoicePage.expectInvoicePosted();
});