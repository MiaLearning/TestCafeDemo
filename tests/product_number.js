import { Selector, t } from "testcafe";

const baseUrl = 'https://www.saucedemo.com/';
const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const userNameInput = Selector("#user-name");
const passwordInput = Selector("#password");
const loginButton = Selector('#login-button');
const productContainer = Selector('.inventory_item');


fixture`Tests`
    .page(baseUrl)


test(`Expect page to have 6 products`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)

    const noOfProducts = await productContainer.count;

    await t.expect(noOfProducts).eql(6)
});
