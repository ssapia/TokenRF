/**
 * Created by enrique on 6/4/15.
 */
angular
  .module('app.dash.token', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('dash-token', {
        url: '/dash/token',
        templateUrl: 'dash/token/token.tmpl.html',
        controller: 'TokenController as vm'
      });
  })
  .controller('TokenController', function($interval, UsersService) {
    var vm = this;

    UsersService.checkAuthorization()
      .then(function(user) {
        $interval(function() {
          if (!user.tokensecret) {
            return;
          }
          vm.token = getOtp(user.tokensecret);
          progressBar();
        },1000);
      });

    function progressBar() {
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var countDown = 30 - (epoch % 30);
      $('#progressbar').val((100*countDown)/30);
    }

    function getOtp(secret) {

      //alert(secret);	

      /* A chave será retornada no response do login */
      //var secret	= "JBSWY3DPEHPK3PXP";
      /***********************************************/

      var key = base32tohex(secret);
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');

      var hmacObj = new jsSHA(time, 'HEX');
      var hmac = hmacObj.getHMAC(key, 'HEX', 'SHA-1', "HEX");

      var offset = hex2dec(hmac.substring(hmac.length - 1));

      var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
      otp = (otp).substr(otp.length - 6, 6);

      return otp;
    }

    function dec2hex(s) { return (s < 15.5 ? '0' : '') + Math.round(s).toString(16); }
    function hex2dec(s) { return parseInt(s, 16); }

    function base32tohex(base32) {
      var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      var bits = "";
      var hex = "";

      for (var i = 0; i < base32.length; i++) {
        var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
      }

      for (var i = 0; i+4 <= bits.length; i+=4) {
        var chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16) ;
      }
      return hex;
    }

    function leftpad(str, len, pad) {
      if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
      }
      return str;
    }

  });
