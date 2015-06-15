angular.module('basketballStat')
    .controller('PlayersController', function($scope, IndexedDbService, $state) {
        var vm = this;
        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players' ? true : false;
        });
        $scope.$onRootScope('players.list.update', () => {
            IndexedDbService.getAllPlayer().then(players => {
                vm.players = players;
            });
        });

        IndexedDbService.getAllPlayer().then(players => {
            vm.players = players;
        });
    });