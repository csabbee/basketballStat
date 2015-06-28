angular.module('basketballStat.helpers')
    .service('StateHandler', function($rootScope, $state, $ionicScrollDelegate) {
        var previousState = '',
            previousParams = {};
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            previousState = fromState ? fromState : '';
            previousParams = fromParams ? fromParams : {};
        });

        return {
            goBack: goBack
        };

        function goBack() {
            $ionicScrollDelegate.scrollTop();
            $state.go(previousState, previousParams);
        }
    });