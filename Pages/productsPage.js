import { Selector, t } from "testcafe";

class ProductsPage {
    constructor () {
        this.burgerMenu = Selector("#react-burger-menu-btn");
        this.burgerAllItems = Selector("#inventory_sidebar_link");
        this.burgerAbout = Selector("#about_sidebar_link");
        this.burgerLogOut = Selector("#logout_sidebar_link");
        this.burgerResetApp = Selector("#reset_sidebar_link");
        this.burgerCloseMenu = Selector("#react-burger-cross-btn");
        this.productSortDrop = Selector("div.right_component > span");
        this.sortProductAZ = Selector("option[value='az']");
        this.sortProductZA = Selector("option[value='za']");
        this.sortPriceLH = Selector("option[value='lohi']");
        this.sortPriceHL = Selector("option[value='hilo']");
        this.shoppingCartBttn = Selector("#shopping_cart_container");
        this.cartCount = Selector(".shopping_cart_badge");
        this.addToCartBttn = Selector("[id^='add-to-cart']");
        this.removeFromCartBttn = Selector("[id^='remove']");
        this.linkedInBttn = Selector(".social_linkedin");
        this.facebookBttn =  Selector(".social_facebook ");
        this.twitterBttn = Selector(".social_twitter");
        this.inventoryItem = Selector(".inventory_item");
        this.productTitle = Selector(".inventory_item_name");
        this.productDescription = Selector(".inventory_item_desc");
        this.productPrice = Selector(".inventory_item_price");
    }


    async openBurgerMenu () {
        await t.click(this.burgerMenu);
    }

    async closeBurgerMenu () {
        await t.click(this.burgerCloseMenu);
    }

    async seeAllItems () {
        await t.click(this.burgerAllItems);
    }

    async goToAboutPage () {
        await t.click(this.burgerAbout);
    }

    async logOutOfSauce () {
        await t.click(this.burgerLogOut);
    }

    async restAppllication () {
        await t.click(this.burgerResetApp);
    }

    async openSortDrop () {
        await t.click(this.productSortDrop);
    }

    async sortByAscending () {
        await t.click(this.sortProductAZ);
    }

    async sortByDescending () {
        await t.click(this.sortProductZA);
    }

    async sortHighPrice () {
        await t.click(this.sortPriceHL);
    }

    async sortLowPrice () {
        await t.click(this.sortPriceLH);
    }

    async goToCart () {
        await t.click(this.shoppingCartBttn);
    }

    async removeProductFromCart () {
        await t.click(this.removeFromCartBttn);
    }
  
    async goToLinkedIn() {
        await t.click(this.linkedInBttn);
    }

    async goToFacebook() {
        await t.click(this.facebookBttn);
    }

    async goToTwitter() {
        await t.click(this.twitterBttn);
    }

    async addProductToCart(index) {
        await t.click(this.addToCartBttn.nth(index));
    }

    async addNewProductToCart() {
        await t.click(this.addToCartBttn);
    }

    async removeProductFromPage() {
        await t.click(this.removeFromCartBttn);
    }

    async clickOnProduct(index) {
        await t.click(this.productTitle.nth(index));
    }};

export default new ProductsPage();

