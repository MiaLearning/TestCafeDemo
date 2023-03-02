import { Selector, t } from "testcafe";

class ShoppingCartPage {
    constructor () {
        this.continueShoppingBttn = Selector("#continue-shopping");
        this.checkoutBttn = Selector("#checkout");
        this.removeBttn = Selector("#remove");
    }

    async returnToHomepage () {
        await t.click(this.continueShoppingBttn)
    }

    async checkoutCart () {
        await t.click(this.checkoutBttn)
    }

    async removeProductFromCart () {
        await t.click(this.removeBttn)
    }
}

export default new ShoppingCartPage();