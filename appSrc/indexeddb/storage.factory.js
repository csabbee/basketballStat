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

            var request = indexedDB.open(storageConfig.database);

            request.onerror = function(event) {
                alert(`Why didn't you allow my web app to use IndexedDB?!`);
            };

            request.onsuccess = function(event) {
                console.log('database found', event.target.result);
                db.resolve(event.target.result);
            };

            request.onupgradeneeded = function(event) {
                var database = event.target.result;

                var objectStore = db.createObjectStore(storageConfig.playerObjectStore, {keyPath: 'ssn'});
                objectStore.createIndex('name', 'name', { unique: false });
                objectStore.createIndex('email', 'email', { unique: true });
                objectStore.transaction.oncomplete = function(event) {
                    console.log('objectstore created', event.target.result);
                    db.resolve(database);
                }
            };

            return db.promise;
        }
    });