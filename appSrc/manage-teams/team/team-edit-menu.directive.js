angular.module('basketballStat.manageTeams')
    .directive('teamEditMenu', function() {
        var directive = {
            restrict: 'E',
            scope: {
                menuToggler: '=',
                menuTogglerIcon: '@',
                removeTeamTrigger: '&',
                addPlayerTrigger: '&'
            },
            bindToController: true,
            link: link,
            controller: TeamEditMenuController,
            controllerAs: 'TeamEditMenuController',
            templateUrl: 'manage-teams/team/team-edit-menu.html'
        };

        function TeamEditMenuController() {
            var vm = this;
            vm.toggleIsEditable = function() {
                vm.menuToggler = !vm.menuToggler;
            };
        }

        function link(scope, element, attr, controller) {
            var basicPosition = `translate3d(0, 0, 0)`;
            scope.$watch(function() {
                return controller.menuToggler;
            }, function(newValue, oldValue) {
                if(!newValue && oldValue != newValue) {
                    angular.forEach(element[0].children, function(child) {
                        let node = angular.element(child);
                        node.css('transform', `${basicPosition}`);
                    });
                }
                if(newValue) {
                    angular.forEach(element[0].children, function(child, index, array) {
                        let node = angular.element(child);
                        let x = (array.length - 1 - index) * 40;
                        let translate3d =  `translate3d(${-x}px, 0, 0)`;
                        node.css('transform', `${translate3d}`);
                    });
                }
            });
        }

        return directive;
    });
