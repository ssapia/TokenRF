/**
 * Created by enrique1 on 6/14/15.
 */
angular.module('app.common.models.errors',
  []).
  service('ErrorsModel', function () {
    var model = this;
    model.error = '';

    model.getError = function() {
      return model.error;
    };

    model.setError = function(error) {
      model.error = error;
    };

    model.clearError = function() {
      model.error = '';
    };

  });
