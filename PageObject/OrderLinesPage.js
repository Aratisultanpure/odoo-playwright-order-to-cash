import { expect } from '@playwright/test';

export class OrderLinesPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('.o_list_renderer tbody tr.o_data_row');
  }

  async showProductColumn() {
    await this.page
      .locator('.o_optional_columns_dropdown_toggle')
      .click();

    const option = this.page.getByRole('checkbox', {
      name: 'Product',
      exact: true
    });

    if (!(await option.isChecked())) {
      await option.check();
    }

    await this.page.keyboard.press('Escape');
  }

  async addProductLine(searchTerm, quantity) {
    await this.page
      .getByRole('button', {
        name: 'Add Line',
        exact: true
      })
      .click();

    const row = this.page.locator('.o_data_row').last();

    const productInput = row
      .locator(
        '[name="product_template_id"] input, [name="product_id"] input'
      )
      .first();

    await expect(productInput).toBeVisible({
      timeout: 10000
    });

    await productInput.click();
    await productInput.pressSequentially(searchTerm, {
      delay: 100
    });

    const option = this.page
      .locator(
        '.o-autocomplete--dropdown-item, .ui-menu-item-wrapper'
      )
      .filter({ hasText: searchTerm })
      .first();

    await expect(option).toBeVisible({
      timeout: 10000
    });

    await option.click();

    await expect(
      row.locator('td[name="price_unit"]')
    ).toBeVisible({
      timeout: 10000
    });

    const qtyInput = row.locator(
      '[name="product_uom_qty"] input'
    );

    await qtyInput.fill(quantity.toString());
    await qtyInput.press('Tab');

    await this.page.locator('.o_form_sheet h1').click();

    await this.page.waitForTimeout(1000);
  }

  async expectLineCount(count) {
    await expect(this.rows).toHaveCount(count, {
      timeout: 10000
    });
  }
}