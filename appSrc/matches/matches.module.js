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
                },
			    ownParams: {
				   'viewTitle': 'Matches'
			    }
            })
            .state('app.matches.match', {
                url: '/:_id',
                views: {
                    'match': {
                        templateUrl: 'matches/match/match.html',
                        controller: 'MatchController as MatchController',
                        resolve: {
                            match: function($stateParams, MatchesDbService) {
                                return MatchesDbService.getMatch($stateParams._id);
                            }
                        }
                    }
                },
			    ownParams: {
				   'viewTitle': 'Match'
			    }
            })
            .state('app.matches.new', {
                url: '/new',
                views: {
                    'match': {
                        templateUrl: 'matches/new-match/new-match.html',
                        controller: 'NewMatchController as NewMatchController',
                        resolve: {
                            players: function(PlayersDbService, Commons) {
                                return PlayersDbService.getAllPlayer()
                                    .then(Commons.pluckDoc);
                            }
                        }
                    }
                },
			    ownParams: {
				   'viewTitle': 'New Match'
			    }
            })
            .state('app.matches.quick', {
                url: '/quick',
                views: {
                    'match': {
                        templateUrl: 'matches/quick-match/quick-match.html'
                    }
                },
			    ownParams: {
				   'viewTitle': 'Quick Match'
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
