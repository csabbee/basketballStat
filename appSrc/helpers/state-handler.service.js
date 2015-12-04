angular.module('basketballStat.helpers')
    .service('StateHandler', function($rootScope, $state, $ionicScrollDelegate, $ionicNavBarDelegate) {
        var previousState = '',
            previousParams = {};

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            previousState = fromState ? fromState : '';
            previousParams = fromParams ? fromParams : {};
        });

        return {
            goBack: goBack,
            setTitle: setTitle
        };

        function goBack() {
            $ionicScrollDelegate.scrollTop();
            $state.go(previousState, previousParams);
        }
        
        function setTitle(newTitle) {
            return $ionicNavBarDelegate.title(newTitle);
        }
    });