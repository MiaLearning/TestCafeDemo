import { Selector, t } from "testcafe";

class MainPage {
    constructor () {
        this.optionCards = Selector(".card");
    }

    async selectCard(cardName) {
        await t.click(this.optionCards.withText(cardName));
    }
}

export default new MainPage();