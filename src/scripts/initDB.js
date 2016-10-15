import Sequelize from 'sequelize';
import { List } from 'immutable';

import enemyList from './enemyList';

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    logging: false,
  }
);

const Player = sequelize.define('Player', {
  name: Sequelize.STRING,
});

const Enemy = sequelize.define('Enemy', {
  name: Sequelize.STRING,
  value: Sequelize.INTEGER,
});

const PlayerEnemy = sequelize.define('PlayerEnemy');

Player.hasMany(PlayerEnemy);
PlayerEnemy.belongsTo(Enemy);

async function init() {
  await sequelize.sync({ force: true });
  const promises = Object.keys(enemyList).map(async name => {
    const value = enemyList[name];
    const [enemy] = await Enemy.findOrCreate({
      where: { name },
    });
    enemy.set({ value });
    await enemy.save();
  });
  await Promise.all(promises);
}

init().then(() => console.log('done'));
