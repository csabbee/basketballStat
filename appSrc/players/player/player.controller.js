angular.module('basketballStat.players')
    .controller('PlayerController', function($scope, PlayersDbService, $stateParams, StateHandler) {
        var vm = this,
            backupPlayer;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players.player' ? true : false;
        });

        PlayersDbService.getPlayer($stateParams.ssnId).then(player => {
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
            PlayersDbService.deletePlayer(vm.player.ssnId)
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
