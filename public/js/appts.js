////////////// APPOINTMENTS

function addApps(appData, callback){
  console.log()
  $.ajax({
    method: 'post',
    url: '/users/appointments',
    data: {user: appData},
    success: function(){
      console.log('added the appointment?');
      callback();
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
  addAppointmentsHandler();
})
