angular.module('basketballStat.matches')
    .controller('MatchController', function($scope, MatchesDbService, $stateParams, StateHandler, $ionicScrollDelegate,
                                            $ionicModal, TimeService) {
        var vm = this,
            modal;

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

        $ionicScrollDelegate.scrollTop();

        MatchesDbService.getMatch($stateParams._id).then(match => {
            vm.match = match;
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