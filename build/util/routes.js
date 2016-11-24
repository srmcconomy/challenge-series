'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store) {
  function onPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().enemyChecklist.playerList.has(name)) {
      store.dispatch((0, _createNewPlayer2.default)(name));
    }
  }

  return _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default, path: '/' },
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _EnemyChecklist2.default, path: 'key-counter' },
      _react2.default.createElement(_reactRouter.IndexRoute, {
        components: {
          header: () => _react2.default.createElement('div', null),
          body: _EnemyCounterIndex2.default
        }
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'user/:name',
        components: {
          header: _EnemyChecklistHeader2.default,
          body: _KeyCounter2.default
        },
        onEnter: onPlayerEnter
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'leaderboard',
        components: {
          header: null,
          body: _EnemyChecklistLeaderboard2.default
        }
      })
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _EnemyChecklist2.default, path: 'enemy-counter' },
      _react2.default.createElement(_reactRouter.IndexRoute, {
        components: {
          header: () => _react2.default.createElement('div', null),
          body: _EnemyCounterIndex2.default
        }
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'user/:name',
        components: {
          header: _EnemyChecklistHeader2.default,
          body: _EnemyChecklistList2.default
        },
        onEnter: onPlayerEnter
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'leaderboard',
        components: {
          header: null,
          body: _EnemyChecklistLeaderboard2.default
        }
      })
    )
  );
};

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _createNewPlayer = require('../actions/createNewPlayer');

var _createNewPlayer2 = _interopRequireDefault(_createNewPlayer);

var _EnemyChecklistHeader = require('../components/EnemyChecklistHeader');

var _EnemyChecklistHeader2 = _interopRequireDefault(_EnemyChecklistHeader);

var _EnemyChecklist = require('../components/EnemyChecklist');

var _EnemyChecklist2 = _interopRequireDefault(_EnemyChecklist);

var _EnemyChecklistList = require('../components/EnemyChecklistList');

var _EnemyChecklistList2 = _interopRequireDefault(_EnemyChecklistList);

var _EnemyCounterIndex = require('../components/EnemyCounterIndex');

var _EnemyCounterIndex2 = _interopRequireDefault(_EnemyCounterIndex);

var _EnemyChecklistLeaderboard = require('../components/EnemyChecklistLeaderboard');

var _EnemyChecklistLeaderboard2 = _interopRequireDefault(_EnemyChecklistLeaderboard);

var _KeyCounter = require('../components/KeyCounter');

var _KeyCounter2 = _interopRequireDefault(_KeyCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
