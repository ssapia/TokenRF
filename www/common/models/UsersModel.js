/**
 * Created by enrique on 6/14/15.
 */
angular
  .module('app.service.users', [])
  .service('UsersService', function($http, $q, AuthTokenFactory, $location, $window) {
    var model = this,
      API_URL = 'http://localhost:4000';

    var handleSuccess = function(result) {
      if (result.data.token) {
        AuthTokenFactory.setToken(result.data.token);
      }
      return result.data.user;
    };

    var handleError = function(result) {
      console.log(result.data);
      AuthTokenFactory.setToken();
      $location.path('/login');
      return null;
    };

    model.checkAuthorization = function() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me').then(handleSuccess, handleError);
      } else {
        return $q.reject('User not authenticated').then(handleSuccess, handleError);
      }
    };

    model.login = function(user) {
      	user.regId = model.getRegId(); 
	return $http.post(API_URL + '/login', user).then(handleSuccess, handleError);
    };

    var store = $window.localStorage;
    var key = 'REG_ID';

    model.setRegId = function(regId) {
      store.setItem('key', regId);
    };

    model.getRegId = function() {
      return store.getItem('key');
    };

  });
