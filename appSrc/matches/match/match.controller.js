angular.module('basketballStat.matches')
    .controller('MatchController', function($scope, MatchesDbService, $stateParams, StateHandler, $ionicScrollDelegate) {
        var vm = this;
        $ionicScrollDelegate.scrollTop();

        MatchesDbService.getMatch($stateParams._id).then(match => {
            vm.match = match;
        });
    });