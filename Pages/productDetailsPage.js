import { Selector, t } from "testcafe";

class ProductDetailsPage {
    constructor () {
        this.addToCart = Selector(".btn.btn_primary");
        this.detailedTitle = Selector(".inventory_details_name.large_size");
        this.detailedDescr = Selector(".inventory_details_desc.large_size");
        this.detailedPrice = Selector(".inventory_details_price");
        this.detailedImg = Selector('img[src="/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg"]');
    }

    async addItemToCart() {
        await t.click(this.addToCart);
    }
}

export default new ProductDetailsPage();