/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('app.login', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'login/login.tmpl.html',
        controller: 'LoginController as loginCtrl'
      })
  })
  .controller('LoginController', function($location, UsersModel, ErrorsModel, AuthTokenFactory) {
    var loginCtrl = this;
    loginCtrl.user = {};

    if (AuthTokenFactory.getToken()) {
      $location.path('/token');
    }

    function login(user) {
      UsersModel.login(user)
        .then(function ter(result) {
          ErrorsModel.setError('');
          AuthTokenFactory.setToken(result.data.token);
          $location.path('/token');
        }, function error(result) {
          ErrorsModel.setError(result.data);
        });
    }

    loginCtrl.login = login;
  });
