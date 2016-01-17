////////// FOOD RESTRICTIONS
function renderUserFoods(user){
  var foods = user.foodRestrictions;
  var $display = $('#display-foods');
  $display.empty();
  foods.forEach(function(food){
    console.log(food);
    var $foodDiv = $('<div id="'+ food._id +'">');
    $foodDiv.append( $('<h4>').text(food.name));
    $foodDiv.append( $('<p>').text(food.notes) )
    $foodDiv.append( $('<button data-id="'+food._id+'">').addClass('remove-food').text( 'Remove Restriction') );
    $display.append($foodDiv);
  })
}


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



function addFoodRestrictionsHandler(){
  $('#foodRestrictions').on('submit', function(e){
    e.preventDefault();
    var foodRestrictionsNameField = $('input[name="foodRestrictionsName"]');
    var foodRestrictionsName = foodRestrictionsNameField.val();
    var foodRestrictionsNotesField = $('input[name="foodRestrictionsNotes"]');
    var foodRestrictionsNotes = foodRestrictionsNotesField.val();
    console.log(foodRestrictionsName + " and " + foodRestrictionsNotes);
    var restriction = {name: foodRestrictionsName, notes: foodRestrictionsNotes};
    addRestrictions(restriction, function(){
      console.log("...adding restrictions");
    })
  });
};

$(function(){
    addFoodRestrictionsHandler();
})
