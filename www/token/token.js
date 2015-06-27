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
  .controller('TokenController', function($interval,UsersModel, ErrorsModel, $location, AuthTokenFactory) {

    var vm = this;

    vm.logout = function() {
      AuthTokenFactory.setToken();
    };

    UsersModel.getUser().then(function() {
        $interval(function() {
          vm.timer = getTimer();
          vm.token = getOtp();
        },1000);
      },

      function() {
        ErrorsModel.setError('User not authenticared.');
        $location.path('/login');
      });

    function getTimer()
    {
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var countDown = 30 - (epoch % 30);
      if (epoch % 30 == 0) getOtp();

      var percent = (100*countDown)/30;
      //$('.progress-bar').css('width', percent+'%').attr('aria-valuenow', countDown);
      return countDown;
    }
 });
