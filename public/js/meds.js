//////////////// MEDICATIONS

///////// RENDERS MED LIST TO DOM
function renderUserMeds(user){
  var medications = user.medications;
  var $display = $('#display-medications');
  $display.empty();
  medications.forEach(function(med){
    var $medDiv = $('<div id="'+med._id+'">');
    $medDiv.append( $('<h4>').text(med.name) );
    $medDiv.append( $('<button data-id="'+med._id+'">').addClass('remove-med').text('Delete Med') );
    $display.append($medDiv);
  });
}

//////// GET USER AND RENDER MEDS ////////
function getUserMeds(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(data){
      renderUserMeds(data);
    }
  });
}

//////// ADDS MEDS TO USER ////////
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

//////// MEDS EVENT LISTENER ////////
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
    });
  });
}

//////// DELETES MEDICATION ////////
function deleteMedsHandler(){
  $('#display-medications').on('click', '.remove-med', function(e){
      e.preventDefault();
      var medId = $(this).data('id');
      $.ajax({
        method: 'delete',
        url: '/users/medications/'+ medId,
        success: function(data){
          $('#'+medId).remove();
        }
      });
  });

}

$(function(){
    deleteMedsHandler();
    medsHandler();
});
