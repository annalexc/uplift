console.log("...loaded");

//////// LOG-IN/LOG-OUT FUNCTIONALITY ////////  var medicine = {name: medName}
function login(usernameTry, passwordTry, callback){
  $.ajax  ({
    method: 'post',
    url: '/users/authenticate',
    data: {username: usernameTry, password: passwordTry},
    success: function(data){
      $.cookie('token', data.token);
      callback();
    }
  });
}

function setLogInFormHandler(){
  $('form#log-in').on('submit', function(e){
    e.preventDefault();
    var usernameField = $(this).find('input[name="username"]');
    var passwordField = $(this).find('input[name="password"]');
    var username = usernameField.val();
    var password = passwordField.val();
    login(username, password, function(){
      console.log('The token is: ', $.cookie('token') );
      getUser();
      getUserMeds();
    });
  });
}

function logOut(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
    location.reload();
  });
}

//////// RENDER USER ///////
function renderUserProfile(user){
  console.log(user);
  var profile = $('#profile');
  profile.empty();
  var $el = $('<h2>');
  $el.text(user.profile[0].firstName);
  profile.append($el);
  profile.append( $('<h3>').text(user.profile[0].lastName));
  profile.append( $('<h3>').text(user.profile[0].birthdate).addClass('birthdate') );
  profile.append( $('<h3>').text(user.profile[0].gender).addClass('gender'));
  profile.append( $('<h3>').text(user.profile[0].phoneNum).addClass('phoneNum'));
}




////////GET USER AND RENDER PROFILE ////////
function getUser(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(data){
      console.log(data);
      renderUserProfile(data);
    }
  });
}

//////// UPDATE USER FUNCTIONALITY ////////

function updateUser(userData, callback){
  console.log(userData);
  $.ajax({
    method: 'patch',
    url: '/users',
    data: {user: userData},
    success: function(){
      callback();
    }
  });
}

function updateUserProfileHandler(){
  $('form#update-profile').on('submit', function(e){
    e.preventDefault();
    var firstNameField = $('input[name="firstName"]');
    var firstName = firstNameField.val();
    var lastNameField = $('input[name="lastName"]');
    var lastName = lastNameField.val();
    var birthdateField = $('input[name="birthdate"]');
    var birthdate = birthdateField.val();
    var genderField = $('select[name="gender"]');
    var gender = genderField.val();
    var phoneNumField = $('input[name="phoneNum"]');
    var phoneNum = phoneNumField.val();
    console.log(phoneNum);
    var userProfile = {firstName: firstName, lastName: lastName, birthdate: birthdate, gender: gender, phoneNum: phoneNum};
    updateUser(userProfile, function(){
      getUser();
    });
  });
}

//////////////// MEDICATIONS

/////////
function renderUserMeds(user){
  var medications = user.medications;
  var $display = $('#display-medications');
  $display.empty();
  medications.forEach(function(med){
    console.log(med);
    var $medDiv = $('<div>');
    $medDiv.append( $('<h4>').text(med.name) );
    $display.append($medDiv);
  });
}

////////GET USER AND RENDER MEDS ////////
function getUserMeds(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(data){
      console.log(data);
      renderUserMeds(data);
    }
  });
}

function addMeds(userData, callback){
    console.log(userData);
    $.ajax({
      method: 'post',
      url: '/users/medications',
      data: {user: userData},
      success: function(){
        getUserMeds();
      }
    });
}

function medsHandler(){
  $('#medication').on('submit', function(e){
    e.preventDefault();
    var medNameField = $('input[name="medName"]');
    var medName = medNameField.val();
    var dosageField = $('input[name="medDosage"]');
    var dosage = dosageField.val();
    var sideEffectsField = $('input[name="medSideEffects"]');
    var sideEffects = sideEffectsField.val();
    var timeField = $('input[name="medTime"]');
    var time = timeField.val();
    var coPayField = $('input[name="medCoPay"]');
    var coPay = coPayField.val();
    var medicine = {name: medName, dosage: dosage, sideEffects: sideEffects, time: time, coPay: coPay };
    addMeds(medicine, function(){
      console.log("hello!");
    });
  });
}

////////////// APPOINTMENTS

function addApps(appData, callback){
  console.log()
  $.ajax({
    method: 'post',
    url: '/users/appointments',
    data: {user: appData},
    success: function(){
      console.log('added the appointment?');
    }
  })
}

function addAppointmentsHandler(){
  $('#appointments').on('submit', function(e){
    e.preventDefault();
    var appDateField = $('input[name="appDate"]');
    var appDate = appDateField.val();
    var appLocationField = $('input[name="appLocation"]');
    var appLocation = appLocationField.val();
    var appDoctorField = $('input[name="appDoctor"]');
    var appDoctor = appDoctorField.val();
    var appPhoneNumField = $('input[name="appPhoneNum"]');
    var appPhoneNum = appPhoneNumField.val();
    var appCoPayField = $('input[name="appCoPay"]');
    var appCoPay = appCoPayField.val();
    var appNotesField = $('input[name="appNotes"]');
    var appNotes = appNotesField.val();
    console.log("date" + appDate + " app loc"+ appLocation);
    var appointment = {date: appDate, location: appLocation, doctor: appDoctor, phoneNum: appPhoneNum, coPay: appCoPay, notes: appNotes};
    JSON.stringify(appointment);
    addApps(appointment, function(){
      console.log("...adding apps... hopefully");
    })
  });
}




$(function(){
  setLogInFormHandler();
  logOut();
  updateUserProfileHandler();
  medsHandler();
  addAppointmentsHandler();

  // FUNCTIONING JQUERY GET of CDC
  // $.getJSON('https://tools.cdc.gov/api/v2/resources/media?topic=ovarian%20cancer', function(data){
  //   console.log(data);
  //   var results = data.results;
  //   for (var i = 0; i < 3; i++) {
  //     var $el = $('<li>');
  //     var result = results[i];
  //     $el.append($('<a href='+result.sourceUrl+'>').text(result.name) );
  //     $('#dummy').append($el);
  //   }
  // })

  // $.ajax({
  //   method: 'get',
  //   url: 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=asthma&knowledgeResponseType=application/javascript&callback=?',
  //   dataType: 'jsonp',
  //   success: function(data){
  //
  //   }
  // })
});
