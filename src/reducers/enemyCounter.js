// @flow

import { Map, List } from 'immutable';

import type { SetPlayerEnemyCountAction } from '../actions/setPlayerEnemyCount';
import type { CreateNewPlayerAction } from '../actions/createNewPlayer';
import type { CreateNewEnemyAction } from '../actions/createNewEnemy';
import type { SetEnemyValuesAction } from '../actions/setEnemyValues';


export type EnemyCounterState = {
  playerEnemyCount: Map<
    string,
    Map<string, number>
  >,
  enemyList: Map<
    string,
    {
      name: string,
      values: List<number>,
    }
  >,
};

export type EnemyCounterAction = SetPlayerEnemyCountAction |
  CreateNewPlayerAction |
  CreateNewEnemyAction |
  SetEnemyValuesAction;

export default function enemyCounter(
  state: EnemyCounterState = {
    playerEnemyCount: new Map(),
    enemyList: new Map(),
  },
  action: EnemyCounterAction
): EnemyCounterState {
  switch (action.type) {
    case 'set-player-enemy-count':
      return {
        ...state,
        playerEnemyCount: state.playerEnemyCount.setIn(
          [action.player, action.enemy],
          action.count
        ),
      };

    case 'create-new-player':
      return {
        ...state,
        playerEnemyCount: state.playerEnemyCount.set(action.name, state.enemyList.map(() => 0)),
      };

    case 'create-new-enemy':
      return {
        ...state,
        enemyList: state.enemyList.set(
          action.name.replace(/\s+/g, '-').toLowerCase(),
          { name: action.name, values: new List([0]) }
        ),
      };

    case 'set-enemy-values':
      return {
        ...state,
        enemyList: state.enemyList.setIn(
          [action.enemy, 'values'],
          new List(action.values)
        ),
      };

    default:
      return state;
  }
}
