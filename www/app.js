
angular.module('app', [
    'ionic',
    'ngCordova',
    'app.common.models.errors',
    'app.common.models.users',
    'app.login',
    'app.user',
    'app.token' ]
)
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .factory('AuthTokenFactory', function AuthTokenFactory($window) {
    'use strict';

    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken : getToken,
      setToken : setToken
    };

    function getToken() {
      return store.getItem(key);
    }

    function setToken(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }
  })
  .factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
    'use strict';
    return {
      request: addToken
    };

    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  })
  .controller('MainController', function(ErrorsModel) {
    var mainCtrl = this;
    mainCtrl.getError = ErrorsModel.getError;
    mainCtrl.clearError = ErrorsModel.clearError;
  });
