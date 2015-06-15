/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('app.login', [
    'ui.bootstrap',
    'app.common.models.users'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'login/login.tmpl.html',
        controller: 'LoginController as loginCtrl'
      })
  })
  .controller('LoginController', function($location, UsersModel, ErrorsModel) {
    var loginCtrl = this;
    loginCtrl.user = {};

    function login(user) {
      UsersModel.login(user)
        .then(function success(result) {
          ErrorsModel.setError('');
          $location.path('/token');
        }, function error(result) {
          ErrorsModel.setError(result.data);
        });
    }

    loginCtrl.login = login;
  });
