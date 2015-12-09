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
            .state('app.player', {
                url: '/players/:_id',
                views: {
                    'menuContent': {
                        templateUrl: 'players/player/player.html',
                        controller: 'PlayerController as PlayerController'
                    }
                },
			    ownParams: {
				   'viewTitle': 'Player'
			    }
            })
            .state('app.newPlayer', {
                url: '/players/new',
                views: {
                    'menuContent': {
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