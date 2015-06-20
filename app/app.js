'use strict';

/**
 * @ngdoc overview
 * @name tokenRfApp
 * @description
 * # tokenRfApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ui.router',
    'app.common.models.errors',
    'app.common.pushmodal',
    'app.common.models.users',
    'app.login',
    'app.token',
    'app.user'
  ])
  .config(function ($urlRouterProvider, $httpProvider) {
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
  .controller('MainController', function($scope, $modal, $log, ErrorsModel) {
    var mainCtrl = this;
    mainCtrl.getError = ErrorsModel.getError;
    mainCtrl.clearError = ErrorsModel.clearError;

    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'common/pushmodal/pushmodal.tmpl.html',
        controller: 'PushModalController',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  });
