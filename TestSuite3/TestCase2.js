const { Builder, Browser, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const should = require('chai').should();


describe("Managing listed product by a seller", function () {
    
    let driver;
    //Open the browser
    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });
    // Close browser
    after(async function () {
        await driver.quit();
    });


    it("Delete a product (first product on the table)", async function () {
        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        await driver.manage().window().maximize();

        // Fill in the login form
        const emailInput = await driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = await driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = await driver.findElement(By.id('submit-login'));
        loginButton.click();

        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000, 'Should load dashboard page');

        //Scrolldown the window
        await driver.executeScript("window.scrollBy(0, 500)");

        // The element that holds the seller product menu 
        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div[2]/div/section/section/div/div/div/a[3]/span")).click();

        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Delete the first product of the table
        let nameOfToBeDeletedProduct = await driver.findElement(By.xpath("//tr/td[4]")).getText().then(function (value) {
            return value
        });
        
        console.log(nameOfToBeDeletedProduct)

        //Delete button
        await driver.findElement(By.xpath("//tr/td[11]/a[2]/i")).click();

        // Switch to the alert
        const alert = await driver.switchTo().alert();

        // Click the OK button
        await alert.accept();

        //Verify the product has been deleted succesffully
        //Get a success message
        let successMessage = await driver.findElement(By.xpath('/html/body/main/section/div/div/div/div/div/div/div[2]/div/div[1]/ul/li')).getText();

        console.log(successMessage)

        successMessage.should.equal("Product has been deleted successfully.");

        //The product name is no longer on the list.
        let theNameOfFirstProductOnTheTable = await driver.findElement(By.xpath("//tr/td[4]")).getText().then(function (value) {
            return value
        });
        theNameOfFirstProductOnTheTable.should.not.equal(nameOfToBeDeletedProduct);
    });

    it("Edit product (first product on the table)", async function () {


        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        await driver.manage().window().maximize();

        // Fill in the login form
        const emailInput = await driver.findElement(By.name('email'));
        emailInput.sendKeys('seunjr7@gmail.com');

        const passwordInput = await driver.findElement(By.name('password'));
        passwordInput.sendKeys('economicedu156');

        // Submit the login form
        const loginButton = await driver.findElement(By.id('submit-login'));
        loginButton.click();

        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 5000, 'Should load dashboard page');

        //Scrolldown the window
        await driver.executeScript("window.scrollBy(0, 500)");

        // The element that holds the seller product menu 
        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div[2]/div/section/section/div/div/div/a[3]/span")).click();

        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Delete the first product of the table
        let nameOfToBeDeletedProduct = await driver.findElement(By.xpath("//tr/td[4]")).getText().then(function (value) {
            return value
        });

        console.log(nameOfToBeDeletedProduct)


        // // Navigate directly to the product list page
        // await driver.get('https://wealthmarketshop.com/index.php?fc=module&module=kbmarketplace&controller=kbproduct');

        //Edit button
        await driver.findElement(By.xpath("//tr/td[11]/a[1]")).click();

        //Change Price
        await driver.findElement(By.id("price")).sendKeys("50000")

        //Change the quantity
        await driver.findElement(By.id("kb_product_quantity")).clear()
        await driver.findElement(By.id("kb_product_quantity")).sendKeys("120")

        //Save Button
        await driver.findElement(By.xpath("//button[2]")).click();

        

    });

    it("", async function () {

    });

    it("", async function () {

    });
})