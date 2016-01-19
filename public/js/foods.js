////////// FOOD RESTRICTIONS //////////


///////// RENDERS FOOD RESTRICTION TO DOM ////////
function renderUserFoods(user){
  var foods = user.foodRestrictions;
  var $display = $('#display-foods');
  $display.empty();
  foods.forEach(function(food){
    var $foodDiv = $('<div id="'+ food._id +'">');
    var $updateFood = $('<div>');
    var $updateFoodForm = $('<form method="patch">').addClass('update-food');
    $foodDiv.append( $('<h5>').text("Food: " + food.name));
    $foodDiv.append( $('<h5>').text("Notes: " + food.notes));
    $foodDiv.append( $('<button data-id="'+food._id+'">').addClass('remove-food').text( 'Remove Restriction') );
    $display.append($foodDiv);

    $updateFoodForm.append($('<label for="editFoodName">').text('Restriction: '));
    $updateFoodForm.append($('<input type="text" name="editFoodName" value="'+food.name+'">'));
    $updateFoodForm.append($('<br>'));
    $updateFoodForm.append($('<label for="editFoodNotes">').text('Notes: '));
    $updateFoodForm.append($('<input type="text" name="editFoodNotes" value="'+food.notes+'">'));
    $updateFoodForm.append($('<br>'));
    $updateFoodForm.append( $('<button data-id="'+food._id+'">').text( 'Update Restriction') );
    $updateFoodForm.append($('<br>'));
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
      console.log(data);
      renderUserFoods(data);
    }
  })
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
  })
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
    addRestrictions(restriction, function(){
      console.log("...adding restrictions");
    })
  });
};

//////// UPDATES FOOD RESTRICTION ////////
function updateFoodsHandler(){
  $('#display-foods').on('submit', '.update-food', function(e){
      e.preventDefault();
      console.log("hi");
      var foodId = $(this).find('button').data('id');
            console.log(foodId);
      var updateFoodNameField = $(this).find('input[name="editFoodName"]');
      var updateFoodName = updateFoodNameField.val();
      var updateFoodNotesField = $(this).find('input[name="editFoodNotes"]');
      var updateFoodNotes = updateFoodNotesField.val();
      var userData = {name: updateFoodName, notes: updateFoodNotes};
      console.log(userData);
      $.ajax({
        method: 'patch',
        data: {user: userData},
        url: '/users/foodRestrictions/'+ foodId,
        success: function(data){
          getUserFoods();
        }
      });
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
          $('#'+foodId).remove();
        }
      });
  })
}

$(function(){
    addFoodRestrictionsHandler();
    deleteFoodsHandler();
    updateFoodsHandler();
})
