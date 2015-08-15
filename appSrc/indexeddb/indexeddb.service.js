angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatDatabase, $q, $rootScope, KeyGenerator) {

        return {
            getAllEntry: getAllEntry,
            addEntry: addEntry,
            getEntry: getEntry,
            deleteEntry: deleteEntry,
            updateEntry: updateEntry
        };

        function addEntry(objectStore, entry) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                entry.ssnId = KeyGenerator.nextKey(objectStore);

                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .add(entry);
                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                };

            });

            return deferResult.promise;
        }


        function deleteEntry(objectStore, key) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .delete(key);

                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                };
            });

            return deferResult.promise;
        }

        function getEntry(objectStore, key) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore])
                    .objectStore(objectStore)
                    // This is needed because it tends to be converted to string
                    .get(+key);

                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                };
            });

            return deferResult.promise;
        }

        function updateEntry(objectStore, entry) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .put(entry);

                request.onsuccess = function(event) {
                    deferResult.resolve('entry set');
                };
            });

            return deferResult.promise;
        }

        function getAllEntry(objectStore) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var entries = [],
                    table = database.transaction(objectStore).objectStore(objectStore);

                table.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;

                    if (cursor) {
                        entries.push(cursor.value);
                        cursor.continue();
                    } else {
                        deferResult.resolve(entries);
                    }
                };
            });

            return deferResult.promise;
        }
    });