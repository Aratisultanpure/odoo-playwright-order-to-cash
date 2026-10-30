import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.salesApp = 'a.o_app:has-text("Sales")';
    this.invoicingApp = 'a.o_app:has-text("Invoicing")';
  }

  async verifyDashboardLoaded() {
    await expect(
      this.page.locator('div.o_app')
    ).toBeVisible();
  }

  async openSalesApp() {
    await expect(
      this.page.locator(this.salesApp)
    ).toBeVisible();

    await this.page.click(this.salesApp);
  }

  async openInvoicingApp() {
    await expect(
      this.page.locator(this.invoicingApp)
    ).toBeVisible();

    await this.page.click(this.invoicingApp);
  }
}