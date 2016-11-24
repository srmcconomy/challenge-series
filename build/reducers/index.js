'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _enemyChecklist = require('./enemyChecklist');

var _enemyChecklist2 = _interopRequireDefault(_enemyChecklist);

var _keyCounter = require('./keyCounter');

var _keyCounter2 = _interopRequireDefault(_keyCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  enemyChecklist: _enemyChecklist2.default,
  keyCounter: _keyCounter2.default
});
//# sourceMappingURL=index.js.map
