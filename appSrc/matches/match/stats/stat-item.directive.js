angular.module('basketballStat.matches')
    .directive('statItem', function() {
        return {
            restrict: 'E',
            template: `
            <span class="button button-clear button-positive icon ion-minus-circled" ng-click="decrement()"></span>
                <input ng-model="stat" disabled/>
            <span class="button button-clear button-positive icon ion-plus-circled" ng-click="increment()"></span>
            `,
            scope: {
                stat: '=',
                anotherIncrement: '=',
                pointIncrement: '=',
                byHowMuch: '@'
            },
            link: link
        };

        function link(scope, elem, attrs) {
            scope.increment = function() {
                scope.stat++;
                if(!_.isUndefined(scope.anotherIncrement)) {
                    scope.anotherIncrement++;
                }
                if(!_.isUndefined(scope.pointIncrement)) {
                    scope.pointIncrement += parseFloat(attrs.byHowMuch);
                }
            };

            scope.decrement = function() {
                if (scope.stat > 0) {
                    scope.stat--;
                    if(!_.isUndefined(scope.pointIncrement)) {
                        scope.pointIncrement -= parseFloat(attrs.byHowMuch);
                    }
                }
            }
        }
    });
