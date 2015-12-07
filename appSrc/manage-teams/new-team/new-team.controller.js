angular.module('basketballStat.manageTeams')
    .controller('NewTeamController', function($scope, StateHandler, $ionicPopup, players, TeamsDbService, $cordovaToast) {
        var vm = this;

        vm.players = _.pluck(players, 'doc');

        vm.save = function(team, form) {
            var selectedPlayerIds = _.chain(_.keys(team.playerIds))
                .filter(_.partial(isSelected, team.playerIds))
                .value();
            var members = _.filter(players, _.partial(idPresent, selectedPlayerIds));
            if (form.$dirty && form.$valid) {
                if (members.length >= 5) {
                    team.players =_.pluck(members, 'doc');
                    TeamsDbService.addTeam(team);
                    StateHandler.goBack();
                } else {
                    $cordovaToast.showLongCenter('Need to select at least 5 player');
                }
            }
        };

        vm.goBack = function goBack(form) {
            if (form.$dirty) {
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

        vm.team = {};
    });
