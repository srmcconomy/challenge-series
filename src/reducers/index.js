// @flow

import { combineReducers } from 'redux';
import enemyCounter from './enemyCounter';
import type { EnemyCounterState,EnemyCounterAction } from './enemyCounter';

export type State = {
  enemyCounter: EnemyCounterState,
};

export type Action = EnemyCounterAction;

export default combineReducers({
  enemyCounter,
});
