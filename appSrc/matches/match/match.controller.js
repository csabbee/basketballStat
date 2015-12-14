angular.module('basketballStat.matches')
    .controller('MatchController', function ($scope, MatchesDbService, StateHandler, $ionicScrollDelegate, $ionicModal, eventListing, match) {
        var vm = this,
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
                personalFoul: 0,
                events: [],
            },
            saveMatchHandler = $scope.$on('$stateChangeStart', function() {
                MatchesDbService.updateMatch(vm.match);
            });

        function setStat(player) {
            if (!player.stats) {
                player.stats = JSON.parse(JSON.stringify(playerStat));
            }

            return player;
        }

        function pushEvent(event) {
            var length = vm.currentPlayer.stats.events.length;
            vm.currentPlayer.stats.events.push(event+' '+length);
            $ionicScrollDelegate.resize();
        }

        function removeEvent(index) {
            vm.currentPlayer.stats.events.splice(index, 1);
            $ionicScrollDelegate.resize();
        }

        $ionicScrollDelegate.scrollTop();
        vm.currentlyPlaying = {};
        vm.match = match;
        vm.match.players.map(setStat);

        vm.pushEvent = pushEvent;
        vm.removeEvent = removeEvent;

        $ionicModal.fromTemplateUrl('matches/match/stats/new-stats-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(statModal => {
            modal = statModal;
        });

        $scope.closeModal = function () {
            modal.hide();
            $scope.$emit('modal.hide');
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            modal.remove();
            saveMatchHandler();
        });

        vm.show = function (player) {
            vm.currentPlayer = player;
            modal.show();
        };

        vm.goBack = function () {
            StateHandler.goBack();
        };

        vm.setCurrentlyPlaying = function () {
            vm.selectedPlayerIds = _.chain(_.keys(vm.currentlyPlaying))
                .filter(_.partial(isSelected, vm.currentlyPlaying))
                .value();
        };

        $scope.$on('reorderedEventsArray', function(event, reorderedArray) {
            vm.currentPlayer.stats.events = reorderedArray;
        });

        $scope.$onRootScope(eventListing.timeTickEmit, () => {
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