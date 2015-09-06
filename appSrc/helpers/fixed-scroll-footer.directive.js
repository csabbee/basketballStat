angular.module('basketballStat.helpers')
    .directive('fixedScrollFooter', function() {
        return {
            restrict: 'E',
            scope: {
                rightButtonClick: '&',
                rightButtonIcon: '@',
                rightButtonClass: '@',
                leftButtonClick: '&',
                leftButtonIcon: '@',
                leftButtonClass: '@',
                scrollDelegate: '@'
            },
            link: link,
            template:  `<ion-footer-bar fixed-scroll-height="{{scrollDelegate}}" align-title="left" class="bar-clear">
                            <button class="button footer-pull-left icon"
                                ng-class="[leftButtonClass, leftButtonIcon]"
                                ng-click="leftButtonClick()"></button>
                                <div style="display: none" class="title">asdasd</div>
                            <button class="button footer-pull-right icon"
                                ng-class="[rightButtonClass, rightButtonIcon]"
                                ng-click="rightButtonClick()"></button>
                        </ion-footer-bar>`
        };

        function link(scope, element, attrs) {
            var buttons = element.children().children();
            if (!attrs.leftButtonClick) {
                buttons[0].remove();
            }
            if (!attrs.rightButtonClick) {
                buttons[1].remove();
            }
        }
    });