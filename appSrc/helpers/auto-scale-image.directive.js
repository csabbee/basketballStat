angular.module('basketballStat.helpers')
    .directive('autoScaleImage', autoScaleImage);

autoScaleImage.$inject = [];

function autoScaleImage() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            imageSrc: '@'
        },
        link: link,
        template: `<img ng-src="{{imageSrc}}" height="{{getHeight()}}"/>`
    };

    function link(scope, element) {
        scope.getHeight = function() {
            return element[0].parentNode.clientHeight - 10;
        };
    }
}
