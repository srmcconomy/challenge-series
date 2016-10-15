import Sequelize from 'sequelize';
import { Map, Set, List } from 'immutable';

import config from '../../config';
import type { State } from '../reducers';

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    logging: false,
  }
);

export const Player = sequelize.define('Player', {
  name: Sequelize.STRING,
});

export const Enemy = sequelize.define('Enemy', {
  name: Sequelize.STRING,
  value: Sequelize.INTEGER,
});

export const PlayerEnemy = sequelize.define('PlayerEnemy');

Player.hasMany(PlayerEnemy);
PlayerEnemy.belongsTo(Enemy);

const syncPromise = sequelize.sync();

export async function getInitialState(): State {
  await syncPromise;
  const enemies = await Enemy.findAll();
  const enemyList = new Map(enemies.map(enemy => [
    enemy.name,
    enemy.value
  ]));
  const players = await Player.findAll({
    include: {
      model: PlayerEnemy,
      include: {
        model: Enemy,
      }
    }
  });
  const playerList = new Map(players.map(player => {
    const score = player.PlayerEnemies.reduce(
      (value, playerEnemy) => value + playerEnemy.Enemy.value,
      0
    );
    return [
      player.name,
      {
        score,
        enemies: new Set(player.PlayerEnemies.map(
          playerEnemy => playerEnemy.Enemy.name
        )),
      },
    ];
  }));

  return {
    enemyChecklist: {
      enemyList,
      playerList,
      srlPlayers: new List(),
    },
  };
}
