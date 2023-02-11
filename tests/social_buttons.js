import { Selector, t, ClientFunction } from "testcafe";

import { baseUrl, loginButton, validUserName, validPassword,
        userNameInput, passwordInput } from "./login";
const twitterButton = Selector('.social_twitter');
const facebookButton = Selector('.social_facebook ');
const linkedinButton = Selector('.social_linkedin');
const getURL = ClientFunction(() => window.location.href);


fixture`Social Buttons`
    .page(baseUrl)


test(`Verify social buttons - Twitter`, async t => {
    await t
        .setTestSpeed(0.8)
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(twitterButton)

    const twitterPage = await getURL();

    await t.expect(twitterPage).eql('https://twitter.com/saucelabs');
});


test(`Verify social buttons - Facebook`, async t => {
    await t
        .setTestSpeed(0.8)
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(facebookButton)

    const facebookPage = await getURL();

    await t.expect(facebookPage).eql('https://www.facebook.com/saucelabs');
});


test(`Verify social buttons - Linkedin`, async t => {
    await t
        .setTestSpeed(0.8)
        .typeText(userNameInput, validUserName)
        .typeText(passwordInput, validPassword)
        .click(loginButton)
        .click(linkedinButton)

    const linkedinPage = await getURL();

    await t.expect(linkedinPage).contains('https://www.linkedin.com/company/sauce-labs');
});
