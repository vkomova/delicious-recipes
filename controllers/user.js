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

// function addFact(req, res, next) {
//   req.user.facts.push(req.body);
//   req.user.save(function(err) {
//     res.redirect('/users');
//   });
// }

// function delFact(req, res, next) {

// }
