angular.module('basketballStat.helpers')
    .service('TitleSetterService', function($ionicNavBarDelegate, $rootScope, $state) {
        var currentState = '';
        
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            currentState = toState;
        })
        
        $rootScope.$on('$viewContentLoaded', function() {
            $ionicNavBarDelegate.title(currentState.ownParams.viewTitle);
        });
    })
    .run(function(TitleSetterService) {});