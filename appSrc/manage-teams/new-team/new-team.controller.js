angular.module('basketballStat.manageTeams')
    .controller('NewTeamController', function($scope, StateHandler, $ionicPopup, players, TeamsDbService, $cordovaToast) {
        var vm = this;

        vm.players = _.pluck(players, 'doc');

        vm.save = function() {
            var selectedPlayerIds = _.chain(_.keys(vm.team.playerIds))
                .filter(_.partial(isSelected, vm.team.playerIds))
                .value();
            var members = _.filter(players, _.partial(idPresent, selectedPlayerIds));
            if (vm.form.$dirty && vm.form.$valid) {
                if (members.length >= 5) {
                    vm.team.players =_.pluck(members, 'doc');
                    TeamsDbService.addTeam(vm.team)
                        .then(resetForm)
                        .then(StateHandler.goBack);
                } else {
                    $cordovaToast.showLongCenter('Need to select at least 5 player');
                }
            }
        };

        vm.goBack = function goBack() {
            if (vm.form.$dirty) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Navigating away',
                    template: 'Are you sure?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        StateHandler.goBack();
                    }
                });
            } else {
                StateHandler.goBack();
            }
        };

        function idPresent(playerIds, player) {
            return _.contains(playerIds, ''+player.doc._id);
        }

        /**
         * @param playerIdsObj {Object}
         * @param id {String}
         */
        function isSelected(playerIdsObj, id) {
            return playerIdsObj[id];
        }

        function resetForm(value) {
            vm.team = {};
            return value;
        }

        vm.team = {};
    });
