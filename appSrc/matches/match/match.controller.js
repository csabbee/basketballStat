angular.module('basketballStat.matches')
    .controller('MatchController', function($scope, MatchesDbService, $stateParams, StateHandler, $ionicScrollDelegate,
                                            $ionicModal) {
        var vm = this,
            modal,
            playerStat = {
                time: '00:00:0',
                points: 0,
                fieldGoal: {
                    made: 0,
                    attempt: 0
                },
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

        MatchesDbService.getMatch($stateParams._id).then(match => {
            match.players.forEach(player => {
                player.stats = JSON.parse(JSON.stringify(playerStat));
            });
            vm.match = match;
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
    });