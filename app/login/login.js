/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('tokenRfApp.login', [])
  .controller('LoginController', function($location) {
    console.log('login controller');

    var loginCtrl = this;
    loginCtrl.user = {};

    function login() {
      console.log(loginCtrl.user.email);
      $location.path('/token');
    }

    loginCtrl.login = login;
  });
