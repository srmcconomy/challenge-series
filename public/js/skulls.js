$(function() {
  var socket = io('/skull-counter');
  var name = $('body').data('name')
  socket.emit('join', name)

  socket.on('plus', function(area) {
    var $container = $("[data-area='" + area + "']")
    var $num = $container.find('.num')
    $num.html(+$num.html() + 1);
    $('#counter').html(+$('#counter').html() + 1)
  })

  socket.on('minus', function(area) {
    var $container = $("[data-area='" + area + "']")
    var $num = $container.find('.num')
    $num.html(+$num.html() - 1);
    $('#counter').html(+$('#counter').html() - 1)
  })

  $('.plus').click(function() {
    var $container = $(this).parents('.skull-container')
    var den = $container.data('den');
    var $num = $container.find('.num')
    var num = +$num.html();
    if (num === den) return;
    var area = $container.data('area');
    socket.emit('plus', area);
    $num.html(num + 1)
    $('#counter').html(+$('#counter').html() + 1)
  })

  $('.minus').click(function() {
    var $container = $(this).parents('.skull-container')
    var den = $container.data('den');
    var $num = $container.find('.num')
    var num = +$num.html();
    if (num === 0) return;
    var area = $container.data('area');
    socket.emit('minus', area);
    $num.html(num - 1)
    $('#counter').html(+$('#counter').html() - 1)
  })

})
