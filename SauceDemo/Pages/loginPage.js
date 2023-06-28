import { Selector, t } from "testcafe";

class LoginPage {
    constructor () {
        this.userNameInput = Selector("#user-name");
        this.passwordInput = Selector("#password");
        this.loginBttn = Selector("#login-button");
        this.errorContainer = Selector(".error h3");
        this.closeErrorBttn = Selector(".error-button");
    }

    async typeUserName(validUserName) {
        await t.typeText(this.userNameInput, validUserName);
    }

    async typePassword(validPassword) {
        await t.typeText(this.passwordInput, validPassword);
    }

    async clickOnLoginBttn() {
        await t.click(this.loginBttn);
    }

    async signIn(user) {
        await t
            .typeText(this.userNameInput, user.username)
            .typeText(this.passwordInput, user.password)
            .click(this.loginBttn);
    }
}

export default new LoginPage();