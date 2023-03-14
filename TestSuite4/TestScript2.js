const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require("assert");

describe('Order History Page', function() {
  let driver;
  
  // Before each test, create a new Selenium WebDriver instance
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });
  
  // After each test, quit the WebDriver instance
  afterEach(async function() {
    await driver.quit();
  });
  
  // Test case to verify if user can view order history and details
  it('should allow users to view their order history and details', async function() {

     // Navigate to the login page
     await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

    // Enter the user credentials and submit the login form, automatically routes to page that has the order history button/link
    await driver.findElement(By.name('email')).sendKeys('omoneferuemu@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('createaccount', Key.RETURN);
    
    // Find the link that leads to the order history page and click it
    const orderHistoryBtn = await driver.findElement(By.xpath('//*[@id="left-column"]/div/div/div/div/ul/li[3]/a'));
    await orderHistoryBtn.click();
    
    // Wait for the order history page to load
    await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=history'), 5000);
    
    // Check if there are any orders displayed
    const orders = await driver.findElements(By.xpath('//*[@id="content"]/div[1]/table/tbody'));
    expect(orders.length).to.be.greaterThan(0);
    
     // Retrieve the total number of orders displayed
     const orderCountElements = await driver.findElements(By.css(".order"));
     const orderCount = orderCountElements.length;
     console.log(`Total orders: ${orderCount}`)
     assert.ok(orderCount > 3, `Expected order count to be greater than 3, but found ${orderCount}`);
     
     // Click on the first order reference to view its details
    const orderReferenceElements = await driver.findElements(By.xpath('//*[@id="content"]/div[2]/div[1]/div/div[1]/h5/a'));
    if (orderReferenceElements.length > 0) {
        const orderReferenceElement = orderReferenceElements[0];
        await driver.executeScript("arguments[0].scrollIntoView();", orderReferenceElement);
        await driver.executeScript("arguments[0].click();", orderReferenceElement);
        await driver.wait(until.urlContains("https://wealthmarketshop.com/index.php?controller=order-detail&id_order="), 5000);
        } else {
        throw new Error("No order IDs found on the page.");
    }

    // Click on the first order to view its details
    // const firstOrder = orders[0];
    // await firstOrder.click();
    
 
    // // Check if the order details are displayed
    // const orderNumber = await driver.findElement(By.xpath('//*[@id="order-infos"]/div[1]/div/div[1]/strong')).getText();
    // expect(orderNumber).to.include(/^Order #\d+$/);
    
    // // Verify that the order details are displayed
    // const orderDetailsElement = await driver.findElement(By.xpath('//*[@id="order-infos"]/div[1]/div/div[1]/strong'));
    // const orderDetailsText = await orderDetailsElement.getText();
    // assert.strictEqual(orderDetailsText, "Order Details\n\nOrder #1234\n\nProduct: Example Product\nPrice: $19.99\nQuantity: 2\n\nTotal: $39.98");

    // // Check if the order status is present
    // const status = await driver.findElement(By.xpath('//*[@id="content"]/div[2]/div[2]/div/div[1]/div[3]')).getText();

    //  // Check if the order status matches our order status available
    //  const orderStatus = await driver.findElement(By.xpath('//*[@id="content"]/div[2]/div[1]/div/div[1]/div[3]/span')).getText();
    //  expect(['Payment accepted', 'Awaiting bank wire payment', 'Delivered', 'Awaiting Cash On Delivery validation']).to.include(orderStatus.toLowerCase());
 
   // Check if the order status matches our order status available
   const price = await driver.findElement(By.xpath('//*[@id="content"]/div[1]/table/tbody/tr[1]/td[2]/span')).getText();
   expect(['₦15,000']).to.include(price.toLowerCase());
    });
});
