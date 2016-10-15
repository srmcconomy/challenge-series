// @flow

import { Route, IndexRoute } from 'react-router';
import React from 'react';
import type { Store } from 'redux';

import App from '../components/App';
import createNewPlayer from '../actions/createNewPlayer';
import EnemyChecklistHeader from '../components/EnemyChecklistHeader';
import EnemyCounter from '../components/EnemyChecklist';
import EnemyCounterChecklist from '../components/EnemyChecklistList';
import EnemyCounterIndex from '../components/EnemyCounterIndex';
import EnemyChecklistLeaderboard from '../components/EnemyChecklistLeaderboard';

export default function (store: Store) {
  function onPlayerEnter(nextState) {
    const { name } = nextState.params;
    if (!store.getState().enemyChecklist.playerList.has(name)) {
      store.dispatch(createNewPlayer(name));
    }
  }

  return (
    <Route component={App} path="/">
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
    </Route>
  );
}
