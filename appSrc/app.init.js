angular.module('basketballStat').config(($stateProvider, $urlRouterProvider) => {
	'use strict';
	
	$urlRouterProvider.otherwise('/app/home');
	
	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'menu.html',
		controller: 'AppController',
		controllerAs: 'AppController'
	})
	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'home/home.html',
				controller: 'HomeController',
				controllerAs: 'HomeController'
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