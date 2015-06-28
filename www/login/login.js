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
  .controller('LoginController', function($location, AuthTokenFactory, UsersService, $cordovaDevice) {
    var vm = this;
    vm.user = {};

    document.addEventListener("deviceready", function () {
      vm.user.device = $cordovaDevice.getDevice();
    }, false);

    function login() {
      UsersService.login(vm.user)
        .then(function(result) {
          if (result) {
            $location.path('/dash/menu');
          }
        });
    }

    vm.login = login;
  });
