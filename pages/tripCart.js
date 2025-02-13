const { expect } = require("@playwright/test");

exports.TripCart = class TripCart {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.mobileDrawToggle = page.getByTestId("open-bottom-sheet-toggle-button");
    this.durationDropDown = page.getByTestId("duration-dropdown");
    this.durationDropDownOptions = page.getByTestId("list-option");
    this.baseCost = page.getByTestId("base-cost-amount");
    this.paymentServiceFee = page.getByTestId("payment-service-fee-amount");
    this.captainCost = page.getByTestId("captain-cost-amount");
    this.totalCost = page.getByTestId("total-amount");
    this.multiDayToggleWeb = page.getByTestId("same-day-toggle");
    this.multiDayToggleMobile = page.getByTestId("multi-day-toggle");
    this.noCaptainOptions = page.getByText("No Captain");
    this.btnClose = page.getByTestId("close-button");
  }

  /**
   * Toggles the mobile drawer.
   */
  async toggleMobileDraw() {
    await this.mobileDrawToggle.click();
  }
  /**
   * Toggles multi-day
   */
  async toggleMultiDay(isMobile) {
    isMobile
      ? await this.multiDayToggleMobile.click()
      : await this.multiDayToggleWeb.click();
  }
  /**
   * Gets the text from the base cost element.
   */
  async getBaseCostText(isMobile) {
    return isMobile
      ? await this.baseCost.nth(1).textContent()
      : await this.baseCost.textContent();
  }

  /**
   * Gets the text from the total cost element.
   */
  async getTotalCostText(isMobile) {
    return isMobile
      ? await this.totalCost.nth(1).textContent()
      : await this.totalCost.textContent();
  }

  /**
   * Gets the text from the payment service fee element.
   */
  async getPaymentServiceFeeText(isMobile) {
    return isMobile
      ? await this.paymentServiceFee.nth(1).textContent()
      : await this.paymentServiceFee.textContent();
  }

  /**
   * Gets the text from the captain cost element.
   */
  async getCaptainCostText(isMobile) {
    return isMobile
      ? await this.captainCost.nth(1).textContent()
      : await this.captainCost.textContent();
  }

  /**
   * Clicks the duration dropdown.
   */
  async clickDurationDropDown(isMobile) {
    if (isMobile) {
      // await this.durationDropDown.nth(1).scrollIntoViewIfNeeded();
      await this.durationDropDown.nth(1).click();
    } else {
      await this.durationDropDown.click();
    }
  }

  /**
   * Gets the values of the options in the duration dropdown.
   * @returns {Promise<string[]>} Array of option values.
   */
  async getDurationDropDownOptions() {
    const options = await this.durationDropDownOptions.all();
    const values = [];
    for (const option of options) {
      values.push(await option.textContent());
    }
    return values;
  }

  /**
   * Clicks the "No Captain" option.
   */
  async clickNoCaptainOption(isMobile) {
    isMobile
      ? await this.noCaptainOptions.nth(1).click()
      : await this.noCaptainOptions.click();
  }

  // Additional methods for interacting with other elements can be added here
  // For example:
  // async selectDuration(duration) {
  //   await this.durationDropDown.selectOption({ label: duration });
  // }
};
