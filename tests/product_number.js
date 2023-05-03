import loginPage from "../Pages/loginPage";
import productsPage from "../Pages/productsPage";
const baseUrl = 'https://www.saucedemo.com/';
const validUserName = 'standard_user';
const validPassword = 'secret_sauce';


fixture`Tests`
    .page(baseUrl)


test(`Expect page to have 6 products`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await t.expect(productsPage.inventoryItem.count).eql(6);
});
