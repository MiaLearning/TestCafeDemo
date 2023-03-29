import { Selector, t, ClientFunction } from "testcafe";
import loginPage from "../Pages/loginPage.js";
import productDetailsPage from "../Pages/productDetailsPage.js";
import productsPage from "../Pages/productsPage.js";
import shoppingCartPage from "../Pages/shoppingCartPage.js";

const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const baseUrl = 'https://www.saucedemo.com/';
const randomIndex = Math.floor(Math.random() * 6);
const productDetailsPageUrl = 'https://www.saucedemo.com/inventory-item.html?id=';


fixture`Add product to cart`
    .page(baseUrl)


test(`Add first item to cart`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.addProductToCart(0);
    await t.expect(productsPage.cartCount.innerText).eql('1');
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
    /*
    1) extra test:  adaugi in cart din product page si verific ca contine acelasi nume in soppingcart. 
    2) Name, descr, + price, conincide productpage to personal product page
    3) Sa faci remvove la produs din cart, din homepage. */
}); 


/*test(`Cart product displays the title from detail page`, async t => {
    await t.setTestSpeed(0.8)
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.clickOnProduct(randomIndex); 
    //await t.expect(productDetailsPageUrl).eql('https://www.saucedemo.com/inventory-item.html?id=');
    await productDetailsPage.prodDetailsToCart();
    await productsPage.goToCart();
    const cartProductTitle = (productDetailsPage.prodDetailsTitle.withText);
    const expectProductTitle = productsPage.productTitle;
    await t.expect(cartProductTitle).eql(expectProductTitle);
});*/


test(`Remove a cart product from Homepage`, async t => {   
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.clickOnProduct(randomIndex);
    await productDetailsPage.prodDetailsToCart();
    await productsPage.goToCart();
    await t.expect(productsPage.cartCount.innerText).eql('1');
    await shoppingCartPage.returnToHomepage();
    await t.expect(productsPage.inventoryItem.exists).eql(true);
    await productsPage.removeProductFromPage();
    await t.expect(productsPage.cartCount.visible).eql(false);     
});


test.only(`Verify if product attributes(description, title, price) match productDetails with Homepage`, async t => {
    await t.setTestSpeed(0.8);
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    // Care e situatia acum? " pas de citit titlu, descriere, pret
    //mereu sa ai un pct de comparatie. "
    // sa adaugi passi de comparatie in teste. (pcte de referinta in test)
    await productsPage.clickOnBackpack();
    await t.expect(productDetailsPage.prodDetailsbackpackTitle.innerText).eql('Sauce Labs Backpack');
    await t.expect(productDetailsPage.prodDetailsbackpackDesc.innerText).eql('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await t.expect(productDetailsPage.prodDetailsbackpackPrice.innerText).eql('$29.99');
    //await t.expect(productDetailsPage.prodDetailsbackpackImg).eql('sauce-backpack'); SRC attribute?
    //modify test : capture product attributes from Homepage and compare with product attributes ProducDrtailsPage / Modify test title, can add picture to the test. Picture selector modify into capture for class and not source. GetAttributeValue 
});

//pass cu pas - pui cimments la inceput de test 
//cum termini, stergi comments. 
//concentrezi la urm pas si unde esti acum. 
// Focus : a intelege lucrurile pe care le scrii si sa nu ma concentrez sa termin testul.
// Sa intelegi tot ce se intampla, acel randomIndex, sau cum ai putea sa-l scrii altfel, sau orice folosesti
// SA fi analitica si sa ma gandesc in mai multe directii.
// Sa incerci sa rezolvi un test in mai multe moduri.
// Sa retii cu ce lucrezi momentan. 
// cum sa construiesti si selectori mai complicati in testcafe: find / nth / withText/ withinText/ 
//pasi specifici in TC. 
//un extra pas: care e situatia acum?"
