$(function() {
  var socket = io();
  var name = $('body').data('name')
  socket.emit('join', name)
  socket.on('check', check)

  socket.on('uncheck', uncheck);

  $(':checkbox').change(function() {
    if ($(this).is(':checked')) {
      $('#counter').html(+$('#counter').html() + 1)
      socket.emit('check', $(this).data('enemy'));
      $(this).parents('label').removeClass('unchecked')
    } else {
      $('#counter').html(+$('#counter').html() - 1)
      socket.emit('uncheck', $(this).data('enemy'));
      $(this).parents('label').addClass('unchecked')
    }
  })
});

function check(e) {
  var $e = $("[data-enemy='" + e + "'")
  if (!$e.is(':checked')) {
    $('#counter').html(+$('#counter').html() + 1)
  }
  $e.prop('checked', true);
  $e.parents('label').removeClass('unchecked');
}

function uncheck(e) {
  var $e = $("[data-enemy='" + e + "'")
  if (!$e.is(':checked')) {
    $('#counter').html(+$('#counter').html() + 1)
  }
  $e.prop('checked', true);
  $e.parents('label').addClass('unchecked');
}
