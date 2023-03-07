const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");

describe("Test for Login", function () {

    it("Valid scenario", async function () {

        // Set up the Selenium WebDriver instance
        let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000, 'Showld load dashboard page');

        // close browser session 
        driver.close();

    })

})
