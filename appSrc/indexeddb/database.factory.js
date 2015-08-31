angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory(storageConfig, $q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        var databases = {};

        return {
            getDb: getDb
        };

        function getDb(objectStore) {
            if (!databases[objectStore]) {
                databases[objectStore] = new PouchDB(objectStore);
            }

            return databases[objectStore];
        }
    });