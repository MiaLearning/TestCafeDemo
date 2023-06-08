import checkoutOverviewPage from "../Pages/checkoutOverviewPage";
import checkoutPage from "../Pages/checkoutPage";
import loginPage from "../Pages/loginPage";
import productsPage from "../Pages/productsPage";
import shoppingCartPage from "../Pages/shoppingCartPage";
import { validUser } from "../Pages/users";
import { myPersonalDetails } from "../Pages/userInformation";
import checkoutCompletePage from "../Pages/checkoutCompletePage";

const baseUrl = 'https://www.saucedemo.com/';


fixture`Orders`
    .page(baseUrl)


test(`Complete an order`, async t => {
    await loginPage.signIn(validUser);
    await productsPage.addNewProductToCart();
    await productsPage.goToCart();
    await shoppingCartPage.checkoutCart();
    await checkoutPage.checkoutMyInformation(myPersonalDetails);
    await checkoutPage.goToCheckoutOverview();
    await checkoutOverviewPage.finishOrder();
    await t.expect(checkoutCompletePage.orderConfirmed.innerText).eql('Thank you for your order!');
    await t.expect(checkoutCompletePage.returnHomeBttn.exists).eql(true);
});