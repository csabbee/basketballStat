try {
    angular.module('basketballStat.storage');
} catch (e) {
    angular.module('basketballStat.storage', []);
}
angular.module('basketballStat.storage')
    .factory('basketballStatStorage', function basketballStatStorageFactory(storageConfig, $q) {
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        return {
            getDb: getDb
        };

        function getDb() {
            var db = $q.defer();

            var request = window.indexedDB.open(storageConfig.database, '2');

            request.onerror = function(event) {
            };

            request.onsuccess = function(event) {
                db.resolve(event.target.result);
            };

            request.onupgradeneeded = function(event) {
                var database = event.target.result;

                var objectStore = database.createObjectStore(storageConfig.playerObjectStore, { keyPath : 'ssnId' });
                objectStore.createIndex('firstName', 'lastName', ['firstName', 'lastName']);
                objectStore.createIndex('email', 'email', { unique: true });
                objectStore.transaction.oncomplete = function(event) {
                    console.log('objectstore created', event.target.result);
                    db.resolve(database);
                }
            };

            return db.promise;
        }
    });