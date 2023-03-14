const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require("assert");
var should = require("chai").should();


describe("Test for Login", function () {

    it("Verifying not logging before writing a review for a product", async function () {
        let driver = await new Builder().forBrowser("firefox").build();

        await driver.get("https://wealthmarketshop.com/index.php");

        await driver.findElement(By.xpath("//div/div/div[2]/div[2]/div/article[1]/div/div[2]/div[1]")).click();

        await driver.findElement(By.xpath("//div[1]/div[2]/section/div[1]/div/div[5]/div[3]/a/div[2]/span")).click();   

        //Wait for the page to finish loading
        await driver.manage().setTimeouts({ implicit: 2000 });

        let reviewTitle = await driver.findElement(By.id("review_title")).sendKeys("Awsesome Product");

        let reviewText = await driver.findElement(By.id("review_text")).sendKeys("I love the product so much");
        
        let dispplayName = await driver.findElement(By.id("display_name")).sendKeys("Seuncarta");

        let displayEmail = await driver.findElement(By.id("display_email")).sendKeys("seuncarta@gmail.com");

        let rating = await driver.findElement(By.xpath("//div/table/tbody/tr[3]/td[2]/div/div/label[2]")).click();

        let termsConditions = await driver.findElement(By.id("kb_gdpr_tnc_accept")).click();

        let submitButton = await driver.findElement(By.id("kbrc_addreview_button")).click();      

        //Wait for 5 seconds before looking for the element with the success message
        await driver.manage().setTimeouts({ implicit: 2000 });

        let successMessage = await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/span")).getText();
        successMessage.should.equal('Review has been sent for review to admin. Review will be visible on the site once approved. you will be notified when the review will be approved OR rejected.');
        
        //Close browser
        await driver.quit();

    });
    
    it("Verify Login before writing a review for the product", async function () {

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

        await driver.get("https://wealthmarketshop.com/index.php");

        await driver.findElement(By.xpath("//div/div/div[2]/div[2]/div/article[1]/div/div[2]/div[1]")).click();

        await driver.findElement(By.xpath("//div[1]/div[2]/section/div[1]/div/div[5]/div[3]/a/div[2]/span")).click();   
        
        //This line of code was for debugging
        driver.getTitle().then(async function (title) {
            console.log(title);            
        });


        let reviewTitle = await driver.findElement(By.id("review_title"));        
        reviewTitle.sendKeys("Awsesome Product");

        let reviewText = await driver.findElement(By.id("review_text")).sendKeys("I love the product so much");
        
        let dispplayName = await driver.findElement(By.id("display_name")).sendKeys("Seuncarta");

        let displayEmail = await driver.findElement(By.id("display_email")).sendKeys("seuncarta@gmail.com");

        let rating = await driver.findElement(By.xpath("//div/table/tbody/tr[3]/td[2]/div/div/label[2]")).click();

        let termsConditions = await driver.findElement(By.id("kb_gdpr_tnc_accept")).click();

        let submitButton = await driver.findElement(By.id("kbrc_addreview_button"));
        
        //Wait for 5 seconds before looking for the element with the success message
        await driver.manage().setTimeouts({ implicit: 2000 });
        

        let successMessage = await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/span")).getText();
        successMessage.should.equal('Review has been sent for review to admin. Review will be visible on the site once approved. you will be notified when the review will be approved OR rejected.');
       

        // close browser session 
        driver.close();

    })
    
    //Workaround test script to verify writing product review by going directly to the review page
    //You will have to go and copy the url to the product review page here for a new product review
    it("Workaround test script to verify writing product review by going directly to the review page", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://wealthmarketshop.com/index.php?product_id=2761&fc=module&module=kbreviewincentives&controller=kbwritenewreview")
        
        let reviewTitle = await driver.findElement(By.id("review_title"));
        reviewTitle.sendKeys("Awsesome Product");

        let reviewText = await driver.findElement(By.id("review_text")).sendKeys("I love the product so much");

        let dispplayName = await driver.findElement(By.id("display_name")).sendKeys("Seuncarta");

        let displayEmail = await driver.findElement(By.id("display_email")).sendKeys("seuncarta@gmail.com");

        let rating = await driver.findElement(By.xpath("//div/table/tbody/tr[3]/td[2]/div/div/label[2]")).click();

        let termsConditions = await driver.findElement(By.id("kb_gdpr_tnc_accept")).click();

        let submitButton = await driver.findElement(By.id("kbrc_addreview_button")).click();     
        
        //Wait for 5 seconds before looking for the element with the success message
        await driver.manage().setTimeouts({ implicit: 2000 });
        

        let successMessage = await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/span")).getText();
        successMessage.should.equal('Review has been sent for review to admin. Review will be visible on the site once approved. you will be notified when the review will be approved OR rejected.');
        //Close browser
        await driver.quit();
    })
    
});
