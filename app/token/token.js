/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('app.token', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('token', {
        url: '/token',
        templateUrl: 'token/token.tmpl.html',
        controller: 'TokenController as tokenCtrl'
    });

  })
  .controller('TokenController', function() {
    showToken();
  });
