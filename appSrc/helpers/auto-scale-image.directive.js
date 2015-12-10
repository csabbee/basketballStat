angular.module('basketballStat.helpers')
    .directive('autoScaleImage', autoScaleImage);

function autoScaleImage($window) {
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

        var w = angular.element($window);

        w.bind('resize', handleImageLoad);

        scope.$on('$stateChangeStart', function() {
            w.unbind('resize', handleImageLoad);
        });
        scope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.name === 'app.home') {
                handleImageLoad();
                w.bind('resize', handleImageLoad);
            }
        });

        function handleImageLoad() {
            var image = element[0],
                parentHeight = element[0].parentNode.clientHeight,
                parentWidth = element[0].parentNode.clientWidth;

            if (image.naturalHeight / image.naturalWidth > parentHeight / parentWidth) {
                element.removeAttr('width');
                element.attr('height', parentHeight - 10);
            } else {
                element.removeAttr('height');
                element.attr('width', parentWidth - 10);
            }
        }
    }
}
