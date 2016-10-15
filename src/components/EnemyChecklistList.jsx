// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EnemyCard from './EnemyCard';
import addEnemyToPlayer from '../actions/addEnemyToPlayer';
import removeEnemyFromPlayer from '../actions/removeEnemyFromPlayer';

@connect(
  (state, ownProps) => ({
    enemyList: state.enemyChecklist.enemyList,
    playerEnemies: state.enemyChecklist.playerList.get(
      ownProps.params.name
    ).enemies,
  }),
  (dispatch, ownProps) => bindActionCreators({
    addEnemy: (enemy) => (
      addEnemyToPlayer(ownProps.params.name, enemy)
    ),
    removeEnemy: (enemy) => (
      removeEnemyFromPlayer(ownProps.params.name, enemy)
    ),
  }, dispatch),
)
export default class EnemyChecklistList extends Component {
  onClick(enemy: string) {
    return () => {
      if (this.props.playerEnemies.has(enemy)) {
        this.props.removeEnemy(enemy);
      } else {
        this.props.addEnemy(enemy);
      }
    };
  }

  render() {
    const { enemyList, playerEnemies } = this.props;
    const enemiesByValue = {};
    for (const [enemy, value] of enemyList) {
      if (!enemiesByValue.hasOwnProperty(value)) {
        enemiesByValue[value] = [];
      }
      enemiesByValue[value].push(enemy);
    }
    const content = Object.keys(enemiesByValue).sort(
      (a, b) => +b - +a
    ).map(value => (
      <div className="EnemyValueGroup" key={value}>
        <div className="value">
          {value}
        </div>
        <div className="enemies">
          {enemiesByValue[value].sort().map((enemy, i) => (
            <EnemyCard
              key={i}
              name={enemy}
              selected={playerEnemies.has(enemy)}
              onClick={this.onClick(enemy)}
            />
          ))}
        </div>
      </div>
    ));
    return (
      <div className="EnemyChecklistList">
        {content}
      </div>
    );
  }
}
