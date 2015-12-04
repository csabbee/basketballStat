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
            .state('app.manageTeams.newTeam', {
                url: '/new-team',
                views: {
                    'team': {
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
            .state('app.manageTeams.team', {
                url: '/:_id',
                views: {
                    'team': {
                        templateUrl: 'manage-teams/team/team.html',
                        controller: 'TeamController as TeamController'
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