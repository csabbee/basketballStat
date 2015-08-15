angular.module('basketballStat.mainModule', [
    'basketballStat.helpers',
    'basketballStat.storage',
    'basketballStat.matches',
    'basketballStat.players'
]).config(($stateProvider, $urlRouterProvider) => {
	'use strict';

	$urlRouterProvider.otherwise('/app/home');

	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'menu.html'
		})
		.state('app.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'home/home.html',
					controller: 'HomeController as HomeController'
				}
			}
		})
		.state('app.details', {
			url: '/details',
			views: {
				'menuContent': {
					templateUrl: 'details.html'
				}
			}
		})
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
}).config(['$provide', function ($provide) {
	'use strict';
	$provide.decorator('$rootScope', ['$delegate', function ($delegate) {
		Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
			value: function (name, listener) {
				var unsubscribe = $delegate.$on(name, listener);
				this.$on('$destroy', unsubscribe);

				return unsubscribe;
			},
			enumerable: false
		});

		return $delegate;
	}]);
}]);