angular.module('basketballStat.matches')
    .service('MatchesDbService', (IndexedDbService, storageConfig)=> {
        var matchesObjectStore = storageConfig.matchesObjectStore;

        return {
            addMatch: addMatch,
            getAllMatches: getAllMatches,
            getMatch: getMatch,
            deleteMatch: deleteMatch,
            updateMatch: updateMatch
        };

        function addMatch(match) {
            return IndexedDbService.addEntry(matchesObjectStore, match);
        }

        function getAllMatches() {
            return IndexedDbService.getAllEntry(matchesObjectStore);
        }

        function getMatch(key) {
            return IndexedDbService.getEntry(matchesObjectStore, key);
        }

        function deleteMatch(key) {
            return IndexedDbService.deleteEntry(matchesObjectStore, key);
        }

        function updateMatch(match) {
            return IndexedDbService.getAllEntry(matchesObjectStore, match);
        }
    });
