var express = require('express');
var router = express.Router();
var passport = require('passport');
var userCtrl = require('../controllers/user')

/* GET users listing. */
router.get('/', userCtrl.index);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  res.send('Dashboard');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// router.get('/verify', function(req, res) {
//   if(req.user){
//     console.log(req.user);
//   } else {
//     console.log('Not Auth');
//   }
// });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
