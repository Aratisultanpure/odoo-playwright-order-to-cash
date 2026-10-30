import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { OrderLinesPage } from '../../PageObject/OrderLinesPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

test('Order lines - add two product lines @integration', async ({ page }) => {
  
  await page.goto('/odoo');

  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();

  const quotationPage = new QuotationPage(page);
  await quotationPage.enterCustomer(testData.customerName);

  const orderLinesPage = new OrderLinesPage(page);

  await orderLinesPage.showProductColumn();
  await orderLinesPage.addProductLine(
    testData.productSearchTerm,
    1
  );

  await orderLinesPage.addProductLine(
    testData.secondProductSearchTerm,
    2
  );

  await orderLinesPage.expectLineCount(2);
});