var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var User = require('../models/user');
var recipesCtrl = require('../controllers/recipes');

var {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

router.delete('/:id', recipesCtrl.deleteRecipe);

router.get('/', recipesCtrl.index);

router.get('/show/:id', recipesCtrl.show);

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('recipes/add', {user: req.user});
});

router.get('/edit/:id', recipesCtrl.edit);
// router.get('/edit/:id', ensureAuthenticated, recipesCtrl.edit);

// router.get('/new', recipesCtrl.new);
router.post('/', recipesCtrl.create);
router.post('/:id', recipesCtrl.update);

module.exports = router;