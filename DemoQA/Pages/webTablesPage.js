import { Selector, t } from "testcafe";
import webTablesPage from "../Pages/webTablesPage";
import UserInfoRow from "./userPage";
import mainPage from "../Pages/mainPage";


class WebTablesPage {
    constructor () {
        this.searchBar = Selector(".form-control");
        this.rowDropDown = Selector(".-pageSizeOptions");
        this.pageNo = Selector("[type~='number']");
        this.addBttn = Selector("#addNewRecordButton");
        this.burgerWebTables = Selector("#item-3");
        this.rowLine = Selector(".rt-tbody [role='row']");
        this.menuOptions = Selector("li");
        this.usersTable = Selector(".ReactTable");
        this.userRow = Selector(".rt-tr-group");
    }

    async openMenu(burgerOption) {
        await t.click(this.menuOptions.withText(burgerOption));
    }

    async clickAddBttn() {
        await t.click(this.addBttn);
    }

    async usersTableList() {
        const rowCount = await webTablesPage.rowLine.count;
        const existingUsersDetails = [];

        for (let i = 0; i < rowCount; i++) {
            const existingUser = new UserInfoRow(i);
            const userDetails = await existingUser.getUserDetails();

            if (userDetails.firstName.trim() !== "" && userDetails.lastName.trim() !== "") {
            existingUsersDetails.push(userDetails);
            }
        }

        return existingUsersDetails;   
    }

    async navigateToWebTablesPage(cardName, menuName) {
        await mainPage.selectCard(cardName);
        await webTablesPage.openMenu(menuName);
    }

    async selectAnyUserRow() {
        await t.click(this.rowLine);
    }

}

export default new WebTablesPage();