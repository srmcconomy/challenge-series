'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EnemyChecklistIndex = class EnemyChecklistIndex extends _react.Component {

  constructor() {
    super();

    this.onChange = event => {
      if (event.target instanceof HTMLInputElement) {
        this.setState({ value: event.target.value });
      }
    };

    this.onKeyPress = event => {
      if (event.key === 'Enter') {
        _reactRouter.browserHistory.push(`/enemy-counter/user/${ this.state.value }`);
      }
    };

    this.state = { value: '' };
  }

  render() {
    return _react2.default.createElement(
      'div',
      { className: 'EnemyChecklistIndex' },
      _react2.default.createElement(
        'div',
        { className: 'title' },
        'Ocarina of Time Challenge Series'
      ),
      _react2.default.createElement(
        'div',
        { className: 'goal' },
        'Race #3: Get at least 300 points by defeating enemies!'
      ),
      _react2.default.createElement(
        'div',
        { className: 'enter-your-name' },
        'Enter your SRL username (make sure it\'s the same as it is on SRL!)'
      ),
      _react2.default.createElement(
        'div',
        { className: 'input' },
        _react2.default.createElement('input', { onChange: this.onChange, value: this.state.value, placeholder: 'username', onKeyPress: this.onKeyPress }),
        _react2.default.createElement(
          _reactRouter.Link,
          { className: 'link', to: `/enemy-counter/user/${ this.state.value }` },
          'GO'
        )
      )
    );
  }
};
exports.default = EnemyChecklistIndex;
//# sourceMappingURL=EnemyCounterIndex.js.map
