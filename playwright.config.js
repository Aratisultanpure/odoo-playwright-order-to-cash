import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  use: {
    baseURL: process.env.BASE_URL,
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 500,
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/auth.json',
      },
      dependencies: ['setup'],
      testIgnore: /.*\.setup\.js/,
    },
  ],

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
  ],
});