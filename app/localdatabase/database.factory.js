angular.module('basketballStat.storage')
    .factory('basketballStatDatabase', function basketballStatDatabaseFactory($q) {
        var databases = {};

        return {
            getDb: getDb
        };

        function getDb(objectStore) {
            if (!databases[objectStore]) {
                databases[objectStore] = new PouchDB(objectStore);
            }

            return $q(function (resolve, reject) {
                resolve(databases[objectStore]);
            });
        }
    });