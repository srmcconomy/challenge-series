import React, { Component } from 'react';
import { connect } from 'react-redux';
import increaseKeyCount from '../actions/increaseKeyCount';
import decreaseKeyCount from '../actions/decreaseKeyCount';

@connect(
  (state, ownProps) => ({ count: state.keyCounter.get(ownProps.params.name) }),
  {
    increaseKeyCount,
    decreaseKeyCount,
  }
)
export default class KeyCounter extends Component {

  _onPlusClick = () => {
    this.props.increaseKeyCount(this.props.params.name);
  }

  _onMinusClick = () => {
    this.props.decreaseKeyCount(this.props.params.name);
  }

  render() {
    return (
      <div className="KeyCard">
        <div className="key-image"></div>
        <div className="key">
          <div className="score">
            <span className="num">
              {this.props.count}
            </span>
            /
            <span className="den">
              30
            </span>
          </div>
          <div className="buttons">
            <div className="button minus" onClick={this._onMinusClick}>
              -
            </div>
            <div className="button big" onClick={this._onPlusClick}>
              +
            </div>
          </div>

        </div>
      </div>
    )
  }
}
