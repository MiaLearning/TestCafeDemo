import { Selector, t } from "testcafe";

class CheckoutOverviewPage {
    constructor () {
        this.cartTotal = Selector(".summary_subtotal_label")
    }};

export default new CheckoutOverviewPage(); 