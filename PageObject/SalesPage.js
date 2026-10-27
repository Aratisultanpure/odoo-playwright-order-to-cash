// PageObject/SalesPage.js
const { expect } = require('@playwright/test');

class SalesPage {
  constructor(page) {
    this.page = page;
    this.salesTile = 'a.o_app:has-text("Sales")';
    this.newDropdown = 'button:has-text("New")';
    this.newQuotationOption = '.dropdown-menu >> text=Quotation'; // scoped to dropdown
  }

  async openSalesApp() {
    await expect(this.page.locator(this.salesTile)).toBeVisible();
    await this.page.click(this.salesTile);
    await this.page.waitForURL('**/sales**');
  }

  async createNewQuotation() {
  await expect(this.page.locator(this.newDropdown)).toBeVisible();
  await this.page.click(this.newDropdown);

  await expect(this.page.locator(this.newQuotationOption)).toBeVisible();
  await this.page.click(this.newQuotationOption);

  // ✅ Verify Odoo form view opened
  await expect(this.page.locator('.o_form_view')).toBeVisible();
}
}

module.exports = { SalesPage };
