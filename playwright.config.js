const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  testMatch: '**/*.spec.js',

  // Test execution settings
  timeout: 120000,
  expect: {
    timeout: 15000
  },

  // Run tests in parallel
  fullyParallel: false,
  workers: 1,

  // Retry failed tests
  retries: 0,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/test-results.json' }],
    ['list']
  ],

  // Browser and test settings
  use: {
    baseURL: 'https://www.swifttranslator.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Browser context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Navigation timeout
    navigationTimeout: 60000,
    actionTimeout: 30000
  },

  // Configure browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  // Output folder for test artifacts
  outputDir: 'test-results/artifacts',
});
