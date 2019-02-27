var express = require('express');
var router = express.Router();
var passport = require('passport');
var userCtrl = require('../controllers/user');
var {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

/* GET users listing. */
router.get('/', userCtrl.index);

/* GET home page. */
router.get('/', ensureGuest, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {user: req.user});
});

// router.get('/recipes', function(req, res, next) {
//   res.render('recipes/index', {user: req.user});
// });


router.get('/dashboard', ensureAuthenticated, function(req, res, next) {
  res.render('dashboard', {user: req.user});
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
