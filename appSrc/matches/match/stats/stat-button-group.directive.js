angular.module('basketballStat.matches')
	.directive('statButtonGroup', statButtonGroup);

function statButtonGroup() {
	var directive = {
		restrict: 'E',
		scope: {
			topLeftButton: '@',
			topRightButton: '@',
			singleEntry: '@',
			statOne: '=',
			statTwo: '=',
            anotherIncrement: '=',
            pointIncrement: '=',
            byHowMuch: '@',
			pushEvent: '&'
		},
		template: `
			<div class="stat-button-group">
				<div class="stat-button-top-group">
					<a class="stat-button-top" ng-click="toggleTopButton()">
						<span ng-class="{'active-stat': isActive}">{{topLeftButton}}</span>
						<div ng-if="!singleEntry">/</div>
						<span ng-if="!singleEntry" ng-class="{'active-stat': !isActive}">{{topRightButton}}</span>
					</a>
				</div>
				<div class="stat-button-bottom-group">
					<a class="stat-button-bottom assertive icon ion-minus-circled"
					   ng-click="decrement()"></a>
					<a class="stat-button-bottom positive icon ion-plus-circled"
					   ng-click="increment()"></a>
				</div>
			</div>
		`,
		link: link
	};

	function link(scope, element, attrs) {
		scope.isActive = true;

		// resetting the flip flop buttons
		scope.$onRootScope('modal.hide', function(event) {
			scope.isActive = true;
		});
		
		if (!scope.singleEntry) {
			scope.toggleTopButton = function toggleTopButton() {
				scope.isActive = !scope.isActive;
			};
		}

		scope.increment = function() {
			scope.pushEvent()('eyyoo');
			if(scope.isActive) {
				scope.statOne += 1;
				if(!_.isUndefined(scope.pointIncrement)) {
					scope.pointIncrement += Number(attrs.byHowMuch);
				}
			} else {
				scope.statTwo += 1;
			}

            if(!_.isUndefined(scope.anotherIncrement)) {
            	scope.anotherIncrement += 1;
            }
        };

        scope.decrement = function() {
            if(scope.isActive) {
				if (scope.statOne > 0) {
					scope.statOne -= 1;
					if(scope.pointIncrement) {
						scope.pointIncrement -= Number(attrs.byHowMuch);
					}
				}
			} else {
				if (scope.statTwo > 0) {
					if (!_.isUndefined(scope.anotherIncrement) && scope.statTwo > scope.statOne) {
						scope.statTwo -= 1;
					} 
					if (_.isUndefined(scope.anotherIncrement)) {
						scope.statTwo -= 1;
					}
				}
			}
        }
	}

	return directive;
}