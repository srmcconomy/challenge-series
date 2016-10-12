'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _EnemyCounter = require('../components/EnemyCounter');

var _EnemyCounter2 = _interopRequireDefault(_EnemyCounter);

var _EnemyCounterChecklist = require('../components/EnemyCounterChecklist');

var _EnemyCounterChecklist2 = _interopRequireDefault(_EnemyCounterChecklist);

var _EnemyCounterIndex = require('../components/EnemyCounterIndex');

var _EnemyCounterIndex2 = _interopRequireDefault(_EnemyCounterIndex);

var _EnemyCounterLeaderboard = require('../components/EnemyCounterLeaderboard');

var _EnemyCounterLeaderboard2 = _interopRequireDefault(_EnemyCounterLeaderboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default, path: '/' },
  _react2.default.createElement(
    _reactRouter.Route,
    { component: _EnemyCounter2.default, path: 'enemy-counter' },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _EnemyCounterIndex2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user/:name', component: _EnemyCounterChecklist2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'leaderboard', component: _EnemyCounterLeaderboard2.default })
  )
);
//# sourceMappingURL=routes.js.map
