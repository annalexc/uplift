console.log("...loaded");

function login(usernameTry, passwordTry, callback){
  $.ajax({
    method: 'post',
    url: '/users/authenticate',
    data: {username: usernameTry, password: passwordTry},
    success: function(data){
      $.cookie('token', data.token);
      callback();
    }
  })
}

function setLogInFormHandler(){
  $('form#log-in').on('submit', function(e){
    e.preventDefault();
    var usernameField = $(this).find('input[name="username"]');
    var passwordField = $(this).find('input[name="password"]');
    var username = usernameField.val();
    var password = passwordField.val();
    login(username, password, function(){
      console.log('The token is: ', $.cookie('token') );
    });
  });
}

function logOut(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
  })
}

$(function(){
  setLogInFormHandler();
  logOut();

  // FUNCTIONING JQUERY GET of CDC NEWS STORIES
  $.getJSON('https://tools.cdc.gov/api/v2/resources/media?topic=ovarian%20cancer', function(data){
    console.log(data);
    var results = data.results;
    for (var i = 0; i < 3; i++) {
      var $el = $('<li>');
      var result = results[i];
      $el.append($('<a href='+result.sourceUrl+'>').text(result.name) );
      $('#dummy').append($el);
    }
  })

  // $.ajax({
  //   method: 'get',
  //   url: 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=asthma&knowledgeResponseType=application/javascript&callback=?',
  //   dataType: 'jsonp',
  //   success: function(data){
  //
  //   }
  // })

  // $.ajax({
  //   method: 'get',
  //   url: 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=asthma&knowledgeResponseType=application/javascript',
  //   dataType: 'xml',
  //   success: function(data){
  //     console.log(data);
  //   }
  // })

  // $.ajax({
  //   method: 'get',
  //   dataType: 'xml',
  //   url: 'https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=asthma&callback=?',
  //   success: function(xml){
  //     console.log(xml);
  //   }
  // })

});
