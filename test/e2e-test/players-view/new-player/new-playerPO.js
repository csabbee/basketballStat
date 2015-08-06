var PlayersPage = require('../players-viewPO.js');

module.exports = function() {
    var playersPage = new PlayersPage(),
        firstName, lastName;
    

    return {
        get: get,
        save: save,
        reset: reset,
        setFirstName: setFirstName,
        getFirstName: getFirstName,
        setLastName: setLastName,
        getLastName: getLastName
    };

    function get() {
        playersPage.get();
        element(by.css(`button[ui-sref='app.players.newPlayer']`)).click();
        firstName = element(by.model('player.firstName'));
        lastName = element(by.model('player.lastName'));
    }

    function save() {
        element(by.buttonText('Save')).click();
    }

    function reset() {
        element(by.buttonText('Reset')).click();
    }

    function setFirstName(name) {
        firstName.sendKeys(name);
    }

    function getFirstName() {
        return firstName.getText();
    }

    function setLastName(name) {
        lastName.sendKeys(name);
    }

    function getLastName() {
        return lastName.getText();
    }
}