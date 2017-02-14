// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './ChildItem';

@connect(
  (state, ownProps) => ({ score: state.childChecklist.playerList.get(ownProps.token).score })
)
export default class ChildPopout extends Component {
  render() {
    const { token, score, time } = this.props;
    return (
      <div className="containerthing popout">
        <div className="header">
          <div className="time">
            {time}
          </div>
          <div className="score">
            <span>Score</span>
            <span className="number">{score}</span>
          </div>
        </div>
        <div className="ChildChecklistList">
          <div className="items">
            <div className="place-name">Ice Cavern</div>
            <div className="row">
              <Item name="iron-boots" token={token} small />
              <div className="spacer-32" />
              <Item name="ice-map" image="map" token={token} small />
              <Item name="ice-compass" image="compass" token={token} small />
            </div>
            <div className="place-name">Ganon's Castle</div>
            <div className="row">
              <Item name="gold-gauntlets" token={token} small />
              <div className="spacer-32" />
              <div className="spacer-32" />
              <div className="spacer-32" />
              <Item name="ganon-bk" image="bk" token={token} small />
            </div>
            <div className="place-name">Forest Temple</div>
            <div className="row">
              <Item name="bow" token={token} small />
              <div className="spacer-32" />
              <Item name="forest-map" image="map" token={token} small />
              <Item name="forest-compass" image="compass" token={token} small />
              <Item name="forest-bk" image="bk" token={token} small />
            </div>
            <div className="place-name">Fire Temple</div>
            <div className="row">
              <Item name="hammer" token={token} small />
              <div className="spacer-32" />
              <Item name="fire-map" image="map" token={token} small />
              <Item name="fire-compass" image="compass" token={token} small />
              <Item name="fire-bk" image="bk" token={token} small />
            </div>
            <div className="place-name">Water Temple</div>
            <div className="row">
              <Item name="longshot" token={token} small />
              <div className="spacer-32" />
              <Item name="water-map" image="map" token={token} small />
              <Item name="water-compass" image="compass" token={token} small />
              <Item name="water-bk" image="bk" token={token} small />
            </div>
            <div className="place-name">Shadow Temple</div>
            <div className="row">
              <Item name="hover-boots" token={token} small />
              <div className="spacer-32" />
              <Item name="shadow-map" image="map" token={token} small />
              <Item name="shadow-compass" image="compass" token={token} small />
              <Item name="shadow-bk" image="bk" token={token} small />
            </div>
            <div className="place-name">Spirit Temple</div>
            <div className="row">
              <Item name="silver-gauntlets" token={token} small />
              <Item name="mirror-shield" token={token} small />
              <Item name="spirit-map" image="map" token={token} small />
              <Item name="spirit-compass" image="compass" token={token} small />
              <Item name="spirit-bk" image="bk" token={token} small />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
