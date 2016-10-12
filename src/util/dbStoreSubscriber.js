import type { Action } from '../reducers';

export default function (action: Action) {
  switch (action.type) {
    case 'set-player-enemy-count':
      Enemy.findOne({
        where: {
          name: 'action.player',
        }
      }).

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
