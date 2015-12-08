angular.module('basketballStat.manageTeams')
    .controller('TeamController', function($scope, team, players, TeamsDbService, $ionicModal, $ionicPopup, StateHandler) {
        var vm = this;

        vm.team = team;
        vm.isEditable = false;

        vm.removePlayer = function removePlayer(player) {
            vm.team.players.splice(team.players.indexOf(player), 1);
        };

        vm.deleteTeam = function removeTeam() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete team',
                template: 'Are you sure you want to delete the team?'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    TeamsDbService.deleteTeam(team)
                        .then(StateHandler.goBack);
                }
            });
        };

        vm.addPlayer = function addPlayer() {
            $ionicModal.fromTemplateUrl('manage-teams/team/add-player-modal.html', {
                scope: $scope,
                animation: 'add-player-modal-animation'
            }).then(function(modal) {
                let revIdToPlayerMap = {};
                _.each(vm.team.players, function(player) {
                    revIdToPlayerMap[player._rev] = player;
                    return revIdToPlayerMap;
                });
                $scope.playersNotYetAdded = _.filter(players, function(player) {
                    return !revIdToPlayerMap[player._rev];
                });
                modal.show();
                $scope.hidePlayersModal = hidePlayersModal;

                var playersToAdd = [];
                $scope.togglePlayerToBeAdded = function(player) {
                    if(playersToAdd.indexOf(player) !== -1) {
                        playersToAdd.splice(playersToAdd.indexOf(player), 1);
                    } else {
                        playersToAdd.push(player);
                    }
                };

                $scope.saveChanges = function() {
                    hidePlayersModal();
                    vm.team.players = _.union(vm.team.players, playersToAdd);
                    TeamsDbService.updateTeam(team);
                };

                function hidePlayersModal() {
                    modal.hide();
                    modal.remove();
                }
            });
        };
    });
