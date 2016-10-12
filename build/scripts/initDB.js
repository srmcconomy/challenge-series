'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _immutable = require('immutable');

var _enemyList = require('./enemyList');

var _enemyList2 = _interopRequireDefault(_enemyList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize2.default(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST
});

const Player = sequelize.define('player', {
  name: _sequelize2.default.STRING
});

const Enemy = sequelize.define('enemy', {
  name: _sequelize2.default.STRING
});

const EnemyValue = sequelize.define('enemyValue', {
  number: _sequelize2.default.INTEGER,
  value: _sequelize2.default.INTEGER
});

const EnemyCount = sequelize.define('enemyCount', {
  number: _sequelize2.default.INTEGER
});

Enemy.hasMany(EnemyValue, { as: 'values' });
EnemyCount.hasOne(Enemy);
Player.hasMany(EnemyCount, { as: 'counts' });

sequelize.sync();

Enemy.findAll().then(enemies => {
  for (const enemy of enemies) {
    enemy.getValues({ order: 'number' }).then(values => {
      console.log(values);
      console.log(enemy.name + ': [' + values.map(v => v.number).join(', ') + ']');
    });
  }
});
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
//# sourceMappingURL=initDB.js.map
