var express = require('express')
var app = express()

// !IMPORTANT
// MAKE SURE TO CHANGE THE CLIENT_ID IN INDEX.HTML
// !IMPORTANT
var CLIENT_ID = 'xxxx.apps.googleusercontent.com';
var CLIENT_SECRET = 'xxxx';

///////////////////////////
// Passport config
///////////////////////////

var passport = require('passport')
var GoogleAuthCodeStrategy = require('passport-google-authcode').Strategy;

passport.use(new GoogleAuthCodeStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/auth/google_auth_code/callback'
    // callbackURL: 'http://localhost:8080/auth/google_auth_code/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('Authenticated!');
      console.log('accessToken: ' + accessToken);
  }
));

///////////////////////////
// Routes
///////////////////////////

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/auth/google/authcode',
    passport.authenticate('google-authcode'),
    function (req, res) {
        // do something with req.user
        res.send(req.user ? 200 : 401);
    }
);

app.get('auth/google_auth_code/callback',
    passport.authenticate('google-authcode', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('success');
        res.redirect('/');
    });

app.listen(8080, function () {
    console.log('http://localhost:8080/')
});