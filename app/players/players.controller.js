angular.module('basketballStat.players')
    .controller('PlayersController', function($scope, PlayersDbService, Commons) {
        var vm = this;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players' ? true : false;
            if (vm.activeView) {
                PlayersDbService.getAllPlayer()
                    .then(Commons.pluckDoc)
                    .then(function(players) {
                        vm.players = players;
                    });
            }
        });
    });