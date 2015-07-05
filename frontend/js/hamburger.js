$(function() {
  //init
  $(".room-list").addClass("collapse");

  $("#room-heading").on("click", collapse);

  //Dom not ready code
  function collapse() {
    $(".room-list").toggle();
  }
});
