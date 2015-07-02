$(document).ready(function(){
  $(".emjoi").on('click',function(){
    $("div").toggleClass('hidden');
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

  setInterval(function() {
    $.ajax({
      type: 'GET',
      url: 'https://warm-escarpment-7619.herokuapp.com/api/threads',
      success: function(data) {
        $.each(data.threads, function(i, thread) {
          $.each(thread.messages,function(i,message){
            // $('body').append('<div class="hiddenMessage">' + ' '+ thread.roomID +' '+ message.username + ' ' + message.message +'</div>');
          console.log(thread.roomID +' '+ message.username + ' ' + message.message );
          });
        });
      }
    });
}, 1000 * 60 * .2); // every 12 seconds

});
