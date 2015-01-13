'use strict';

angular.module('dashMdul')
.controller('dashCtrl',
              [
                '$scope',
                '$state',
                'authSrvc',
                'dashConfig',
                  function (
                    $scope,
                    $state,
                    authSrvc,
                    dashConfig
                  ) {

    //bindings
    $scope.userInfo = authSrvc.user;
    $scope.isLoggedIn = authSrvc.isLoggedIn;
    $scope.dashConfig = dashConfig;

    //TODO route error messages to modal dialog

    $scope.logout = function () {
      authSrvc.logout().then(
        function (result) {
          $scope.userInfo = null;
          $state.go('login');
        },
        function (error) {
          console.log(error);
        }
      );
    };

}]);
