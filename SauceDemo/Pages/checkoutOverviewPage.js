import { Selector, t } from "testcafe";

class CheckoutOverviewPage {
    constructor () {
        this.cartTotal = Selector(".summary_subtotal_label");
        this.finishBttn = Selector(".cart_button");
    }
    
    async finishOrder() {
        await t.click(this.finishBttn);
    }
}

export default new CheckoutOverviewPage(); 