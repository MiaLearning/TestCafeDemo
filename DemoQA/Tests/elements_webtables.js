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

    const newUserRow = new UserInfoRow(3);
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
      
    const currentUsersList = await webTablesPage.fetchValidUserDetails();

    await webTablesPage.addNewUser(newUserDetails);

    const findUserDetails = currentUsersList.find(x => x.firstName === newUserDetails.firstName)
 
    const latestUser = new UserInfoRow(3);

    await latestUser.deleteUser();

    const latestUsersList = await webTablesPage.fetchValidUserDetails();

    await t
        .expect(webTablesPage.usersTable.innerText).notContains(findUserDetails) 
        .expect(currentUsersList).eql(latestUsersList);
});


test(`Edit a new user`, async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    await webTablesPage.addNewUser(myUserDetails);

    const newUser = new UserInfoRow(3);

    await newUser.editUser();
    await registrationFormPage.fillRegistrationForm(newUserDetails); 

    const changedUserDetails = await newUser.getUserDetails();

    await t
        .expect(changedUserDetails.firstName).eql(newUserDetails.firstName)
        .expect(changedUserDetails.lastName).eql(newUserDetails.lastName)
        .expect(changedUserDetails.age).eql(newUserDetails.age)
        .expect(changedUserDetails.emailAddress).eql(newUserDetails.email)
        .expect(changedUserDetails.salary).eql(newUserDetails.salary)
        .expect(changedUserDetails.department).eql(newUserDetails.department);
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


test('Search table for firstName', async t => { 
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    
    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.firstName);
    
    const searchedUserRows = await webTablesPage.fetchValidUserDetails();  
    const searchedUserFirstName = searchedUserRows.filter(row => row.firstName === randomUser.firstName);
    const expectedRowCount = searchedUserFirstName.length;

    await t.expect(searchedUserFirstName.length).eql(expectedRowCount);

    const searchedMaidenName = searchedUserFirstName[0].firstName;
    
    await t.expect(searchedMaidenName).eql(randomUser.firstName);
});


test('Search table for lastName', async t => { 
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    
    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.lastName);
    
    const searchedUserRows = await webTablesPage.fetchValidUserDetails();  
    const searchedUserLastName = searchedUserRows.filter(row => row.lastName === randomUser.lastName);
    const expectedRowCount = searchedUserLastName.length;

    await t.expect(searchedUserLastName.length).eql(expectedRowCount);

    const searchedFamilyName = searchedUserLastName[0].lastName;

    await t.expect(searchedFamilyName).eql(randomUser.lastName);
});


test('Search table for age', async t => { 
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
    
    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.age);

    const searchedUserRows = await webTablesPage.fetchValidUserDetails();   
    const searchedUserActualAge = searchedUserRows.filter(row => row.age === randomUser.age);
    const expectedRowCount = searchedUserActualAge.length;

    await t.expect(searchedUserActualAge.length).eql(expectedRowCount);

    const searchedAgeNo = searchedUserActualAge[0].age;

    await t.expect(searchedAgeNo).eql(randomUser.age);
});


test('Search table for email', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.emailAddress);

    const searchedUserRows = await webTablesPage.fetchValidUserDetails();
    const searchedUserEmailAddress = searchedUserRows.filter(row => row.emailAddress === randomUser.emailAddress);
    const expectedRowCount = searchedUserEmailAddress.length;
    
    await t.expect(searchedUserEmailAddress.length).eql(expectedRowCount);

    const searchedAddress = searchedUserEmailAddress[0].emailAddress;

    await t.expect(searchedAddress).eql(randomUser.emailAddress);
});


test('Search table for salary', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.salary);

    const searchedUserRows = await webTablesPage.fetchValidUserDetails();
    const searchedUserPay = searchedUserRows.filter(row => row.salary === randomUser.salary);
    const expectedRowCount = searchedUserPay.length;

    await t.expect(searchedUserPay.length).eql(expectedRowCount);

    const searchedSalary = searchedUserPay[0].salary;

    await t.expect(searchedSalary).eql(randomUser.salary);
});


test('Search table for department', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const existingUsersDetails = await webTablesPage.fetchValidUserDetails();
    const randomIndex = Math.floor(Math.random() * existingUsersDetails.length);
    const randomUser = existingUsersDetails[randomIndex];

    await webTablesPage.enterSearchText(randomUser.department);

    const searchedUserRows = await webTablesPage.fetchValidUserDetails();
    const searchedUserDepartment =  searchedUserRows.filter(row => row.department === randomUser.department);
    const expectedRowCount = searchedUserDepartment.length;

    await t.expect(searchedUserDepartment.length).eql(expectedRowCount);

    const searchDepart =searchedUserDepartment[0].department;

    await t.expect(searchDepart).eql(randomUser.department);
});


test('Change table row amount to 5', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const numberOfRowsToSelect = 5;

    await webTablesPage.openPageSize();
    await webTablesPage.selectFiveRows();

    const numberOfRowsInTable = await webTablesPage.rowLine.count;

    await t.expect(numberOfRowsInTable).eql(numberOfRowsToSelect);
});


test('Change table row amount to 10' , async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const numberOfRowsToSelect = 10;

    await webTablesPage.openPageSize();
    await webTablesPage.selectTenRows();

    const numberOfRowsInTable = await webTablesPage.rowLine.count;

    await t.expect(numberOfRowsInTable).eql(numberOfRowsToSelect);
});


test('Change table row at random', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    const rowOptions = [
        webTablesPage.sortPage5,
        webTablesPage.sortPage10,
        webTablesPage.sortPage20,
    ];

    await webTablesPage.selectRandomPageSize(rowOptions);
});


test('Click to next table row page', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");

    await t.expect(webTablesPage.nextBttn.hasAttribute('disabled')).ok();

    await webTablesPage.addUsersToCount(8);

    const usersPageOne = await webTablesPage.fetchValidUserDetails();

    await webTablesPage.goToNextPage();
    await t.expect(webTablesPage.jumptToPageInput.value).eql("2");
    await t.expect(webTablesPage.previousBttn.hasAttribute('disabled')).notOk();
    await t.expect(webTablesPage.nextBttn.hasAttribute('disabled')).ok();

    const usersPageTwo = await webTablesPage.fetchValidUserDetails();
    
    const allUsers = usersPageOne.concat(usersPageTwo);
    

    for (let i = 3; i < allUsers.length; i++) {
        await t.expect(allUsers[i].firstName).eql(myUserDetails.firstName);
        await t.expect(allUsers[i].lastName).eql(myUserDetails.lastName);
        await t.expect(allUsers[i].email).eql(myUserDetails.email);
        await t.expect(allUsers[i].age).eql(myUserDetails.age);
        await t.expect(allUsers[i].salary).eql(myUserDetails.salary);
        await t.expect(allUsers[i].department).eql(myUserDetails.department);
    }
});



test('Verify row count matches selected page size', async t => {
    await webTablesPage.navigateToWebTablesPage("Elements", "Web Tables");
  
    const validOptions = ['5', '10', '20'];
  
    for (const optionValue of validOptions) {
        await webTablesPage.selectPageSize(optionValue);
    
        const currentRows = await webTablesPage.getAllRows();
        const expectedRowCount = parseInt(optionValue);
    
        await t.expect(currentRows).eql(expectedRowCount);
    }
  });