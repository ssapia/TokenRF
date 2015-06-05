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
    'tokenRfApp.token'
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
  .controller('mainController', function() {
    console.log('Oi Salvador. Eu sou um controller do AngularJS. Awesome!!!')
  });
