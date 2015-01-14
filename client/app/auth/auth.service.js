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
  };

  /*
  Makes http request for jwt token if it is not already stored in the browser
  */
  function getLoginToken(credentials) {
    if(credentials === 'stored'){
      var token = $window.localStorage.accessToken || $window.sessionStorage.accessToken;
      if (token){
        return $q.when(registerToken(token));
      }else{
        return $q.reject('No local token available');
      }
    }else{
      return $http.post('/api/auth/login', credentials)
      .then(function(result) {
        var token = result.data;
        $window[credentials.persist ? 'localStorage' : 'sessionStorage'].accessToken = token;
        return $q.when(registerToken(token));
      })
      .catch(function(error){
        return $q.reject('Unable to get remote token. '+error.data);
      });
    }
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
    if(self.user !== null){
      return $q.when(self.user);
    }else{
      return $http.get('/api/auth/me')
      .then(function (result) {
        self.user = result.data;
        return $q.when(self.user);
      })
      .catch(function(error){
        return $q.reject('Unable to get remote user data. '+error.data);
      });
    }
  }

  /*
  Gets token and then gets user data, then sets isLoggedIn state
  */
  function login(credentials){
    return getLoginToken(credentials)
    .then(getUserData)
    .then(function(result){
      self.isLoggedIn = true;
      return $q.when(result);
    })
    .catch(function(error){
      return $q.reject(error);
    });
  }

  /*
  Disposes of token locally and nullifies user data
  */
  function logout() {
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
      return $q.when({isLoggedOut:true});
    }else{
      return $q.reject({isLoggedOut:false});
    }
  }

  /*
  Sign-up for the first time
  */
  function signUp(credentials){
    return $http.post('/api/user', credentials)
    .then(function(result) {
      return $q.when(result.data);
    })
    .catch(function(e) {
      return $q.reject('Unable to create user. '+e.data);
    });
  }

  /*
  Use with any authentication-required page routing
  */
  function getAuthenticated(){
    if(self.isLoggedIn){
      return $q.when({authenticated:true});
    }else{
      //attempt login with any stored token
      return self.login('stored')
      .then(function(result){
        return $q.when({authenticated:true, result:result});
      })
      .catch(function(error){
        return $q.reject({authenticated:false, error:error.data});
      });
    }
  }

  return self;

}]);
