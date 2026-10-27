const { expect } = require('@playwright/test');

class ConfirmOrderPage {
  constructor(page) {
    this.page = page;
    this.statusCurrent = page.locator('.o_statusbar_status .o_arrow_button_current');
    // PageObject/ConfirmOrderPage.js
this.orderNumber = page.locator('h1 div[name="name"]');
    this.createInvoiceButton = page.getByRole('button', { name: 'Create Invoice', exact: true });
  }

  async expectSalesOrder() {
    await expect(this.statusCurrent).toContainText('Sales Order', { timeout: 15000 });
  }

  async expectOrderNumberGenerated() {
    await expect(this.orderNumber).toContainText(/S\d+/, { timeout: 10000 });
  }

  async expectCreateInvoiceAvailable() {
    await expect(this.createInvoiceButton).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { ConfirmOrderPage };