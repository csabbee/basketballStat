angular.module('basketballStat.matches')
    .controller('NewMatchController', function(MatchesDbService, players, $scope, $cordovaToast, StateHandler) {
        var vm = this,
            timeStamp = new Date();

        vm.save = function(match, form) {
            var playing = _.filter(players, _.partial(idPresent, _.keys(match.playerIds)));
            if (form.$dirty && form.$valid) {
                if (playing.length >= 5) {
                    match.time = timeStamp;
                    match.players =_.pluck(playing, 'doc');
                    MatchesDbService.addMatch(match);
                    StateHandler.goBack();
                } else {
                    $cordovaToast.showLongCenter('Need to select at least 5 player');
                }
            }
        };

        vm.goBack = function() {
            StateHandler.goBack();
        };

        function idPresent(playerIds, player) {
            return _.contains(playerIds, ''+player.doc._id);
        }
        vm.players = _.pluck(players, 'doc');
        $scope.match = {};
    });
