import Sequelize from 'sequelize';
import { List } from 'immutable';

import enemyList from './enemyList';

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
  }
);

const Player = sequelize.define('player', {
  name: Sequelize.STRING,
});

const Enemy = sequelize.define('enemy', {
  name: Sequelize.STRING,
});

const EnemyValue = sequelize.define('enemyValue', {
  number: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
});

const EnemyCount = sequelize.define('enemyCount', {
  number: Sequelize.INTEGER,
});

Enemy.hasMany(EnemyValue, { as: 'values' });
EnemyCount.hasOne(Enemy);
Player.hasMany(EnemyCount, { as: 'counts' });

sequelize.sync();

Enemy.findAll().then(enemies => {
  for (const enemy of enemies) {
    enemy.getValues({ order: 'number' }).then(
      values => {
        console.log(values);
        console.log(enemy.name + ': [' + values.map(v => v.number).join(', ') + ']');
      }
    )
  }
})
//
// const promises = [];
//
// for (let name of enemyList) {
//   promises.push(Enemy.create({ name }).then(enemy => {
//     const ps = [];
//     for (let i = 0; i < 5; i++) {
//       ps.push(enemy.createValue({ number: i, value: 5 - i }));
//     }
//     return Promise.all(ps);
//   }));
// }
// Promise.all(promises).then(() => console.log('done'));
