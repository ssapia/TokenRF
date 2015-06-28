var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyCan5h5bOdGryRe4Wv9RW_Jwvg4_kwS6YE');
var registrationIds = [];
 
// Value the payload data to send...
//message.addData('message',"Isso é uma notificação de teste");
message.addData('message',"<br><b>Mensagem de teste:</b><br><br><p>Essa é uma mensagem de teste.</p>Att.");
message.addData('title','Teste de push' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
registrationIds.push('APA91bEKpQ59_TB5XELCA9Yuu1B_1-Be-lrj0XPlOsmclLQIuc6Su_CigbxqUYu3eiPwgRiaueQo9c-0C3EqlO44DucP-E5vXtwtoBz0Ws1Mv3tIB5MdZFj_1OLz3wk3qBR8YOfN4njq9tv8dIbCkM9u8k_M_qVjWw');

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});
