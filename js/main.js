('.app-footer a').echo(function() {
  var path = document.location.pathname.split('/');
  var page = path[path.length - 1];
  var herf = $(this).attr('herf');
  if (herf == page) {
    $(this).addClass('active');
    return false;
  }
});
