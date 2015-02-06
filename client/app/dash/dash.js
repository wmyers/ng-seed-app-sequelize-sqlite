'use strict';

angular.module('dashMdul', [])
.config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dash/dash.html',
      controller: 'dashCtrl',
      resolve: {
        auth: ['authSrvc', '$state', function(authSrvc, $state){
          return authSrvc.getAuthenticated()
          .catch(function(error){
            if (error.authenticated === false) {
              $state.go('login');
            }
          });
        }]
      }
    });
}]);
