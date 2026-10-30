import { test } from '@playwright/test';
import { SalesPage } from '../../PageObject/SalesPage.js';
import { QuotationPage } from '../../PageObject/QuotationPage.js';
import { PostInvoicePage } from '../../PageObject/PostInvoicePage.js';
import { CancelOrderPage } from '../../PageObject/CancelOrderPage.js';
import { OrderToCashPage } from '../../PageObject/OrderToCashPage.js';
import testData from '../../utils/testData.json' assert { type: 'json' };

let quotationPage;

test.beforeEach(async ({ page }) => {
  await page.goto('/odoo');

  const salesPage = new SalesPage(page);
  await salesPage.openSalesApp();
  await salesPage.createNewQuotation();

  quotationPage = new QuotationPage(page);
});

test('Order to cash - quotation to posted invoice @system', async ({ page }) => {
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
  await postInvoicePage.expectInvoiceCustomer(
    testData.customerName
  );
});

test('Order to cash - confirm without customer is rejected @system', async ({ page }) => {
  await quotationPage.addOrderLine(
    testData.productName,
    testData.quantity
  );

  const orderToCashPage = new OrderToCashPage(page);
  await orderToCashPage.expectConfirmRejected();
});

test('Order to cash - cancelled order cannot be invoiced @system', async ({ page }) => {
  await quotationPage.enterCustomer(testData.customerName);
  await quotationPage.selectPaymentTerm(testData.paymentTerm);
  await quotationPage.addOrderLine(
    testData.productName,
    testData.quantity
  );

  const cancelOrderPage = new CancelOrderPage(page);

  await cancelOrderPage.cancelOrder();
  await cancelOrderPage.expectOrderCancelled();
  await cancelOrderPage.expectCreateInvoiceNotAvailable();
});