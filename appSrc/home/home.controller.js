angular.module('basketballStat')
	.controller('HomeController', function($scope, $window, $timeout) {
		this.newThing = 'new thing';
		$scope.oldThing = 'old thing';
		
		localforage.setItem('key', 'asdasdasdasd').then(() => {
			localforage.getItem('key').then(value => {				
				$timeout(() => {
					$scope.localforage = value;
					$scope.$apply();
				}, 0);
			});
		});
	});