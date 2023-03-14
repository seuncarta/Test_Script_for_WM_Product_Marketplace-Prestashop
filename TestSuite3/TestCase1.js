const { Builder, Browser, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
// const assert = require('assert');

describe('Verify listing of a product by a seller', () => {

    let driver;
    //Open the browser
    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });
    //Close browser
    after(async function () {
        await driver.quit();
    });

    it("Verify that when a seller search for a product name, the result table contains products with the searched name", async function () {
        
        
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

        //Verifying the text of the page
        const textOnPage = await driver.findElement(By.xpath("//div/div/div[1]/b/i")).getText();
        expect(textOnPage).to.equal("The product you want to list may already be in the global catalog. If so, you will not need to re-list it. Start by checking here.")
        console.log(textOnPage);

        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/a")).click();

        //Locate the search bar and search for a product to add in this case Honeywell Semolina 10kg
        let nameOfProduct = "Honeywell"
        await driver.findElement(By.id("input_existing_product")).sendKeys(nameOfProduct);

        //Taping the enter button to carryout the search goes on to list the product as a now one this is wrong.
        //So we must click on the search bar, as can be seen below
        await driver.findElement(By.id("btn_search_exsisting_products")).click();

        //Checking the result table to see if the results include the search product

        // Replace the following selector with the actual selector of the table on your page
        const resultTable = await driver.findElement(By.xpath("//tbody"));

        //The count of the reuslt it found, for debug purposes
        let rowCount = await resultTable.findElements(By.css('tr')).then(rows => rows.length);
        console.log(rowCount);

        // What was searched for to verify against the result table
        const searchString = nameOfProduct;

        // Get all the rows in the table
        const rows = await resultTable.findElements(By.css(`tr`));


        // Loop through each row
        try {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                // Get all the cells in the row
                const cells = await row.findElements(By.css('td'));

                // Loop through each cell
                for (let j = 0; j < cells.length; j++) {
                    const cell = cells[j];
                    // Get the text of the cell
                    const cellText = await cell.getText();
                    // Check if the cell text contains the search string
                    if (cellText.includes(searchString)) {
                        // If the search string is found, assert that the test passes
                        assert.ok(true, `${searchString} was found in the table`);
                        // Return to exit the function once the string is found
                        return;
                    }
                }
            }

        } catch (err) {
            // If the search string is not found, assert that the test fails
            assert.fail(`${searchString} was not found in the table`);
        }

    });
    
    
    it("Valid scenario: Verify listing of a product from the product database", async function () {
               
        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');
        
        // The element that holds the seller product menu 
        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div[2]/div/section/section/div/div/div/a[3]/span")).click();
        
        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });
        
        //Verifying the text of the page
        const textOnPage = await driver.findElement(By.xpath("//div/div/div[1]/b/i")).getText();
        expect(textOnPage).to.equal("The product you want to list may already be in the global catalog. If so, you will not need to re-list it. Start by checking here.")
        console.log(textOnPage);
        
        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/a")).click();
        
        //Locate the search bar and search for a product to add in this case 	Honeywell Semolina 10kg
        let nameOfProduct = "Honeywell"
        await driver.findElement(By.id("input_existing_product")).sendKeys(nameOfProduct);
        
        //Taping the enter button to carryout the search goes on to list the product as a now one this is wrong.
        //So we must click on the search bar, as can be seen below
        await driver.findElement(By.id("btn_search_exsisting_products")).click();
        
        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });
        
        await driver.findElement(By.xpath("//tbody/tr[1]/td[4]")).click();

        //SKU
        await driver.findElement(By.id("sku_code")).clear();
        await driver.findElement(By.id("sku_code")).sendKeys("SeunTest1");

        //Price tax excluded
        await driver.findElement(By.id("price_tax_incl")).clear();
        await driver.findElement(By.id("price")).clear();

        await driver.findElement(By.id("price_tax_incl")).sendKeys('2000')

        //Quantity
        await driver.findElement(By.id("kb_product_quantity")).clear();
        await driver.findElement(By.id("kb_product_quantity")).sendKeys("100")

        //Minimum quantity
        await driver.findElement(By.id("minimal_quantity_input")).clear();
        await driver.findElement(By.id("minimal_quantity_input")).sendKeys("1")


        // Save/Add the product
        await driver.findElement(By.xpath("//button[2]")).click();

        await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?fc=module&module=kbmarketplace&controller=kbproduct'), 500, 'The list of product will show')



    });

    
    it("Valid scenario: Verify listing of a new product(FYI this test script is not working for unknow reasons)", async function () {
    
        // Navigate to the log in page on the service marketplace
        await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

        // The element that holds the seller product menu 
        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div[2]/div/section/section/div/div/div/a[3]/span")).click();

        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Verifying the text of the page
        const textOnPage = await driver.findElement(By.xpath("//div/div/div[1]/b/i")).getText();
        expect(textOnPage).to.equal("The product you want to list may already be in the global catalog. If so, you will not need to re-list it. Start by checking here.")
        console.log(textOnPage);

        await driver.findElement(By.xpath("/html/body/main/section/div/div/div/div/div/div/div[2]/div/div/div[2]/div[1]/a")).click();
        
        //Menu to add new product
        await driver.findElement(By.xpath('//li/button')).click();

        //expnad 1
        await driver.findElement(By.xpath('//div[4]/div[1]/div[1]/i')).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Select category
        await driver.findElement(By.xpath("//li/span/label")).click();
        //Check box for the parent category 
        await driver.findElement(By.xpath("//li/span/input")).click();


        await driver.findElement(By.xpath('//div[4]/div[1]/div[1]/i')).click();

        // //expand 2
        // await driver.findElement(By.xpath("//div[6]/div[1]/div[1]/i")).click();

        // let productName = "Balablulu";
        // await driver.findElement(By.xpath("//div[1]/ul/li[1]/div[2]/input")).sendKeys(productName);

        // let productSKU = "Bulaba";
        // await driver.findElement(By.xpath("//div[1]/ul/li[2]/div[2]/input")).sendKeys(productSKU);
        
        // //Enter UPC if you know it
        // // let productUPC = "";
        // // await driver.findElement(By.xpath("/div[1]/ul/li[4]/div[2]/input")).sendKeys(productUPC);
        
        // //OR

        // //Generate a custom UPC if you don't know it
        // await driver.findElement(By.xpath('//div[1]/ul/li[4]/div[3]/a[2]')).click();

        // //short description
        // await driver.findElement(By.id("description_short_1_ifr")).sendKeys("Short description short be here");

        // //Description
        // await driver.findElement(By.id("description_1_ifr")).sendKeys("Description short be here");

        // await driver.findElement(By.xpath("//div[6]/div[1]/div[1]/i")).click();

        //expand 3
        await driver.findElement(By.xpath("//div[8]/div[1]/div[1]/i")).click();
        
        //Price tax included

        await driver.findElement(By.id("price_tax_incl")).clear();
        await driver.findElement(By.id("price_tax_incl")).sendKeys("4000")

        await driver.findElement(By.xpath("//div[8]/div[1]/div[1]/i")).click();

        //expand 4
        await driver.findElement(By.xpath("//div[11]/div[1]/div[1]/i")).click();


        await driver.findElement(By.xpath("//div[11]/div[1]/div[1]/i")).click();
        //expand 5
        await driver.findElement(By.xpath("//div[13]/div[1]/div[1]/i")).click();


        await driver.findElement(By.id("kb_product_quantity")).clear();
        await driver.findElement(By.id("kb_product_quantity")).sendKeys("100")

        await driver.findElement(By.xpath("//div[13]/div[1]/div[1]/i")).click();

        //Next button
        await driver.findElement(By.id("submit_product_form_butn_preview")).click();


    });
    

    
});