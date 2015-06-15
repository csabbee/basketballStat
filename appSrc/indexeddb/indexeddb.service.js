try {
    angular.module('basketballStat.storage');
} catch (e) {
    angular.module('basketballStat.storage', []);
}
angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatStorage, $q, storageConfig, $rootScope, KeyGenerator) {
        var db;

        (function() {
            basketballStatStorage.getDb().then(function(database) {
                db = database;
                getAllPlayer().then(players => {
                    var ids = players.map(players => players.ssnId);
                    KeyGenerator.setSeed(_.max(ids));
                });
            });
        })();

        return {
            addPlayer: addPlayer,
            deletePlayer: deletePlayer,
            getPlayer: getPlayer,
            updatePlayer: updatePlayer,
            getAllPlayer: getAllPlayer
        };

        function addPlayer(player) {
            var deferResult = $q.defer();
            player.ssnId = KeyGenerator.nextKey();

            var request = db.transaction([storageConfig.playerObjectStore], 'readwrite')
                .objectStore(storageConfig.playerObjectStore)
                .add(player);

            request.onsuccess = function(event) {
                deferResult.resolve(event.target.result);
                $rootScope.$emit('players.list.update');
            };

            return deferResult.promise;
        }

        function deletePlayer(key) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore], 'readwrite')
                .objectStore(storageConfig.playerObjectStore)
                .delete(key);

            request.onsuccess = function(event) {
                deferResult.resolve(event.target.result);
                $rootScope.$emit('players.list.update');
            };

            return deferResult.promise;
        }

        function getPlayer(key) {
            var deferResult = $q.defer();

            var request = db.transaction([storageConfig.playerObjectStore])
                .objectStore(storageConfig.playerObjectStore)
                // This is needed because it tends to be converted to string
                .get(+key);

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
                $rootScope.$emit('players.list.update');
            };

            return deferResult.promise;
        }

        function getAllPlayer() {
            return _getAllEntry(storageConfig.playerObjectStore);
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