// @flow

import { Map, Set, List } from 'immutable';

import type { CreateNewPlayerAction } from '../actions/createNewPlayer';
import type { AddEnemyToPlayerAction } from '../actions/addEnemyToPlayer';
import type { RemoveEnemyFromPlayerAction } from '../actions/removeEnemyFromPlayer';
import type { SetSRLAction } from '../actions/setSRL';


export type EnemyChecklistState = {
  playerList: Map<
    string,
    {
      score: number,
      enemies: Set<string>,
    }
  >,
  enemyList: Map<
    string,
    number
  >,
  srlPlayers: List<{
    name: string,
    time: number,
  }>
};

export type EnemyChecklistAction = AddEnemyToPlayerAction |
  RemoveEnemyFromPlayerAction |
  CreateNewPlayerAction |
  SetSRLAction;

export default function enemyCounter(
  state: EnemyChecklistState = {
    playerList: new Map(),
    enemyList: new Map(),
    srlPlayers: new List(),
  },
  action: EnemyChecklistAction
): EnemyChecklistState {
  switch (action.type) {
    case 'add-enemy-to-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            score: state.playerList.get(action.player).score +
              state.enemyList.get(action.enemy),
            enemies: state.playerList.get(action.player)
              .enemies.add(action.enemy),
          }
        ),
      };

    case 'remove-enemy-from-player':
      if (!state.playerList.get(action.player).enemies.has(action.enemy)) {
        return state;
      }
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            score: state.playerList.get(action.player).score -
              state.enemyList.get(action.enemy),
            enemies: state.playerList.get(action.player)
              .enemies.delete(action.enemy),
          }
        ),
      };

    case 'create-new-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.name,
          {
            score: 0,
            enemies: new Set()
          }
        ),
      };

    case 'set-srl':
      return {
        ...state,
        srlPlayers: new List(action.srlPlayers),
      };

    default:
      return state;
  }
}
