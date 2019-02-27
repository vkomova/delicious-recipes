var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');
var recipesCtrl = require('../controllers/recipes');

var {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

router.get('/', (req, res) => {
    Recipe.find({status:'public'})
        .then(recipes => {
            res.render('recipes/index', {
                user: req.user,
                recipes: recipes
            });
        });
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('recipes/add', {user: req.user});
});

router.get('/new', recipesCtrl.new);
router.post('/', recipesCtrl.create);

// router.post('/', (req, res) => {
//     let allowComments;
//     if(req.body.allowComments){
//         allowComments = true;
//     } else {
//         allowComments = false;
//     }
//     const newRecipe = {
//         title: req.body.title,
//         body: req.body.body,
//         status: req.body.status,
//         allowComments: allowComments,
//         user: req.user.id
//     }
//     new Recipe(newRecipe)
//         .save()
//         .then(recipe => {
//             res.redirect(`/recipes/show/${recipe.id}`);
//         })
// });

module.exports = router;