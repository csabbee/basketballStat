var MainPage = require('./main-viewPO.js');

describe('basketballstat main view', () => {

    var mainPage = new MainPage(),
        mainView = 'Main View';

  	it(`should have title called ${mainView}`, () => {
        mainPage.get();

    	expect(browser.getTitle()).toEqual(mainView);
  	});
});