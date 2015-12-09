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
            .state('app.match', {
                url: '/matches/:_id',
                views: {
                    'menuContent': {
                        templateUrl: 'matches/match/match.html',
                        controller: 'MatchController as MatchController',
                        resolve: {
                            match: function($stateParams, MatchesDbService) {
                                return MatchesDbService.getMatch($stateParams._id);
                            }
                        }
                    }
                }
            })
            .state('app.newMatch', {
                url: '/matches/new',
                views: {
                    'menuContent': {
                        templateUrl: 'matches/new-match/new-match.html',
                        controller: 'NewMatchController as NewMatchController',
                        resolve: {
                            players: function(PlayersDbService, Commons) {
                                return PlayersDbService.getAllPlayer()
                                    .then(Commons.pluckDoc);
                            }
                        }
                    }
                }
            })
            .state('app.quickMatch', {
                url: '/matches/quick',
                views: {
                    'menuContent': {
                        templateUrl: 'matches/quick-match/quick-match.html'
                    }
                }
            })
    }).run((storageConfig, MatchesDbService, KeyGenerator)=> {
        MatchesDbService.getAllMatches().then(function(matches) {
            var ids = matches.map(match => parseFloat(match.doc._id));
            KeyGenerator.setSeed({
                store: storageConfig.matchesObjectStore,
                usedIds: ids
            });
        });
    });
