angular.module('basketballStat.storage')
    .constant('storageConfig', {
        database: 'BasketballStat',
        playerObjectStore: 'players',
        matchesObjectStore: 'matches',
        teamsObjectStore: 'teams'
    });
