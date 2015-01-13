'use strict';

angular.module('authMdul')
.controller('LoginCtrl', ['$scope', '$state', 'authSrvc', 'ModalSrvc',
  function ($scope, $state, authSrvc, ModalSrvc) {
    $scope.credentials = {};

    //$scope.authService = authSrvc; // For debugging purposes. Eventually remove.

    $scope.login = function () {
      authSrvc.login($scope.credentials).then(
        function (result) {
          $state.go('dashboard');
        },
        function (error) {
          console.log(error);
          var config = { contentId:'dynamic', targetId:1, dynamicMessage:error};
          ModalSrvc.show(config);
        });
    };

    $scope.signuphere = function () {
      $state.go('signup');
    };
}]);
