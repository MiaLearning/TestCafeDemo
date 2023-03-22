import { Selector, t } from "testcafe";

class ProductDetailsPage {
    constructor () {
        this.prodDetailsTitle = Selector(".inventory_item_name");
        this.prodDetailsAddToCart = Selector(".btn.btn_primary");
        this.prodDetailsbackpackTitle = Selector(".inventory_details_name.large_size");
        this.prodDetailsbackpackDesc = Selector(".inventory_details_desc.large_size");
        this.prodDetailsbackpackPrice = Selector(".inventory_details_price");
        this.prodDetailsbackpackImg = Selector('img[src="/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg"]');
    }

    async prodDetailsToCart() {
        await t.click(this.prodDetailsAddToCart);
    }

    async goToProductDetails(index) {
        await t.click(this.prodDetailsTitle.nth(index));
    }
}

export default new ProductDetailsPage();


