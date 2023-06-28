import { ClientFunction } from "testcafe";
import mainPage from "../Pages/mainPage";
import webTablesPage from "../Pages/webTablesPage";
import registrationFormPage from "../Pages/registrationFormPage";
import { myUserDetails } from "../Constants/userInformation";
import UserInfoRow from "../Pages/userInfoPage";

const baseUrl = 'https://demoqa.com/';
const getURL = ClientFunction(() => window.location.href);


fixture `User functions`
    .page(baseUrl)

test(`Check page validity`, async t => {
    await t.expect(getURL()).contains(baseUrl);
    await t.expect(mainPage.optionCardElements.visible).eql(true);
});


test.only(`Add a user`, async t => {
    await mainPage.selectCard("Elements");
    await webTablesPage.openMenu("Web Tables");
    await webTablesPage.clickAddBttn();
    await registrationFormPage.registrationFormInformation(myUserDetails);
    await registrationFormPage.submitForm();

    const newUserRow = new UserInfoRow(3);
    const userDetails = await newUserRow.getUserDetails();
    
    await t
        .expect(userDetails.firstName).eql(myUserDetails.firstName)
        .expect(userDetails.lastName).eql(myUserDetails.lastName)
        .expect(userDetails.age).eql(myUserDetails.age)
        .expect(userDetails.emailAddress).eql(myUserDetails.email)
        .expect(userDetails.salary).eql(myUserDetails.salary)
        .expect(userDetails.department).eql(myUserDetails.department)
});


test(`Delete a user`, async t => {
    await registrationFormPage.addNewUser();
    await t.click(userInfoPage.deleteUser());
    await t.expect
});
