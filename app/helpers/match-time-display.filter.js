angular.module('basketballStat.helpers')
    .filter('matchTimeDisplay', function() {
        return filter;
    });

function filter(time) {
    var tenthOfASecond = time%1000 / 100;
    var second = Math.floor(time%60000 / 1000);
    var minute = Math.floor(time%3600000 / 60000);

    second = second < 10 ? '0'+second : second;
    minute = minute < 10 ? '0'+minute : minute;
    return `${minute}:${second}:${tenthOfASecond}`;
}
