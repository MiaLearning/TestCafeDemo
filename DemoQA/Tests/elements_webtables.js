import { ClientFunction } from "testcafe";
import { myUserDetails, newUserDetails } from "../Constants/userInformation";
import mainPage from "../Pages/mainPage";
import webTablesPage from "../Pages/webTablesPage";
import registrationFormPage from "../Pages/registrationFormPage";
import UserInfoRow from "../Pages/userPage";

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
    await webTablesPage.addNewUser(newUserDetails);

    const newUserRow = new UserInfoRow(3); //modify it to not be hardocaded on a line (index needed) + check defaut reviewer pentru LAszlo , command lines in testcafe to video and screenshots si reports/ config file cu setat de paths, size window, time in teste 
    const userDetails = await newUserRow.getUserDetails();

    await t
        .expect(userDetails.firstName).eql(newUserDetails.firstName)
        .expect(userDetails.lastName).eql(newUserDetails.lastName)
        .expect(userDetails.age).eql(newUserDetails.age)
        .expect(userDetails.emailAddress).eql(newUserDetails.email)
        .expect(userDetails.salary).eql(newUserDetails.salary)
        .expect(userDetails.department).eql(newUserDetails.department);
});


test(`Delete a user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
      
    const currentUsersList = await webTablesPage.filterValidUserDetails();

    await webTablesPage.addNewUser(newUserDetails);
 
    const latestUser = new UserInfoRow(3);

    await latestUser.deleteUser();

    const latestUsersList = await webTablesPage.filterValidUserDetails();

    await t
        .expect(webTablesPage.usersTable.innerText).notContains('Felix')
        .expect(currentUsersList).eql(latestUsersList);
});


test(`Edit a new user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    await webTablesPage.addNewUser(myUserDetails);

    const newUser = new UserInfoRow(3);

    await newUser.editUser();
    await registrationFormPage.fillRegistrationForm(myUserDetails);

    const changedUserDetails = await newUser.getUserDetails();

    await t
        .expect(changedUserDetails.firstName).eql(myUserDetails.firstName)
        .expect(changedUserDetails.lastName).eql(myUserDetails.lastName)
        .expect(changedUserDetails.age).eql(myUserDetails.age)
        .expect(changedUserDetails.emailAddress).eql(myUserDetails.email)
        .expect(changedUserDetails.salary).eql(myUserDetails.salary)
        .expect(changedUserDetails.department).eql(myUserDetails.department);
});


test(`Edit an existing user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const existingUser = new UserInfoRow(0);

    await existingUser.editUser();
    await registrationFormPage.fillRegistrationForm(myUserDetails);

    const modifiedUserDetails = await existingUser.getUserDetails();

    await t
    .expect(modifiedUserDetails.firstName).eql(myUserDetails.firstName)
    .expect(modifiedUserDetails.lastName).eql(myUserDetails.lastName)
    .expect(modifiedUserDetails.age).eql(myUserDetails.age)
    .expect(modifiedUserDetails.emailAddress).eql(myUserDetails.email)
    .expect(modifiedUserDetails.salary).eql(myUserDetails.salary)
    .expect(modifiedUserDetails.department).eql(myUserDetails.department);
});


test(`Search table for firstName`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    
    const firstNameUser = new UserInfoRow(0);
    const userName = "Cierra"; // should it be more general? so it catches any first Name property from table?
    
    await webTablesPage.enterSearchText(userName);
    
    const searchedUserName = await firstNameUser.getUserDetails();
    
    await t.expect(searchedUserName.firstName.trim()).eql(userName);
  });
  