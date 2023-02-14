import { Selector, t, ClientFunction }  from "testcafe";

import { baseUrl, loginButton, validUserName, validPassword, 
        userNameInput, passwordInput,
        productSortDrop, sortProductAZ, productContainer,
        firstItemSlot, productTitle, firstProductAZ } from "./login.js";


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