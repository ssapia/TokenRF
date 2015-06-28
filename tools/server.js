/**
 * Created by enrique on 6/14/15.
 */
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'fjkdlsajfoew239053/3uk';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path:['/login']}));

var userDB = {
  username: 'admin',
  password: 'admin',
  tokensecret: 'JBSWY3DPEHPK3PXP'
};

var userDBRes = {
  username: 'admin',
  tokensecret: 'JBSWY3DPEHPK3PXP'
};

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
  console.log(body.regId);
/*
  if (!body.regId) {
    res.status(401).end('Invalid regId');
  }
*/

  next();
}

app.listen(4000, function () {
  console.log('App listening on localhost:4000');
});
