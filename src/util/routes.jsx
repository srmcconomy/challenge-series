// @flow

import { Route, IndexRoute } from 'react-router';
import React from 'react';
import type { Store } from 'redux';

import App from '../components/App';
import createNewPlayer from '../actions/createNewPlayer';
import createNewKeyPlayer from '../actions/createNewKeyPlayer';
import createNewItemPlayer from '../actions/createNewItemPlayer';
import ItemChecklistHeader from '../components/ItemChecklistHeader';
import ItemChecklist from '../components/ItemChecklist';
import ItemChecklistList from '../components/ItemChecklistList';
import ItemChecklistIndex from '../components/ItemChecklistIndex';
import ItemChecklistLeaderboard from '../components/ItemChecklistLeaderboard';
import EnemyChecklistHeader from '../components/EnemyChecklistHeader';
import EnemyCounter from '../components/EnemyChecklist';
import EnemyCounterChecklist from '../components/EnemyChecklistList';
import EnemyCounterIndex from '../components/EnemyCounterIndex';
import EnemyChecklistLeaderboard from '../components/EnemyChecklistLeaderboard';
import KeyCounter from '../components/KeyCounter';
import KeyCounterIndex from '../components/KeyCounterIndex';
import KeyCounterContainer from '../components/KeyCounterContainer';
import KeyCounterHeader from '../components/KeyCounterHeader';
import KeyCounterLeaderboard from '../components/KeyCounterLeaderboard';

export default function (store: Store) {
  function onPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().enemyChecklist.playerList.has(name)) {
      store.dispatch(createNewPlayer(name));
    }
  }

  function onKeyPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().keyCounter.has(name)) {
      store.dispatch(createNewKeyPlayer(name));
    }
  }

  function onItemPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().itemChecklist.playerList.has(name)) {
      store.dispatch(createNewItemPlayer(name));
    }
  }

  return (
    <Route component={App} path="/">
      <Route component={KeyCounterContainer} path="key-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: KeyCounterIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: KeyCounterHeader,
            body: KeyCounter,
          }}
          onEnter={onKeyPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: KeyCounterLeaderboard,
          }}
        />
      </Route>

      <Route component={EnemyCounter} path="enemy-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: EnemyCounterIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: EnemyChecklistHeader,
            body: EnemyCounterChecklist,
          }}
          onEnter={onPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: EnemyChecklistLeaderboard,
          }}
        />
      </Route>

      <Route component={ItemChecklist} path="item-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: ItemChecklistIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: ItemChecklistHeader,
            body: ItemChecklistList,
          }}
          onEnter={onItemPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: ItemChecklistLeaderboard,
          }}
        />
      </Route>
    </Route>
  );
}
