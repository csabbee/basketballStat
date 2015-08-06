angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory(storageConfig, $q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        var database;

        return {
            getDb: getDb
        };

        (function() {
            var request = window.indexedDB.open(storageConfig.database, '2');

                request.onerror = function(event) {
                };

                request.onsuccess = function(event) {
                    console.log('success', event);
                    database = event.target.result;
                };

                request.onupgradeneeded = function(event) {
                    database = event.target.result;

                    var objectstore = database.createObjectStore(objectStore, { keyPath : 'ssnId' });
                    objectstore.transaction.oncomplete = function(event) {
                        console.log('objectstore created', event.target.result);
                    }
                };
        })();

        function getDb(objectStore) {
            var db = $q.defer();

            if(!_.isUndefined(database)) {
                db.resolve(database);
            } else {
                var request = window.indexedDB.open(storageConfig.database, '2');

                request.onerror = function(event) {
                };

                request.onsuccess = function(event) {
                    console.log('success', event);
                    database = event.target.result;
                    db.resolve(database);
                };

                request.onupgradeneeded = function(event) {
                    database = event.target.result;

                    var objectstore = database.createObjectStore(objectStore, { keyPath : 'ssnId' });
                    objectstore.transaction.oncomplete = function(event) {
                        console.log('objectstore created', event.target.result);
                        db.resolve(database);
                    }
                };
            }

            return db.promise;
        }
    });