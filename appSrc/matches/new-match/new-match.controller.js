angular.module('basketballStat.matches')
    .controller('NewMatchController', function(MatchesDbService, players, $scope, $cordovaToast, StateHandler) {
        var vm = this,
            timeStamp = new Date();
        console.log(`new match at: ${timeStamp.toDateString()}`);

        vm.save = function(match, form) {
            var playing = _.filter(players, _.partial(idPresent, _.keys(match.playerIds)));

            if (form.$dirty && form.$valid) {
                if (playing.length >= 5) {
                    match.time = timeStamp;
                    MatchesDbService.addMatch(match);
                    StateHandler.goBack();
                } else {
                    $cordovaToast.showLongCenter('Need to select least 5 player');
                }
            }
        };

        function idPresent(playerIds, player) {
            return _.contains(playerIds, ''+player._id);
        }
        vm.players = _.pluck(players, 'doc');
        $scope.match = {};
    });
