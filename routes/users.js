var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req,res){
  console.log('this is the get request' + req.user._id);
  User.findById(req.user._id, function(err, user){
    console.log("this is the user???"+user);
    res.json(user);
  })
});

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

router.patch('/', function (req, res){
  if (req.user){
    req.user.profile = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

router.patch('/', function (req, res){
  if (req.user){
    req.user.appointments = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

router.patch('/', function (req, res){
  if (req.user){
    req.user.medications = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

router.patch('/', function (req, res){
  if (req.user){
    req.user.foodRestrictions = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});




module.exports = router;
