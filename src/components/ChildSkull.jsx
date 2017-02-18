import React, { Component } from 'react';
import { connect } from 'react-redux';

import addSkullToPlayer from '../actions/addChildSkullToPlayer';
import resetPlayerSkulls from '../actions/resetChildPlayerSkulls';

@connect(
  (state, ownProps) => ({
    number: state.childChecklist.playerList.get(ownProps.token).skulls.get(ownProps.name),
  }),
  {
    addSkullToPlayer,
    resetPlayerSkulls,
  }
)
export default class Skull extends Component {
  onClick = () => {
    const { token, name, number, total } = this.props;
    if (number === total) {
      this.props.resetPlayerSkulls(token, name);
    } else {
      this.props.addSkullToPlayer(token, name);
    }
  }

  render() {
    const { number, total, small } = this.props;
    return (
      <div className={`skull${small ? ' small' : ''}`}>
        <div
          className="icon"
          style={{ backgroundImage: 'url(/images/skulltula.png)' }}
          onClick={this.onClick}
        />
        <div className="number">{number}</div>
        {small ? null : <div className="total">/ {total}</div>}
      </div>
    );
  }
}
