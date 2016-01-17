////////// FOOD RESTRICTIONS

function addRestrictions(restriction, callback){
  $.ajax({
    method: 'post',
    url: '/users/foodRestrictions',
    data: {user: restriction},
    success: function(){
      console.log('added the restriction');
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
