////////////// APPOINTMENTS ///////////////
var convertTimeToValue = function(date){
 date = date.split('');
 date.splice(10);
 return date.join('');
};

var convertTimeToWords = function(date){
  JSON.stringify(date);
  var newDate = date.split('');
  var year = newDate.splice(0,4).join('');
  var month = newDate.splice(1,2).join('');
   switch (month){
     case '01':
       month = "January";
       break;
     case '02':
       month = "February";
       break;
     case '03':
       month = "March";
       break;
     case '04':
       month = "April";
       break;
     case '05':
       month = "May";
       break;
     case '06':
       month = "June";
       break;
     case '07':
       month = "July";
       break;
     case '08':
       month = "August";
       break;
     case '09':
       month = "September";
       break;
     case '10':
       month = "October";
       break;
     case '11':
       month = "November";
       break;
     case '12':
       month = "December";
       break;
   }
  var day = newDate.splice(2,2).join('');
  return month + " " + day + ", "+ year;
};

///////// RENDER APPOINTMENTS TO DOM ////////
function renderAppointments(user){
  var appointments = user.appointments;
  var $display = $('#display-appointments');
  $display.empty();
  var $container = ( $('<div>').addClass('appointments-container') );
  $container.append($('<h3>').text('Appointments'));
  $container.append( $('<a href="#" id="open-add-appt-modal">').text("+Add an Appointment") );
  $display.append($container);
  if (appointments.length === 0){
    $container.append($('<p>').text("You have no upcoming appointments."));
  }
  appointments.forEach(function(appt){
    var $apptDiv = $('<div id="' + appt._id + '">').addClass('panel panel-default');
    var newDate = convertTimeToWords(appt.date);
    var $divHeading = $('<div>').addClass('panel-heading');
    var $divBody = $('<div>').addClass('panel-body');
    $apptDiv.append($divHeading);
    $apptDiv.append($divBody);
    $divHeading.append( $('<h2>').addClass('panel-title').text(appt.name));
    $divHeading.append( $('<h5>').addClass('date-and-time').text(newDate + ' @ ' + appt.time));
    $divBody.append( $('<h5>').text("Location: " + appt.location));
    $divBody.append( $('<h5>').text("Doctor: " + appt.doctor));
    $divBody.append( $('<h5>').text("Notes: " + appt.notes));
    $divBody.append( $('<h5>').text("Copay: $" + appt.coPay));
    $divBody.append( $('<button class="update-your-appt" data-id="' + appt._id + '">').addClass('btn btn-primary').text('Update'));
    $divBody.append( $('<button data-id="' + appt._id + '">').addClass('remove-appt btn btn-primary').text('Remove'));
    $container.append($apptDiv);

    var $updateApptForm = $('<form method="patch">').addClass('update-appt');
    var $updateFieldSet = $('<fieldset>').addClass('form-group');
    $updateFieldSet.append($('<h5>').addClass('updates').text('Update Appointment'));
    $updateFieldSet.append($('<label form="updateApptName">').text('Name:'));
    $updateFieldSet.append($('<input type="text" name="updateApptName" value="' + appt.name + '" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptDate">').text('Date:'));
    $updateFieldSet.append($('<input type="date" name="updateApptDate" value="'+convertTimeToValue(appt.date)+'" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptTime">').text('Time:'));
    $updateFieldSet.append($('<input type="text" name="updateApptTime" value="' + appt.time + '" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptLocation">').text('Location:'));
    $updateFieldSet.append($('<input type="text" name="updateApptLocation" value="' + appt.location + '" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptDoctor">').text('Doctor:'));
    $updateFieldSet.append($('<input type="text" name="updateApptDoctor" value="' + appt.doctor + '" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptNotes">').text('Notes:'));
    $updateFieldSet.append($('<input type="text" name="updateApptNotes" value="' + appt.notes + '" required>').addClass('form-control'));
    $updateFieldSet.append($('<label form="updateApptCoPay">').text('Copay:'));
    $updateFieldSet.append($('<input type="number" name="updateApptCoPay" value="' + appt.coPay + '" min=0 required>').addClass('form-control'));
    $updateFieldSet.append( $('<button data-id="' + appt._id + '">' ).addClass('btn btn-primary btn btn-primary').text("Submit") );
    $updateApptForm.append($updateFieldSet);


    $apptDiv.append($updateApptForm);

    var $updateYourAppt = $('.update-your-appt');
    $updateYourAppt.on('click', function(e){
      e.preventDefault();
      console.log('hey');
      $updateApptForm.slideToggle('slow');
    });
  });
}

//////// GETS ALL OF THE APPOINTMENTS ////////
function getUserAppts(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(data){
      renderAppointments(data);
    }
  });
}

function addAppts(apptData, callback){
  $.ajax({
    method: 'post',
    url: '/users/appointments',
    data: {user: apptData},
    success: function(){
      getUserAppts();
    }
  });
}

function addAppointmentsHandler(){
  $('#appointments').on('submit', function(e){
    e.preventDefault();
    var apptNameField = $('input[name="apptName"]');
    var apptName = apptNameField.val();
    var apptDateField = $('input[name="apptDate"]');
    var apptDate = apptDateField.val();
    var apptTimeField = $('input[name="apptTime"]');
    var apptTime = apptTimeField.val();
    var apptLocationField = $('input[name="apptLocation"]');
    var apptLocation = apptLocationField.val();
    var apptDoctorField = $('input[name="apptDoctor"]');
    var apptDoctor = apptDoctorField.val();
    var apptPhoneNumField = $('input[name="apptPhoneNum"]');
    var apptPhoneNum = apptPhoneNumField.val();
    var apptCoPayField = $('input[name="apptCoPay"]');
    var apptCoPay = apptCoPayField.val();
    var apptNotesField = $('input[name="apptNotes"]');
    var apptNotes = apptNotesField.val();
    var appointment = {date: apptDate, time: apptTime, location: apptLocation, doctor: apptDoctor, phoneNum: apptPhoneNum, coPay: apptCoPay, notes: apptNotes, name: apptName};
    JSON.stringify(appointment);
    addAppts(appointment);
    // $('#appointments').children('input').val('');
    $('.new-appointments-modal').toggle();
  });
}

function deleteApptsHandler(){
  $('#display-appointments').on('click', '.remove-appt', function(e){
      e.preventDefault();
      var apptId = $(this).data('id');
      $.ajax({
        method: 'delete',
        url: '/users/appointments/' + apptId,
        success: function(data){
          getUserAppts();
        }
      });
  });
}

//////// UPDATES APPOINTMENTS ////////
function updateApptsHandler(){
  $('#display-appointments').on('submit', '.update-appt', function(e){
      e.preventDefault();
      var apptId = $(this).find('button').data('id');
      console.log(apptId);
      var updateApptNameField = $(this).find('input[name="updateApptName"]');
      var updateApptName = updateApptNameField.val();
      var updateApptDateField = $(this).find('input[name="updateApptDate"]');
      var updateApptDate = updateApptDateField.val();
      var updateApptTimeField = $(this).find('input[name="updateApptTime"]');
      var updateApptTime = updateApptTimeField.val();
      var updateApptLocationField = $(this).find('input[name="updateApptLocation"]');
      var updateApptLocation = updateApptLocationField.val();
      var updateApptDoctorField = $(this).find('input[name="updateApptDoctor"]');
      var updateApptDoctor = updateApptDoctorField.val();
      var updateApptCoPayField = $(this).find('input[name="updateApptCoPay"]');
      var updateApptCoPay = updateApptCoPayField.val();
      var updateApptNotesField = $(this).find('input[name="updateApptNotes"]');
      var updateApptNotes = updateApptNotesField.val();
      var userData = {date: updateApptDate, time: updateApptTime, location: updateApptLocation, doctor: updateApptDoctor, coPay: updateApptCoPay, notes: updateApptNotes, name: updateApptName};
      console.log(userData);
      $.ajax({
        method: 'patch',
        data: {user: userData},
        url: '/users/appointments/'+ apptId,
        success: function(data){
          getUserAppts();
        }
      });
  });



}

  function modalizeNewAppts(){
    $('#display-appointments').on('click', '#open-add-appt-modal', function(e){
      e.preventDefault();
      console.log("hello there");
      $('.new-appointments-modal').toggle();
    });

    $('#close-add-appt-modal').on('click', function(e){
      e.preventDefault();
      console.log("it's not broken")
      $('.new-appointments-modal').toggle();
    });

    $('input[name=apptAdd]').on('submit', function(e){
      e.preventDefault();
      $('.new-appointments-modal').hide();
    });
  }

$(function(){
  addAppointmentsHandler();
  deleteApptsHandler();
  modalizeNewAppts();
  updateApptsHandler();


  $('.calendar-icon').on('click', function(e){
    e.preventDefault();
    console.log('hello!');
    $('#display-appointments').toggle();
    $('#display-foods').hide();
    $('#display-medications').hide();
    $('#display-profile').hide();
  });

});
