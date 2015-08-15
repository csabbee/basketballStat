angular.module('basketballStat.players')
    .config($stateProvider => {
        'use strict';

        $stateProvider
            .state('app.players', {
                url: '/players',
                views: {
                    'menuContent': {
                        templateUrl: 'players/players.html',
                        controller: 'PlayersController as PlayersController',
                        resolve: {
                            players: ['IndexedDbService', function(IndexedDbService) {
                                return IndexedDbService.getAllPlayer();
                            }]
                        }
                    }
                }
            })
            .state('app.players.player', {
                url: '/:ssnId',
                views: {
                    'player': {
                        templateUrl: 'players/player/player.html',
                        controller: 'PlayerController as PlayerController'
                    }
                }
            })
            .state('app.players.newPlayer', {
                url: '/new',
                views: {
                    'player': {
                        templateUrl: 'players/new-player/new-player.html',
                        controller: 'NewPlayerController as NewPlayerController'
                    }
                }
            })
    });