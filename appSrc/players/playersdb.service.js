angular.module('basketballStat.players')
    .service('PlayersDbService', (LocalDbService, storageConfig, eventListing)=> {
        var playerObjectStore = storageConfig.playerObjectStore;

        return {
            addPlayer: addPlayer,
            deletePlayer: deletePlayer,
            getPlayer: getPlayer,
            updatePlayer: updatePlayer,
            getAllPlayer: getAllPlayer
        };

        function addPlayer(player) {
            return LocalDbService.addEntry(playerObjectStore, player, `${player.firstName} ${player.lastName}`,eventListing.playerListUpdate);
        }

        function deletePlayer(key) {
            return LocalDbService.deleteEntry(playerObjectStore, key, eventListing.playerListUpdate);
        }

        function getPlayer(key) {
            return LocalDbService.getEntry(playerObjectStore, key, eventListing.playerListUpdate);
        }

        function updatePlayer(player) {
            return LocalDbService.updateEntry(playerObjectStore, player, `${player.firstName} ${player.lastName}`, eventListing.playerListUpdate);
        }

        function getAllPlayer() {
            return LocalDbService.getAllEntry(playerObjectStore);
        }
    });
