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
            .state('app.matches.match', {
                url: '/:_id',
                views: {
                    'match': {
                        templateUrl: 'matches/match/match.html',
                        controller: 'MatchController as MatchController'
                    }
                }
            })
            .state('app.matches.new', {
                url: '/new',
                views: {
                    'match': {
                        templateUrl: 'matches/new-match/new-match.html',
                        controller: 'NewMatchController as NewMatchController',
                        resolve: {
                            players: function(PlayersDbService) {
                                return PlayersDbService.getAllPlayer();
                            }
                        }
                    }
                }
            })
            .state('app.matches.quick', {
                url: '/quick',
                views: {
                    'match': {
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
