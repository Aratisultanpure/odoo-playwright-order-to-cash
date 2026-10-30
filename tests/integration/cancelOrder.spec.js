import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { CancelOrderPage } from '../../PageObject/CancelOrderPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

test('Cancel order - confirmed order becomes cancelled @integration', async ({ page }) => {

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

  const cancelOrderPage = new CancelOrderPage(page);
  await cancelOrderPage.cancelOrder();
  await cancelOrderPage.expectOrderCancelled();
});