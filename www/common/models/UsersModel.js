/**
 * Created by enrique on 6/14/15.
 */
angular
  .module('app.service.users', [])
  .service('UsersService', function($http, $q, AuthTokenFactory, $location) {
    var model = this,
      API_URL = 'http://localhost:4000';

    var handleSuccess = function(result) {
      if (result.data.token) {
        AuthTokenFactory.setToken(result.data.token);
      }
      return result;
    };

    var handleError = function(result) {
      AuthTokenFactory.setToken();
      $location.path('/login');
      return null;
    };

    model.getRandomUser = function() {
      return $http.get(API_URL+'/random-user').then(handleSuccess, handleError);
    };

    model.checkAuthorization = function() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me').then(handleSuccess, handleError);
      } else {
        return $q.reject('User not authenticated').then(handleSuccess, handleError);
      }
    };

    model.login = function(user) {
      return $http.post(API_URL + '/login', {
        username: user.username,
        password: user.password
      }).then(handleSuccess, handleError);
    };

  });
