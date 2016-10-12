import Sequelize from 'sequelize';
import { List } from 'immutable';

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
  }
);

export const Player = sequelize.define('player', {
  name: Sequelize.STRING,
});

export const Enemy = sequelize.define('enemy', {
  name: Sequelize.STRING,
});

export const EnemyValue = sequelize.define('enemyValue', {
  number: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
});

export const EnemyCount = sequelize.define('enemyCount', {
  number: Sequelize.INTEGER,
});

Enemy.hasMany(EnemyValue, { as: 'values' });
EnemyCount.hasOne(Enemy);
Player.hasMany(EnemyCount, { as: 'counts' });

sequelize.sync();

export default async function loadState() {
  const players = await Player.findAll({
    include: ['counts'],
  });
  const enemies = await Enemy.findAll({
    include: ['values'],
  });
  const playerEnemyCount = new Map(
    players.map(
      player => [
        player.name,
        new Map(
          player.counts.map(
            count => [
              count.enemy.name,
              count.number,
            ]
          )
        ),
      ]
    )
  );
  const enemyList = new Map(
    enemies.map(
      enemy => [
        enemy.name,
        new List(
          enemy.values.map(
            value => value.number
          )
        ),
      ]
    )
  );
  return { playerEnemyCount, enemyList };
}

export async function setDefaultState() {

}
