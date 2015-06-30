/**
 * Created by enrique on 6/14/15.
 */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'fjkdlsajfoew239053/3uk';

////////////////////////////////////////////////////////////////////////////////////////////
var gcm = require('node-gcm');
var message = new gcm.Message();
//API Server Key
var sender = new gcm.Sender('AIzaSyCan5h5bOdGryRe4Wv9RW_Jwvg4_kwS6YE');
var registrationIds = [];
// Value the payload data to send...
message.addData('message',"<br><b>Mensagem de teste:</b><br><br><p>Essa é uma mensagem de teste.</p>Att.");
message.addData('title','Teste de push' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
/////////////////////////////////////////////////////////////////////////////////////////////

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path:['/login','/notify']}));

var userDB = {
  username: 'admin',
  password: 'admin',
  tokensecret: 'JBSWY3DPEHPK3PXP'
};

var userDBRes = {
  username: 'admin',
  tokensecret: 'JBSWY3DPEHPK3PXP'
};

app.get('/notify', function (req, res) {

   sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
  });

  res.status(201).end('Notificacao enviada');
});

app.post('/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username: userDB.username
  }, jwtSecret);
  res.json({
    token: token,
    user: userDBRes
  });
});

app.get('/me', function(req, res) {
  res.json({
    user: userDBRes
  });
});

function authenticate(req, res, next) {
  var body = req.body;
  if (!body.username || !body.password) {
    res.status(400).end('Userneme or password must be provided');
  }
  if (body.username !== userDB.username || body.password !== userDB.password) {
    res.status(401).end('Invalid username or password');
  }
  console.log('Device::::::::::');
  console.log(body.device);
  if (!body.device) {
    res.status(401).end('Invalid device');
  }

  console.log('RegID::::::::::');

  if (body.regId) {
    registrationIds.push(body.regId);
    console.log(body.regId);
  } else {
    //res.status(401).end('Invalid regId');
  }

  next();
}

app.listen(4000, function () {
  console.log('App listening on localhost:4000');
});
