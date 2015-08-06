var PlayersPage = require('./players-viewPO.js');

describe('basketballstat players view', () => {
    var playersPage = new PlayersPage(),
        playersView = 'Players View';
    
    it(`should have title called ${playersView}`, () => {
        playersPage.get();

        expect(browser.getTitle()).toEqual(playersView);
    });
});