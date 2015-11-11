angular.module('basketballStat.matches')
    .service('TimeService', function(eventListing, $interval, $rootScope) {
        var timer;

        return {
            start: start,
            stop: stop
        };

        function start() {
            timer = $interval(function() {
                $rootScope.$emit(eventListing.timeTickEmit);
            }, 100);
        }

        function stop() {
            $interval.cancel(timer);
            $rootScope.$emit(eventListing.timerStopEmit);
        }
    });
