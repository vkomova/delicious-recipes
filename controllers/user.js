const User = require('../models/user');

module.exports = {
  index
};

function index(req, res, next) {
  
    res.render('index', {
      name: req.query.name,
      user: req.user,
      title: "recipes"
    });
}

