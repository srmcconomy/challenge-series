// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

function convertTime(time: number): string {
  return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${Math.floor(time % 60)}`;
}

@connect(state => ({
  players: state.players,
  playerList: state.childChecklist.playerList,
  srlPlayers: state.childChecklist.srlPlayers,
}))
export default class EnemyChecklistLeaderboard extends Component {
  render() {
    const entries = this.props.playerList.valueSeq().map(
      code => {
        const player = this.props.players.get(code);
        return { name: player.name, score: this.props.playerList.get(code).score };
      }
    ).filter(
      ({ name }) => {
        const srlPlayer = this.props.srlPlayers.find(
          s => s.twitch.toLowerCase() === name.toLowerCase()
        );
        return srlPlayer !== null;
      }
    ).sort((a, b) => b.score - a.score)
      .map((player, position) => ({ ...player, position }))
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map(
      ({ name, score, position }) => (
        <div
          key={name}
          className="leaderboard-entry"
          style={{ top: `${position * 40}px` }}
        >
          <span className="name">{name}</span>
          <span className="score">{score}</span>
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
