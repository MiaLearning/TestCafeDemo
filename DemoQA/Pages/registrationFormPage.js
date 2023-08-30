import { Selector, t } from "testcafe";



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

    async fillRegistrationForm(user) {
        await t
            .typeText(this.firstNameInput, user.firstName, { replace: true })
            .typeText(this.lastNameInput, user.lastName, { replace: true })
            .typeText(this.emailInput, user.email, { replace: true })
            .typeText(this.ageInput, user.age, { replace: true })
            .typeText(this.salaryInput, user.salary, { replace: true })
            .typeText(this.departmentInput, user.department, { replace: true })
            .click(this.submitBttn);
    }
}

    
export default new RegistrationFormPage();