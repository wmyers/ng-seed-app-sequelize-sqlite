'use strict';

angular.module('authMdul')
.factory('authSrvc', [
                      '$http',
                      '$q',
                      '$window',
                      '$rootScope',
                      function(
                        $http,
                        $q,
                        $window,
                        $rootScope
                      ) {

  // Actual service object to return.
  var self = {
    // Data properties.
    isLoggedIn: false,
    token: null,
    user: null,

    // Methods, defined below.
    login: login,
    logout: logout,
    signUp: signUp,
    getAuthenticated: getAuthenticated
    // refreshUserData: refreshUserData
  };

  /*
  Makes http request for jwt token if it is not already stored in the browser
  */
  function getLoginToken(credentials) {
    //console.log(credentials);
    var deferred = $q.defer();
    if(credentials === 'stored'){
      var token = $window.localStorage.accessToken || $window.sessionStorage.accessToken;
      if (token){
        deferred.resolve(registerToken(token));
      }else{
        deferred.reject('No local token available');
      }
    }else{
      $http.post('/api/auth/login', credentials).then(
        function(result) {
          //console.log('/api/auth/login result = ', result.data);
          var token = result.data;
          $window[credentials.persist ? 'localStorage' : 'sessionStorage'].accessToken = token;
          deferred.resolve(registerToken(token));
        },
        function(error){
          deferred.reject('Unable to get remote token. '+error.data);
        }
      );
    }
    return deferred.promise;
  }

  /*
  Register the token in the app
  */
  function registerToken(token){
    // Always send the Authorization HTTP header.
    // This may potentially be susceptible to MITM attacks,
    // consider upgrading to full request interceptor in future.
    $http.defaults.headers.common.Authorization = 'Bearer '+token;
    self.token = token;
    return 'Token registered in app';
  }

  /*
  Makes http request for user data if it is not already available
  */
  function getUserData(){
    var deferred = $q.defer();
    if(self.user !== null){
      deferred.resolve(self.user);
    }else{
      $http.get('/api/auth/me').then(
        function (result) {
          // console.log('/api/auth/me result = ', result.data);
          var userData = result.data;
          //store userData in service
          self.user = userData;
          deferred.resolve(userData);
        },
        function(error){
          deferred.reject('Unable to get remote user data. '+error.data);
        }
      );
    }
    return deferred.promise;
  }

  /*
  Gets token and then gets user data, then sets isLoggedIn state
  */
  function login(credentials){
    var deferred = $q.defer();
    getLoginToken(credentials)
      .then(getUserData)
      .then(
        function(result){
          //set logged in state here
          self.isLoggedIn = true;
          deferred.resolve(result);
        },
        function(error){
          deferred.reject(error);
        }
      );
    return deferred.promise;
  }

  /*
  Disposes of token locally and nullifies user data
  */
  function logout() {
    var deferred = $q.defer();
    if(self.isLoggedIn){
      self.isLoggedIn = false;
      //clear token
      if ($window.localStorage.accessToken) {
        delete $window.localStorage.accessToken;
      }
      if ($window.sessionStorage.accessToken) {
        delete $window.sessionStorage.accessToken;
      }
      self.token = null;
      // Clear Authorization HTTP header.
      if ($http.defaults.headers.common.Authorization){
        delete $http.defaults.headers.common.Authorization;
      }
      //clear user data
      self.user = null;
      deferred.resolve({isLoggedOut:true});
    }else{
      deferred.reject({isLoggedOut:false});
    }
    return deferred.promise;
  }

  /*
  Sign-up for the first time
  */
  function signUp(credentials){
    var deferred = $q.defer();
    $http.post('/api/user', credentials).then(
      function(result) {
        var userData = result.data;
        deferred.resolve(userData);
      },
      function(error){
        deferred.reject('Unable to create user. '+error.data);
      }
    );
    return deferred.promise;
  }

  /*
  Use with any authentication-required page routing
  */
  function getAuthenticated(){
    var deferred = $q.defer();
    if(self.isLoggedIn){
      deferred.resolve({authenticated:true});
    }else{
      //attempt login with any stored token
      self.login('stored').then(
        function(result){
          deferred.resolve({authenticated:true, result:result});
        },
        function(error){
          deferred.reject({authenticated:false, error:error.data});
        }
      );
    }
    return deferred.promise;
  }

  // function refreshUserData() {
  //   return $http.get('/api/auth/me').then(
  //     function (result) {
  //       self.user = result.data;
  //       return result.data;
  //     } // Todo: Lacks error handler.
  //   );
  // }

  return self;

}]);
