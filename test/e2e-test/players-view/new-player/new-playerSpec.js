var NewPlayerPage = require('./new-playerPO.js');
var PlayersPage = require('../players-viewPO.js');

describe('new player page', () => {
    var newPlayerPage = new NewPlayerPage(),
        playersPage = new PlayersPage(),
        newPlayerUrl = 'http://localhost:8080/#/app/players/new',
        fName = 'Jakab',
        lName = 'Gipsz',
        players = [
            { firstName: 'Tim', lastName: 'Duncan'},
            { firstName: 'Antonio', lastName: 'McDyess'},
            { firstName: 'Vince', lastName: 'Carter'},
            { firstName: 'Stephen', lastName: 'Curry'},
            { firstName: 'Shaquille', lastName: 'O\'Neal'}
        ];

    beforeEach(() => {
        newPlayerPage.get();
    });

    it(`should have the url: ${newPlayerUrl}`, () => {
        // GIVEN
        // WHEN
        // THEN
        expect(browser.getCurrentUrl()).toBe(newPlayerUrl);
    });

    it(`should not do anything when clicking on Save without filling out the names`, () => {
        // GIVEN
        // WHEN
        newPlayerPage.save();
        //THEN
        expect(browser.getCurrentUrl()).toBe(newPlayerUrl);
    });

    it(`should reset the input fields`, () => {
        // GIVEN
        newPlayerPage.setFirstName(fName);
        newPlayerPage.setLastName(lName);
        // WHEN
        newPlayerPage.reset();
        //THEN
        expect(newPlayerPage.getFirstName()).toBe('');
        expect(newPlayerPage.getLastName()).toBe('');
    });

    it(`should save the new player`, () => {
        // GIVEN
        newPlayerPage.setFirstName(fName);
        newPlayerPage.setLastName(lName);
        // WHEN
        newPlayerPage.save();
        setTimeout(function() {}, 550);
        //THEN
        expect(playersPage.getPlayers().first().getText()).toEqual(`${fName} ${lName}`);
    });

    iit(`should add 5 players to the players list`, () => {
        // GIVEN
        // WHEN
        newPlayerPage.addPlayers(players);
        // THEN
        expect(playersPage.getPlayers().count()).toBe(5);
    });
});