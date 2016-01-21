//////////////// MEDICATIONS

///////// RENDERS MED LIST TO DOM
function renderUserMeds(user){
  var medications = user.medications;
  var $display = $('#display-medications');
  $display.empty();
  var $container = ( $('<div>').addClass('meds-container') );
  $display.append($('<h3>').text('Medications'));
  $container.append($('<a href="#" id="open-add-med-modal">').text("+Add a Medication") );
  $display.append($container);
  if (medications.length === 0){
    $display.append($('<p>').text("You have no medications."));
  }
    medications.forEach(function(med){
    var $medDiv = $('<div id="' + med._id + '">');
    var $updateMed = $('<div id="med-update-form">');
    var $updateMedForm = $('<form method="patch">').addClass('update-med');
    $medDiv.append($('<h5>').text('Medication: ' + med.name));
    $medDiv.append($('<h5>').text('Dosage: ' + med.dosage));
    $medDiv.append($('<h5>').text('Side Effects: ' + med.sideEffects));
    $medDiv.append($('<h5>').text('Copay: $' + med.coPay));
    $medDiv.append($('<h5>').text('Time: ' + med.time));
    $medDiv.append($('<button class="update-your-med" data-id="' + med._id + '">').text('Update'));
    $medDiv.append($('<button data-id="' + med._id + '">').addClass('remove-med').text('Remove'));
    $display.append($medDiv);

    $updateMedForm.append($('<h5>').addClass('updates').text('Update Medication'));
    $updateMedForm.append($('<label for="updateMedName">').text('Medication:'));
    $updateMedForm.append($('<input type="text" name="updateMedName" value="' + med.name + '" required>'));
    $updateMedForm.append($('<label for="updateMedDosage">').text('Dosage:'));
    $updateMedForm.append($('<input type="text" name="updateMedDosage" value="' + med.dosage + '" required>'));
    $updateMedForm.append($('<label for="updateMedSideEffects">').text('Side Effects:'));
    $updateMedForm.append($('<input type="text" name="updateMedSideEffects" value="' + med.sideEffects + '" required>'));
    $updateMedForm.append($('<label for="updateMedCoPay">').text('Copay:'));
    $updateMedForm.append($('<input type="number" name="updateMedCoPay" value="' + med.coPay + '" min=0 required>'));
    $updateMedForm.append($('<label for="updateMedTime">').text('Time:'));
    $updateMedForm.append($('<input type="text" name="updateMedTime" value="' + med.time + '" required>'));
    $updateMedForm.append($('<button id="submit-med-update" data-id="' + med._id + '">' ).text("Submit"));
    $updateMed.append($updateMedForm);

    $medDiv.append($updateMed);

    var $updateYourMed = $('.update-your-med');
    $updateYourMed.on('click', function(e){
      e.preventDefault();
      $(this).next().next().children('form').slideDown("slow");
    });

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
      var medicine = {name: medName, dosage: dosage, sideEffects: sideEffects, time: time, coPay: coPay};
      addMeds(medicine);
      // $('#medication').children('input').val('');
      $('.new-med-modal').toggle();
    });
}

//////// UPDATES MEDICATION ////////
function updateMedsHandler(){
  $('#display-medications').on('submit', '.update-med', function(e){
    e.preventDefault();
    var medId = $(this).find('button').data('id');
    var updateNameField = $(this).find('input[name="updateMedName"]');
    var updateName = updateNameField.val();
    var updateDosageField = $(this).find('input[name="updateMedDosage"]');
    var updateDosage = updateDosageField.val();
    var updateSideEffectsField = $(this).find('input[name="updateMedSideEffects"]');
    var updateSideEffects = updateSideEffectsField.val();
    var updateCoPayField = $(this).find('input[name="updateMedCoPay"]');
    var updateCoPay = updateCoPayField.val();
    var updateTimeField = $(this).find('input[name="updateMedTime"]');
    var updateTime = updateTimeField.val();
    var userData = {name: updateName, dosage: updateDosage, sideEffects: updateSideEffects, coPay: updateCoPay, time: updateTime};
    $.ajax({
      method: 'patch',
      url: '/users/medications/'+ medId,
      data: {user: userData},
      success: function(data){
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
          getUserMeds();
        }
      });
  });
}

function modalizeNewMeds(){
  $('#display-medications').on('click', '#open-add-med-modal', function(e){
    e.preventDefault();
    console.log("hello there");
    $('.new-med-modal').toggle();
  });

  $('#close-add-med-modal').on('click', function(e){
    e.preventDefault();
    console.log("it's not broken")
    $('.new-med-modal').toggle();
  });
}

$(function(){
    deleteMedsHandler();
    medsHandler();
    updateMedsHandler();
    modalizeNewMeds();

    $('.button2').on('click', function(e){
      e.preventDefault();
      console.log('hello!');
      $('#display-medications').toggle();
      $('#display-appointments').hide();
      $('#display-foods').hide();
      $('#display-profile').hide();
    })
});
