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
        element[0].onload = handleImageLoad;

        function handleImageLoad() {
            var image = element[0],
                parentHeight = element[0].parentNode.clientHeight,
                parentWidth = element[0].parentNode.clientWidth;

            if (image.naturalHeight / image.naturalWidth > parentHeight / parentWidth) {
                element.attr('height', parentHeight - 10);
            } else {
                element.attr('width', parentWidth - 10);
            }
        }
    }
}
