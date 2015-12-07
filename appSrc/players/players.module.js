angular.module('basketballStat.players')
    .config($stateProvider => {
        'use strict';

        $stateProvider
            .state('app.players', {
                url: '/players',
                views: {
                    'menuContent': {
                        templateUrl: 'players/players.html',
                        controller: 'PlayersController as PlayersController'
                    }
                },
			    ownParams: {
				   'viewTitle': 'Players'
			    }
            })
            .state('app.players.player', {
                url: '/:_id',
                views: {
                    'player': {
                        templateUrl: 'players/player/player.html',
                        controller: 'PlayerController as PlayerController'
                    }
                },
			    ownParams: {
				   'viewTitle': 'Player'
			    }
            })
            .state('app.players.newPlayer', {
                url: '/new',
                views: {
                    'player': {
                        templateUrl: 'players/new-player/new-player.html',
                        controller: 'NewPlayerController as NewPlayerController'
                    }
                },
			    ownParams: {
				   'viewTitle': 'New Player'
			    }
            });
        // We 'pre-initialize' the database/object store
    }).run((storageConfig, KeyGenerator, PlayersDbService) => {
        PlayersDbService.getAllPlayer().then(players => {
            var ids = players.map(player => parseFloat(player.doc._id));
            KeyGenerator.setSeed({
                store: storageConfig.playerObjectStore,
                usedIds: ids
            });
        });
    });