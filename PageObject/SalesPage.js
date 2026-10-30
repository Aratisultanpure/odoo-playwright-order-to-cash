import { expect } from '@playwright/test';

export class SalesPage {
  constructor(page) {
    this.page = page;

    this.salesTile = 'a.o_app:has-text("Sales")';
    this.newDropdown = 'button:has-text("New")';
    this.newQuotationOption =
      '.dropdown-menu >> text=Quotation';
  }

  async openSalesApp() {
    await expect(
      this.page.locator(this.salesTile)
    ).toBeVisible();

    await this.page.click(this.salesTile);

    await this.page.waitForURL('**/sales**');
  }

  async createNewQuotation() {
    await expect(
      this.page.locator(this.newDropdown)
    ).toBeVisible();

    await this.page.click(this.newDropdown);

    await expect(
      this.page.locator(this.newQuotationOption)
    ).toBeVisible();

    await this.page.click(this.newQuotationOption);

    await expect(
      this.page.locator('.o_form_view')
    ).toBeVisible();
  }
}