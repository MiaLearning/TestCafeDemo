import { Selector, t } from "testcafe";

class ShoppingCartPage {
    constructor () {
        this.continueShoppingBttn = Selector("#continue-shopping");
        this.checkoutBttn = Selector("#checkout");
        this.cartListProdNo = Selector(".cart_quantity");
        this.title = Selector("#item_0_title_link");
        this.description = Selector(".inventory_item_desc");
        this.cartPrice = Selector(".inventory_item_price");
    }

    async returnToHomepage () {
        await t.click(this.continueShoppingBttn)
    }

    async checkoutCart () {
        await t.click(this.checkoutBttn)
    }
}

export default new ShoppingCartPage();