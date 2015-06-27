/*
 TOTP Code by http://blog.tinisles.com/2011/10/google-authenticator-one-time-password-algorithm-in-javascript/
*/

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

function getOtp() {

    /* A chave será retornada no response do login */
    var secret	= "JBSWY3DPEHPK3PXP";
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




// TODO: IMPLEMENTAR CHECAGEM DE HORÁRIO DO CLIENT

//  <script src="https://utc-time.appspot.com"></script>
//    <!-- Returns a line of the form:
//      --   var timeskew = new Date().getTime() - XXX.XX;
//      -->
//
//  <script>

// If possible, compare the current time as reported by Javascript
// to "official" time as reported by AppEngine. If there is any significant
// difference, show a warning message. We always expect at least a minor
// time skew due to round trip delays, which we are not bothering to
// compensate for.
//    if (typeof timeskew != undefined) {
//      var ts=document.getElementById('timeskew');
//      if (Math.abs(timeskew) < 2000) {
//        ts.style.color='';
//        ts.innerHTML="Your computer's time is set correctly. TOTP codes " +
//                     "will be computed accurately.";
//      } else if (Math.abs(timeskew) < 30000) {
//        ts.style.color='';
//        ts.innerHTML="Your computer's time is off by " +
//          (Math.round(Math.abs(timeskew)/1000)) + " seconds. This is within " +
//          "acceptable tolerances. Computed TOTP codes might be different " +
//          "from the ones in the mobile application, but they will be " +
//          "accepted by the server.";
//      } else {
//        ts.style.color='#dd0000';
//        ts.innerHTML="<b>Your computer's time is off by " +
//          (Math.round(Math.abs(timeskew)/1000)) + " seconds. Computed TOTP " +
//          "codes are probably incorrect.</b>";
//      }
//    }