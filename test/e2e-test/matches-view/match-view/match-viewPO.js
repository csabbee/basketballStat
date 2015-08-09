var MatchesPage = require('../matches-viewPO');

module.exports = function() {
    var matchesPage = new MatchesPage();

    return {
        get: get
    };

    function get() {
        matchesPage.get();
        element(by.css(`button[ui-sref='app.matches.new']`)).click();
    }
};