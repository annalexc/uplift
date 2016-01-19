////////////// APPOINTMENTS ///////////////

///////// RENDER APPOINTMENTS TO DOM ////////
function renderAppointments(user){
  var appointments = user.appointments;
  var $display = $('#display-appointments');
  $display.empty();
  appointments.forEach(function(app){
    var $appDiv = $('<div id="'+app._id+'">');
    $appDiv.append( $('<h5>').text("Date: " + app.date) );
    $appDiv.append( $('<h5>').text("Time: " + app.time) );
    $appDiv.append( $('<h5>').text("Location: " + app.location) );
    $appDiv.append( $('<h5>').text("Doctor: " + app.doctor) );
    $appDiv.append( $('<h5>').text("Notes: " + app.notes) );
    $appDiv.append( $('<h5>').text("Notes: " + app.coPay) );
    $appDiv.append( $('<button data-id="'+app._id+'">').addClass('remove-app').text('Delete Appointment') );
    $display.append($appDiv);
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

function addApps(appData, callback){
  $.ajax({
    method: 'post',
    url: '/users/appointments',
    data: {user: appData},
    success: function(){
      getUserAppts();
    }
  });
}

function addAppointmentsHandler(){
  $('#appointments').on('submit', function(e){
    e.preventDefault();
    var appDateField = $('input[name="appDate"]');
    var appDate = appDateField.val();
    var appTimeField = $('input[name="appTime"]');
    var appTime = appTimeField.val();
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
    var appointment = {date: appDate, time: appTime, location: appLocation, doctor: appDoctor, phoneNum: appPhoneNum, coPay: appCoPay, notes: appNotes};
    JSON.stringify(appointment);
    addApps(appointment, function(){
      console.log("...adding apps... hopefully");
    });
  });
}

function deleteApptsHandler(){
  $('#display-appointments').on('click', '.remove-app', function(e){
      e.preventDefault();
      var appId = $(this).data('id');
      $.ajax({
        method: 'delete',
        url: '/users/appointments/'+ appId,
        success: function(data){
          $('#'+appId).remove();
        }
      });
  });
}

// function updateApptsHandler(){
//   $.ajax({
//     method: 'patch',
//     url: '/users/appointments',
//     data: {user: appData},
//     success: function(data){
//
//     }
//   });
// }

$(function(){
  addAppointmentsHandler();
  deleteApptsHandler();
});
