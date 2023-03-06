import { Selector, t, ClientFunction }  from "testcafe";

export const baseUrl = 'https://www.saucedemo.com/';
export const validUserName = 'standard_user';
export const validPassword = 'secret_sauce';
const invalidUserName = 'locked_out_user';
const invalidPassword = 'not_so_secret_sauce';
export const userNameInput = Selector("#user-name");
export const passwordInput = Selector("#password");
export const loginButton = Selector('#login-button');
const errorContainer = Selector('.error h3');
export const productContainer = Selector('.inventory_item');
export const productSortDrop = Selector('div.right_component > span');
export const sortProductAZ = Selector('option[value="az"]');
export const firstItemSlot = Selector('.inventory_item').nth(0);
export const productTitle = Selector('.inventory_item_name');
export const firstProductAZ = 'Sauce Labs Backpack';
const expectedError = 'Epic sadface: Sorry, this user has been locked out.';
const expectedLoginError = 'Epic sadface: Username and password do not match any user in this service';
const getURLpage = ClientFunction(() => window.location.href);


fixture`Authentification`
    .page(baseUrl)


test(`Login with valid user`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)

    const currentPage = await getURL();
    const isInventoryItemVisible = await firstItemSlot.visible;

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

import { Selector, t, ClientFunction }  from "testcafe";
import loginPage from '../Pages/loginPage'; 

export const baseUrl = 'https://www.saucedemo.com/';
const getURL = ClientFunction(() => window.location.href);

fixture`Authentification`
    .page(baseUrl)


test(`Loading Login Page`, async t => { 
    await t
        .expect(getURL()).contains(baseUrl)
        .expect(loginPage.loginButton.exists).ok();

});


test(`Login with valid user`, async t => {
    await t
        .expect(currentPage).eql('https://www.saucedemo.com/inventory.html')
        .expect(isInventoryItemVisible).eql(true)
});
