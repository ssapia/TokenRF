/**
 * Created by enrique on 6/28/15.
 */
angular.module('app.dash.menu', [])
  .config(function($stateProvider) {
      $stateProvider
          .state('dash.menu', {
              url: '/menu',
              views: {
                'dashContent': {
                  templateUrl: 'dash/menu/menu.html',
                  controller: 'MenuController as vm'
                }
              }
          });


  })
  .controller('MenuController', function () {

  });
