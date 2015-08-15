angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatDatabase, $q, $rootScope, KeyGenerator) {

        return {
            getAllEntry: getAllEntry,
            addEntry: addEntry,
            getEntry: getEntry,
            deleteEntry: deleteEntry,
            updateEntry: updateEntry
        };

        /**
         * @param objectStore {String}
         * @param entry {Object}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function addEntry(objectStore, entry, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                entry.ssnId = KeyGenerator.nextKey(objectStore);

                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .add(entry);
                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                };

            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param key {String}
         * @returns {Function|promise}
         */
        function deleteEntry(objectStore, key, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .delete(key);

                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                };
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param key {String}
         * @returns {Function|promise}
         */
        function getEntry(objectStore, key, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore])
                    .objectStore(objectStore)
                    // This is needed because it tends to be converted to string
                    .get(+key);

                request.onsuccess = function(event) {
                    deferResult.resolve(event.target.result);
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                };
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param entry {Object}
         * @returns {Function|promise}
         */
        function updateEntry(objectStore, entry, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                var request = database.transaction([objectStore], 'readwrite')
                    .objectStore(objectStore)
                    .put(entry);

                request.onsuccess = function(event) {
                    deferResult.resolve('entry set');
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                };
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @returns {Function|promise}
         */
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