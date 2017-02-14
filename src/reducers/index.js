// @flow

import { combineReducers } from 'redux';
import enemyChecklist from './enemyChecklist';
import keyCounter from './keyCounter';
import itemChecklist from './itemChecklist';
import players from './players';
import childChecklist from './childChecklist';

import type { EnemyChecklistState, EnemyChecklistAction } from './enemyChecklist';

export type State = {
  enemyChecklist: EnemyChecklistState,
};

export type Action = EnemyChecklistAction;

export default combineReducers({
  enemyChecklist,
  keyCounter,
  itemChecklist,
  players,
  childChecklist,
});
