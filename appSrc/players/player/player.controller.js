angular.module('basketballStat')
    .controller('PlayerController', function($scope, IndexedDbService, $stateParams, StateHandler) {
        var vm = this,
            backupPlayer;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players.player' ? true : false;
        });

        IndexedDbService.getPlayer($stateParams.ssnId).then(player => {
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

        vm.update = function(player, form) {
            if (form.$dirty && form.$valid) {
                player.ssn = backupPlayer.ssn;
                IndexedDbService.updatePlayer(player)
                    .then(() => {
                        backupPlayer = angular.copy(player);
                        vm.player = angular.copy(player);
                    })
                    .catch(() => {
                        vm.player = angular.copy(backupPlayer);
                    });
            }
        };
    });
