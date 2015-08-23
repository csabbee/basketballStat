angular.module('basketballStat.helpers')
    .directive('fixedScrollHeight', function($window, $ionicScrollDelegate) {

        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link(scope, element, attributes) {
            var scrollView = $ionicScrollDelegate.$getByHandle(attributes.fixedScrollHeight).getScrollView();
            scrollView.onScroll = function() {
                var translate3d = parseTranslate3d(scrollView.contentTransform.split(' ')[0]);
                var scale = scrollView.contentTransform.split(' ')[1];
                element.css('transform', `translate3d(${translate3d.x}px,${-translate3d.y}px,${translate3d.z}px)
                ${scale}`);
            };
        }

        function parseTranslate3d(stringTranslate3d) {
            var translate = stringTranslate3d.replace('translate3d(', '').replace(')', '').split(',');
            var xCoord = translate[0].replace('px', '');
            var yCoord = translate[1].replace('px', '');
            var zCoord = translate[2].replace('px', '');

            return {
                x: xCoord,
                y: yCoord,
                z: zCoord
            }
        }
    });

