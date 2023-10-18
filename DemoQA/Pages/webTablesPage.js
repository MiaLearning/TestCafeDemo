import { Selector, t } from "testcafe";
import webTablesPage from "../Pages/webTablesPage";
import UserInfoRow from "./userPage";
import mainPage from "../Pages/mainPage";
import registrationFormPage from "./registrationFormPage";
import { myUserDetails } from "../Constants/userInformation";



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
        this.lastNameValue = Selector("div.rt-td:nth-child(2)");
        this.pageSizeOption = Selector(".-pageSizeOptions");
        this.jumptToPageInput = Selector("input[type=number]");
        this.previousBttn = Selector('button').withText('Previous');
        this.nextBttn = Selector('button').withText('Next');
        this.options = Selector("option");
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

    async openPageSize() {
        await t.click(this.pageSizeOption);
    }

    async goToNextPage() {
        await t.click(this.nextBttn);
    }

    async selectPageSize(optionValue) {
        await this.openPageSize();
        await this.selectAnyOptions(optionValue);
    }

    async selectAnyOptions(optionValue) {
        await t.click(this.options.withAttribute('value', optionValue));
    }

    async addUsersToCount(count) {
        for (let userNumber = 1; userNumber <= count; userNumber++) {
            const changableUserDetails = { ... myUserDetails}
            changableUserDetails.firstName = `Mia${userNumber.toString().padStart(2, '0')}`;
            await this.addNewUser(changableUserDetails);
        } 
    }
    
    async getAllRows() {
        const rowCount = await webTablesPage.rowLine.count;   
    
    return rowCount;
    }
}



export default new WebTablesPage();