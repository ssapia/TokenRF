angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaDevice) {

  })

.controller('LoginCtrl', function($scope, Chats) {
    var vm = this;
    vm.login = function() {
      vm.logando = 'Clicou no login';
    };
  })

.controller('TokenCtrl', function($scope) {

});
