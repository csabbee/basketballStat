angular.module('basketballStat.players')
    .controller('NewPlayerController', function($scope, PlayersDbService, $stateParams, StateHandler) {
        var vm = this;

        vm.goBack = function() {
            StateHandler.goBack();
        };

        vm.reset = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.player = {};
        };

        vm.save = function(player, form) {
            if (form.$dirty && form.$valid) {
                PlayersDbService.addPlayer(player)
                    .then(StateHandler.goBack);
            }
        };
    });

