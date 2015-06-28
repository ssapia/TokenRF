
angular.module('app.service.push', []).
  service('PushModel', function () {
    var vm = this;

    vm.title = '';
    vm.message = '';

    vm.getTitle = function() { return vm.title; };
    vm.setTitle = function(title) { vm.title = title; };

    vm.getMessage = function() { return vm.message; };
    vm.setMessage = function(message) { vm.message = message; };

  });
