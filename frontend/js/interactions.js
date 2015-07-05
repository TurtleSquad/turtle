$(document).ready(function(){
  $(".emjoi").on('click',function(){
    $("#emjoi-container").toggleClass('hidden');
  });

  //show on text box
  $('.face').on('click', function(){
    var image = $(this).attr('src');
    iconShow = $('#message-text').val(image);
  });

  $('#logOut').on('click', function(){
    localStorage.clear();
    window.location.href = "index.html";
  });
});
