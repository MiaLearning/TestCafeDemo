

import { Selector, t, ClientFunction }  from "testcafe";

const baseUrl = 'https://www.saucedemo.com/';
const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUserName = 'locked_out_user';
const invalidPassword = 'not_so_secret_sauce';
const userNameInput = Selector("#user-name");
const passwordInput = Selector("#password");
const loginButton = Selector('#login-button');
const errorContainer = Selector('.error h3');
const productSortDrop = Selector('div.right_component > span');
const sortProductAZ = Selector('option:nth-child(1)');
const firstItemSlot = Selector('.inventory_item').nth(0);
const productTitle = Selector('.inventory_item_name');
const firstProductAZ = 'Sauce Labs Backpack';
const expectedError = 'Epic sadface: Sorry, this user has been locked out.';
const expectedLoginError = 'Epic sadface: Username and password do not match any user in this service';
const getURL = ClientFunction(() => window.location.href);



fixture`Authentification`
    .page(baseUrl)


test(`Login with valid user`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)

    const currentPage = await getURL();
    const isInventoryItemVisible = await Selector('.inventory_item').nth(0).visible;

    await t.expect(currentPage).eql('https://www.saucedemo.com/inventory.html')
    await t.expect(isInventoryItemVisible).eql(true)
});


test(`Login with invalid user`, async t => {
    await t
        .typeText(userNameInput, invalidUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)

    const receivedError = await errorContainer.innerText;
    const isErrorVisible = await errorContainer.visible;

    await t.expect(receivedError).eql(expectedError)
    await t.expect(isErrorVisible).eql(true)
});


test(`Login with invalid password`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, invalidPassword)
        .click(loginButton)
    
    const receivedError = await errorContainer.innerText;
    const isErrorVisible = await errorContainer.visible;

    await t.expect(expectedLoginError).eql(receivedError)
    await t.expect(isErrorVisible).eql(true)
});


test(`Login with invalid username and password`, async t => {
    await t
        .typeText(userNameInput, invalidUserName)
        .typeText(passwordInput, invalidPassword)
        .click(loginButton)

    const receivedError = await errorContainer.innerText;
    const isErrorVisible = await errorContainer.visible;

    await t.expect(receivedError).eql(expectedLoginError)
    await t.expect(isErrorVisible).eql(true)
});



fixture`Verify sorting options`
    .page(baseUrl)


test(`Sort products by Name (A to Z)`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(productSortDrop)
        .click(sortProductAZ)

    const listFistPosition = await firstItemSlot.visible;
    const isMyProductTitle = await productTitle.visible;
    const isMyProductFirst = await productTitle.innerText;

    await t.expect(listFistPosition).eql(true)
    await t.expect(isMyProductTitle).eql(true)
    await t.expect(isMyProductFirst).eql(firstProductAZ)
});


