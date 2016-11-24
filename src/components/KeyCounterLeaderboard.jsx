// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

function leftPad(x) {
  x = ''+x;
  if (x.length < 2) {
    x = new Array(2 - x.length + 1).join('0') + x;
  }
  return x;
}

function convertTime(time: number): string {
  return `${Math.floor(time / 3600)}:${leftPad(Math.floor((time % 3600) / 60))}:${leftPad(Math.floor(time % 60))}`;
}

@connect(state => ({
  playerList: state.keyCounter,
  srlPlayers: state.enemyChecklist.srlPlayers,
}))
export default class EnemyChecklistLeaderboard extends Component {
  render() {
    console.log(this.props.srlPlayers);
    const entries = this.props.playerList.keySeq().map(
      name => {
        const srlPlayer = this.props.srlPlayers.find(
          s => s.name.toLowerCase() === name.toLowerCase()
        );
        const time = srlPlayer ? srlPlayer.time : 0;
        return { name, score: this.props.playerList.get(name), time };
      }
    ).sort(
      (a, b) => {
        if (a.time && b.time) {
          return a.time - b.time;
        } else if (a.time) {
          return -1;
        } else if (b.time) {
          return 1;
        }
        return b.score - a.score;
      }
    ).map(
      (player, position) => ({ ...player, position })
    ).sort(
      (a, b) => a.name < b.name ? -1 : 1
    ).map(
      ({ name, score, time, position }) => (
        <div
          key={name}
          className="leaderboard-entry"
          style={{ top: `${position * 40}px` }}
        >
          <span className="name">{name}</span>
          {time ?
            <span className="time">{convertTime(time)}</span> :
            <span className="score">{score}</span>
          }
        </div>
      )
    );
    const positions = this.props.playerList.keySeq().map(
      (_, position) => (
        <div key={position} className={`position n${position}`}>
          {position + 1}
        </div>
      )
    );
    return (
      <div className="EnemyChecklistLeaderboard">
        <div className="positions">
          {positions}
        </div>
        <div className="results">
          {entries}
        </div>
      </div>
    );
  }
}
