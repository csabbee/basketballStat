angular.module('basketballStat.players')
    .service('PlayersDbService', (IndexedDbService, storageConfig)=> {
        var playerObjectStore = storageConfig.playerObjectStore;

        return {
            addPlayer: addPlayer,
            deletePlayer: deletePlayer,
            getPlayer: getPlayer,
            updatePlayer: updatePlayer,
            getAllPlayer: getAllPlayer
        };

        function addPlayer(player) {
            return IndexedDbService.addEntry(playerObjectStore, player);
        }

        function deletePlayer(key) {
            return IndexedDbService.deleteEntry(playerObjectStore, key);
        }

        function getPlayer(key) {
            return IndexedDbService.getEntry(playerObjectStore, key);
        }

        function updatePlayer(player) {
            return IndexedDbService.updateEntry(playerObjectStore, player);
        }

        function getAllPlayer() {
            return IndexedDbService.getAllEntry(playerObjectStore);
        }
    });
