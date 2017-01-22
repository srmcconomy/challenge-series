// @flow

import { combineReducers } from 'redux';
import enemyChecklist from './enemyChecklist';
import keyCounter from './keyCounter';
import itemChecklist from './itemChecklist';
import type { EnemyChecklistState, EnemyChecklistAction } from './enemyChecklist';

export type State = {
  enemyChecklist: EnemyChecklistState,
};

export type Action = EnemyChecklistAction;

export default combineReducers({
  enemyChecklist,
  keyCounter,
  itemChecklist,
});
