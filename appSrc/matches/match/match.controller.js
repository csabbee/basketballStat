angular.module('basketballStat.matches')
    .controller('MatchController', function($scope, MatchesDbService, $stateParams, StateHandler, $ionicScrollDelegate,
                                            $ionicModal, eventListing) {
        var vm = this,
            saveMatchHandler,
            modal,
            playerStat = {
                time: 0,
                points: 0,
                twoPoint: {
                    made: 0,
                    attempt: 0
                },
                threePoint: {
                    made: 0,
                    attempt: 0
                },
                freeThrow: {
                    made: 0,
                    attempt: 0
                },
                rebound: {
                    offensive: 0,
                    defensive: 0
                },
                assist: 0,
                turnover: 0,
                steal: 0,
                block: 0,
                personalFoul: 0
            };

        $ionicScrollDelegate.scrollTop();

        vm.currentlyPlaying = {};

        MatchesDbService.getMatch($stateParams._id).then(match => {
            match.players.map(setStat);
            vm.match = match;
            saveMatchHandler = $scope.$on('$stateChangeStart', function() {
                MatchesDbService.updateMatch(vm.match);
            });

            function setStat(player) {
                if (!player.stats) {
                    player.stats = JSON.parse(JSON.stringify(playerStat));
                }

                return player;
            }
        });



        $ionicModal.fromTemplateUrl('matches/match/stats/stats-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(statModal => {
            modal = statModal;
        });

        $scope.closeModal = function() {
            modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            modal.remove();
            saveMatchHandler();
        });

        vm.show = function(player) {
            vm.currentPlayer = player;
            modal.show();
        };

        vm.buttonClick = function() {
            console.log(`I'm clicked: ${arguments}`);
        };

        vm.goBack = function() {
            StateHandler.goBack();
        };

        vm.setCurrentlyPlaying = function() {
            vm.selectedPlayerIds = _.chain(_.keys(vm.currentlyPlaying))
                .filter(_.partial(isSelected, vm.currentlyPlaying))
                .value();
        };

        $scope.$onRootScope(eventListing.timeTickEmit, ()=> {
            _.chain(vm.match.players)
                .filter(isCurrentlyPlaying)
                .map(addPlayTime)
                .value();
        });
        /**
         * @param playerIdsObj {Object}
         * @param id {String}
         */
        function isSelected(playerIdsObj, id) {
            return playerIdsObj[id];
        }

        function isCurrentlyPlaying(player) {
            return _.contains(vm.selectedPlayerIds, player._id);
        }

        function addPlayTime(player) {
            return player.stats.time += 100;
        }
    });