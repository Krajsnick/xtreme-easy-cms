$(document).ready(function() {

  $('#delete-button').click(function() {
    $('article').css('transform', 'scale(0.01)');
  });

  $('article').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
    console.log("Working");
    $(this).off()
      .html('<img src="https://www.colourbox.com/preview/8503702-deleted-stamp.jpg">')
      .css('transform', 'scale(1)');
  });

});
