/**
 * Created by salvador on 30/06/15.
 */
angular
    .module('app.service.notificacoes', [])
    .service('NotificacoesService', function($http, $q, AuthTokenFactory, ErrorsService) {
        var service = this;
        service.notificacoes = {
            notificacoes: [
                {
                    titulo: 'Emissao aerea',
                    corpo: 'Voce permite a emissão do loc ABCDE'
                },
                {
                    titulo: 'Envio de OP',
                    corpo: 'Voce permite o envio da OP para o loc HGKDL'
                },
                {
                    titulo: 'Aprovacao de credito',
                    corpo: 'Voce aprova o credito de R$xxx,xx para a agencia emitir o loc CDSAS'
                }
            ]
        };

        function getNotificacoes() {
            //console.log('getNotificacoes');
            //var deffered = $q.defer();
            //if (!notificacoes) {
            //    $http.get('/notificacoes').then(function(result) {
            //        notificacoes = result.data.notificacoes;
            //        deffered.resolve(notificacoes);
            //    });
            //} else {
            //    deffered.resolve(notificacoes);
            //}
            //return deffered.promise;
        //    return $http.get('/notificacoes');
            return service.notificacoes;

        }

        function addNotificacao(notificacao) {
            service.notificacoes.notificacoes.push(notificacao);
        }

        service.getNotificacoes = getNotificacoes;
        service.addNotificacao  = addNotificacao;


    });