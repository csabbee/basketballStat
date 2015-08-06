var NewPlayerPage = require('./new-playerPO.js');
var PlayersPage = require('../players-viewPO.js');

describe('new player page', () => {
    var newPlayerPage = new NewPlayerPage(),
        playersPage = new PlayersPage(),
        newPlayerUrl = 'http://localhost:8080/#/app/players/new',
        fName = 'Jakab',
        lName = 'Gipsz';

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
        //THEN
        expect(playersPage.getPlayers().first()).toEqual(playersPage.getPlayers().last());
        expect(playersPage.getPlayers().first()).toEqual(`${fName} ${lName}`);
    });
});