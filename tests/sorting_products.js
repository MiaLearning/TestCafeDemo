import { Selector, t, ClientFunction }  from "testcafe";

import { loginButton, validUserName, validPassword, 
        userNameInput, passwordInput,
        productSortDrop, sortProductAZ, productTitle } from "./login.js";
const baseUrl = 'https://www.saucedemo.com/';

fixture`Verify sorting options`
    .page(baseUrl)


test.skip(`Sort products by Name (A to Z)`, async t => {
    await t
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(productSortDrop)
        .click(sortProductAZ)

    var productList = String(productTitle)
    console.log(productList)

}); 
    
    /*var array = new Array();
    for (i=0; i < productList.length; i++) {
        array.push(productList[i]);
    }
   console.log(productList) */