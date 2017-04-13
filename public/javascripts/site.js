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

  if ($('#editor').length) {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'bullet' }],

      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }]
    ];

    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    });
  }
  $('#articleForm').submit(function () {
    var htmlContent = $('#editor').find('.ql-editor').html()
    console.log("Editor content: " + htmlContent);
    $('input[name="htmlContent"]').val(htmlContent);
  })
});
