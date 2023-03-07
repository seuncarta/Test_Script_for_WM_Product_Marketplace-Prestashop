const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Verifying the process of search for a particaulr product and adding it to cart", function () {

    it("Valid scenario", async function () {

        let driver = await new Builder().forBrowser(Browser.CHROME).build();

        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // Set the window size to the full screen
        driver.manage().window().maximize();

        // Fill in the login form
        const emailInput = driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = driver.findElement(By.id('submit-login'));
        loginButton.click();

        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 20000, 'Showld load dashboard page');

        //Identify the search bar by name and enter a product name to search for
        await driver.findElement(By.name("s")).sendKeys("Travocort Creme 15 g", Key.RETURN);

        //For the result bar click the item that shows up
        await driver.findElement(By.className("thumbnail product-thumbnail")).click();

        //go to the first seller on the sellers table and click add to cart from the seller
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("//div/section/div[2]/div[2]/div/div[1]/table/tbody/tr/td[9]/div/i[1]")).click();

        //Verify if the check out component pop out by the side when you add a product to cart

        await driver.findElement(By.id("js-cart-sidebar"));


        //click on check out

        // Navigate to a different webpage in the new tab wit the url for check out.
        //I did this becuase I could get it to locate and click the check out element on the above page

        await driver.switchTo().newWindow();

        await driver.get('https://wealthmarketshop.com/index.php?controller=cart&action=show');

        
        await driver.findElement(By.css('body')).sendKeys(Key.CONTROL);
        
        await driver.manage().setTimeouts({ implicit: 5000 });

        // await driver.findElement(By.xpath("//div[1]/div[2]/div[3]/div/a")).click();

        //click on proceed to check out
        await driver.findElement(By.xpath("//div[1]/div[2]/div/div[2]/a")).click();

        //Or you can click on continue shopping if that's what you want
        // await driver.findElement(By.className("btn btn - secondary btn - wrap")).click();

        //Provided you already have a shipping address you will proceed to continue
        await driver.findElement(By.name("confirm-addresses")).click();

        //shiping method 
        // await driver.wait(until.urlIs("https://wealthmarketshop.com/index.php?controller=order"), 2000);

        //Enter delivery message
        await driver.findElement(By.id("delivery_message")).sendKeys("This is my delivery message to you");

        //Enter continue 
        await driver.findElement(By.name("confirmDeliveryOption")).click();


        //select payment method

        //choose your payment method
        let whatYouWantToPayWith = "Pay by Check";

        let paymentMethod = await driver.findElement(By.className("option-text")).click();

        // console.log(paymentMethod);


        //check the box for terms and condition
        await driver.findElement(By.id("conditions_to_approve[terms-and-conditions]")).click();

        //Place the order
        await driver.findElement(By.className("btn btn-primary btn-large btn-wrap")).click();


        //confirm order was placed
        await driver.findElement(By.id("content-hook_order_confirmation"));

        //close browser
        driver.quit();
    });

    // it("", async function () {

    // });

    // it("", async function () {

    // })

})