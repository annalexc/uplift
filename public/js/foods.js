////////// FOOD RESTRICTIONS //////////

///////// RENDERS FOOD RESTRICTION TO DOM ////////
function renderUserFoods(user){
  var foods = user.foodRestrictions;
  var $display = $('#display-foods');
  $display.empty();
  var $container = ( $('<div>').addClass('foods-container') );
  $display.append($('<h3>').text('Dietary Restrictions'));
  $container.append($('<a href="#" id="open-add-food-modal">').text("+Add a Food Restriction") );
  $display.append($container);
  if (foods.length === 0){
    $display.append( $('<p>').text("You have no dietary restrictions") );
  }
  foods.forEach(function(food){
    var $foodDiv = $('<div id="'+ food._id +'">').addClass('panel panel-default');
    var $divHeading = $('<div>').addClass('panel-heading');
    var $divBody = $('<div>').addClass('panel-body');
    $foodDiv.append($divHeading);
    $foodDiv.append($divBody);
    $divHeading.append($('<h5>').addClass('panel-title').text(food.name));
    $divBody.append($('<h5>').text("Notes: " + food.notes));
    $divBody.append($('<button class="update-your-food" data-id="' + food._id + '">').addClass('btn btn-primary').text('Update'));
    $divBody.append($('<button data-id="' + food._id + '">').addClass('remove-food btn btn-primary').text('Remove'));
    $display.append($foodDiv);

    // var $updateFood = $('<div id="food-update-form">');
    var $updateFoodForm = $('<form method="patch">').addClass('update-food');
    var $updateFoodFieldSet = $('<fieldset>').addClass('form-group');
    $updateFoodFieldSet.append($('<h5>').addClass('updates').text('Update Dietary Restriction'));
    $updateFoodFieldSet.append($('<label for="updateFoodName">').text('Restriction:'));
    $updateFoodFieldSet.append($('<input type="text" name="updateFoodName" value="' + food.name + '" required>').addClass('form-control'));
    $updateFoodFieldSet.append($('<label for="updateFoodNotes">').text('Notes:'));
    $updateFoodFieldSet.append($('<input type="text" name="updateFoodNotes" value="' + food.notes + '" required>').addClass('form-control'));
    $updateFoodFieldSet.append($('<button data-id="' + food._id + '">').addClass('btn btn-primary').text("Submit"));
    $updateFoodForm.append($updateFoodFieldSet);

    $foodDiv.append($updateFoodForm);

    var $updateYourFood = $('.update-your-food');
    $updateYourFood.on('click', function(e){
      e.preventDefault();
      $updateFoodForm.slideDown("slow");
    });
  });
}

//////// GETS ALL OF THE USERS RESTRICTIONS ////////
function getUserFoods(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(data){
      renderUserFoods(data);
    }
  });
}

//////// CREATE NEW FOOD RESTRICTION ////////
function addRestrictions(restriction, callback){
  $.ajax({
    method: 'post',
    url: '/users/foodRestrictions',
    data: {user: restriction},
    success: function(){
      getUserFoods();
    }
  });
}


//////// FOOD RESTRICTION EVENT HANDLER ////////
function addFoodRestrictionsHandler(){
  $('#foodRestrictions').on('submit', function(e){
    e.preventDefault();
    var foodRestrictionsNameField = $('input[name="foodRestrictionsName"]');
    var foodRestrictionsName = foodRestrictionsNameField.val();
    var foodRestrictionsNotesField = $('input[name="foodRestrictionsNotes"]');
    var foodRestrictionsNotes = foodRestrictionsNotesField.val();
    var restriction = {name: foodRestrictionsName, notes: foodRestrictionsNotes};
    addRestrictions(restriction);
    // $('#foodRestrictions').children('input').val('');
    $('.new-food-modal').toggle();
  });
}

//////// DELETES FOOD RESTRICTION ////////
function deleteFoodsHandler(){
  $('#display-foods').on('click', '.remove-food', function(e){
      e.preventDefault();
      var foodId = $(this).data('id');
      $.ajax({
        method: 'delete',
        url: '/users/foodRestrictions/'+ foodId,
        success: function(data){
          getUserFoods();
        }
      });
  });
}

//////// UPDATES FOOD RESTRICTION ////////
function updateFoodsHandler(){
  $('#display-foods').on('submit', '.update-food', function(e){
      e.preventDefault();
      var foodId = $(this).find('button').data('id');
      console.log(foodId);
      var updateFoodNameField = $(this).find('input[name="updateFoodName"]');
      var updateFoodName = updateFoodNameField.val();
      var updateFoodNotesField = $(this).find('input[name="updateFoodNotes"]');
      var updateFoodNotes = updateFoodNotesField.val();
      var userData = {name: updateFoodName, notes: updateFoodNotes};
      $.ajax({
        method: 'patch',
        url: '/users/foodRestrictions/' + foodId,
        data: {user: userData},
        success: function(data){
          getUserFoods();
        }
      });
  });
}

function modalizeNewFoods(){
  $('#display-foods').on('click', '#open-add-food-modal', function(e){
    e.preventDefault();
    console.log("hello there");
    $('.new-food-modal').toggle();
  });

  $('#close-add-food-modal').on('click', function(e){
    e.preventDefault();
    console.log("it's not broken")
    $('.new-food-modal').toggle();
  });
}

$(function(){
    addFoodRestrictionsHandler();
    deleteFoodsHandler();
    updateFoodsHandler();
    modalizeNewFoods();

    $('.food-icon').on('click', function(e){
      e.preventDefault();
      console.log('hello!');
      $('#display-foods').toggle();
      $('#display-appointments').hide();
      $('#display-medications').hide();
      $('#display-profile').hide();
    })

});
