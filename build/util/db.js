'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialState = exports.PlayerEnemy = exports.Enemy = exports.Player = undefined;

let getInitialState = exports.getInitialState = (() => {
  var _ref = _asyncToGenerator(function* () {
    yield syncPromise;
    const enemies = yield Enemy.findAll();
    const enemyList = new _immutable.Map(enemies.map(function (enemy) {
      return [enemy.name, enemy.value];
    }));
    const players = yield Player.findAll({
      include: {
        model: PlayerEnemy,
        include: {
          model: Enemy
        }
      }
    });
    const playerList = new _immutable.Map(players.map(function (player) {
      const score = player.PlayerEnemies.reduce(function (value, playerEnemy) {
        return value + playerEnemy.Enemy.value;
      }, 0);
      return [player.name, {
        score,
        enemies: new _immutable.Set(player.PlayerEnemies.map(function (playerEnemy) {
          return playerEnemy.Enemy.name;
        }))
      }];
    }));

    return {
      enemyChecklist: {
        enemyList,
        playerList,
        srlPlayers: new _immutable.List()
      }
    };
  });

  return function getInitialState() {
    return _ref.apply(this, arguments);
  };
})();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _immutable = require('immutable');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sequelize = new _sequelize2.default(_config2.default.db.name, _config2.default.db.user, _config2.default.db.password, {
  host: _config2.default.db.host,
  logging: false
});

const Player = exports.Player = sequelize.define('Player', {
  name: _sequelize2.default.STRING
});

const Enemy = exports.Enemy = sequelize.define('Enemy', {
  name: _sequelize2.default.STRING,
  value: _sequelize2.default.INTEGER
});

const PlayerEnemy = exports.PlayerEnemy = sequelize.define('PlayerEnemy');

Player.hasMany(PlayerEnemy);
PlayerEnemy.belongsTo(Enemy);

const syncPromise = sequelize.sync();
//# sourceMappingURL=db.js.map
