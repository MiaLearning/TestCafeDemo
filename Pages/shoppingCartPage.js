import { Selector, t } from "testcafe";

class ShoppingCartPage {
    constructor () {
        this.continueShoppingBttn = Selector("#continue-shopping");
        this.checkoutBttn = Selector("#checkout");
        this.removeBttnSauceBkp = Selector("#remove-sauce-labs-backpack");
        this.cartListProdNo = Selector(".cart_quantity");
    }

    async returnToHomepage () {
        await t.click(this.continueShoppingBttn)
    }

    async checkoutCart () {
        await t.click(this.checkoutBttn)
    }

    async removeSauceBkpFromCart () {
        await t.click(this.removeBttnSauceBkp)
    }
}

export default new ShoppingCartPage();