var express = require('express');
var router = express.Router();
var User = require('../models/user');


/// GETS THE CURRENT USER'S INFO
router.get('/', function(req,res){
  console.log('this is the get request' + req.user._id);
  User.findById(req.user._id, function(err, user){
    console.log("this is the user???"+user);
    res.json(user);
  })
});

// CREATES A USER
router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  newUser.save(function(err, databaseUser){
    res.redirect('/');
  });
});

// LOGS A USER IN AND ASSIGNS A TOKEN
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

// UPDATES THE USER'S PROFILE
router.patch('/', function (req, res){
  console.log(req.user);
  if (req.user){
    req.user.profile = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

router.post('/appointments', function (req, res){
  if (req.user){
    console.log("this is the user: "+req.user);
    console.log("this is the body"+req.body.user);
    console.log("this is the user's appointment"+req.user.appointments)
    req.user.appointments.push(req.body.user);
    console.log("this is the user with the new appointment"+req.user);
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

// ADDS A NEW MEDICATION TO THE USER
router.post('/medications', function (req, res){
  if (req.user){
    console.log("this is the user: "+req.user);
    console.log("this is the body"+req.body.user);
    console.log("this is the user's medications"+req.user.medications)
    req.user.medications.push(req.body.user);
    console.log("this is the new medication"+req.user);
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
