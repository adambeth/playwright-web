// This is a sample config for what users might be running locally
const config = {
  use: {
    baseURL: "https://staging.getmyboat.com",
    httpCredentials: {
      username: "gmb",
      password: "sailwithme",
    },
    testIdAttribute: "data-test",
  },

  testDir: "./tests",
  testMatch: "**/**_tests*.js",

  /* Maximum time one test can run for. */
  timeout: 40000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* tests in parallel */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "line",
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
        viewport: null, // Disable the default viewport
        args: ["--start-maximized"], // Start the browser maximized
      },
    },
  ],
};

module.exports = config;
