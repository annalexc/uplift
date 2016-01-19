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
  appointments.forEach(function(appt){
    var $apptDiv = $('<div id="' + appt._id + '">');
    var $updateAppt = $('<div id="appt-update-form">');
    var $updateApptForm = $('<form method="patch">').addClass('update-appt');
    var newDate = convertTimeToWords(appt.date);
    $apptDiv.append( $('<h5>').text("Date: " + newDate));
    $apptDiv.append( $('<h5>').text("Time: " + appt.time));
    $apptDiv.append( $('<h5>').text("Location: " + appt.location));
    $apptDiv.append( $('<h5>').text("Doctor: " + appt.doctor));
    $apptDiv.append( $('<h5>').text("Notes: " + appt.notes));
    $apptDiv.append( $('<h5>').text("Copay: $" + appt.coPay));
    $apptDiv.append( $('<button data-id="' + appt._id + '">').addClass('remove-appt').text('Delete Appointment'));
    $display.append($apptDiv);

    $updateApptForm.append($('<h5>').addClass('updates').text('Update Appointment'));
    $updateApptForm.append($('<label form="updateApptDate">').text('Date:'));
    $updateApptForm.append($('<input type="date" name="updateApptDate" value="'+convertTimeToValue(appt.date)+'">'));
    $updateApptForm.append($('<label form="updateApptTime">').text('Time:'));
    $updateApptForm.append($('<input type="text" name="updateApptTime" value="' + appt.time + '">'));
    $updateApptForm.append($('<label form="updateApptLocation">').text('Location:'));
    $updateApptForm.append($('<input type="text" name="updateApptLocation" value="' + appt.location + '">'));
    $updateApptForm.append($('<label form="updateApptDoctor">').text('Doctor:'));
    $updateApptForm.append($('<input type="text" name="updateApptDoctor" value="' + appt.doctor + '">'));
    $updateApptForm.append($('<label form="updateApptNotes">').text('Notes:'));
    $updateApptForm.append($('<input type="text" name="updateApptNotes" value="' + appt.notes + '">'));
    $updateApptForm.append($('<label form="updateApptCoPay">').text('Copay:'));
    $updateApptForm.append($('<input type="number" name="updateApptCoPay" value="' + appt.coPay + '">'));
    $updateApptForm.append( $('<button data-id="' + appt._id + '">' ).text("Update Appointment") );
    $updateAppt.append($updateApptForm);

    $apptDiv.append($updateAppt);
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
    var appointment = {date: apptDate, time: apptTime, location: apptLocation, doctor: apptDoctor, phoneNum: apptPhoneNum, coPay: apptCoPay, notes: apptNotes};
    JSON.stringify(appointment);
    addAppts(appointment);
    $('#appointments').children('input').val('');
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
          $('#'+apptId).remove();
        }
      });
  });
}

//////// UPDATES APPOINTMENTS ////////
function updateFoodsHandler(){
  $('#display-appointments').on('submit', '.update-appt', function(e){
      e.preventDefault();
      var apptId = $(this).find('button').data('id');
      console.log(apptId);
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
      var userData = {date: updateApptDate, time: updateApptTime, location: updateApptLocation, doctor: updateApptDoctor, coPay: updateApptCoPay, notes: updateApptNotes};
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

$(function(){
  addAppointmentsHandler();
  deleteApptsHandler();
});
