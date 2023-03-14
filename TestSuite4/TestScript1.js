const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Update Personal Info', function() {

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  after(async function() {
    await driver.quit();
  });

  it('Verify updating username and password from personal info', async function() {
    // Navigate to the login page
    await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

    // Enter the user credentials and submit the login form
    await driver.findElement(By.name('email')).sendKeys('omoneferuemu@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('createaccount', Key.RETURN);

    // Wait for the home page to load
    await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 20000, 'Should load dashboard page');
   

    // Navigate to the user profile page
    await driver.get('https://wealthmarketshop.com/index.php?controller=identity');

  // Update the social title checkbox

  // Select the checkboxes for social title
  const mrCheckbox = await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[1]/div/label[1]/span[1]/input'));
  const msCheckbox = await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[1]/div/label[2]/span[1]/input'));
  
  // Check which checkbox is selected
  let socialTitle = '';
  if (await mrCheckbox.isSelected()) {
    socialTitle = 'Mr.';
  } else if (await msCheckbox.isSelected()) {
    socialTitle = 'Mrs.';
  }
  

    // Update the first name field
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[2]/div[1]/input')).clear();
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[2]/div[1]/input')).sendKeys('Ruemu123');

    // Update the last name field
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[3]/div[1]/input')).clear();
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[3]/div[1]/input')).sendKeys('Omonefe1');

    // Update the email field
    await driver.findElement(By.name("email")).clear();
    await driver.findElement(By.name("email")).sendKeys('ruemuomonefe@gmail.com');

    // Enter password 
    await driver.findElement(By.name("password")).clear();
    await driver.findElement(By.name("password")).sendKeys('createaccount');

   // Check the customer data privaacy checkbox before saving
   const agreeCheckbox = await driver.findElement(By.name('customer_privacy'));
   await agreeCheckbox.click();

   // Check the terms and condition checkbox before saving
   const agreeCheckbox2 = await driver.findElement(By.name('psgdpr'));
   await agreeCheckbox2.click();


    // Click the save button to submit the changes
    await driver.findElement(By.xpath('//*[@id="customer-form"]/div/div[2]/button')).click();



    // Wait for the success message to appear
    await driver.wait(until.elementLocated(By.xpath('//*[@id="notifications"]/div/article/ul/li')));



//     // Verify that the personal info was updated
    let firstName = await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[2]/div[1]/input')).getAttribute('value');
    let lastName = await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[3]/div[1]/input')).getAttribute('value');
    let email = await driver.findElement(By.name("email")).getAttribute('value');
    assert.strictEqual(firstName, 'Ruemu123');
    assert.strictEqual(lastName, 'Omonefe1');
    assert.strictEqual(email, 'ruemuomonefe@gmail.com');
  });
});

describe('Update Personal Info', function() {

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  after(async function() {
    await driver.quit();
  });

  it('should update password/DOB in personal info', async function() {
    // Navigate to the login page
    await driver.get('https://wealthmarketshop.com/index.php?controller=authentication&back=my-account');

    // Enter the user credentials and submit the login form
    await driver.findElement(By.name('email')).sendKeys('omoneferuemu@gmail.com');
    await driver.findElement(By.name('password')).sendKeys('createaccount', Key.RETURN);

    // Wait for the home page to load
    await driver.wait(until.urlIs('https://wealthmarketshop.com/index.php?controller=my-account'), 20000, 'Should load dashboard page');
   

    // Navigate to the user profile page
    await driver.get('https://wealthmarketshop.com/index.php?controller=identity');


    // Enter old password
    let passwordField = await driver.findElement(By.name("password")).sendKeys('createaccount');

    // Enter new password
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[6]/div[1]/div/input')).sendKeys('createaccount12');

    // Update the DOB field
    await driver.findElement(By.name("birthday")).clear();
    await driver.findElement(By.name("birthday")).sendKeys('07/31/1971');

    // Check the customer data privaacy checkbox before saving
   const agreeCheckbox = await driver.findElement(By.name('customer_privacy'));
   await agreeCheckbox.click();
   
   // Check the terms and condition checkbox before saving
   const agreeCheckbox2 = await driver.findElement(By.name('psgdpr'));
   await agreeCheckbox2.click();


    // Click the save button to submit the changes
    await driver.findElement(By.xpath('//*[@id="customer-form"]/div/div[2]/button')).click();

    // Wait for the success message to appear
    await driver.wait(until.elementLocated(By.xpath('//*[@id="notifications"]/div/article/ul/li')));

    // clicknthe show button to show password
    await driver.findElement(By.xpath('//*[@id="customer-form"]/section/div[5]/div[1]/div/span/button')).click();

    // Verify that the personal info was updated
    let dob = await driver.findElement(By.name('birthday')).getAttribute('value');
    // assert.strictEqual(password, 'createaccount12');
    assert.strictEqual(dob, '1971-07-31');
  });
});