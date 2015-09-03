angular.module('basketballStat.storage')
    .service('IndexedDbService', function(basketballStatDatabase, $q, $rootScope, KeyGenerator, $cordovaToast) {
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
        function addEntry(objectStore, entry, toastMessage,...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                _.extend(entry, {'_id': KeyGenerator.nextKey(objectStore)});
                database.put(entry).then(() => {
                    $cordovaToast.show(`${toastMessage} added`, 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function (error) {
                            // error
                        });
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                }, function(err) {
                    console.log(err);
                });
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param entry {Object}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function deleteEntry(objectStore, entry, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                database.remove(entry).then(()=> {
                    deferResult.resolve('deleteted');
                    $cordovaToast.show(`Deleted`, 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function (error) {
                            // error
                        });
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                });
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param key {String}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function getEntry(objectStore, key, ...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                database.get(key+'').then(entry => {
                    deferResult.resolve(entry);
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                });
            });

            return deferResult.promise;
        }

        /**
         *
         * @param objectStore {String}
         * @param entry {Object}
         * @param toastMessage {String}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function updateEntry(objectStore, entry, toastMessage,...eventsToEmit) {
            var deferResult = $q.defer();

            basketballStatDatabase.getDb(objectStore).then(function(database) {
                database.put(entry).then(entry => {
                    deferResult.resolve('entry set');
                    $cordovaToast.show(`${toastMessage} saved`, 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function (error) {
                            // error
                        });
                    if(!_.isUndefined(eventsToEmit)) {
                        eventsToEmit.forEach(eventToEmit => {
                            $rootScope.$emit(eventToEmit);
                        });
                    }
                });
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
                database.allDocs({include_docs: true}).then(docs => {
                    deferResult.resolve(docs.rows);
                });
            });

            return deferResult.promise;
        }
    });