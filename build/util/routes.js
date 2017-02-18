'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (
// import createNewPlayer from '../actions/createNewPlayer';
// import createNewKeyPlayer from '../actions/createNewKeyPlayer';
// import createNewItemPlayer from '../actions/createNewItemPlayer';
// import ItemChecklistHeader from '../components/ItemChecklistHeader';
// import ItemChecklist from '../components/ItemChecklist';
// import ItemChecklistList from '../components/ItemChecklistList';
// import ItemChecklistIndex from '../components/ItemChecklistIndex';
// import ItemChecklistLeaderboard from '../components/ItemChecklistLeaderboard';
// import EnemyChecklistHeader from '../components/EnemyChecklistHeader';
// import EnemyCounter from '../components/EnemyChecklist';
// import EnemyCounterChecklist from '../components/EnemyChecklistList';
// import EnemyCounterIndex from '../components/EnemyCounterIndex';
// import EnemyChecklistLeaderboard from '../components/EnemyChecklistLeaderboard';
// import KeyCounter from '../components/KeyCounter';
// import KeyCounterIndex from '../components/KeyCounterIndex';
// import KeyCounterContainer from '../components/KeyCounterContainer';
// import KeyCounterHeader from '../components/KeyCounterHeader';
store, token, request) {
  // function onPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().enemyChecklist.playerList.has(name)) {
  //     store.dispatch(createNewPlayer(name));
  //   }
  // }
  //
  // function onKeyPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().keyCounter.has(name)) {
  //     store.dispatch(createNewKeyPlayer(name));
  //   }
  // }
  //
  // function onItemPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().itemChecklist.playerList.has(name)) {
  //     store.dispatch(createNewItemPlayer(name));
  //   }
  // }

  function validate(nextState, replace) {
    const { code } = nextState.location.query;
    if (typeof document !== 'undefined') {
      document.cookie = `token=${ code }`;
      token = code;
    } else {
      request.post(`https://api.twitch.tv/kraken/oauth2/token?client_id=rpj60fikezo717h9d7lka7zq7r1w97&client_secret=j4jbu16f73hkksncxfspvzx6q770dz&grant_type=authorization_code&redirect_uri=http://localhost:3000/redirect&code=${ code }`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          request.get({
            url: 'https://api.twitch.tv/kraken/user',
            headers: {
              'Client-ID': 'rpj60fikezo717h9d7lka7zq7r1w97',
              Authorization: `OAuth ${ data.access_token }`
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
    })
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
