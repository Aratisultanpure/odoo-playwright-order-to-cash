const { expect } = require('@playwright/test');

class QuotationPage {
  constructor(page) {
    this.page = page;
    this.customerField = '//input[@id="partner_id_0"]';
    this.suggestionItem = '.ui-menu-item-wrapper';
  }

  async enterCustomer(name) {
  const customerInput = this.page.locator(this.customerField);
  await expect(customerInput).toBeVisible();
  await customerInput.click();
  await customerInput.pressSequentially(name, { delay: 80 });

  // exact match excludes the 'Create "Testyantra"' option
  const matchingSuggestion = this.page
    .getByRole('option', { name, exact: true })
    .first();
  await expect(matchingSuggestion).toBeVisible({ timeout: 10000 });
  await matchingSuggestion.click();
}

  async selectPaymentTerm(term) {
    const paymentField = '//input[contains(@id,"payment_term_id")]';
    await expect(this.page.locator(paymentField)).toBeVisible();
    await this.page.click(paymentField);
    await this.page.fill(paymentField, term);

    const matchingSuggestion = this.page.locator(this.suggestionItem, { hasText: term });
    await expect(matchingSuggestion).toBeVisible();
    await matchingSuggestion.click();
  }

  async addOrderLine(productName, quantity) {
  // Step 0: make sure the Product column is visible
  await this.page.locator('.o_optional_columns_dropdown_toggle').click();
  const productOption = this.page.getByRole('checkbox', { name: 'Product', exact: true });
  if (!(await productOption.isChecked())) {
    await productOption.check();
  }
  await this.page.keyboard.press('Escape'); // close the dropdown

  // Step 1: Add Line
  await this.page.getByRole('button', { name: 'Add Line', exact: true }).click();

  // Step 2: product field of the row being edited
  const row = this.page.locator('.o_data_row.o_selected_row');
  const productInput = row
    .locator('[name="product_template_id"] input, [name="product_id"] input')
    .first();
  await expect(productInput).toBeVisible({ timeout: 10000 });
  await productInput.click();
  await productInput.pressSequentially('E5023', { delay: 100 });

  const option = this.page
    .locator('.o-autocomplete--dropdown-item, .ui-menu-item-wrapper')
    .filter({ hasText: 'E5023' })
    .first();
  await expect(option).toBeVisible({ timeout: 10000 });
  await option.click();

  // Step 3: quantity
  const qty = row.locator('[name="product_uom_qty"] input');
  await qty.fill(quantity.toString());

  // Step 4: Confirm
  const confirm = this.page.locator('button[name="action_confirm"]');
  await expect(confirm).toBeVisible({ timeout: 10000 });
  await confirm.click();
}
}

module.exports = { QuotationPage };
