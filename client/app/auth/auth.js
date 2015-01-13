'use strict';

angular.module('authMdul', [])
.config(function($stateProvider){
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/auth/login.html',
    controller: 'LoginCtrl'
  });
})

//authentication watch function
//this re-directs any page that requires
//and fails authentication to the login page
.run(['$rootScope', '$state', function($rootScope, $state) {
  // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  // });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error.authenticated === false) {
      $state.go('login');
    }
  });
}]);
