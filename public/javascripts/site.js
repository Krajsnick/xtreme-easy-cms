var myobject;
$(document).ready(function() {

  // All a tags with data-method delete should send ajax delete request
  $('a[data-method=delete]').click(function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var menuLink = $('aside a[href="' + href + '"]');
    $.ajax({
      url: href,
      type: 'DELETE',
      dataType: 'json',
      success: function(result) {
        $('h1.article-title')
        .append(' [DELETED]')
        .nextAll()
        .add(menuLink)
        .addClass('fade-away')
        .on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
          $(this).remove();
        });
      }
    });
  });

});
