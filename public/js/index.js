$(function() {
  $('input').focus();
  $('input').on('keypress', function(e) {
    if (e.keyCode === 13) {
      window.location.href = window.location.href.replace(/\/?$/, '/' + $('input').val());
    }
  })
  $('button').on('click', function() {
    window.location.href = window.location.href.replace(/\/?$/, '/' + $('input').val());
  })
})
