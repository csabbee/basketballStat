angular.module('basketballStat.matches')
    .controller('MatchController', function($scope, MatchesDbService, $stateParams, StateHandler, $ionicScrollDelegate) {
        var vm = this;
        $ionicScrollDelegate.scrollTop();

        MatchesDbService.getMatch($stateParams.ssnId).then(match => {
            vm.match = match;
        });
    });