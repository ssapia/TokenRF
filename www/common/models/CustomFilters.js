/**
 * Created by enrique on 6/30/15.
 */
angular.module('app.filters', [])
  .filter('notificacoesCustomFilter', [ function() {
    return function(input, param) {
      var ret = [];
      if(!angular.isDefined(param)) param = 'Todos';

      angular.forEach(input, function(v) {
        if(angular.isDefined(v.tipo) && v.tipo) {
          if (v.tipo === param || 'Todos' == param)
          ret.push(v);
        }
      });

      return ret;
    };
  } ]);
