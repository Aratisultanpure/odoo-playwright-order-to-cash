require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://testyantra.odoo.com',
    headless: false,
    slowMo: 1000
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});