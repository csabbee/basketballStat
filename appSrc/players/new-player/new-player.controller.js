angular.module('basketballStat.players')
    .controller('NewPlayerController', function($scope, PlayersDbService, $stateParams, StateHandler, $cordovaToast) {
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
                    .then(() => {
                        $cordovaToast.show(`Player ${player.firstName} ${player.lastName} saved`, 'long', 'center')
                            .then(function(success) {
                                // success
                            }, function (error) {
                                // error
                            });
                        StateHandler.goBack();
                    });
            }
        };
    });

