import { expect } from '@playwright/test';

export class OrderToCashPage {
  constructor(page) {
    this.page = page;

    this.statusCurrent = page.locator(
      '.o_statusbar_status .o_arrow_button_current'
    );

    this.invalidField = page
      .locator('.o_field_invalid, .o_notification_error')
      .first();
  }

  // Confirm was rejected: validation error shown and still a quotation
  async expectConfirmRejected() {
    await expect(this.invalidField).toBeVisible({
      timeout: 10000
    });

    await expect(this.statusCurrent).toContainText(
      'Quotation',
      { timeout: 10000 }
    );
  }
}