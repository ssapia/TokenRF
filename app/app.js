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
  .module('tokenRfApp', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'tokenRfApp.login',
    'tokenRfApp.token',
    'tokenRfApp.pushmodal'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login/login.tmpl.html',
        controller: 'LoginController as loginCtrl'
      })
      .when('/token', {
        templateUrl: 'token/token.tmpl.html',
        controller: 'TokenController as tokenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('mainController', function($scope, $modal, $log) {
    console.log('Oi Salvador. Eu sou um controller do AngularJS. Awesome!!!')

    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;

    $scope.open = function(size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'pushmodal/pushmodal.tmpl.html',
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
