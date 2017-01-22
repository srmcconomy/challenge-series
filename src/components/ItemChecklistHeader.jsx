import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  params: {
    name: string
  },
  score: number,
};

@connect(
  (state, ownProps) => ({
    score: state.itemChecklist.playerList.get(ownProps.params.name).score,
  })
)
export default class EnemyChecklistHeader extends Component {
  props: Props;

  render() {
    return (
      <div className="EnemyChecklistHeader">
        <div className="name">
          {this.props.params.name}
        </div>
        <div className="score">
          Score
          <span className="points">{this.props.score}</span>
          / 50
        </div>
      </div>
    );
  }
}
