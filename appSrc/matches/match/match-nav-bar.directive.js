angular.module('basketballStat.matches')
    .directive('matchNavBar', function() {
        return {
            restrict: 'E',
            link: link,
            templateUrl: 'matches/match/match-nav-bar.html'
        };

        function link(scope, element) {
            element.css('top: -44px;');
            console.log('asdasdasd');
        }
    });