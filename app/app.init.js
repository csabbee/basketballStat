angular.module('basketballStat.mainModule', [
    'basketballStat.helpers',
    'basketballStat.storage',
    'basketballStat.matches',
    'basketballStat.players',
	'basketballStat.manageTeams'
]).config(($stateProvider, $urlRouterProvider) => {
	'use strict';

	$urlRouterProvider.otherwise('/app/home');

	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'menu.html'
		})
		.state('app.calendar', {
			url: '/calendar',
			views: {
				'menuContent': {
					templateUrl: 'calendar/calendar.html'
				}
			},
			ownParams: {
				'viewTitle': 'Calendar'
			}
		})
		.state('app.home', {
			url: '/home',
			views: {
				'menuContent': {
					templateUrl: 'home/home.html',
					controller: 'HomeController as HomeController'
				}
			},
			ownParams: {
				'viewTitle': 'Home'
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