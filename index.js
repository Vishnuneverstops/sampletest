const {
  Builder,
  WebDriverWait,
  By,
  Key,
  until
} = require("selenium-webdriver");

async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // load page
    await driver.get("https://www.ab-in-den-urlaub.de/");
    // switch to hotel (city)
    const abcd = await driver.findElement(
      By.xpath("//label[@for='formSwitcher-hotel']")
    );
    await driver.executeScript("arguments[0].click();", abcd);
    // Enter madrid and select madrid option on list shows up
    const input = await waitFind(
      driver,
      By.xpath("//*[@id='base[searchTerm]']")
    );
    await driver.wait(until.elementIsVisible(input), 10000);
    await input.sendKeys("Madrid", Key.RETURN);
    const madridOption = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']/div[1]/div[1]/div/div[2]/ul/ul[1]/li/ul/li[1]/a"
      )
    );
    await driver.wait(until.elementIsVisible(madridOption), 10000);
    madridOption.click();
    // open 'from' datepicker
    const date1picker = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//input[@class='datepicker-input datepicker-input-start']"
      )
    );
    await driver.executeScript("arguments[0].click();", date1picker);
    // navigate to november, select date from datepicker
    const arrowItem = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//div[@class='datepicker-layer start-input']//span[@class='month-button month-button-next icon-arrow-right-bold']"
      )
    );
    await driver.executeScript("arguments[0].click();", arrowItem);
    const dateItem = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//div[@class='datepicker-layer start-input']//div[@class='month month-10 year-2019']//td[@class='day day-25']"
      )
    );
    await driver.executeScript("arguments[0].click();", dateItem);

    let arrow2Item = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//div[@class='datepicker-layer end-input']//span[@class='month-button month-button-next icon-arrow-right-bold']"
      )
    );
    const isToDatePickerVisible = await arrow2Item.isDisplayed();
    if (!isToDatePickerVisible) {
      // open 'to' datepicker
      const date2picker = await waitFind(
        driver,
        By.xpath(
          "//*[@id='hotel']//input[@class='datepicker-input datepicker-input-end']"
        )
      );
      await driver.executeScript("arguments[0].click();", date2picker);
      arrow2Item = await waitFind(
        driver,
        By.xpath(
          "//*[@id='hotel']//div[@class='datepicker-layer end-input']//span[@class='month-button month-button-next icon-arrow-right-bold']"
        )
      );
    }
    // navigate to november, select date from datepicker
    let date2Item = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//div[@class='datepicker-layer end-input']//div[@class='month month-10 year-2019']//td[@class='day day-29']"
      )
    );
    const isDate2Visible = await date2Item.isDisplayed();
    if (!isDate2Visible) {
      await driver.executeScript("arguments[0].click();", arrow2Item);
      await waitFind(
        driver,
        By.xpath(
          "//*[@id='hotel']//div[@class='datepicker-layer end-input']//div[@class='month month-10 year-2019']//td[@class='day day-29']"
        )
      );
    }
    await driver.executeScript("arguments[0].click();", date2Item);
    // go to offers
    const submit = await waitFind(
      driver,
      By.xpath(
        "//*[@id='hotel']//div[@class='button-submit form-submit']//input[@id='submit']"
      )
    );
    await driver.executeScript("arguments[0].click();", submit);
    // select 5 stars
    const fiveStar = await waitFind(
      driver,
      By.xpath("//*[@id='filter-hotel-category5']")
    );
    await driver.executeScript("arguments[0].click();", fiveStar);
    // select best rating
    const bestRating = await waitFind(
      driver,
      By.xpath(
        "//*[@id='pageWrapper']//label[@class='filter-label rating-color5']"
      )
    );
    await driver.executeScript("arguments[0].click();", bestRating);
    // sort
    const priceSort = await waitFind(
      driver,
      By.xpath(
        "//*[@id='interaction-container']//li[@class='js-baseFrame-sortElement js-baseFrame-sort-icon inactive']"
      )
    );
    const dataDirection = await priceSort.getAttribute("data-direction");
    if (dataDirection === "asc") {
      await driver.executeScript("arguments[0].click();", priceSort);
    }
  } finally {
    // await driver.quit();select-icon hc-icon-star-50
  }
};
example();

const waitFind = (driver, locator) => {
  return driver.findElement(async () => {
    await driver.wait(until.elementLocated(locator));
    return driver.findElement(locator);
  });
};
