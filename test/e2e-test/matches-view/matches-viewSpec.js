var MatchesPage = require('./matches-viewPO');

describe('Matches View', ()=> {
    var matchesPage = new MatchesPage(),
        matchesViewTitle = 'Matches View';

    beforeEach(()=> {
        matchesPage.get();
    });

    it(`it should have the title: ${matchesViewTitle}`, ()=> {
        // GIVEN
        // WHEN
        // THEN
        expect(browser.getTitle()).toEqual(matchesViewTitle);
    });
});
