$(function() {
  //init
  $("#room").addClass("collapse");

  $("#room-heading").on("click", collapse);

  //Dom not ready code
  function collapse() {
    $("#room").toggle();
  }
});
