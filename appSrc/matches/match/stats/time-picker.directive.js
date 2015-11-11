angular.module('basketballStat.matches')
    .directive('timePicker', function($ionicPopup) {
        return {
            restrict: 'E',
            scope: {
                timeObj: '=',
                setPeriod: '&'
            },
            template: `
            <div class="picking" ng-click="showPicker()">
                <div class="button button-outline button-dark display-time">{{timeObj.time | matchTimeDisplay}}</div>
            </div>`,
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
