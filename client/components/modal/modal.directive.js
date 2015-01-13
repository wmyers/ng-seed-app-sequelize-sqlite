'use strict';


angular.module('uiComps')
.directive('modal', function($rootScope) {
  return {
    restrict: 'EA',
    scope: {},
    transclude: true,
    controller: function($scope, ModalSrvc){
      //putting the data/service in the $scope directly, Angular will handle changes for you.
      $scope.service = ModalSrvc;
      //service api for modalContent child directives
      this.getService = function(){
        return $scope.service;
      };
    },
    link: function(scope, element, attrs) {
      scope.okButtonClick = function(){
        //broadcast ok event from root with clone of service.config
        $rootScope.$broadcast(
          'modalOKClickEvent',
          _.clone(scope.service.config));

        //reset values in the service
        scope.service.reset();
      };

    },
    templateUrl: './components/modal/modal.html'
  };
});
