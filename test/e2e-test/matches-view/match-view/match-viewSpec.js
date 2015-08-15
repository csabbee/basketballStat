var MatchPage = require('./match-viewPO');

describe('Match View', ()=> {
    var matchPage = new MatchPage(),
        newMatchUrl = 'http://localhost:8080/#/app/matches/new';

    beforeEach(()=> {
        matchPage.get();
    });

    iit(`should have the url: ${newMatchUrl}`, ()=> {
        // GIVEN
        // WHEN
        // THEN
        expect(browser.getCurrentUrl()).toEqual(newMatchUrl);
    });
});