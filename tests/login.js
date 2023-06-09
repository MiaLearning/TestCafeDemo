import { Selector, t, ClientFunction } from "testcafe";
import loginPage from "../Pages/loginPage";
import ProductsPage from "../Pages/productsPage.js";
import { invalidUser, invalidPassword, invalidUserPssw, lockedOutUser, validUser } from "../Constants/users.js";

const baseUrl = 'https://www.saucedemo.com/';
const expectedErrorLockedUser = 'Epic sadface: Sorry, this user has been locked out.';
const expectedLoginError = 'Epic sadface: Username and password do not match any user in this service';
const getURL = ClientFunction(() => window.location.href);


fixture`Authentification`
    .page(baseUrl)


test(`Loading Login Page`, async t => { 
    await t.expect(getURL()).contains(baseUrl);
    await t.expect(loginPage.loginBttn.exists).ok();
});


test(`Login with valid user`, async t => {
    await loginPage.signIn(validUser);
    await t.expect(getURL()).eql('https://www.saucedemo.com/inventory.html');
    await t.expect(ProductsPage.inventoryItem.visible).eql(true);
});


test(`Login with invalid user`, async t => {
    await loginPage.signIn(invalidUser);
    await t.expect(loginPage.errorContainer.exists).eql(true);
    await t.expect(loginPage.errorContainer.innerText).eql(expectedLoginError);
});


test(`Login with invalid password`, async t => {
    await loginPage.signIn(invalidPassword);
    await t.expect(loginPage.errorContainer.exists).eql(true);
    await t.expect(loginPage.errorContainer.innerText).eql(expectedLoginError);
});


test(`Login with invalid username and password`, async t => {
    await loginPage.signIn(invalidUserPssw);
    await t.expect(loginPage.errorContainer.exists).eql(true);
    await t.expect(loginPage.errorContainer.innerText).eql(expectedLoginError);
});


test(`Login with locked user`, async t => {
    await loginPage.signIn(lockedOutUser);
    await t.expect(loginPage.errorContainer.exists).eql(true);
    await t.expect(loginPage.errorContainer.innerText).eql(expectedErrorLockedUser);
});