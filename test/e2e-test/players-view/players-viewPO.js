module.exports = function() {
    var playersList;

    return {
        get: get,
        getPlayers: getPlayers
    };

    function get() {
        browser.get('http://localhost:8080/#/app/home');
        browser.setLocation('app/players');
        playersList = element.all(by.repeater('player in PlayersController.players'));
    }

    function getPlayers() {
        return element.all(by.repeater('player in PlayersController.players'));
    }
}