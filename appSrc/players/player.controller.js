angular.module('basketballStat')
    .controller('PlayerController', function($scope, IndexedDbService) {
        var vm = this,
            player = {
                name: 'New Player',
                number: 5
            };

        vm.addPlayer = function() {
            IndexedDbService.set('newPlayer', player);
        };

        vm.getPlayer = function() {
            IndexedDbService.get().then(data => {
                console.log('player', data);
            });
        }
    });