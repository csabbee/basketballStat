angular.module('basketballStat.players')
    .controller('PlayersController', function($scope, PlayersDbService) {
        var vm = this;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players' ? true : false;
            if (vm.activeView) {
                PlayersDbService.getAllPlayer().then(players => {
                    vm.players = _.pluck(players, 'doc');
                })
            }
        });

        vm.players = {};
    });