'use strict';

angular.module('dashMdul', [])
.config(function($stateProvider){
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dash/dash.html',
      controller: 'dashCtrl',
      resolve: {
        auth: function(authSrvc){
          return authSrvc.getAuthenticated();
        }
      }
    })
  ;
});
