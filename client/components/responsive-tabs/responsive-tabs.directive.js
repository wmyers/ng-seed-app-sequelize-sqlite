'use strict';

angular.module('uiComps')
//------------------------------
//tabbed page content directives
.directive('responsiveTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          _.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function(pane) {
          if (panes.length === 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        };
      },
    templateUrl: './components/responsive-tabs/responsive-tabs.html'
  };
})
.directive('responsiveTabsPane', function() {
  return {
    require: '^responsiveTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
  };
});
