'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store, token, request) {
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

  function validate(nextState, replace) {
    const { code } = nextState.location.query;
    if (typeof document !== 'undefined') {
      document.cookie = `token=${code}`;
      token = code;
    } else {
      request.post(`https://api.twitch.tv/kraken/oauth2/token?client_id=rpj60fikezo717h9d7lka7zq7r1w97&client_secret=j4jbu16f73hkksncxfspvzx6q770dz&grant_type=authorization_code&redirect_uri=http://challenge-series.prettybigjoe.me/redirect&code=${code}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          request.get({
            url: 'https://api.twitch.tv/kraken/user',
            headers: {
              'Client-ID': 'rpj60fikezo717h9d7lka7zq7r1w97',
              Authorization: `OAuth ${data.access_token}`
            }
          }, (error2, response2, body2) => {
            const data2 = JSON.parse(body2);
            store.dispatch((0, _setUser2.default)(data2.name, data2.logo, data.access_token, code));
          });
        }
      });
    }
  }

  function redirectNonUser(nextState, replace) {
    console.log(store.getState().players.toJS());
    console.log(token);
    if (!token || !store.getState().players.has(token)) {
      replace({
        pathname: '/auth'
      });
    }
  }

  return _react2.default.createElement(
    _reactRouter.Route,
    { component: _App2.default, path: '/' },
    _react2.default.createElement(_reactRouter.Route, { component: _TwitchAuthenticate2.default, path: 'auth' }),
    _react2.default.createElement(_reactRouter.Route, { path: 'redirect', onEnter: validate, component: () => _react2.default.createElement(_Validate2.default, { token: token }) }),
    _react2.default.createElement(
      _reactRouter.Route,
      { component: _ChildChecklist2.default, path: 'childrace', onEnter: redirectNonUser },
      _react2.default.createElement(_reactRouter.IndexRoute, {
        onEnter: () => {
          if (!store.getState().childChecklist.playerList.has(token)) {
            store.dispatch((0, _createNewChildPlayer2.default)(token));
          }
        },
        components: {
          header: () => _react2.default.createElement(_ChildChecklistHeader2.default, { token: token }),
          body: () => _react2.default.createElement(_ChildChecklistList2.default, { token: token })
        }
      }),
      _react2.default.createElement(_reactRouter.Route, { path: 'popout', components: { body: () => _react2.default.createElement(_ChildPopout2.default, { token: token }) } })
    ),
    _react2.default.createElement(_reactRouter.Route, {
      path: 'leaderboard',
      components: {
        header: null,
        body: _ChildChecklistFinalsLeaderboard2.default
      }
    }),
    _react2.default.createElement(_reactRouter.Route, {
      path: 'fullleaderboard',
      components: {
        header: null,
        body: _ChildChecklistLeaderboard2.default
      }
    }),
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

var _TwitchAuthenticate = require('../components/TwitchAuthenticate');

var _TwitchAuthenticate2 = _interopRequireDefault(_TwitchAuthenticate);

var _Bingo = require('../components/Bingo');

var _Bingo2 = _interopRequireDefault(_Bingo);

var _setToken = require('../actions/setToken');

var _setToken2 = _interopRequireDefault(_setToken);

var _setCode = require('../actions/setCode');

var _setCode2 = _interopRequireDefault(_setCode);

var _setUser = require('../actions/setUser');

var _setUser2 = _interopRequireDefault(_setUser);

var _ChildChecklist = require('../components/ChildChecklist');

var _ChildChecklist2 = _interopRequireDefault(_ChildChecklist);

var _ChildChecklistHeader = require('../components/ChildChecklistHeader');

var _ChildChecklistHeader2 = _interopRequireDefault(_ChildChecklistHeader);

var _ChildChecklistList = require('../components/ChildChecklistList');

var _ChildChecklistList2 = _interopRequireDefault(_ChildChecklistList);

var _Validate = require('../components/Validate');

var _Validate2 = _interopRequireDefault(_Validate);

var _createNewChildPlayer = require('../actions/createNewChildPlayer');

var _createNewChildPlayer2 = _interopRequireDefault(_createNewChildPlayer);

var _ChildPopout = require('../components/ChildPopout');

var _ChildPopout2 = _interopRequireDefault(_ChildPopout);

var _ChildChecklistLeaderboard = require('../components/ChildChecklistLeaderboard');

var _ChildChecklistLeaderboard2 = _interopRequireDefault(_ChildChecklistLeaderboard);

var _ChildChecklistFinalsLeaderboard = require('../components/ChildChecklistFinalsLeaderboard');

var _ChildChecklistFinalsLeaderboard2 = _interopRequireDefault(_ChildChecklistFinalsLeaderboard);

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
