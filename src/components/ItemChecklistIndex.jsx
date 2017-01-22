// @flow

import { Link, browserHistory } from 'react-router';
import React, { Component } from 'react';

type State = {
  value: string,
}

export default class EnemyChecklistIndex extends Component {

  state: State;

  constructor() {
    super();
    this.state = { value: '' };
  }

  onChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ value: event.target.value });
    }
  };

  onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      browserHistory.push(`/item-counter/user/${this.state.value}`);
    }
  }

  render() {
    return (
      <div className="EnemyChecklistIndex">
        <div className="title">
          Ocarina of Time Challenge Series
        </div>
        <div className="goal">
          Race #9: Collect 50 items/upgrades!
        </div>
        <div className="enter-your-name">
          Enter your SRL username (make sure it&apos;s the same as it is on SRL, blinkzy!)
        </div>
        <div className="input">
          <input onChange={this.onChange} value={this.state.value} placeholder="username" onKeyPress={this.onKeyPress} />
          <Link className="link" to={`/item-counter/user/${this.state.value}`}>GO</Link>
        </div>
      </div>
    );
  }
}
