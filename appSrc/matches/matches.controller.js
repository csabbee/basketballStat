angular.module('basketballStat.matches')
    .controller('MatchesController', function($scope) {
        var vm = this;
        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.matches' ? true : false;
            if(vm.activeView) {
                MatchesDbService.getAllMatches().then(matches => {
                    vm.matches = matches;
                })
            }
        });
        vm.matches = {};
    });
