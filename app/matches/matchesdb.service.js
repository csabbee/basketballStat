angular.module('basketballStat.matches')
    .service('MatchesDbService', (LocalDbService, storageConfig, eventListing)=> {
        var matchesObjectStore = storageConfig.matchesObjectStore;

        return {
            addMatch: addMatch,
            getAllMatches: getAllMatches,
            getMatch: getMatch,
            deleteMatch: deleteMatch,
            updateMatch: updateMatch
        };

        function addMatch(match) {
            return LocalDbService.addEntry(matchesObjectStore, match, 'Match', eventListing.matchListUpdate);
        }

        function getAllMatches() {
            return LocalDbService.getAllEntry(matchesObjectStore);
        }

        function getMatch(key) {
            return LocalDbService.getEntry(matchesObjectStore, key, eventListing.matchListUpdate);
        }

        function deleteMatch(key) {
            return LocalDbService.deleteEntry(matchesObjectStore, key, '',eventListing.matchListUpdate);
        }

        function updateMatch(match) {
            return LocalDbService.updateEntry(matchesObjectStore, match, '',eventListing.matchListUpdate);
        }
    });
