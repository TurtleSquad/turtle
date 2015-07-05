$(document).ready(function(){
  $(".emjoi").on('click',function(){
    $("#emjoi-container").toggleClass('hidden');
  });

  $("#whoChat").on('click',function(){
    var people = window.prompt("Who do you want to chat with?");
    if(people == 'andre'){
      $('p').empty();
    }else{
      alert('Their is no one that name.');
    }
  });
  $('#logOut').on('click', function(){
    localStorage.clear();
    window.location.href = "index.html";
  });
});
