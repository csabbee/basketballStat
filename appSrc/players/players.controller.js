angular.module('basketballStat')
    .controller('PlayerController', function($scope, IndexedDbService) {
        var vm = this,
            player = {
                name: 'New Player',
                number: 5
            };

        vm.addPlayer = function() {
            IndexedDbService.setPlayer('newPlayer', player);
        };

        vm.getPlayer = function() {
            IndexedDbService.getPlayer('444-44-4444').then(data => {
                console.log('player', data);
                vm.player = data;
            });
        };

        IndexedDbService.getAllPlayer().then(players => {
            vm.players = players;
        });
    });