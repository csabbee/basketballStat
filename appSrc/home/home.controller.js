angular.module('basketballStat.mainModule')
	.controller('HomeController', function($ionicScrollDelegate, $timeout, $scope) {
		$timeout(function() {
			$ionicScrollDelegate.$getByHandle('mainPageScroll').freezeAllScrolls(true);
		});
	});