angular.module('basketballStat.players')
    .controller('PlayersController', function($scope, PlayersDbService, Commons, players) {
        var vm = this;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.players' ? true : false;
        });

        vm.players = players;
    });