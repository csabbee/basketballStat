angular.module('basketballStat.players')
    .service('PlayersDbService', (IndexedDbService, storageConfig, eventListing)=> {
        var playerObjectStore = storageConfig.playerObjectStore;

        return {
            addPlayer: addPlayer,
            deletePlayer: deletePlayer,
            getPlayer: getPlayer,
            updatePlayer: updatePlayer,
            getAllPlayer: getAllPlayer
        };

        function addPlayer(player) {
            return IndexedDbService.addEntry(playerObjectStore, player, `${player.firstName} ${player.lastName}`,eventListing.playerListUpdate);
        }

        function deletePlayer(key) {
            return IndexedDbService.deleteEntry(playerObjectStore, key, eventListing.playerListUpdate);
        }

        function getPlayer(key) {
            return IndexedDbService.getEntry(playerObjectStore, key, eventListing.playerListUpdate);
        }

        function updatePlayer(player) {
            return IndexedDbService.updateEntry(playerObjectStore, player, `${player.firstName} ${player.lastName}`, eventListing.playerListUpdate);
        }

        function getAllPlayer() {
            return IndexedDbService.getAllEntry(playerObjectStore);
        }
    });
