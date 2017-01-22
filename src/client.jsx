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

const keyCounter = new Map(window.PRELOADED_STATE.keyCounter);

const playerList = new Map(Object.keys(
  window.PRELOADED_STATE.enemyChecklist.playerList
).map(name => [
  name,
  {
    score: window.PRELOADED_STATE.enemyChecklist.playerList[name].score,
    enemies: new Set(window.PRELOADED_STATE.enemyChecklist.playerList[name].enemies),
  },
]));

const itemPlayers = new Map(Object.keys(
  window.PRELOADED_STATE.itemChecklist.playerList
).map(name => [
  name,
  {
    score: window.PRELOADED_STATE.itemChecklist.playerList[name].score,
    hearts: window.PRELOADED_STATE.itemChecklist.playerList[name].hearts,
    rupees: window.PRELOADED_STATE.itemChecklist.playerList[name].rupees,
    items: new Set(window.PRELOADED_STATE.itemChecklist.playerList[name].items),
  }
]));

const preloadedState = {
  keyCounter,
  enemyChecklist: {
    playerList,
    enemyList: new Map(window.PRELOADED_STATE.enemyChecklist.enemyList),
    srlPlayers: new List(window.PRELOADED_STATE.enemyChecklist.srlPlayers),
  },
  itemChecklist: {
    playerList: itemPlayers,
    srlPlayers: new List(window.PRELOADED_STATE.itemChecklist.srlPlayers),
  }
};

const store = createStore(reducers, preloadedState, applyMiddleware(socketMiddleware(socket)));
connectStoreWithSocket(store, socket);

console.log('%c asdf', 'padding: 170px; font-size: 1px; line-height: 340px; background-image: url("http://i3.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large"); background-size: 340px 340px;');

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes(store)} history={browserHistory} />
  </Provider>,
  document.getElementById('react-root')
);
