angular.module('basketballStat')
    .controller('MatchesController', function($scope) {
        var vm = this;
        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.matches' ? true : false;
        });
    });
