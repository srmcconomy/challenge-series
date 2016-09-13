$(function() {
  $('input').focus();
  $('input').on('keypress', function(e) {
    if (e.keyCode === 13) {
      window.location.href += '/' + $('input').val();

    }
  })
  $('button').on('click', function() {
    window.location.href += '/' + $('input').val();
  })
})
