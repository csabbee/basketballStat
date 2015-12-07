angular.module('basketballStat.manageTeams')
    .controller('ManageTeamsController', function($scope, TeamsDbService, Commons) {
        var vm = this;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.manageTeams';

            if(vm.activeView) {
                TeamsDbService.getAllTeams()
                    .then(Commons.pluckDoc)
                    .then(function(teams) {
                        vm.teams = teams;
                    });
            }
        });

    });
