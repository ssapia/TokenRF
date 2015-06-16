/**
 * Created by enrique on 6/14/15.
 */
angular
  .module('app.common.models.users', [])
  .service('UsersModel', function($http) {
    var model = this,
      API_URL = 'http://10.0.1.9:4000';

    var extractUser = function(result) {
      console.log('authentication token: '+result.data.token);
      return result.data.user;
    };

    var handleError = function(result) {
      alert('Error: '+result.data);
    };

    model.getRandomUser = function() {
      return $http.get(API_URL+'/random-user').then(extractUser, handleError);
    };

    model.login = function(user) {
      return $http.post(API_URL + '/login', {
        username: user.username,
        password: user.password
      }).then(extractUser);
    };

  });
