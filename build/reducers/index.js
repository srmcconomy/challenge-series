'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _enemyChecklist = require('./enemyChecklist');

var _enemyChecklist2 = _interopRequireDefault(_enemyChecklist);

var _keyCounter = require('./keyCounter');

var _keyCounter2 = _interopRequireDefault(_keyCounter);

var _itemChecklist = require('./itemChecklist');

var _itemChecklist2 = _interopRequireDefault(_itemChecklist);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _childChecklist = require('./childChecklist');

var _childChecklist2 = _interopRequireDefault(_childChecklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  enemyChecklist: _enemyChecklist2.default,
  keyCounter: _keyCounter2.default,
  itemChecklist: _itemChecklist2.default,
  players: _players2.default,
  childChecklist: _childChecklist2.default
});
//# sourceMappingURL=index.js.map
