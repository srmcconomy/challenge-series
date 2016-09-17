function sortFunc(leaders) {
  return function(a, b) {
    return leaders[b].score - leaders[a].score;
  }
}

function newElem(player) {
  return $('<div data-name="' + player.name + '" style="top:' + player.place * 44 + 'px" class="player"><span>' + player.name + '</span><span class="score">' + player.score + '</span></div>')
}

$(function() {
  var socket = io('/skull-counter');
  socket.emit('leaderboard');
  var list = $('body').data('leaders')
  var leaders = {};
  for (var p in list) {
    leaders[list[p].name] = { score: list[p].score, place: +p }
  }

  socket.on('update', player => {
    if (!leaders.hasOwnProperty(player.name)) {
      var length = Object.keys(leaders).length;
      player.place = length;
      leaders[player.name] = player;
      $('.list').append(newElem(player))
      $('.positions').append($('<div>' + (length + 1) + '</div>'))
    } else {
      leaders[player.name].score = player.score;
    }
    var list = Object.keys(leaders).sort(sortFunc(leaders));
    for (var p in list) {
      leaders[list[p]].place = +p;
      var $player = $("[data-name='" + list[p] + "']");
      $player.css('top', leaders[list[p]].place * 44 + 'px')
      $player.find('.score').html(leaders[list[p]].score)
    }
  })

});
