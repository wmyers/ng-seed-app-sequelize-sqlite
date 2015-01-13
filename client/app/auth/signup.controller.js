'use strict';

angular.module('authMdul')
.controller('SignupCtrl', ['$scope', '$state', 'authSrvc', 'ModalSrvc',
function ($scope, $state, authSrvc, ModalSrvc) {
  $scope.credentials = {};

  $scope.signUp = function () {
    //TODO validate credentials here
    authSrvc.signUp($scope.credentials).then(
      function (result) {
        $state.go('login');
      },
      function (error) {
        console.log(error);
        var config = { contentId:'dynamic', targetId:1, dynamicMessage:error};
        ModalSrvc.show(config);
      });
    };
  }]);
