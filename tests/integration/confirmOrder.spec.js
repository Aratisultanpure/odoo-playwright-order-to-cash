import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { ConfirmOrderPage } from '../../PageObject/ConfirmOrderPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

test('Confirm order - quotation becomes sales order @integration', async ({ page }) => {

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

  const confirmOrderPage = new ConfirmOrderPage(page);
  await confirmOrderPage.expectSalesOrder();
  await confirmOrderPage.expectOrderNumberGenerated();
  await confirmOrderPage.expectCreateInvoiceAvailable();
});