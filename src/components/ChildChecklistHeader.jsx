import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  params: {
    name: string
  },
  score: number,
};

@connect(
  (state, ownProps) => {
    const player = state.players.get(ownProps.token);
    return {
      name: player.name,
      logo: player.logo,
      score: state.childChecklist.playerList.get(ownProps.token).score,
    }
  }
)
export default class ChildChecklistHeader extends Component {
  props: Props;

  render() {
    return (
      <div className="EnemyChecklistHeader">
        <div className="player">
          <img className="logo" src={this.props.logo} />
          <div className="name">
            {this.props.name}
          </div>
        </div>
        <div className="score">
          Score
          <span className="points">{this.props.score}</span>
        </div>
      </div>
    );
  }
}
