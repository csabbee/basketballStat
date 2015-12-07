angular.module('basketballStat.storage')
    .service('LocalDbService', function(basketballStatDatabase, $q, $rootScope, KeyGenerator, $cordovaToast) {
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
         * @param toastMessage {String}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function addEntry(objectStore, entry, toastMessage, ...eventsToEmit) {
            return basketballStatDatabase.getDb(objectStore)
                .then(function (database) {
                    _.extend(entry, { '_id': KeyGenerator.nextKey(objectStore) + '' });
                    return database.put(entry);
                })
                .then(showToastMessages(`${toastMessage} added`))
                .catch(logToConsole);
        }

        /**
         *
         * @param objectStore {String}
         * @param entry {Object}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function deleteEntry(objectStore, entry, ...eventsToEmit) {
            return basketballStatDatabase.getDb(objectStore)
                .then(function (database) {
                    return database.remove(entry);
                })
                .then(showToastMessages('Deleted'))
                .then(emitEvents(eventsToEmit))
                .catch(logToConsole)
        }

        /**
         *
         * @param objectStore {String}
         * @param key {String}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function getEntry(objectStore, key, ...eventsToEmit) {
            return basketballStatDatabase.getDb(objectStore)
                .then(function (database) {
                    return database.get(key + '');
                })
                .then(emitEvents(eventsToEmit))
                .catch(logToConsole);
        }

        /**
         *
         * @param objectStore {String}
         * @param entry {Object}
         * @param toastMessage {String}
         * @param eventsToEmit {String[]}
         * @returns {Function|promise}
         */
        function updateEntry(objectStore, entry, toastMessage, ...eventsToEmit) {
            return basketballStatDatabase.getDb(objectStore)
                .then(function (database) {
                    return database.put(entry);
                })
                .then(showToastMessages(`${toastMessage} saved`))
                .then(emitEvents(eventsToEmit))
                .catch(logToConsole);
        }

        /**
         *
         * @param objectStore {String}
         * @returns {Function|promise}
         */
        function getAllEntry(objectStore) {
            return basketballStatDatabase.getDb(objectStore)
                .then(function (database) {
                    return database.allDocs({ include_docs: true });
                })
                .then(function (docs) {
                    return docs.rows;
                })
                .catch(logToConsole);
        }

        function emitEvents(eventsToEmit) {
            return function (value) {
                if (!_.isUndefined(eventsToEmit)) {
                    eventsToEmit.forEach(eventToEmit => {
                        $rootScope.$emit(eventToEmit);
                    });
                }
                return value;
            }
        }

        function showToastMessages(messageToShow) {
            return function (value) {
                return $cordovaToast.show(messageToShow, 'long', 'center')
                    .then(function () {
                        return value;
                    });
            }
        }

        function logToConsole(message) {
            return console.log(message);
        }
    });