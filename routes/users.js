var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  newUser.save(function(err, databaseUser){
    res.redirect('/');
  });
});

router.post('/authenticate', function(req, res){
  var username = req.body.username; // What username did THEY type in
  var passwordTry = req.body.password; // What password attempt did THEY type in
  User.findOne({username: username}, function(err, dbUser){ // Find the user by that username
    dbUser.authenticate(passwordTry, function(err, isMatch){  // See if the password is correct
      if(isMatch){  // If it is!!!...
        dbUser.setToken(function(){  // Create a new token
          res.json({
            description: 'password correct',
            token: dbUser.token  // Send It Down!
          });
        });
      }
    });
  });
});


module.exports = router;
