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
                    tipo: 'Emissao',
                    titulo: 'Emissao aerea',
                    corpo: 'Voce permite a emissão do loc ABCDE'
                },
                {
                    tipo: 'Emissao',
                    titulo: 'Emissao aerea',
                    corpo: 'Voce permite a emissão do loc ABCDE'
                },
                {
                    tipo: 'Emissao',
                    titulo: 'Emissao aerea',
                    corpo: 'Voce permite a emissão do loc ABCDE'
                },
                {
                    tipo: 'OP',
                    titulo: 'Envio de OP',
                    corpo: 'Voce permite o envio da OP para o loc HGKDL'
                },
                {
                    tipo: 'OP',
                    titulo: 'Envio de OP',
                    corpo: 'Voce permite o envio da OP para o loc HGKDL'
                },
                {
                    tipo: 'Credito',
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
