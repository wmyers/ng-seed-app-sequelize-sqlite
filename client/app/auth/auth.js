'use strict';

angular.module('authMdul', [])
.config(function($stateProvider){
  $stateProvider
  .state('signup', {
    name: 'signup',
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    name: 'login',
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'LoginCtrl'
  });
});
