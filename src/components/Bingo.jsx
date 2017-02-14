import React, { Component } from 'react';

import { connect } from 'react-redux';

@connect(
  state => ({ players: state.players })
)
export default class Bingo extends Component {
  render() {
    const l = this.props.players.valueSeq().map(
      p => <div><div>{p.name}</div><img src={p.logo} /></div>
    );
    return <div>{l}</div>;
  }
}
