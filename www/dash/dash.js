angular.module('app.dash', [])
  .config(function($stateProvider) {
    $stateProvider
        .state('dash', {
            url: '/dash',
            templateUrl: 'dash/dash.html',
            controller: 'DashController as vm'
        });

  })
  .controller('DashController', function(UsersService, AuthTokenFactory, $location) {
    UsersService.checkAuthorization();

    var vm = this;
    vm.token = AuthTokenFactory.getToken();
    vm.showToken = function() {
      $location.path('/dash/token');
    };
  });
