const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");

describe("Verifing if key features/menus on the home page are present", function () {

    it("Verify if the WM logo is present on the landing page", async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://wealthmarketshop.com');

        await driver.findElement(By.className("header-logo"));

        driver.close();

    })

    it("Verify if the menu to view the list of sellers is present on the landing page", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://wealthmarketshop.com');

        let listOfSellersMenu = await (await driver.findElement(By.id('kb_displaynav1_links_container'))).getText();
        assert.strictEqual(listOfSellersMenu, "Sellers", 'The Menu for Sellers');

        driver.quit();

    })

    it("Verify if the menu to view user's wishlist is present on the landing page", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        //A user have to sign in before he can seen the wishlist menu

        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        //successful log in
        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000);

        //Check for the wishlist menu
        await driver.findElement(By.id('login_wish'));

        // close browser session 
        driver.close();
    })

    it(`Verify if the control menu 'dashboard' where a user can manage all his/her activities 
    as a seller on the ecommerce is present`, async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        //A user have to sign in before he can seen the wishlist menu

        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        //successful log in
        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000);

        //Check for the wishlist menu
        await driver.findElement(By.className('link hidden-md-up')).getText();

        // close browser session 
        driver.close();
    })

    it('Verify if all the menus to control a seller account are present', async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        //To control your seller account you must have logged in, so we start be attempting to login
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        //successful log in
        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000);

        //Check if all the menus are available
        let sellerMenus = await driver.findElement(By.className('link hidden-md-up')).getText();

        assert.equal(sellerMenus,
            ('Dashboard\n' +
                'Seller Profile\n' +
                'Products\n' +
                'Orders\n' +
                'Product Reviews\n' +
                'My Reviews\n' +
                'Earning\n' +
                'Transactions\n' +
                'Payout Request\n' +
                'Category Request\n' +
                'Shipping\n' +
                'GDPR\n' +
                'CSV/XML Import/Export\n' +
                'Ticket System\n' +
                'Booking Products\n' +
                'Booking Price Rules'
            )
        )


        // close browser session 
        driver.close();
    })

    it('Verify if all the menus to control a customer account are present', async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        //To control your seller account you must have logged in, so we start be attempting to login
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        //successful log in
        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000);

        //check if all teh menus are available
        let customerMenus = await (await driver.findElement(By.className('account-list'))).getText();
        assert.equal(customerMenus,
            ('Personal info\n' +
                'Merchandise returns\n' +
                'Orders\n' +
                'Credit slips\n' +
                'Addresses\n' +
                'Vouchers\n' +
                'My alerts\n' +
                'Seller Ticket Status\n' +
                'Become a seller\n' +
                'My wishlist\n' +
                'Sign out'
            )
        )

        // close browser session 
        driver.close();
    })

})


