/**
 * Created by enrique on 6/14/15.
 */
angular
  .module('app.user', ['app.common.models.users'])
  .config(function($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            templateUrl: 'user/user.tmpl.html',
            controller: 'UserController as userCtrl'
        });
  })
  .controller('UserController', function (UsersModel) {
    var userCtrl = this;
    UsersModel.getRandomUser().then(function(user) {
      userCtrl.user = user;
    });
  });
