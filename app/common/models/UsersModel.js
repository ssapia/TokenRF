/**
 * Created by enrique on 6/14/15.
 */
angular
  .module('app.common.models.users', [])
  .service('UsersModel', function($http, $q, AuthTokenFactory) {
    var model = this,
      API_URL = 'http://localhost:4000';

    var handleSuccess = function(result) {
      return result;
    };

    var handleError = function(result) {
      alert('Error: '+result.data);
    };

    model.getRandomUser = function() {
      return $http.get(API_URL+'/random-user').then(handleSuccess, handleError);
    };

    model.getUser = function() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me').then(handleSuccess, handleError);
      } else {
        return $q.reject('User not authenticated');
      }
    };

    model.login = function(user) {
      return $http.post(API_URL + '/login', {
        username: user.username,
        password: user.password
      }).then(handleSuccess);
    };

  });
