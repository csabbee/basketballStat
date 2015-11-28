angular.module('basketballStat.mainModule')
	.controller('HomeController', function($ionicScrollDelegate, $timeout) {
		$timeout(function() {
			$ionicScrollDelegate.$getByHandle('mainPageScroll').freezeAllScrolls(true);
		});
	});