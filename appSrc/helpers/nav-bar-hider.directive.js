/**
 * @description
 * This directive helps to hide the navbar on sub-views when you using ui-view inside of a ion-view
 *
 * <ion-nav-bar nav-bar-hider="app.matches.match, app.matches">
 * </ion-nav-bar>
 *
 * You just have to list the states on which you would like to hide the navbar
 */

angular.module('basketballStat.helpers')
    .directive('navBarHider', function($state) {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            var statesToHideHeaderOn = _.chain(attrs.navBarHider.split(',')).map(stripWhiteSpaces).value();

            if (_.contains(statesToHideHeaderOn, $state.current.name)) {
                element.addClass('hide-element');
            }

            scope.$onRootScope('$stateChangeStart', (event, toState)=> {
                if (_.contains(statesToHideHeaderOn, toState.name)) {
                    element.addClass('hide-element');
                } else {
                    element.removeClass('hide-element');
                }
            });
        }
    });

function stripWhiteSpaces(elem) {
    return elem.trim();
}