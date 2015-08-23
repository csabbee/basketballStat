angular.module('basketballStat.matches')
    .controller('NewMatchController', function(MatchesDbService, players) {
        var vm = this,
            timeStamp = new Date();
        console.log(`new match at: ${timeStamp.toDateString()}`);

        vm.players = players;
    });
