import { Selector, t } from "testcafe";

class ShoppingCartPage {
    constructor () {
        this.continueShoppingBttn = Selector("#continue-shopping");
        this.checkoutBttn = Selector("#checkout");
        this.cartListProdNo = Selector(".cart_quantity");
    }

    async returnToHomepage () {
        await t.click(this.continueShoppingBttn)
    }

    async checkoutCart () {
        await t.click(this.checkoutBttn)
    }};

export default new ShoppingCartPage();