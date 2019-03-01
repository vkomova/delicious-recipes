var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
var {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', recipesCtrl.index);
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('recipes/add', {user: req.user});
});
router.get('/show/:id', recipesCtrl.show);
router.get('/edit/:id', ensureAuthenticated, recipesCtrl.edit);
router.get('/user/:userId', recipesCtrl.userview);

router.post('/', recipesCtrl.create);
router.post('/:id', recipesCtrl.update);
router.post('/comment/:id', recipesCtrl.comment);

router.delete('/:id', recipesCtrl.deleteRecipe);

module.exports = router;