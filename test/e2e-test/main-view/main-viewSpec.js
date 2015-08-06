var MainPage = require('./main-viewPO.js');

describe('basketballstat main view', () => {

    var mainPage = new MainPage(),
        mainViewTitle = 'Main View';

    it(`should have title called ${mainViewTitle}`, () => {
        mainPage.get();

        expect(browser.getTitle()).toEqual(mainViewTitle);
    });
});