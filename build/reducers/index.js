'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _enemyCounter = require('./enemyCounter');

var _enemyCounter2 = _interopRequireDefault(_enemyCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  enemyCounter: _enemyCounter2.default
});
//# sourceMappingURL=index.js.map
