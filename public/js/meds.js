//////////////// MEDICATIONS

///////// RENDERS MED LIST TO DOM
function renderUserMeds(user){
  var medications = user.medications;
  var $display = $('#display-medications');
  $display.empty();
  medications.forEach(function(med){
    var $medDiv = $('<div id="'+med._id+'">');
    var $editDiv = $('<div>');
    var $updateMedForm = $('<form method="patch" id="update-med-form">').addClass('update-med');
    $medDiv.append( $('<h4>').text(med.name) );
    $medDiv.append( $('<h6>').text(med.dosage) );
    $medDiv.append( $('<h6>').text(med.sideEffects) );
    $medDiv.append( $('<h6>').text(med.coPay) );
    $medDiv.append( $('<h6>').text(med.time) );
    $medDiv.append( $('<button data-id="'+med._id+'">').addClass('remove-med').text('Delete Med') );
    $display.append($medDiv);

    $updateMedForm.append($('<label for="updateMedName">').text('Medication: '));
    $updateMedForm.append($('<input type="text" name="updateMedName" value="'+med.name+'">'));
    $updateMedForm.append($('<label for="updateMedDosage">').text('Dosage: '));
    $updateMedForm.append($('<input type="text" name="updateMedDosage" value="'+med.dosage+'">'));
    $updateMedForm.append($('<label for="updateMedSideEffects">').text('Side Effects: '));
    $updateMedForm.append($('<input type="text" name="updateMedSideEffects" value="'+med.sideEffects+'">'));
    $updateMedForm.append($('<label for="updateMedCoPay">').text('Copay: '));
    $updateMedForm.append($('<input type="text" name="updateMedCoPay" value="'+med.coPay+'">'));
    $updateMedForm.append($('<label for="updateMedTime">').text('Time: '));
    $updateMedForm.append($('<input type="text" name="updateMedTime" value="'+med.time+'">'));
    $updateMedForm.append( $('<button data-id="'+med._id+'">' ).text("Update Medication") );
    $editDiv.append($updateMedForm);


    $medDiv.append($editDiv);
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

//////// UPDATES MEDICATION ////////
function updateMedsHandler(){
  $('#display-medications').on('submit', '.update-med', function(e){
      e.preventDefault();
      var medId = $(this).find('button').data('id');
      console.log(medId);
      var updatenameField = $(this).find('input[name="updateMedName"]');
      var updatename = updatenameField.val();
      var updatedosageField = $(this).find('input[name="updateMedDosage"]');
      var updatedosage = updatedosageField.val();
      var updatesideEffectsField = $(this).find('input[name="updateMedSideEffects"]');
      var updatesideEffects = updatesideEffectsField.val();
      var updatecoPayField = $(this).find('input[name="updateMedCoPay"]');
      var updatecoPay = updatecoPayField.val();
      var updatetimeField = $(this).find('input[name="updateMedTime"]');
      var updatetime = updatetimeField.val();
      var userData = {name: updatename, dosage: updatedosage, sideEffects: updatesideEffects, coPay: updatecoPay, time: updatetime};
      $.ajax({
        method: 'patch',
        url: '/users/medications/'+ medId,
        data: {user: userData},
        success: function(data){
          console.log('updating meds');
          getUserMeds();
        }
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
    updateMedsHandler();
});
