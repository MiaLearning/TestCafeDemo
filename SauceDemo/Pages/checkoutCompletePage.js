import { Selector, t } from "testcafe";

class CheckoutCompletePage {
    constructor () {
        this.orderConfirmed = Selector(".complete-header");
        this.returnHomeBttn =Selector("#back-to-products");
    }
}

export default new CheckoutCompletePage();