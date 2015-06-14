try {
    angular.module('basketballStat.storage');
} catch (e) {
    angular.module('basketballStat.storage', []);
}
angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatStorage, $q, storageConfig, $rootScope) {
        var player = {
            ssn : '333-33-3333',
            name: 'New Player',
            number: 5
        };
        var db;

        (function() {
            basketballStatStorage.getDb().then(function(database) {
                db = database;
            });
        })();

        return {
            getPlayer: getPlayer,
            updatePlayer: updatePlayer,
            getAllPlayer: getAllPlayer
        };

        function getPlayer(key) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore])
                .objectStore(storageConfig.playerObjectStore)
                .get(key);

            request.onsuccess = function(event) {
                deferResult.resolve(event.target.result);
            };

            return deferResult.promise;
        }

        function updatePlayer(item) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore], 'readwrite')
                .objectStore(storageConfig.playerObjectStore)
                .put(item);

            request.onsuccess = function(event) {
                deferResult.resolve('player set');
                $rootScope.$emit('player.updated');
            };

            return deferResult.promise;
        }

        function getAllPlayer() {
            var deferResult = $q.defer();
            _getAllEntry(storageConfig.playerObjectStore).then(players => {
                deferResult.resolve(players);
            });
            return deferResult.promise;
        }

        function _getAllEntry(objectStore) {
            var deferResult = $q.defer(),
                entries = [],
                objectStore = db.transaction(objectStore).objectStore(objectStore);

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                    entries.push(cursor.value);
                    cursor.continue();
                } else {
                    deferResult.resolve(entries);
                }
            };

            return deferResult.promise;
        }
    });