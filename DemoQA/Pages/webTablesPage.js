import { Selector, t } from "testcafe";
import webTablesPage from "../Pages/webTablesPage";
import UserInfoRow from "./userPage";
import mainPage from "../Pages/mainPage";
import registrationFormPage from "./registrationFormPage";



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
        this.firstNameValue = Selector("div.rt-td:first-child");
    }

    async openMenu(burgerOption) {
        await t.click(this.menuOptions.withText(burgerOption));
    }

    async clickAddBttn() {
        await t.click(this.addBttn);
    }
    
    async fetchValidUserDetails() {
        const rowCount = await webTablesPage.rowLine.count;
        const existingUsersDetails = [];

        for (let i = 0; i < rowCount; i++) {
          const existingUser = new UserInfoRow(i);
          const userDetails = await existingUser.getUserDetails();
  
            if (userDetails.firstName.trim() !== "" && userDetails.lastName.trim() !== "") { 
                existingUsersDetails.push(userDetails);
            } else {
                break;          
            }
        }   
        return existingUsersDetails;  
    }

    async navigateToWebTablesPage(cardName, menuName) {
        await mainPage.selectCard(cardName);
        await webTablesPage.openMenu(menuName);
    }

    async addNewUser(user) {
        await webTablesPage.clickAddBttn();
        await registrationFormPage.fillRegistrationForm(user);
    }

    async enterSearchText(string) {
        await t
          .typeText(this.searchBar, string);
    }
}


export default new WebTablesPage();