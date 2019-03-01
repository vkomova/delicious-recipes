var Recipe = require('../models/recipe');

module.exports = {
    index,
    create,
    show,
    edit,
    update,
    deleteRecipe,
    comment,
    userview
};

// req.params.userid, req.params.userID ?
function userview(req, res) {
    Recipe.find({user:req.params.userId, status: 'public'})
    .populate('user')
    .then(recipe => {
      res.render('recipes/userview'), {
        recipe: recipe,
        title: recipe.title,
        body: recipe.body,
        status: recipe.status,
        date: recipe.date,
        allowComment: recipe.allowComment,
        user: req.user.id,
        user2: recipe.user,
        comments: recipe.comments
        }
    });
};

function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id)
    .then(function(recipe) {
        res.redirect('/dashboard')
    })
};

function edit(req, res) {
    Recipe.findOne({_id: req.params.id})
    .then(recipe => {
        if(recipe.user != req.user.id){
            res.redirect('/dashboard');
        } else {
            res.render('recipes/edit', { 
            recipes: recipe
        });
        }
    });
};

function index(req, res) {
    Recipe.find({status:'public'})
        .populate('user')
        .sort ({date: 'asc'})
        .then(recipes => {
            res.render('recipes/index', {
                user: req.user,
                recipes: recipes
            });
        });
};

function create(req, res) {
    let allowComment;
    if(req.body.allowComment){
        allowComment = true;
    }
    const newRecipe = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComment: allowComment,
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
    .populate('comments.commentUser')
    .then(recipe => {
        if(recipe.status == 'public') {
            res.render('recipes/show', { 
                recipe: recipe,
                title: recipe.title,
                body: recipe.body,
                status: recipe.status,
                date: recipe.date,
                allowComment: recipe.allowComment,
                user: recipe.user,
                user2: req.user,
                comments: recipe.comments
            });
        } else {
            if(req.user) {
                if(req.user.id == recipe.user._id){
                    res.render('recipes/show', { 
                        recipe: recipe,
                        title: recipe.title,
                        body: recipe.body,
                        status: recipe.status,
                        date: recipe.date,
                        allowComment: recipe.allowComment,
                        user: recipe.user,
                        user2: req.user,
                        comments: recipe.comments
                    });
                } else {
                    res.redirect('recipes/index');
                }
            } else {
                res.redirect('/');
            }
        }
    })
};

function comment (req, res) {
    Recipe.findOne({_id: req.params.id})
    .then(recipe => {
        var newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }
        recipe.comments.unshift(newComment);
        recipe.save()
        .then(recipe => {
            res.redirect(`/recipes/show/${recipe.id}`)
        })
    });
};

