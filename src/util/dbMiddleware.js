import { Player, Enemy, PlayerEnemy } from './db';
import type { Action } from '../reducers';

export default () => next => action => {
  switch (action.type) {
    case 'add-enemy-to-player':
      Promise.all([
        Player.findOne({ where: { name: action.player } }),
        Enemy.findOne({ where: { name: action.enemy } }),
        PlayerEnemy.create(),
      ]).then(([player, enemy, playerEnemy]) => {
        playerEnemy.setEnemy(enemy);
        player.addPlayerEnemy(playerEnemy);
      });
      break;

    case 'remove-enemy-from-player':
      Player.findOne({
        where: {
          name: action.player,
        },
        include: {
          model: PlayerEnemy,
          include: {
            model: Enemy,
            where: {
              name: action.enemy,
            },
          },
        },
      }).then((player) => {
        player.removePlayerEnemies(player.PlayerEnemies[0]);
        player.PlayerEnemies[0].destroy();
      });
      break;

    case 'create-new-player':
      Player.create({ name: action.name });
      break;

    default:
      break;
  }
  next(action);
};
