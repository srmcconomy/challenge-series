'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultState = exports.EnemyCount = exports.EnemyValue = exports.Enemy = exports.Player = undefined;

let setDefaultState = exports.setDefaultState = (() => {
  var _ref2 = _asyncToGenerator(function* () {});

  return function setDefaultState() {
    return _ref2.apply(this, arguments);
  };
})();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sequelize = new _sequelize2.default(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST
});

const Player = exports.Player = sequelize.define('player', {
  name: _sequelize2.default.STRING
});

const Enemy = exports.Enemy = sequelize.define('enemy', {
  name: _sequelize2.default.STRING
});

const EnemyValue = exports.EnemyValue = sequelize.define('enemyValue', {
  number: _sequelize2.default.INTEGER,
  value: _sequelize2.default.INTEGER
});

const EnemyCount = exports.EnemyCount = sequelize.define('enemyCount', {
  number: _sequelize2.default.INTEGER
});

Enemy.hasMany(EnemyValue, { as: 'values' });
EnemyCount.hasOne(Enemy);
Player.hasMany(EnemyCount, { as: 'counts' });

sequelize.sync();

exports.default = (() => {
  var _ref = _asyncToGenerator(function* () {
    const players = yield Player.findAll({
      include: ['counts']
    });
    const enemies = yield Enemy.findAll({
      include: ['values']
    });
    const playerEnemyCount = new Map(players.map(function (player) {
      return [player.name, new Map(player.counts.map(function (count) {
        return [count.enemy.name, count.number];
      }))];
    }));
    const enemyList = new Map(enemies.map(function (enemy) {
      return [enemy.name, new _immutable.List(enemy.values.map(function (value) {
        return value.number;
      }))];
    }));
    return { playerEnemyCount, enemyList };
  });

  function loadState() {
    return _ref.apply(this, arguments);
  }

  return loadState;
})();
//# sourceMappingURL=db.js.map
