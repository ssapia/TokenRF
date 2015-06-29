angular.module('app.dash', [])
  .config(function($stateProvider) {
    $stateProvider
        .state('dash', {
            url: '/dash',
            abstract: true,
            templateUrl: 'dash/dash.html',
            controller: 'DashController as vm'
        });

  })
  .controller('DashController', function(UsersService, AuthTokenFactory, $location) {
    UsersService.checkAuthorization();
  });
