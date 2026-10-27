const { expect } = require('@playwright/test');

class CreateInvoicePage {
  constructor(page) {
    this.page = page;
    this.createInvoiceButton = page.getByRole('button', { name: 'Create Invoice', exact: true });
    this.wizard = page.locator('.modal-content');
    this.createDraftInvoiceButton = page.locator('.modal-content button[name="create_invoices"]');
    this.statusCurrent = page.locator('.o_statusbar_status .o_arrow_button_current');
  }

  async expectOrderConfirmed() {
    await expect(this.statusCurrent).toContainText('Sales Order', { timeout: 15000 });
  }

  async clickCreateInvoice() {
    await expect(this.createInvoiceButton).toBeVisible({ timeout: 10000 });
    await this.createInvoiceButton.click();
  }

  async expectInvoiceWizardOpened() {
    await expect(this.wizard).toBeVisible({ timeout: 10000 });
    await expect(this.createDraftInvoiceButton).toBeVisible();
  }

  async createDraftInvoice() {
    await this.createDraftInvoiceButton.click();
  }

  async expectDraftInvoiceCreated() {
    await expect(this.statusCurrent).toContainText('Draft', { timeout: 15000 });
    await expect(this.page.locator('button[name="action_post"]').first()).toBeVisible();
  }
}

module.exports = { CreateInvoicePage };