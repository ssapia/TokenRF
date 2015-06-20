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
        controller: 'TokenController as vm'
    });

  })
  .controller('TokenController', function(UsersModel, ErrorsModel, $location, AuthTokenFactory) {
    var vm = this;
    vm.logout = function() {
      AuthTokenFactory.setToken();
    };

    UsersModel.getUser().then(function() {
      showToken();
    },
    function() {
      ErrorsModel.setError('User not authenticared.');
      $location.path('/login');
    });



  });
