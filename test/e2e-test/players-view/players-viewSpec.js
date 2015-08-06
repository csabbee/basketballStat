var PlayersPage = require('./players-viewPO.js');

describe('basketballstat players view', () => {
    var playersPage = new PlayersPage(),
        playersView = 'Players View',
        newPlayerUrl = 'http://localhost:8080/#/app/players/new';
    
    it(`should have title called ${playersView}`, () => {
        playersPage.get();

        expect(browser.getTitle()).toEqual(playersView);
    });

    it(`should have the url: ${newPlayerUrl}`, () => {
        playersPage.get();

        element(by.css('button[ui-sref="app.players.newPlayer"]')).click();

        expect(browser.getCurrentUrl()).toBe(newPlayerUrl);
    });
});