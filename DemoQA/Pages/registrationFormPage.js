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
        await webTablesPage.clickAddBttn();
        await this.registrationFormInformation(myUserDetails);
        await this.submitForm();
    }

    async clearFormFields() {
        const fields = [
            this.firstNameInput,
            this.lastNameInput,
            this.emailInput,
            this.ageInput,
            this.salaryInput,
            this.departmentInput
        ]
    for (const field of fields) {
      await t
        .click(field).pressKey('ctrl+a delete');
    }}
}

    

export default new RegistrationFormPage();