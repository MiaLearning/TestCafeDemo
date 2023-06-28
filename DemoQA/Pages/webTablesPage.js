import { Selector, t } from "testcafe";


class WebTablesPage {
    constructor () {
        this.searchBar = Selector(".form-control");
        this.rowDropDown = Selector(".-pageSizeOptions");
        this.pageNo = Selector("[type~='number']");
        this.addBttn = Selector("#addNewRecordButton");
        this.burgerWebTables = Selector("#item-3");
        this.rowLine = Selector(".rt-tbody [role='row']");
        this.menuOptions = Selector("li");
    }

    async openMenu(burgerOption) {
        await t.click(this.menuOptions.withText(burgerOption));
    }

    async clickAddBttn() {
        await t.click(this.addBttn);
    }
}

export default new WebTablesPage();