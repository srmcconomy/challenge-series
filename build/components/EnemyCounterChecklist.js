'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _EnemyCard = require('./EnemyCard');

var _EnemyCard2 = _interopRequireDefault(_EnemyCard);

var _setPlayerEnemyCount = require('../actions/setPlayerEnemyCount');

var _setPlayerEnemyCount2 = _interopRequireDefault(_setPlayerEnemyCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EnemyCounterChecklist = (_dec = (0, _reactRedux.connect)((state, ownProps) => ({
  enemyList: state.enemyList,
  enemyCounts: state.playerEnemyCount[ownProps.params.routeParams.name]
}), (dispatch, ownProps) => (0, _redux.bindActionCreators)({
  setEnemyCount: (enemy, count) => (0, _setPlayerEnemyCount2.default)(ownProps.params.routeParams.name, enemy, count)
})), _dec(_class = class EnemyCounterChecklist extends _react.Component {
  incrementClicked(enemy) {
    const { enemyCounts } = this.props;
    return () => {
      this.props.setEnemyCount(enemy, enemyCounts[enemy] + 1);
    };
  }

  decrementClicked(enemy) {
    const { enemyCounts } = this.props;
    return () => {
      this.props.setEnemyCount(enemy, enemyCounts[enemy] - 1);
    };
  }

  render() {
    const { enemyList, enemyCounts } = this.props;
    const enemyCards = Object.keys(enemyList).map((enemy, i) => _react2.default.createElement(_EnemyCard2.default, {
      key: i,
      enemy: enemy,
      name: enemyList[enemy].name,
      values: enemyList[enemy].values,
      count: enemyCounts[enemy],
      onIncrementClicked: this.incrementClicked(enemy),
      onDecrementClicked: this.decrementClicked(enemy)
    }));
    return _react2.default.createElement(
      'div',
      { className: 'EnemyCounterChecklist' },
      enemyCards
    );
  }
}) || _class);
exports.default = EnemyCounterChecklist;
//# sourceMappingURL=EnemyCounterChecklist.js.map
