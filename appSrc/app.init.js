angular.module('basketballStat').config(($stateProvider, $urlRouterProvider) => {
	'use strict';
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'main/main.html',
		controller: 'MainController',
		controllerAs: 'MainController'
	})
})