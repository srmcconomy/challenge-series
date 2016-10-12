// @flow

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import EnemyCounter from '../components/EnemyCounter';
import EnemyCounterChecklist from '../components/EnemyCounterChecklist';
import EnemyCounterIndex from '../components/EnemyCounterIndex';
import EnemyCounterLeaderboard from '../components/EnemyCounterLeaderboard';

export default (
  <Route component={App} path="/">
    <Route component={EnemyCounter} path="enemy-counter">
      <IndexRoute component={EnemyCounterIndex} />
      <Route path="user/:name" component={EnemyCounterChecklist} />
      <Route path="leaderboard" component={EnemyCounterLeaderboard} />
    </Route>
  </Route>
);
