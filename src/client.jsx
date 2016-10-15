// @flow

import { createStore, applyMiddleware } from 'redux';
import { Map, Set, List } from 'immutable';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import { connectStoreWithSocket, socketMiddleware } from './util/storeSockets';
import reducers from './reducers';
import routes from './util/routes';

const socket = io();

const playerList = new Map(Object.keys(
  window.PRELOADED_STATE.enemyChecklist.playerList
).map(name => [
  name,
  {
    score: window.PRELOADED_STATE.enemyChecklist.playerList[name].score,
    enemies: new Set(window.PRELOADED_STATE.enemyChecklist.playerList[name].enemies),
  },
]));

const preloadedState = {
  enemyChecklist: {
    playerList,
    enemyList: new Map(window.PRELOADED_STATE.enemyChecklist.enemyList),
    srlPlayers: new List(window.PRELOADED_STATE.enemyChecklist.srlPlayers),
  },
};

const store = createStore(reducers, preloadedState, applyMiddleware(socketMiddleware(socket)));
connectStoreWithSocket(store, socket);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes(store)} history={browserHistory} />
  </Provider>,
  document.getElementById('react-root')
);
