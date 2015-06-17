try {
    angular.module('basketballStat.storage');
} catch (e) {
    angular.module('basketballStat.storage', []);
}
angular.module('basketballStat.storage')
    .constant('storageConfig', {
        database: 'BasketballStat',
        playerObjectStore: 'players'
    });
