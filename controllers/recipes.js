var Recipe = require('../models/recipe');

module.exports = {
    index,
    new: newRecipe,
    create
};

function index(req, res, next) {
    res.render('index', {
        name: req.query.name,
        user: req.user,
        title: "recipes"
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Movie' })
}

function create(req, res) {
    let allowComments;
    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }
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

