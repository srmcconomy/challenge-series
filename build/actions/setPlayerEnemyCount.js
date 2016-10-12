'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setPlayerEnemyCount;
function setPlayerEnemyCount(player, enemy, count) {
  return {
    type: 'set-player-enemy-count',
    player,
    enemy,
    count
  };
}
//# sourceMappingURL=setPlayerEnemyCount.js.map
