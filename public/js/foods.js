////////// FOOD RESTRICTIONS //////////

///////// RENDERS FOOD RESTRICTION TO DOM ////////
function renderUserFoods(user){
  var foods = user.foodRestrictions;
  var $display = $('#display-foods');
  $display.empty();
  foods.forEach(function(food){
    var $foodDiv = $('<div id="'+ food._id +'">');
    $foodDiv.append($('<h5>').text("Food: " + food.name));
    $foodDiv.append($('<h5>').text("Notes: " + food.notes));
    $foodDiv.append($('<button data-id="' + food._id + '">').addClass('remove-food').text('Remove Restriction'));
    $display.append($foodDiv);

    var $updateFood = $('<div id="food-update-form">');
    var $updateFoodForm = $('<form method="patch">').addClass('update-food');
    $updateFoodForm.append($('<h5>').addClass('updates').text('Update Food Restriction'));
    $updateFoodForm.append($('<label for="updateFoodName">').text('Restriction:'));
    $updateFoodForm.append($('<input type="text" name="updateFoodName" value="' + food.name + '">'));
    $updateFoodForm.append($('<label for="updateFoodNotes">').text('Notes:'));
    $updateFoodForm.append($('<input type="text" name="updateFoodNotes" value="' + food.notes + '">'));
    $updateFoodForm.append($('<button data-id="' + food._id + '">').text("Update Restriction"));
    $updateFood.append($updateFoodForm);

    $foodDiv.append($updateFood);
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
    $('#foodRestrictions').children('input').val('');
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
          $('#' + foodId).remove();
        }
      });
  });
}

//////// UPDATES FOOD RESTRICTION ////////
function updateFoodsHandler(){
  $('#display-foods').on('click', '.update-food', function(e){
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


$(function(){
    addFoodRestrictionsHandler();
    deleteFoodsHandler();
    updateFoodsHandler();
});
