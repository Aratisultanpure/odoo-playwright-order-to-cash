const { expect } = require('@playwright/test');

class PostInvoicePage {
  constructor(page) {
    this.page = page;
    this.createInvoiceButton = page.getByRole('button', { name: 'Create Invoice', exact: true });
    this.createDraftInvoiceButton = page.locator('.modal-content button[name="create_invoices"]');
    this.postButton = page.locator('button[name="action_post"]').first();
    this.statusCurrent = page.locator('.o_statusbar_status .o_arrow_button_current');
    this.invoiceNumber = page.locator('div[name="name"]');
    this.customerField = page.locator('div[name="partner_id"]');
  }

  async createDraftInvoice() {
    await this.createInvoiceButton.click();
    await expect(this.createDraftInvoiceButton).toBeVisible({ timeout: 10000 });
    await this.createDraftInvoiceButton.click();
    await expect(this.statusCurrent).toContainText('Draft', { timeout: 15000 });
  }

  async postInvoice() {
    await expect(this.postButton).toBeVisible({ timeout: 10000 });
    await this.postButton.click();
  }

  async expectInvoicePosted() {
    await expect(this.statusCurrent).toContainText('Posted', { timeout: 15000 });
    await expect(this.invoiceNumber).toContainText(/INV/, { timeout: 10000 });
  }

  async expectInvoiceCustomer(customerName) {
    await expect(this.customerField).toContainText(customerName);
  }
}

module.exports = { PostInvoicePage };