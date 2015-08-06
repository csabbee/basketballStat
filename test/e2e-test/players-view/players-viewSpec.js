describe('basketballstat players view', () => {
    var playerView = 'Player View',
        newPlayerUrl = 'http://localhost:8080/#/app/players/new';
    
    it(`should have title called ${playerView}`, () => {
        browser.get('http://localhost:8080/#/app/home');
        browser.setLocation('app/players');

        expect(browser.getTitle()).toEqual(playerView);
    });

    it(`should have the url: ${newPlayerUrl}`, () => {
        browser.get('http://localhost:8080/#/app/home');
        browser.setLocation('app/players');

        element(by.css('button[ui-sref="app.players.newPlayer"]')).click();

        expect(browser.getCurrentUrl()).toBe(newPlayerUrl);
    });
});