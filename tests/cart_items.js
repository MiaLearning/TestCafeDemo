import { Selector, t, ClientFunction } from "testcafe";

import { baseUrl, loginButton, validUserName, validPassword,
        userNameInput, passwordInput, } from "./login.js";
const firstProductAddToCart = Selector('#add-to-cart-sauce-labs-backpack');
const firstProductRemoveFromCart = Selector("#remove-sauce-labs-backpack");
const secondProductAddToCart = Selector('#add-to-cart-sauce-labs-bike-light');
const secondProductRemoveFromCart = Selector('#remove-sauce-labs-bike-light');
const shoppingCartCount = Selector('.shopping_cart_badge');
const shoppingCartButton = Selector('.shopping_cart_link');
const cartItem = Selector('.cart_item');
const cartQuantity = Selector('.cart_quantity');
const twitterButton = Selector('.social_twitter');
const facebookButton = Selector('.social_facebook ');
const linkedinButton = Selector('.social_linkedin');
const getURL = ClientFunction(() => window.location.href);



fixture`Add product to cart`
    .page(baseUrl)


test(`Add one item to cart`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(firstProductAddToCart)

    const cartNumber = await shoppingCartCount.innerText;

    await t.expect(cartNumber).eql('1');
});


test(`Remove product from cart`, async t => {
    await t
        .setTestSpeed(0.8)
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(firstProductAddToCart)
        .click(shoppingCartButton)
        .click(firstProductRemoveFromCart)

    const isCartItemVisible = await cartItem.visible;
    const isProductInCart = await shoppingCartCount.exists;

    await t.expect(isCartItemVisible).eql(false)
    await t.expect(isProductInCart).eql(false)
});


test(`Add two products to cart and remove one`, async t => {
    await t 
         .setTestSpeed(0.8)
         .typeText(userNameInput, validUserName)
         .typeText(passwordInput, validPassword)
         .click(loginButton)
         .click(firstProductAddToCart)
         .click(secondProductAddToCart)
         .click(shoppingCartButton)
         .click(secondProductRemoveFromCart)

    const cartNumber = await shoppingCartCount.innerText;
    const cartListProductNo = await cartQuantity.innerText;

    await t.expect(cartNumber).eql('1');
    await t.expect(cartListProductNo).eql('1'); 
});


test(`Verify social buttons - Twitter`, async t => {
    await t
        .setTestSpeed(0.8)
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(twitterButton)
    
    const twitterPage = await getURL();

    await t.expect(twitterPage).eql('https://twitter.com/saucelabs');
});