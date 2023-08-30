import webTablesPage from "./webTablesPage";
import { t } from "testcafe";



export default class UserInfoRow {
    constructor(index) {
        this.container = webTablesPage.rowLine.nth(index);
        this.editBttn = this.container.find("[title~='Edit']");
        this.deleteBttn = this.container.find("[title~='Delete']");
        this.firstName = this.container.find(".rt-td:nth-child(1)");
        this.lastName = this.container.find(".rt-td:nth-child(2)");
        this.ageNo = this.container.find(".rt-td:nth-child(3)");
        this.emailAddress = this.container.find(".rt-td:nth-child(4)");
        this.salary = this.container.find(".rt-td:nth-child(5)")
        this.department = this.container.find(".rt-td:nth-child(6)");
}

    async getUserDetails() {
        return {
          firstName: await this.firstName.textContent,
          lastName: await this.lastName.textContent,
          age: await this.ageNo.textContent,
          emailAddress: await this.emailAddress.textContent,
          salary: await this.salary.textContent,
          department: await this.department.textContent,
        };
    }

    async deleteUser() {
        await t.click(this.deleteBttn);
    }

    async editUser() {
        await t.click(this.editBttn);
    }
}