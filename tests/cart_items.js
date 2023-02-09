import { Selector, t, ClientFunction } from "testcafe";

import { baseUrl, loginButton, validUserName, validPassword,
        userNameInput, passwordInput, } from "./login.js";
const backpackAddToCart = Selector('#add-to-cart-sauce-labs-backpack');
const backpackRemoveFromCart = Selector("#remove-sauce-labs-backpack");
const shoppingCartCount = Selector('.shopping_cart_badge');
const shoppingCartButton = Selector('.shopping_cart_link');
const cartItem = Selector('.cart_item');



fixture`Add product to cart`
    .page(baseUrl)


test(`Add one item to cart`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(backpackAddToCartButton)

    const shoppingCart = Selector('.shopping_cart_link').exists;
    const cartNumber = shoppingCartCount.innerText;

    await t.expect(shoppingCart).ok();
    await t.expect(cartNumber).eql('1');
});


test(`Remove product from cart`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(backpackAddToCart)
        .wait(1000)
        .click(shoppingCartButton)
        .click(backpackRemoveFromCart)
        .wait(1000)

    const isCartItemVisible = await cartItem.visible;

    await t.expect(isCartItemVisible).eql(false)
});