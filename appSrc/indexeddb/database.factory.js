angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory($q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        var databases = {};

        return {
            getDb: getDb
        };

        function getDb(objectStore) {
            var deferred = $q.defer();
            if (!databases[objectStore]) {
                databases[objectStore] = new PouchDB(objectStore);
            }
            deferred.resolve(databases[objectStore]);

            return deferred.promise;
        }
    });