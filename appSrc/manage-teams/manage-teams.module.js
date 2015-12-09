angular.module('basketballStat.manageTeams')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.manageTeams', {
                url: '/manage-teams',
                views: {
                    'menuContent': {
                        templateUrl: 'manage-teams/manage-teams.html',
                        controller: 'ManageTeamsController as ManageTeamsController'
                    }
                }
            })
            .state('app.newTeam', {
                url: '/manage-teams/new-team',
                views: {
                    'menuContent': {
                        templateUrl: 'manage-teams/new-team/new-team.html',
                        controller: 'NewTeamController as NewTeamController',
                        resolve: {
                            players: function(PlayersDbService) {
                                return PlayersDbService.getAllPlayer();
                            }
                        }
                    }
                }
            })
            .state('app.team', {
                url: '/manage-teams/:_id',
                views: {
                    'menuContent': {
                        templateUrl: 'manage-teams/team/team.html',
                        controller: 'TeamController as TeamController',
                        resolve: {
                            team: function($stateParams, TeamsDbService) {
                                return TeamsDbService.getTeam($stateParams._id);
                            },
                            players: function(PlayersDbService, Commons) {
                                return PlayersDbService.getAllPlayer()
                                    .then(Commons.pluckDoc);
                            }
                        }
                    }
                }
            })
    }).run((storageConfig, TeamsDbService, KeyGenerator) => {
        TeamsDbService.getAllTeams().then(function(teams) {
            var ids = teams.map(team => parseFloat(team.doc._id));
            KeyGenerator.setSeed({
                store: storageConfig.teamsObjectStore,
                usedIds: ids
            });
        });
    });
