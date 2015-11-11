angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory($q) {
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