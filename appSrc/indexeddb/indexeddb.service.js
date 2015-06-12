angular.module('basketballStat.storage', []);
angular.module('basketballStat.storage')
    .service('IndexedDbService', function($q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        return {
            get: get,
            set: set
        };

        function get(key) {
            var deferResult = $q.defer();

            localforage.getItem(JSON.stringify(key)).then(item => {
                deferResult.resolve(item);
            });

            return deferResult.promise;
        }

        function set(key, item) {
            var deferResult = $q.defer();

            localeforage.setItem(JSON.stringify(key), JSON.stringify(item)).then(data => {
                deferResult.resolve(data);
            });

            return deferResult.promise;
        }
    });