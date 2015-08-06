describe('basketballstat main view', () => {
	var mainView = 'Main View';

  	it(`should have title called ${mainView}`, () => {
    	browser.get('http://localhost:8080');

    	expect(browser.getTitle()).toEqual(mainView);
  	});
});