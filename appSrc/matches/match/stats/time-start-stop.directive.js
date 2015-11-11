angular.module('basketballStat.matches')
    .directive('timeStartStop', function(TimeService, eventListing) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                players: '=',
                startIcon: '@',
                stopIcon: '@'
            },
            template: `
                <button class="button button-clear button-dark icon {{currentIcon}} pull-right" ng-click="toggle()"></button>
            `,
            link: link
        };

        function link(scope, element, attrs) {
            if (!attrs.startIcon) {
                scope.startIcon = 'ion-play';
            }
            if(!attrs.stopIcon) {
                scope.stopIcon = 'ion-pause';
            }
            scope.currentIcon = scope.startIcon;
            var stateMachine = new StateMachine(scope);

            scope.$onRootScope(eventListing.timerReachedZero, () => {
                stateMachine.reset();
                TimeService.stop();
            });

            scope.toggle = function() {
                stateMachine.switcher();
            };
        }

        function StateMachine(scope) {
            var currentState = new StartState(this);

            this.change = function(state) {
                currentState = state;
            };

            this.reset = function() {
                currentState = new StartState(this);
            };

            this.switcher = function() {
                currentState.switcher(scope);
            };
        }

        function StartState(stateMachine) {
            this.switcher = function(scope) {
                scope.currentIcon = scope.stopIcon;
                stateMachine.change(new StopState(stateMachine));
                TimeService.start();
            }
        }

        function StopState(stateMachine) {
            this.switcher = function(scope) {
                scope.currentIcon = scope.startIcon;
                stateMachine.change(new StartState(stateMachine));
                TimeService.stop();
            }
        }
    });
