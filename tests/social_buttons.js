import { Selector, t, ClientFunction } from "testcafe";
import loginPage from "../Pages/loginPage";
import productsPage from "../Pages/productsPage";

const baseUrl = 'https://www.saucedemo.com/';
const validUserName = 'standard_user';
const validPassword = 'secret_sauce';
const twitterUrl = 'https://twitter.com/saucelabs';
const facebookUrl = 'https://www.facebook.com/saucelabs';
const linkedInUrl = 'https://www.linkedin.com/company/sauce-labs';


fixture`Social Buttons`
    .page(baseUrl)


test(`Verify social buttons - Twitter`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.goToTwitter();
    await t.expect(twitterUrl).eql('https://twitter.com/saucelabs');
});


test(`Verify social buttons - Facebook`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.goToFacebook();
    await t.expect(facebookUrl).eql('https://www.facebook.com/saucelabs');
});


test(`Verify social buttons - Linkedin`, async t => {
    await loginPage.typeUserName(validUserName);
    await loginPage.typePassword(validPassword);
    await loginPage.clickOnLoginBttn();
    await productsPage.goToLinkedIn();
    await t.expect(linkedInUrl).eql('https://www.linkedin.com/company/sauce-labs');
});