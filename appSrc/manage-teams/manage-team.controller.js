angular.module('basketballStat.manageTeams')
    .controller('ManageTeamsController', function($scope, TeamsDbService) {
        var vm = this;
        //vm.teams = _.pluck(teams, 'doc');

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.manageTeams';
        });

        TeamsDbService.getAllTeams().then(function(teams) {
            console.log(teams);
            vm.teams = _.pluck(teams, 'doc');
        });
    });
