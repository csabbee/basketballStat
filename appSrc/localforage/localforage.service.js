angular.module('basketballStat.localforage', []);
angular.module('basketballStat.localforage')
    .service('LocalforageService', function($q) {
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