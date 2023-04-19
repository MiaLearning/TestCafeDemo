import { Selector, t } from "testcafe";

class CheckoutPage {
    constructor () {
        this.firstNameInput = Selector("#first-name");
        this.lastNameInput = Selector("#last-name");
        this.zipCodeInput = Selector("#postal-code");
        this.continueBttn = Selector("#continue");
        this.cancelBttn = Selector("#cancel");
    }

    async typeFirstName(myFirstName) {
        await t.typeText(this.firstNameInput, myFirstName);
    }

    async typeLastName(myLastName) {
        await t.typeText(this.lastNameInput, myLastName);
    }

    async typeZipCode(myZipCode) {
        await t.typeText(this.zipCodeInput, myZipCode);
    }

    async goToCheckoutOverview() {
        await t.click(this.continueBttn);
    }

    async returnToCartPage() {
        await t.click(this.cancelBttn);
    }};

export default new CheckoutPage();