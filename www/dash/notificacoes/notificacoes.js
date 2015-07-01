/**
 * Created by salvador on 30/06/15.
 */
angular.module('app.dash.notificacoes', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('dash.notificacoes',
      {
        url: '/notificacoes',
        views: {
          'dashContent': {
            templateUrl: 'dash/notificacoes/notificacoes.html',
            controller: 'NotificacoesController as vm'
          }
        }
      });
  })
  .controller('NotificacoesController', function(NotificacoesService, ErrorsService) {
      var vm = this;
      vm.selectedtype = 'Todos';
      vm.notificacoes = NotificacoesService.getNotificacoes();
      //NotificacoesService.getNotificacoes()
      //    .then(function (result) {
      //      vm.notificacoes = result.data.notificacoes;
      //    }, function (result) {
      //      ErrorsService.setError(result);
      //    });

  });
