import React, { Component } from 'react';
import { connect } from 'react-redux';
import increaseKeyCount from '../actions/increaseKeyCount';
import decreaseKeyCount from '../actions/decreaseKeyCount';

@connect(
  (state, ownProps) => ({ count: state.keyCounter[ownProps.params.name]}),
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
      <div class="card container">
        <div class="label">
          <div class="image" style="background-image: url('/images/Gold-Skulltula.png')" class="check"></div>
        </div>
        <div class="skull">
          <div>
            <span class="num">
              {this.props.count}
            </span>
            /
            <span class="den">
              30
            </span>
          </div>
          <div class="buttons">
            <div class="button minus hide" onClick={this._onMinusClick}>
              -
            </div>
            <div class="button big plus hide" onClick={this._onPlusClick}>
              +
            </div>
          </div>

        </div>
      </div>
    )
  }
}
