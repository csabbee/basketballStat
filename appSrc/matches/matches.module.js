angular.module('basketballStat.matches')
    .config($stateProvider => {
        $stateProvider
            .state('app.matches', {
                url: '/matches',
                views: {
                    'menuContent': {
                        templateUrl: 'matches/matches.html',
                        controller: 'MatchesController as MatchesController'
                    }
                }
            })
            .state('app.matches.new', {
                url: '/new',
                views: {
                    'match': {
                        templateUrl: 'matches/match/match.html',
                        controller: 'MatchController as MatchController'
                    }
                }
            })
    });
