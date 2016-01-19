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
    $foodDiv.append( $('<h4>').text(food.name));
    $foodDiv.append( $('<p>').text(food.notes));
    $foodDiv.append( $('<button data-id="'+food._id+'">').addClass('remove-food').text( 'Remove Restriction') );
    $updateFood.append($('<label for="editFoodName">').text('Restriction: '));
    $updateFood.append($('<input type="text" name="editFoodName" value="'+food.name+'">'));
    $updateFood.append($('<br>'));
    $updateFood.append($('<label for="editFoodNotes">').text('Notes: '));
    $updateFood.append($('<input type="text" name="editFoodNotes" value="'+food.notes+'">'));
    $updateFood.append($('<br>'));
    $updateFood.append( $('<button data-id="'+food._id+'">').addClass('update-food').text( 'Update Restriction') );
    $updateFood.append($('<br>'));
    $display.append($foodDiv);
    $updateFood.appendTo($foodDiv);
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
  $('#display-foods').on('click', '.update-food', function(e){
      e.preventDefault();
      var foodId = $(this).data('id');
      var updateFoodNameField = $('input[name="editFoodName"]');
      var updateFoodName = updateFoodNameField.val();
      var updateFoodNotesField = $('input[name="editFoodNotes"]');
      var updateFoodNotes = updateFoodNotesField.val();
      var userData = {name: updateFoodName, notes: updateFoodNotes};
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
