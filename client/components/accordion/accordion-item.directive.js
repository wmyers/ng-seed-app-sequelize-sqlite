'use strict';

angular.module('uiComps')
.directive('accordionItem', function(ModalSrvc) {
  return {
    restrict: 'E',
    transclude: true,
    //need to pass in the item and index values
    //as an attribute if using an isolate scope
    //AND ng-transclude.
    scope: {
      item:'=',
      index:'='
    },
    templateUrl: './components/accordion/accordion-item.html',
    link: function (scope, element, attrs) {

      //delete button
      scope.deleteClick = function(){
        var config = {
          contentId:'deleteAccordionItem',
          cancellable:true,
          index:scope.index
        };
        ModalSrvc.show(config);
      };
    }
  };
});
