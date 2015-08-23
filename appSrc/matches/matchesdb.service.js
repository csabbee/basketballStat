angular.module('basketballStat.matches')
    .service('MatchesDbService', (IndexedDbService, storageConfig, eventListing)=> {
        var matchesObjectStore = storageConfig.matchesObjectStore;

        return {
            addMatch: addMatch,
            getAllMatches: getAllMatches,
            getMatch: getMatch,
            deleteMatch: deleteMatch,
            updateMatch: updateMatch
        };

        function addMatch(match) {
            return IndexedDbService.addEntry(matchesObjectStore, match, '',eventListing.matchListUpdate);
        }

        function getAllMatches() {
            return IndexedDbService.getAllEntry(matchesObjectStore);
        }

        function getMatch(key) {
            return IndexedDbService.getEntry(matchesObjectStore, key, eventListing.matchListUpdate);
        }

        function deleteMatch(key) {
            return IndexedDbService.deleteEntry(matchesObjectStore, key, '',eventListing.matchListUpdate);
        }

        function updateMatch(match) {
            return IndexedDbService.getAllEntry(matchesObjectStore, match, '',eventListing.matchListUpdate);
        }
    });
