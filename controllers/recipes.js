var Recipe = require('../models/recipe');

module.exports = {
    index,
    // new: newRecipe,
    create,
    show,
    edit,
    update,
    deleteRecipe
};

function deleteRecipe (req, res) {
    Recipe.findByIdAndDelete(req.params.id)
    .then(function(recipe) {
        res.redirect('/dashboard')
    })
};

function edit (req, res) {
    Recipe.findOne({_id: req.params.id})
    .then(recipes => {
        res.render('recipes/edit', { 
            recipes: recipes
        })
    })
};

function index(req, res) {
    Recipe.find({status:'public'})
        .populate('user')
        .then(recipes => {
            res.render('recipes/index', {
                user: req.user,
                recipes: recipes
            });
        });
};

// function newRecipe(req, res) {
//     res.render('recipes/new', { title: 'Add Recipe' })
// }

function create(req, res) {
    let allowComments = !!req.body.allowComments;
    const newRecipe = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }
    new Recipe(newRecipe)
        .save()
        .then(recipe => {
            res.redirect(`/recipes/show/${recipe.id}`);
        })
};

function update (req, res) {
    Recipe.findOne({_id: req.params.id})
    .then(recipe => {
      recipe.title = req.body.title
      recipe.status = req.body.status
      recipe.allowComments = req.body.allowComments
      recipe.body = req.body.body
      recipe.save()
      res.redirect('/dashboard')
    })
};

function show (req, res) {
    Recipe.findOne({_id: req.params.id})
    .populate('user')
    .then(recipe => {
        res.render('recipes/show', { 
            title: recipe.title,
            body: recipe.body,
            status: recipe.status,
            date: recipe.date,
            allowComment: recipe.allowComment,
            user: req.user,
        })
    })
};

// function show(req, res) {
//     Recipe.findById(req.params.id, function (err, recipe) {
//         res.render('recipes/show', { 
//             title: recipe.title,
//             body: recipe.body,
//             status: recipe.status,
//             date: recipe.date,
//             user: req.user
//         });
//     })
// };