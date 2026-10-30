// PageObject/LoginPage.js

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="login"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async gotoLoginPage() {
    await this.page.goto('/web/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

    await this.page
      .locator('.o_main_navbar')
      .waitFor({ state: 'visible', timeout: 15000 });
  }
}