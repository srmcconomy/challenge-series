'use strict';

var _redux = require('redux');

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _storeSockets = require('./util/storeSockets');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _routes = require('./util/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const socket = (0, _socket2.default)();

const keyCounter = new _immutable.Map(window.PRELOADED_STATE.keyCounter);
const token = window.TOKEN;

const pl = new _immutable.Map(window.PRELOADED_STATE.players);

const playerList = new _immutable.Map(Object.keys(window.PRELOADED_STATE.enemyChecklist.playerList).map(name => [name, {
  score: window.PRELOADED_STATE.enemyChecklist.playerList[name].score,
  enemies: new _immutable.Set(window.PRELOADED_STATE.enemyChecklist.playerList[name].enemies)
}]));

const itemPlayers = new _immutable.Map(Object.keys(window.PRELOADED_STATE.itemChecklist.playerList).map(name => [name, {
  score: window.PRELOADED_STATE.itemChecklist.playerList[name].score,
  hearts: window.PRELOADED_STATE.itemChecklist.playerList[name].hearts,
  rupees: window.PRELOADED_STATE.itemChecklist.playerList[name].rupees,
  items: new _immutable.Set(window.PRELOADED_STATE.itemChecklist.playerList[name].items)
}]));

const childPlayers = new _immutable.Map(Object.keys(window.PRELOADED_STATE.childChecklist.playerList).map(name => [name, {
  score: window.PRELOADED_STATE.childChecklist.playerList[name].score,
  skulls: new _immutable.Map(window.PRELOADED_STATE.childChecklist.playerList[name].skulls),
  items: new _immutable.Set(window.PRELOADED_STATE.childChecklist.playerList[name].items)
}]));

const preloadedState = {
  keyCounter,
  enemyChecklist: {
    playerList,
    enemyList: new _immutable.Map(window.PRELOADED_STATE.enemyChecklist.enemyList),
    srlPlayers: new _immutable.List(window.PRELOADED_STATE.enemyChecklist.srlPlayers)
  },
  itemChecklist: {
    playerList: itemPlayers,
    srlPlayers: new _immutable.List(window.PRELOADED_STATE.itemChecklist.srlPlayers)
  },
  players: pl,
  childChecklist: {
    playerList: childPlayers,
    srlPlayers: new _immutable.List(window.PRELOADED_STATE.childChecklist.srlPlayers)
  }
};

const store = (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)((0, _storeSockets.socketMiddleware)(socket)));

(0, _storeSockets.connectStoreWithSocket)(store, socket);
console.log('%c asdf', 'padding: 170px; font-size: 1px; line-height: 340px; background-image: url("http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large"); background-size: 340px 340px;');

const cookie = /[^\s=]+=([^\s]+)/.exec(document.cookie);
_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_reactRouter.Router, { routes: (0, _routes2.default)(store, cookie ? cookie[1] : null, null), history: _reactRouter.browserHistory })
), document.getElementById('react-root'));
//# sourceMappingURL=client.js.map
