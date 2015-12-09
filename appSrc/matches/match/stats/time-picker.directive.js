angular.module('basketballStat.matches')
    .directive('timePicker', function($ionicPopup) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                timeObj: '=',
                setPeriod: '&'
            },
            template: '<div class="button button-outline button-dark display-time" ng-click="showPicker()">{{timeObj.time | matchTimeDisplay}}</div>',
            link: link
        };

        function link(scope) {
            scope.period = {};
            scope.showPicker = function () {
                $ionicPopup.show({
                    templateUrl: 'matches/match/stats/time-picker-popup.html',
                    title: 'Set length of the period',
                    scope: scope,
                    buttons: [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: 'Set',
                            type: 'button-positive',
                            onTap: function(e) {
                                scope.setPeriod()(scope.period.length);
                            }
                        }
                    ]
                });
            };
        }
    });
