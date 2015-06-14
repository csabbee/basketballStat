angular.module('basketballStat')
    .controller('PlayersController', function($scope, IndexedDbService) {
        var vm = this;
        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players' ? true : false;
        });
        $scope.$onRootScope('player.updated', () => {
            IndexedDbService.getAllPlayer().then(players => {
                vm.players = players;
            });
        });

        vm.addPlayer = function() {
            console.log('setting player');
            //IndexedDbService.setPlayer('newPlayer', player);
        };

        IndexedDbService.getAllPlayer().then(players => {
            vm.players = players;
        });
    });