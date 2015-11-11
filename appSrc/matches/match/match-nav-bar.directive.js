angular.module('basketballStat.matches')
    .directive('matchNavBar', function() {
        return {
            restrict: 'E',
            link: link,
            scope: {},
            templateUrl: 'matches/match/match-nav-bar.html',
            controllerAs: 'MatchNavBarController',
            controller: controller
        };

        function link(scope, element) {
        }
    });

function controller($scope, eventListing) {
    var vm = this;

    vm.time = 0;

    $scope.$onRootScope(eventListing.timeTickEmit, function() {
        if (vm.periodLength) {
            vm.time -= 100;
            if (vm.time <= 0) {
                $scope.$emit(eventListing.timerReachedZero);
                vm.time = vm.periodLength * 60 * 1000;
            }
        } else {
            vm.time+=100;
        }
    });

    /**
     * @param periodLength {number}
     * The length of period in minutes
     */
    vm.setPeriod = function(periodLength) {
        vm.periodLength = periodLength;
        vm.time = periodLength * 60 * 1000;
    }
}