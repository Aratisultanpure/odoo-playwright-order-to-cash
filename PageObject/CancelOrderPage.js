import { expect } from '@playwright/test';

export class CancelOrderPage {
  constructor(page) {
    this.page = page;

    this.cancelButton = page
      .locator('.o_statusbar_buttons button[name="action_cancel"]')
      .first();

    this.wizardCancelButton = page.getByRole('button', {
      name: 'Yes, cancel order'
    });

    this.statusCurrent = page.locator(
      '.o_statusbar_status .o_arrow_button_current'
    );

    this.createInvoiceButton = page.getByRole('button', {
      name: 'Create Invoice',
      exact: true
    });
  }

  async cancelOrder() {
    await expect(this.cancelButton).toBeVisible({
      timeout: 10000
    });

    await this.cancelButton.click();

    await expect(this.wizardCancelButton).toBeVisible({
      timeout: 10000
    });

    await this.wizardCancelButton.click();
  }

  async expectOrderCancelled() {
    await expect(this.statusCurrent).toContainText(
      'Cancelled',
      {
        timeout: 15000
      }
    );
  }

  async expectCreateInvoiceNotAvailable() {
    await expect(this.createInvoiceButton).toBeHidden({
      timeout: 10000
    });
  }
}