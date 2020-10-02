'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EnemyCard;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EnemyCard(props) {
  const {
    name,
    onClick
  } = props;
  const enemyID = name.replace(/\s/g, '-');
  return _react2.default.createElement(
    'div',
    {
      className: `EnemyCard${props.selected ? ' selected' : ''}`,
      style: { backgroundImage: `url(/images/${enemyID}.png)` },
      onClick: onClick
    },
    _react2.default.createElement(
      'div',
      { className: 'name' },
      name
    )
  );
}
//# sourceMappingURL=EnemyCard.js.map
