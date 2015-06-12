try {
    angular.module('basketballStat.storage');
} catch (e) {
    angular.module('basketballStat.storage', []);
}
angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatStorage, $q, storageConfig) {
        var player = {
            ssn : '333-33-3333',
            name: 'New Player',
            number: 5
        };
        var db;
        basketballStatStorage.getDb().then(function(database) {
            console.log('database', database);
            db = database;
        });
        return {
            get: get,
            set: set
        };

        function get(key) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore])
                .objectStore(storageConfig.playerObjectStore)
                .get('444-44-4444');

            request.onsuccess = function(event) {
                deferResult.resolve(event.target.result);
            };

            return deferResult.promise;
        }

        function set(key, item) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore], 'readwrite')
                .objectStore(storageConfig.playerObjectStore)
                .add(player);

            request.onsuccess = function(event) {
                deferResult.resolve('player set');
            };

            return deferResult.promise;
        }
    });