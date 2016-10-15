'use strict';

let init = (() => {
  var _ref = _asyncToGenerator(function* () {
    yield sequelize.sync({ force: true });
    const promises = Object.keys(_enemyList2.default).map((() => {
      var _ref2 = _asyncToGenerator(function* (name) {
        const value = _enemyList2.default[name];
        const [enemy] = yield Enemy.findOrCreate({
          where: { name }
        });
        enemy.set({ value });
        yield enemy.save();
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })());
    yield Promise.all(promises);
  });

  return function init() {
    return _ref.apply(this, arguments);
  };
})();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _immutable = require('immutable');

var _enemyList = require('./enemyList');

var _enemyList2 = _interopRequireDefault(_enemyList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sequelize = new _sequelize2.default(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  logging: false
});

const Player = sequelize.define('Player', {
  name: _sequelize2.default.STRING
});

const Enemy = sequelize.define('Enemy', {
  name: _sequelize2.default.STRING,
  value: _sequelize2.default.INTEGER
});

const PlayerEnemy = sequelize.define('PlayerEnemy');

Player.hasMany(PlayerEnemy);
PlayerEnemy.belongsTo(Enemy);

init().then(() => console.log('done'));
//# sourceMappingURL=initDB.js.map
