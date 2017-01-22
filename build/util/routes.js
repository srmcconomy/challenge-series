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

  function onKeyPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().keyCounter.has(name)) {
      store.dispatch((0, _createNewKeyPlayer2.default)(name));
    }
  }

  function onItemPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().itemChecklist.playerList.has(name)) {
      store.dispatch((0, _createNewItemPlayer2.default)(name));
    }
  }

  return _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default, path: '/' },
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _KeyCounterContainer2.default, path: 'key-counter' },
      _react2.default.createElement(_reactRouter.IndexRoute, {
        components: {
          header: () => _react2.default.createElement('div', null),
          body: _KeyCounterIndex2.default
        }
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'user/:name',
        components: {
          header: _KeyCounterHeader2.default,
          body: _KeyCounter2.default
        },
        onEnter: onKeyPlayerEnter
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'leaderboard',
        components: {
          header: null,
          body: _KeyCounterLeaderboard2.default
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
    ),
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _ItemChecklist2.default, path: 'item-counter' },
      _react2.default.createElement(_reactRouter.IndexRoute, {
        components: {
          header: () => _react2.default.createElement('div', null),
          body: _ItemChecklistIndex2.default
        }
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'user/:name',
        components: {
          header: _ItemChecklistHeader2.default,
          body: _ItemChecklistList2.default
        },
        onEnter: onItemPlayerEnter
      }),
      _react2.default.createElement(_reactRouter.Route, {
        path: 'leaderboard',
        components: {
          header: null,
          body: _ItemChecklistLeaderboard2.default
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

var _createNewKeyPlayer = require('../actions/createNewKeyPlayer');

var _createNewKeyPlayer2 = _interopRequireDefault(_createNewKeyPlayer);

var _createNewItemPlayer = require('../actions/createNewItemPlayer');

var _createNewItemPlayer2 = _interopRequireDefault(_createNewItemPlayer);

var _ItemChecklistHeader = require('../components/ItemChecklistHeader');

var _ItemChecklistHeader2 = _interopRequireDefault(_ItemChecklistHeader);

var _ItemChecklist = require('../components/ItemChecklist');

var _ItemChecklist2 = _interopRequireDefault(_ItemChecklist);

var _ItemChecklistList = require('../components/ItemChecklistList');

var _ItemChecklistList2 = _interopRequireDefault(_ItemChecklistList);

var _ItemChecklistIndex = require('../components/ItemChecklistIndex');

var _ItemChecklistIndex2 = _interopRequireDefault(_ItemChecklistIndex);

var _ItemChecklistLeaderboard = require('../components/ItemChecklistLeaderboard');

var _ItemChecklistLeaderboard2 = _interopRequireDefault(_ItemChecklistLeaderboard);

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

var _KeyCounterIndex = require('../components/KeyCounterIndex');

var _KeyCounterIndex2 = _interopRequireDefault(_KeyCounterIndex);

var _KeyCounterContainer = require('../components/KeyCounterContainer');

var _KeyCounterContainer2 = _interopRequireDefault(_KeyCounterContainer);

var _KeyCounterHeader = require('../components/KeyCounterHeader');

var _KeyCounterHeader2 = _interopRequireDefault(_KeyCounterHeader);

var _KeyCounterLeaderboard = require('../components/KeyCounterLeaderboard');

var _KeyCounterLeaderboard2 = _interopRequireDefault(_KeyCounterLeaderboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
