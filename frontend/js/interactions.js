$(document).ready(function(){
  $(".emjoi").on('click',function(){
    $("div").toggleClass('hidden');
  });

  });
  $('#logOut').on('click', function(){
    localStorage.clear();
    window.location.href = "index.html";
  });
});
