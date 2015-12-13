angular.module('basketballStat.matches')
    .controller('MatchStatModalController', function($scope, Commons) {
        this.shouldShowDelete = true;
        this.shouldShowReorder = true;
        this.listCanSwipe = false;

        this.reorderItem = function(item, $fromIndex, $toIndex, array) {
            return Commons.swapArrayItemsByIndex($fromIndex, $toIndex, array)
                .then(function(newArray) {
                    $scope.$emit('reorderedEventsArray', newArray);
                    return newArray;
                });
        }
    });
