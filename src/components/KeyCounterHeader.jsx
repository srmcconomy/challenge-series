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
    score: state.keyCounter.get(ownProps.params.name),
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
          / 30
        </div>
      </div>
    );
  }
}
