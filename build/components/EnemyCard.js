"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EnemyCard;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EnemyCard(props) {
  const {
    enemy,
    name,
    count,
    values,
    onIncrementClicked,
    onDecrementClicked
  } = props;
  return _react2.default.createElement(
    "div",
    { className: "EnemyCard" },
    _react2.default.createElement("div", {
      className: "image",
      style: { backgroundImage: `images/${ enemy }.png` }
    }),
    _react2.default.createElement(
      "div",
      { className: "count" },
      count
    ),
    _react2.default.createElement(
      "div",
      { className: "values" },
      values
    ),
    _react2.default.createElement(
      "div",
      { className: "name" },
      name
    ),
    _react2.default.createElement(
      "div",
      { className: "buttons" },
      _react2.default.createElement(
        "button",
        { onClick: onIncrementClicked },
        "+"
      ),
      _react2.default.createElement(
        "button",
        { onClick: onDecrementClicked },
        "-"
      )
    )
  );
}
//# sourceMappingURL=EnemyCard.js.map
