// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './ChildItem';
import Skull from './ChildSkull';

const HOUR_AND_A_HALF = 5400000;

function leftpad(n: string) {
  if (n.length === 1) {
    return `0${n}`;
  }
  return n;
}

function convertTime(time: number): string {
  return `${Math.floor(time / 3600)}:${leftpad(`${Math.floor((time % 3600) / 60)}`)}:${leftpad(`${Math.floor(time % 60)}`)}`;
}

@connect(
  (state, ownProps) => ({
    time: state.childChecklist.time,
    score: state.childChecklist.playerList.get(ownProps.token).score,
  })
)
export default class ChildPopout extends Component {
  state: { timeDiff: ?number }
  timeout: ?number;

  constructor(props) {
    super(props);
    this.state = { timeDiff: null };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeoutFunc = () => {
    const timeDiff = HOUR_AND_A_HALF - (Date.now() - this.props.time);
    if (timeDiff <= 0) {
      this.setState({ timeDiff: 0 });
    } else {
      this.setState({ timeDiff });
      setTimeout(this.timeoutFunc, 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time && this.props.time > 0) {
      clearTimeout(this.timeout);
      this.timeoutFunc();
    }
  }
  componentDidMount() {
    if (this.props.time > 0) {
      this.timeoutFunc();
    }
  }

  render() {
    const { token, score } = this.props;
    const { timeDiff } = this.state;
    let timeElem = <div />;
    if (timeDiff != null) {
      timeElem = (
        <div className="time">
          {convertTime(timeDiff / 1000)}
        </div>
      );
    }
    return (
      <div className="containerthing popout">
        <div className="header">
          {timeElem}
          <div className="score">
            <span>Score</span>
            <span className="number">{score}</span>
          </div>
        </div>
        <div className="ChildChecklistList">
          <div className="items">
            <div className="place ice">
              <div className="place-name">Ice Cavern</div>
              <div className="row">
                <Item name="iron-boots" token={token} small />
                <div className="spacer-32" />
                <Item name="ice-map" image="map" token={token} small />
                <Item name="ice-compass" image="compass" token={token} small />
                <div className="spacer-32" />
                <Skull name="ice" total={3} token={token} small />
              </div>
            </div>
            <div className="place ganon">
              <div className="place-name">Ganon's Castle</div>
              <div className="row">
                <Item name="gold-gauntlets" token={token} small />
                <div className="spacer-32" />
                <div className="spacer-32" />
                <div className="spacer-32" />
                <Item name="ganon-bk" image="bk" token={token} small />
                <div className="spacer-32" />
              </div>
            </div>
            <div className="place forest">
              <div className="place-name">Forest Temple</div>
              <div className="row">
                <Item name="bow" token={token} small />
                <div className="spacer-32" />
                <Item name="forest-map" image="map" token={token} small />
                <Item name="forest-compass" image="compass" token={token} small />
                <Item name="forest-bk" image="bk" token={token} small />
                <Skull name="forest" total={5} token={token} small />
              </div>
            </div>
            <div className="place fire">
              <div className="place-name">Fire Temple</div>
              <div className="row">
                <Item name="hammer" token={token} small />
                <div className="spacer-32" />
                <Item name="fire-map" image="map" token={token} small />
                <Item name="fire-compass" image="compass" token={token} small />
                <Item name="fire-bk" image="bk" token={token} small />
                <Skull name="fire" total={5} token={token} small />
              </div>
            </div>
            <div className="place water">
              <div className="place-name">Water Temple</div>
              <div className="row">
                <Item name="longshot" token={token} small />
                <div className="spacer-32" />
                <Item name="water-map" image="map" token={token} small />
                <Item name="water-compass" image="compass" token={token} small />
                <Item name="water-bk" image="bk" token={token} small />
                <Skull name="water" total={5} token={token} small />
              </div>
            </div>
            <div className="place shadow">
              <div className="place-name">Shadow Temple</div>
              <div className="row">
                <Item name="hover-boots" token={token} small />
                <div className="spacer-32" />
                <Item name="shadow-map" image="map" token={token} small />
                <Item name="shadow-compass" image="compass" token={token} small />
                <Item name="shadow-bk" image="bk" token={token} small />
                <Skull name="shadow" total={5} token={token} small />
              </div>
            </div>
            <div className="place spirit">
              <div className="place-name">Spirit Temple</div>
              <div className="row">
                <Item name="silver-gauntlets" token={token} small />
                <Item name="mirror-shield" token={token} small />
                <Item name="spirit-map" image="map" token={token} small />
                <Item name="spirit-compass" image="compass" token={token} small />
                <Item name="spirit-bk" image="bk" token={token} small />
                <Skull name="spirit" total={5} token={token} small />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
