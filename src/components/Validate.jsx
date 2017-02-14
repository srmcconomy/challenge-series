import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(
  state => ({ players: state.players })
)
export default class Validate extends Component {
  render() {
    let content;
    if (this.props.players.has(this.props.token)) {
      content = <div className="join-button"><Link to="/childrace">Join the race!</Link></div>;
    } else {
      content = <div>Authenticating...</div>;
    }
    return (
      <div className="Validate">
        {content}
      </div>
    );
  }
}
