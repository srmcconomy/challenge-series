// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EnemyCard from './EnemyCard';
import setPlayerEnemyCount from '../actions/setPlayerEnemyCount';

@connect(
  (state, ownProps) => ({
    enemyList: state.enemyList,
    enemyCounts: state.playerEnemyCount[ownProps.params.routeParams.name],
  }),
  (dispatch, ownProps) => bindActionCreators({
    setEnemyCount: (enemy, count) => (
      setPlayerEnemyCount(ownProps.params.routeParams.name, enemy, count)
    ),
  }),
)
export default class EnemyCounterChecklist extends Component {
  incrementClicked(enemy: string) {
    const { enemyCounts } = this.props;
    return () => {
      this.props.setEnemyCount(enemy, enemyCounts[enemy] + 1);
    };
  }

  decrementClicked(enemy: string) {
    const { enemyCounts } = this.props;
    return () => {
      this.props.setEnemyCount(enemy, enemyCounts[enemy] - 1);
    };
  }

  render() {
    const { enemyList, enemyCounts } = this.props;
    const enemyCards = Object.keys(enemyList).map((enemy, i) => (
      <EnemyCard
        key={i}
        enemy={enemy}
        name={enemyList[enemy].name}
        values={enemyList[enemy].values}
        count={enemyCounts[enemy]}
        onIncrementClicked={this.incrementClicked(enemy)}
        onDecrementClicked={this.decrementClicked(enemy)}
      />
    ));
    return (
      <div className="EnemyCounterChecklist">
        {enemyCards}
      </div>
    );
  }
}
