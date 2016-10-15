'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _enemyChecklist = require('./enemyChecklist');

var _enemyChecklist2 = _interopRequireDefault(_enemyChecklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  enemyChecklist: _enemyChecklist2.default
});
//# sourceMappingURL=index.js.map
