angular.module('basketballStat.matches')
    .controller('MatchesController', function($scope, MatchesDbService, $ionicActionSheet, $ionicPopup, $state, $ionicNavBarDelegate) {
        var vm = this;

        $scope.$on('$stateChangeStart', (event, toState) => {
            vm.activeView = false;
        });
        $scope.$on('$stateChangeSuccess', (event, toState) => {
            vm.activeView = toState.name === 'app.matches';
            if (vm.activeView) {
                $ionicNavBarDelegate.title('Matches');
                MatchesDbService.getAllMatches().then(matches => {
                    vm.matches = _.pluck(matches, 'doc');
                })
            }
        });

        vm.show = function(match) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: `<strong>Open</strong>` }
                ],
                destructiveText: 'Delete',
                cancelText: 'Cancel',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0: {
                            $state.go('app.matches.match', {_id: match._id});
                        }
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    var confirmPopup = $ionicPopup.confirm({
                        title: 'Delete match',
                        template: 'Are you sure?'
                    });
                    confirmPopup.then(function(res) {
                        if(res) {
                            MatchesDbService.deleteMatch(match).then(()=> {
                                vm.matches = _.filter(vm.matches, _.partial(notDeleted, match));
                            });
                        }
                    });
                    return true;
                }
            });
        };

        vm.matches = {};
    });

function notDeleted(deleted, match) {
    return deleted !== match;
}