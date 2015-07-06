$(function() {
  $("#room-heading").on("click", collapse);

  //Dom not ready code
  function collapse() {
    $("#room").toggle();
  }
});
