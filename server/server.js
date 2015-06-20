/**
 * Created by enrique on 6/14/15.
 */
var express = require('express');
var faker = require('faker');
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
  password: 'admin'
};

app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

app.post('/login', authenticate, function (req, res) {
  var body = req.body;
  var token = jwt.sign({
    username: userDB.username
  }, jwtSecret);
  res.json({
    token: token,
    user: userDB
  });
});

app.get('/me', function (req, res) {
  res.send(req.user);
});

function authenticate(req, res, next) {
  var body = req.body;
  if (!body.username || !body.password) {
    res.status(400).end('Userneme or password must be provided');
  }
  if (body.username !== userDB.username || body.password !== userDB.password) {
    res.status(401).end('Invalid username or password');
  }
  next();
}

app.listen(4000, function () {
  console.log('App listening on localhost:4000');
});
