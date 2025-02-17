const { expect, test } = require("@playwright/test");
const { TripCart } = require("../pages/tripCart");
let resp;
let isMobile = false;
test.beforeEach(async ({ context, page }) => {
  resp = await JSON.parse(
    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "getSessionDetails" })}`)
  );

  await context.addCookies([
    {
      name: "2018-06-04-cookie-policy-acknowledged",
      value: "true",
      domain: "staging.getmyboat.com",
      path: "/",
    },
  ]);
  resp.os === "android" || resp.os_version === "Ventura"
    ? (isMobile = true)
    : (isMobile = false);

  // Set viewport to maximized
  !isMobile && (await page.setViewportSize({ width: 1920, height: 1080 }));
});
test("Trip Cart Test - Multiday One, instabook", async ({ page }) => {
  await page.goto("/trips/vA8k5oEm/");
  await page.waitForLoadState("load");

  const tripCart = new TripCart(page);
  if (isMobile) await tripCart.toggleMobileDraw();
  await tripCart.clickDurationDropDown(isMobile);
  const options = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options).toContain("2 hours");
  expect(options).toContain("3 hours");
  expect(options).toContain("Full day");
  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$220.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$28.60");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $248.60");
  // Add more expectations as needed
});

test("Trip Cart Test - Multiday One, instabook to inquiry", async ({
  page,
}) => {
  await page.goto("/trips/vA8k5oEm/");
  await page.waitForLoadState("load");
  const tripCart = new TripCart(page);
  if (isMobile) await tripCart.toggleMobileDraw();
  await tripCart.clickDurationDropDown(isMobile);
  const options = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options).toContain("2 hours");
  expect(options).toContain("3 hours");
  expect(options).toContain("Full day");
  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$220.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$28.60");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $248.60");
  await tripCart.toggleMultiDay(isMobile);
  await tripCart.durationDropDown.click();
  const options2 = await tripCart.getDurationDropDownOptions();
  expect(options2).toContain("2 days");
  expect(options2).toContain("3 days");
  expect(options2).toContain("4 days");
  expect(options2).toContain("5 days");
  expect(options2).toContain("6 days");
  expect(options2).toContain("7 days");
  expect(options2).toContain("8 days");

  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$2,000.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$260.00");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $2,260.00");
  // Add more expectations as needed
});

test("Trip Cart Test - hour", async ({ page }) => {
  await page.goto("/trips/9XWBRDGQ/");
  await page.waitForLoadState("load");

  const tripCart = new TripCart(page);
  if (isMobile) await tripCart.toggleMobileDraw();
  await tripCart.clickDurationDropDown(isMobile);
  const options = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options).toContain("1 hour");
  expect(options).toContain("2 hours");
  expect(options).toContain("3 hours");
  expect(options).toContain("4 hours");
  expect(options).toContain("5 hours");
  expect(options).toContain("6 hours");
  expect(options).toContain("7 hours");
  expect(options).toContain("8 hours");
  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$100.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$13.00");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $113.00");
  // Add more expectations as needed
});

test("Trip Cart Test - Multiday Two", async ({ page }) => {
  await page.goto("/trips/yAoe3jNX/");
  await page.waitForLoadState("load");

  const tripCart = new TripCart(page);
  if (isMobile) await tripCart.toggleMobileDraw();
  isMobile
    ? await tripCart.clickDurationDropDown()
    : await page.getByText("2 days").click();
  const options = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options).toContain("2 days");
  expect(options).toContain("3 days");
  expect(options).toContain("4 days");

  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$2,000.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$260.00");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $2,400.00");
  // Add more expectations as needed
});
test("Trip Cart Test - Multiday Two, Insta with Captains", async ({ page }) => {
  await page.goto("/trips/gAZNGp0A/");
  await page.waitForLoadState("load");

  const tripCart = new TripCart(page);
  if (isMobile) await tripCart.toggleMobileDraw();
  await tripCart.toggleMultiDay(isMobile);
  const options2 = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options2).toContain("2 days");
  expect(options2).toContain("3 days");
  expect(options2).toContain("4 days");
  expect(options2).toContain("5 days");
  expect(options2).toContain("6 days");
  expect(options2).toContain("7 days");
  expect(options2).toContain("8 days");

  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$2,000.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$260.00");
  // expect(await tripCart.getCaptainCostText(isMobile)).toEqual("$150.00");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $2,260.00");
  // Add more expectations as needed
});
test("Trip Cart Test - Multiday Two, Insta without Captains", async ({
  page,
}) => {
  await page.goto("/trips/gAZNGp0A/");
  await page.waitForLoadState("load");

  const tripCart = new TripCart(page);
  isMobile && (await tripCart.toggleMobileDraw());
  await tripCart.toggleMultiDay(isMobile);
  !isMobile && (await tripCart.btnClose.click());
  await tripCart.clickNoCaptainOption(isMobile);
  await page.waitForTimeout(5000);
  expect(await tripCart.getBaseCostText(isMobile)).toEqual("$2,000.00");
  expect(await tripCart.getPaymentServiceFeeText(isMobile)).toEqual("$260.00");
  expect(await tripCart.getTotalCostText(isMobile)).toEqual("USD $2,400.00");
  // Add more expectations as needed
});

test("Trip Cart Test - Hour, Multiday 0", async ({ page }) => {
  await page.goto("/trips/2XN9ZkqQ/");
  await page.waitForLoadState("load");
  const tripCart = new TripCart(page);
  isMobile
    ? expect(await tripCart.getCaptainLabelText(isMobile)).toBe("With Captain")
    : expect(await tripCart.getCaptainLabelText(isMobile)).toBe(
        "Estimated Cost • With Captain (Separate captain fee)"
      );
  isMobile && (await tripCart.toggleMobileDraw());
  const options = await tripCart.getDurationDropDownOptions();

  // Add an expect statement to verify the values of the options
  expect(options).toContain("1 hour");
  expect(options).toContain("2 hours");
  expect(options).toContain("3 hours");
  expect(options).toContain("4 hours");
  expect(options).toContain("Full day");

  // Add more expectations as needed
});
