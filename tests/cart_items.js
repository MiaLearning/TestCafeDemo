import { Selector, t, ClientFunction } from "testcafe";
import loginPage from "../Pages/loginPage.js";
import productDetailsPage from "../Pages/productDetailsPage.js";
import productsPage from "../Pages/productsPage.js";
import shoppingCartPage from "../Pages/shoppingCartPage.js";
import checkoutPage from "../Pages/checkoutPage.js";
import checkoutOverviewPage from "../Pages/checkoutOverviewPage.js";

const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const baseUrl = 'https://www.saucedemo.com/';
const randomIndex = Math.floor(Math.random() * 6);
const productDetailsPageUrl = 'https://www.saucedemo.com/inventory-item.html?id=';
const myFirstName = 'Mia';
const myLastName = 'J';
const myZipCode = '407280';


fixture`Add product to cart`
    .page(baseUrl)


test(`Add first item to cart`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.addProductToCart(0);
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await t.expect(shoppingCartPage.cartListProdNo.exists).eql(false);
});


test(`Remove product from cart`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();
    await shoppingCartPage.removeSauceBkpFromCart();
    await t.expect(productsPage.cartCount.visible).eql(false);
});


test(`Add two products to cart and remove one`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(0);
    await productsPage.goToCart();
    await shoppingCartPage.removeSauceBkpFromCart();
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await t.expect(shoppingCartPage.cartListProdNo.count).eql(1);
});


test(`Randomize picked product, add to cart, remove from cart`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.addProductToCart(randomIndex);
    await productsPage.goToCart();
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await productsPage.removeProductFromCart();
    await t.expect(productsPage.cartCount.visible).eql(false);
    await t.expect(shoppingCartPage.cartListProdNo.visible).eql(false);
}); 


test(`Cart product displays the title from detail page`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.clickOnProduct(randomIndex); 
    await productDetailsPage.addItemToCart();
    const cartProductTitle = await productDetailsPage.detailedTitle.textContent;
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await productsPage.goToCart();
    const expectProductTitle = await productsPage.productTitle.textContent;
    await t.expect(cartProductTitle).eql(expectProductTitle);
});


test(`Remove a cart product from Homepage`, async t => {   
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.clickOnProduct(randomIndex);
    await productDetailsPage.addItemToCart();
    await productsPage.goToCart();
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await shoppingCartPage.returnToHomepage();
    await t.expect(productsPage.inventoryItem.exists).eql(true);
    await productsPage.removeProductFromPage();
    await t.expect(productsPage.cartCount.visible).eql(false);     
});


test(`Verify if product attributes match productDetails in Homepage`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    const expectProductTitle = await productsPage.productTitle.nth(randomIndex).innerText;
    const expectedProductDescr = await productsPage.productDescription.nth(randomIndex).innerText;
    const expectedProductPrice = await productsPage.productPrice.nth(randomIndex).innerText;
    await productsPage.clickOnProduct(randomIndex);
    await productDetailsPage.addItemToCart();
    const cartProductTitle = await productDetailsPage.detailedTitle.textContent;
    const cartProductDescr = await productDetailsPage.detailedDescr.innerText;
    const cartProductPrice = await productDetailsPage.detailedPrice.textContent;
    await t.expect(cartProductTitle).eql(expectProductTitle);
    await t.expect(cartProductDescr).eql(expectedProductDescr);
    await t.expect(cartProductPrice).eql(expectedProductPrice);
});


test.only(`Add 2 products and verify the cart total is correct`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await t.setTestSpeed(0.8)
    for (let i = 0; i < 2; i ++) {
        await productsPage.addNewProductToCart(randomIndex);
    };
    await productsPage.goToCart();
    const product1Price = await shoppingCartPage.cartPrice.nth(0).innerText;
    console.log(product1Price)
    const product2Price = await shoppingCartPage.cartPrice.nth(1).innerText;
    console.log(product2Price)
    const price1 = parseFloat(product1Price.replace('$', ''));
    const price2 = parseFloat(product2Price.replace('$', ''));
    const totalPrice = price1 + price2;
    console.log(`Total price: ${totalPrice}`);
    await shoppingCartPage.checkoutCart();
    await checkoutPage.typeFirstName();
    await checkoutPage.typeLastName();
    await checkoutPage.typeZipCode();
    await checkoutPage.goToCheckoutOverview();
    const productTotal = await checkoutOverviewPage.cartTotal.innerText;
    await t.expect(productTotal).eql(totalPrice);
  });

