angular.module('basketballStat.storage')
    .service('KeyGenerator', function() {
        var seed = 1;
        return {
            setSeed: setSeed,
            nextKey: nextKey
        };

        function setSeed(number) {
            seed = number > 0 ? number : seed;
        }

        function nextKey() {
            return seed++;
        }
    });