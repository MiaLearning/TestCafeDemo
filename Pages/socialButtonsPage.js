import { Selector, t } from "testcafe";

class SocialBttnPage {
    constructor () {
        this.linkedInBttn = Selector(".social_linkedin");
        this.facebookBttn =  Selector(".social_facebook ");
        this.twitterBttn = Selector(".social_twitter");
    }

    async goToLinkedIn() {
        await t.click(this.linkedInBttn);
    }

    async goToFacebook() {
        await t.click(this.facebookBttn);
    }

    async goToTwitter() {
        await t.click(this.twitterBttn);
    }};

export default new SocialBttnPage();