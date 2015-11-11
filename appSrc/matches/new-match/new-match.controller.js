angular.module('basketballStat.matches')
    .controller('NewMatchController', function(MatchesDbService, players, $scope, $cordovaToast, StateHandler, $ionicPopup) {
        var vm = this,
            timeStamp = new Date();

        vm.save = function(match, form) {
            var selectedPlayerIds = _.chain(_.keys(match.playerIds))
                                        .filter(_.partial(isSelected, match.playerIds))
                                        .value();
            var playing = _.filter(players, _.partial(idPresent, selectedPlayerIds));

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

        vm.goBack = function(form) {
            if (form.$dirty) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Navigating away',
                    template: 'Are you sure?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        StateHandler.goBack();
                    }
                });
            } else {
                StateHandler.goBack();
            }
        };

        function idPresent(playerIds, player) {
            return _.contains(playerIds, ''+player.doc._id);
        }

        /**
         * @param playerIdsObj {Object}
         * @param id {String}
         */
        function isSelected(playerIdsObj, id) {
            return playerIdsObj[id];
        }
        vm.players = _.pluck(players, 'doc');
        $scope.match = {};
    });
