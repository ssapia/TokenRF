/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('app.login', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: 'LoginController as vm'
      })
  })
  .controller('LoginController', function($location, AuthTokenFactory, UsersService) {
    var vm = this;
    vm.user = {};

    function login() {
      UsersService.login(vm.user)
        .then(function(result) {
          if (result) {
            $location.path('/dash');
          }
        });
    }

    vm.login = login;
  });
