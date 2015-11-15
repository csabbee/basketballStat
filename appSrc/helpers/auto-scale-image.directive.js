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
        template: `<img ng-src="{{imageSrc}}"/>`
    };

    function link(scope, element) {
        if (element[0].parentNode.clientHeight > element[0].parentNode.clientWidth) {
            element.attr('height', element[0].parentNode.clientHeight - 40);
        } else {
            element.attr('width', element[0].parentNode.clientWidth - 10)
        }
    }
}
