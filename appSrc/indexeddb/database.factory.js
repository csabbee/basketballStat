angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory(storageConfig, $q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        var database;

        return {
            getDb: getDb
        };

        function getDb(objectStore) {
            var db = $q.defer();

            if(!_.isUndefined(database)) {
                db.resolve(database);
            } else {
                var request = window.indexedDB.open(storageConfig.database, '2');

                request.onerror = function(event) {
                };

                request.onsuccess = function(event) {
                    database = event.target.result;
                    db.resolve(database);
                };

                request.onupgradeneeded = function(event) {
                    database = event.target.result;

                    var objectStore = database.createObjectStore(objectStore, { keyPath : 'ssnId' });
                    objectStore.transaction.oncomplete = function(event) {
                        console.log('objectstore created', event.target.result);
                        db.resolve(database);
                    }
                };
            }

            return db.promise;
        }
    });