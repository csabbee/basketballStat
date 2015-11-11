angular.module('basketballStat.players')
    .controller('PlayerController', function($scope, PlayersDbService, $stateParams, StateHandler, $ionicScrollDelegate) {
        var vm = this,
            backupPlayer;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players.player' ? true : false;
            if(vm.activeView) {
                $ionicScrollDelegate.scrollTop();
            }
        });

        PlayersDbService.getPlayer($stateParams._id).then(player => {
            vm.player = player;
            $scope.player = angular.copy(player);
            backupPlayer = angular.copy(player);
        });

        vm.goBack = function() {
            StateHandler.goBack();
        };

        vm.reset = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.player = backupPlayer;
        };

        vm.delete = function() {
            PlayersDbService.deletePlayer(vm.player)
                .then(() => {
                    StateHandler.goBack();
                });
        };

        vm.update = function(player, form) {
            if (form.$dirty && form.$valid) {
                player.ssnId = backupPlayer.ssnId;
                PlayersDbService.updatePlayer(player)
                    .then(() => {
                        backupPlayer = angular.copy(player);
                        vm.player = angular.copy(player);
                        StateHandler.goBack();
                    })
                    .catch(() => {
                        vm.player = angular.copy(backupPlayer);
                    });
            }
        };
    });
