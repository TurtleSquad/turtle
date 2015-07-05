$(document).ready(function(){
  $(".emjoi").on('click',function(){
    $("div").toggleClass('hidden');
  });
  //show on text box
  $('.face').on('click', function(){
    var image = $(this).attr('src');
    iconShow = $('#message-text').val(image);
  });
});
