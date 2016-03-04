angular.module('basketballStat.matches')
    .controller('NewMatchController', function(MatchesDbService, players, $scope, $cordovaToast, StateHandler, $ionicPopup) {
        var vm = this,
            timeStamp = new Date();

        vm.save = function() {
            var selectedPlayerIds = _.chain(_.keys(vm.match.playerIds))
                                        .filter(_.partial(isSelected, vm.match.playerIds))
                                        .value();
            var playing = _.filter(vm.players, _.partial(idPresent, selectedPlayerIds));

            if (vm.form.$dirty && vm.form.$valid) {
                if (playing.length >= 5) {
                    vm.match.time = timeStamp;
                    vm.match.players = playing;
                    MatchesDbService.addMatch(vm.match);
                    StateHandler.goBack();
                } else {
                    $cordovaToast.showLongCenter('Need to select at least 5 player');
                }
            }
        };

        vm.goBack = function() {
            if (vm.form.$dirty) {
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
            return _.contains(playerIds, ''+player._id);
        }

        /**
         * @param playerIdsObj {Object}
         * @param id {String}
         */
        function isSelected(playerIdsObj, id) {
            return playerIdsObj[id];
        }
        vm.players = players;
        vm.match = {};
    });
