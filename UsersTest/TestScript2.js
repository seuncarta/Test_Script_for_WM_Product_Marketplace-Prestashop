const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");

describe("Verifing if key features/menus on the home page are present", function () {
    /*
    it("Verify if the WM logo is present", async function () {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://wealthmarketshop.com');
        
        await driver.findElement(By.className("header-logo"));
        
        driver.close();
        
    })
    
    it("Verify if the menu to view the list of sellers is present", async function () {
        
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://wealthmarketshop.com');
        
        let listOfSellersMenu = await (await driver.findElement(By.id('kb_displaynav1_links_container'))).getText();
        assert.strictEqual(listOfSellersMenu, "Sellers", 'The Menu for Sellers');
        
        driver.quit();
        
    })
   
   
    it("Verify if the menu to view user's wishlist is present", async function () {
              
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
        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000 );

        //Check for the wishlist menu
        await driver.findElement(By.id('login_wish'));
                
        // close browser session 
        driver.close();
    })
     

    it(`Verify if the control menu 'dashboard' where a user can manage all his/her activities 
    as a customer on the ecommerce is present`, async function () {

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
        let meme = await driver.findElement(By.className('link hidden-md-up')).getText();
        console.log(meme)

        // close browser session 
        driver.close();
    })
*/
    it('Verify if all the menus to control a customer account are present', async function () {

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
        let customerMenus = await driver.findElement(By.className('link hidden-md-up')).getText();
        console.log(customerMenus)

        assert.equal(customerMenus,
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



})


