import { Selector, t } from "testcafe";
import { myUserDetails } from "../Constants/userInformation";
import mainPage from "../Pages/mainPage";
import webTablesPage from "../Pages/webTablesPage";


class RegistrationFormPage {
    constructor () {
        this.firstNameInput = Selector("#firstName");
        this.lastNameInput = Selector("#lastName");
        this.emailInput = Selector("#userEmail");
        this.ageInput = Selector("#age");
        this.salaryInput = Selector("#salary");
        this.departmentInput = Selector("#department");
        this.submitBttn = Selector("#submit");
    }

    async registrationFormInformation(user) {
        await t
            .typeText(this.firstNameInput, user.firstName)
            .typeText(this.lastNameInput, user.lastName)
            .typeText(this.emailInput, user.email)
            .typeText(this.ageInput, user.age)
            .typeText(this.salaryInput, user.salary)
            .typeText(this.departmentInput, user.department)
    }

    async submitForm () {
        await t.click(this.submitBttn);
    }

    async addNewUser() {
        await mainPage.selectCard("Elements");
        await webTablesPage.openMenu("Web Tables");
        await webTablesPage.clickAddBttn();
        await this.registrationFormInformation(myUserDetails);
        await this.submitForm();
    }
}

export default new RegistrationFormPage();