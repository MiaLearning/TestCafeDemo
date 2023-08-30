import loginPage from "../Pages/loginPage";
import productsPage from "../Pages/productsPage";
import { validUser } from "../Constants/users.js";
const baseUrl = 'https://www.saucedemo.com/';


fixture`Tests`
    .page(baseUrl)


test(`Expect page to have 6 products`, async t => {
    await loginPage.signIn(validUser);
    await t.expect(productsPage.inventoryItem.count).eql(6);
});
