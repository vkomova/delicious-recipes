const User = require('../models/user');

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

