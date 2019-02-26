const Recipe = require('../models/recipe');

module.exports = {
  index,
//   addFact,
//   delFact
};

function index(req, res, next) {
    res.render('index', {
      name: req.query.name,
      user: req.user,
      title: "recipes"
    });
}

