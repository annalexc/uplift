var express = require('express');
var router = express.Router();
var User = require('../models/user');


/// GETS THE CURRENT USER'S INFO
router.get('/', function(req,res){
  User.findById(req.user._id, function(err, user){
    var request = require('request');
    var parseString = require('xml2js').parseString;
    if (user.profile[0].illness){
      var xml = 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term='+ user.profile[0].illness;
      console.log(xml);
      request(xml, function(err, response, body){
        parseString(body, function(error, result){
          console.dir(result.nlmSearchResult.list[0].document[0].content[3]._);
          user.profile[0].illnessInfo = result.nlmSearchResult.list[0].document[0].content[3]._;
          console.log(user);
          res.json(user);
        });
      });
    } else {
      res.json(user);
    }
    // user.save(function(err, databaseUser){
    //   res.json(databaseUser);
    // });
  });
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
  if (req.user){
    req.user.profile = req.body.user;
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

// ADDS A NEW APPOINTMENT
router.post('/appointments', function (req, res){
  if (req.user){
    req.user.appointments.push(req.body.user);
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

// DELETES AN APPOINTMENT
router.delete('/appointments/:id', function(req,res){
  var deleteId = req.params.id;
  var appointments = req.user.appointments;
  var i = 0;
  appointments.forEach(function(appt){
    if (appt._id == deleteId) {
      appointments.splice(i, 1);
    }
    i+=1;
  });
  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

// UPDATES AN APPOINTMENT
router.patch('/appointments/:id', function(req,res){
  var updateId = req.params.id;
  var appointments = req.user.appointments;
  var updateAppts = req.body.user;
  var i = 0;
  appointments.forEach(function(appt){
    if (appt._id == updateId) {
      appointments[i].date = updateAppts.date;
      appointments[i].time = updateAppts.time;
      appointments[i].location = updateAppts.location;
      appointments[i].doctor = updateAppts.doctor;
      appointments[i].notes = updateAppts.notes;
      appointments[i].coPay = updateAppts.coPay;
    }
    i+=1;
  });
  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

// ADDS A NEW MEDICATION TO THE USER
router.post('/medications', function (req, res){
  if (req.user){
    req.user.medications.push(req.body.user);
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

// DELETES A MEDICATION
router.delete('/medications/:id', function(req,res){
  var deleteId = req.params.id;
  var medications = req.user.medications;
  var i = 0;
  medications.forEach(function(med){
    if (med._id == deleteId) {
      req.user.medications.splice(i, 1);
    }
    i+=1;
  });
  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

// UPDATES A MEDICATION
router.patch('/medications/:id', function(req,res){
  var updateId = req.params.id;
  var medications = req.user.medications;
  var updateMed = req.body.user;
  var i = 0;
  medications.forEach(function(med){
    console.log(i);
    console.log("this is this medicine's id "+med._id);
    console.log("this is the id we want to change "+updateId);
    if (med._id == updateId) {
      console.log(medications[i]);
      medications[i].name = updateMed.name;
      medications[i].dosage = updateMed.dosage;
      medications[i].sideEffects = updateMed.sideEffects;
      medications[i].coPay = updateMed.coPay;
      medications[i].time = updateMed.time;
    }
    i+=1;
  });

  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

// ADDS A NEW FOOD RESTRICTION TO THE USER
router.post('/foodRestrictions', function (req, res){
  if (req.user){
    req.user.foodRestrictions.push(req.body.user);
    req.user.save(function(err, databaseUser){  // Save the user
      res.json(databaseUser); // Send the updated user as JSON
    });
  }
});

// DELETES A FOOD RESTRICTION
router.delete('/foodRestrictions/:id', function(req,res){
  var deleteId = req.params.id;
  var foodRestrictions = req.user.foodRestrictions;
  var i = 0;
  foodRestrictions.forEach(function(foodRes){
    if (foodRes._id == deleteId) {
      req.user.foodRestrictions.splice(i, 1);
    }
    i+=1;
  });
  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

// UPDATES A FOOD RESTRICTION
router.patch('/foodRestrictions/:id', function(req,res){
  var updateId = req.params.id;
  var foods = req.user.foodRestrictions;
  var updateFood = req.body.user;
  var i = 0;
  foods.forEach(function(food){
    if (food._id == updateId) {
      console.log(foods[i]);
      foods[i].name = updateFood.name;
      foods[i].notes = updateFood.notes;
    }
    i+=1;
  });

  req.user.save(function(err, databaseUser){  // Save the user
    res.json(databaseUser); // Send the updated user as JSON
  });
});

//////// HELPFUL CONSOLE LOGS
// console.log('this is the get request' + req.user._id);
// console.log("this is the user???"+user);
// console.log(req.user);
// console.log("this is the user: "+req.user);
// console.log("this is the body"+req.body.user);
// console.log("this is the user's appointment"+req.user.appointments);
// console.log("this is the user with the new appointment"+req.user);
// console.log("this is the user: "+req.user);
// console.log("this is the body"+req.body.user);
// console.log("this is the user's medications"+req.user.medications);
// console.log("this is the new medication"+req.user);
// console.log("this is the user: "+req.user);
// console.log("this is the body"+req.body.user);
// console.log("this is the user's restrictions"+req.user.foodRestrictions);
// console.log("this is the new restriction"+req.user);

var request = require('request');
var parseString = require('xml2js').parseString;
var xml = 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=breast%20cancer';
request(xml, function(err, res, body){
  parseString(body, function(err, result){
    console.dir(result.nlmSearchResult.list[0].document[0].content[3]._);
  });
});

module.exports = router;
