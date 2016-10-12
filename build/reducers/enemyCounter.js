'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = enemyCounter;

var _immutable = require('immutable');

function enemyCounter(state = {
  playerEnemyCount: new _immutable.Map(),
  enemyList: new _immutable.Map()
}, action) {
  switch (action.type) {
    case 'set-player-enemy-count':
      return _extends({}, state, {
        playerEnemyCount: state.playerEnemyCount.setIn([action.player, action.enemy], action.count)
      });

    case 'create-new-player':
      return _extends({}, state, {
        playerEnemyCount: state.playerEnemyCount.set(action.name, state.enemyList.map(() => 0))
      });

    case 'create-new-enemy':
      return _extends({}, state, {
        enemyList: state.enemyList.set(action.name.replace(/\s+/g, '-').toLowerCase(), { name: action.name, values: new _immutable.List([0]) })
      });

    case 'set-enemy-values':
      return _extends({}, state, {
        enemyList: state.enemyList.setIn([action.enemy, 'values'], new _immutable.List(action.values))
      });

    default:
      return state;
  }
}
//# sourceMappingURL=enemyCounter.js.map
