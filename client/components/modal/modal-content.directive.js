'use strict';


angular.module('uiComps')
.directive('modalContent', function() {
  return {
    require: '^modal',
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs, modalCtrl) {
      //bind the service variable to the service exposed
      //by the parent directive - this is more encapsulated
      scope.service = modalCtrl.getService();
      scope.props = {
        contentId: element[0].id
      };
    },
    template: '<div class="modal-content" '+
              'ng-show="service.config.contentId === props.contentId" '+
              'ng-transclude></div>'
  };
});
