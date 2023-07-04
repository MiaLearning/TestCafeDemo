import { ClientFunction } from "testcafe";
import mainPage from "../Pages/mainPage";
import webTablesPage from "../Pages/webTablesPage";
import registrationFormPage from "../Pages/registrationFormPage";
import { myUserDetails, newUserDetails } from "../Constants/userInformation";
import UserInfoRow from "../Pages/userInfoPage";

const baseUrl = 'https://demoqa.com/';
const getURL = ClientFunction(() => window.location.href);


fixture `User functions`
    .page(baseUrl)

test(`Check page validity`, async t => {
    await t.expect(getURL()).contains(baseUrl)
    await t.expect(mainPage.optionCards.visible).eql(true);
});


test(`Add a user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    await registrationFormPage.addNewUser();

    const newUserRow = new UserInfoRow(3); //to modify it to not be hardocaded on a line (index needed) + check defaut reviewer pentru LAszlo , command lines in testcafe to video and screenshots si reports/ config file cu setat de paths, size window, time in teste 
    const userDetails = await newUserRow.getUserDetails();

    await t
        .expect(userDetails.firstName).eql(myUserDetails.firstName)
        .expect(userDetails.lastName).eql(myUserDetails.lastName)
        .expect(userDetails.age).eql(myUserDetails.age)
        .expect(userDetails.emailAddress).eql(myUserDetails.email)
        .expect(userDetails.salary).eql(myUserDetails.salary)
        .expect(userDetails.department).eql(myUserDetails.department);
});


test(`Delete a user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
      
    const currentUsersList = await webTablesPage.usersTableList();

    await registrationFormPage.addNewUser();
 
    const latestUser = new UserInfoRow(3);

    await latestUser.deleteUser();

    const latestUsersList = await webTablesPage.usersTableList();

    await t
        .expect(webTablesPage.usersTable.innerText).notContains('Mia')
        .expect(currentUsersList).eql(latestUsersList);
});


test.only(`Edit a new user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    await registrationFormPage.addNewUser();

    const newUser = new UserInfoRow(3);

    await newUser.editUser();
    await registrationFormPage.clearFormFields(); 
    await registrationFormPage.registrationFormInformation(newUserDetails);
    await registrationFormPage.submitForm();

    const changedUserDetails = await newUser.getUserDetails();

    await t
        .expect(changedUserDetails.firstName).eql(newUserDetails.firstName)
        .expect(changedUserDetails.lastName).eql(newUserDetails.lastName)
        .expect(changedUserDetails.age).eql(newUserDetails.age)
        .expect(changedUserDetails.emailAddress).eql(newUserDetails.email)
        .expect(changedUserDetails.salary).eql(newUserDetails.salary)
        .expect(changedUserDetails.department).eql(newUserDetails.department);
});