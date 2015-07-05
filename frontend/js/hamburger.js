$(function() {
  //init
  $("#post-one").addClass("collapse");
  $("#post-two").toggleClass("collapse");
  $("#post-three").toggleClass("collapse");

  $("#post-one-heading").on("click", collapseOne);
  $("#post-two-heading").on("click", collapseTwo);
  $("#post-three-heading").on("click", collapseThree);

  //Dom not ready code
  function collapseOne() {
    $("#post-one").toggle();
  }

  function collapseTwo() {
    $("#post-two").toggle();
  }

  function collapseThree() {
    $("#post-three").toggle();
  }
});
