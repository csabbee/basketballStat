angular.module('basketballStat.manageTeams')
    .service('TeamsDbService', (LocalDbService, storageConfig, eventListing)=> {
        var teamsObjectStore= storageConfig.teamsObjectStore;

        return {
            addTeam: addTeam,
            getAllTeams: getAllTeams,
            getTeam: getTeam,
            deleteTeam: deleteTeam,
            updateTeam: updateTeam
        };

        function addTeam(team) {
            return LocalDbService.addEntry(teamsObjectStore, team, 'Team', eventListing.teamListUpdate);
        }

        function getAllTeams() {
            return LocalDbService.getAllEntry(teamsObjectStore);
        }

        function getTeam(key) {
            return LocalDbService.getEntry(teamsObjectStore, key, eventListing.teamListUpdate);
        }

        function deleteTeam(key) {
            return LocalDbService.deleteEntry(teamsObjectStore, key, '',eventListing.teamListUpdate);
        }

        function updateTeam(team) {
            return LocalDbService.updateEntry(teamsObjectStore, team, '',eventListing.teamListUpdate);
        }
    });

