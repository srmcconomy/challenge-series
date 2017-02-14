// @flow

import React, { Component } from 'react';

import Item from './ChildItem';

export default class ItemChecklistList extends Component {

  openPopout = () => {
    window.open('/childrace/popout', '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=220, height=460');
  }
  render() {
    const { token } = this.props;
    return (
      <div className="containerthing">
        <div className="ChildChecklistList">
          <div className="titles">
            <div className="place-name">Ice Cavern</div>
            <div className="place-name">Ganon's Castle</div>
            <div className="place-name">Forest Temple</div>
            <div className="place-name">Fire Temple</div>
            <div className="place-name">Water Temple</div>
            <div className="place-name">Shadow Temple</div>
            <div className="place-name">Spirit Temple</div>
          </div>
          <div className="items">
            <div className="row">
              <Item name="iron-boots" token={token} />
              <div className="spacer-64" />
              <Item name="ice-map" image="map" token={token} />
              <Item name="ice-compass" image="compass" token={token} />
            </div>
            <div className="row">
              <Item name="gold-gauntlets" token={token} />
              <div className="spacer-64" />
              <div className="spacer-64" />
              <div className="spacer-64" />
              <Item name="ganon-bk" image="bk" token={token} />
            </div>
            <div className="row">
              <Item name="bow" token={token} />
              <div className="spacer-64" />
              <Item name="forest-map" image="map" token={token} />
              <Item name="forest-compass" image="compass" token={token} />
              <Item name="forest-bk" image="bk" token={token} />
            </div>
            <div className="row">
              <Item name="hammer" token={token} />
              <div className="spacer-64" />
              <Item name="fire-map" image="map" token={token} />
              <Item name="fire-compass" image="compass" token={token} />
              <Item name="fire-bk" image="bk" token={token} />
            </div>
            <div className="row">
              <Item name="longshot" token={token} />
              <div className="spacer-64" />
              <Item name="water-map" image="map" token={token} />
              <Item name="water-compass" image="compass" token={token} />
              <Item name="water-bk" image="bk" token={token} />
            </div>
            <div className="row">
              <Item name="hover-boots" token={token} />
              <div className="spacer-64" />
              <Item name="shadow-map" image="map" token={token} />
              <Item name="shadow-compass" image="compass" token={token} />
              <Item name="shadow-bk" image="bk" token={token} />
            </div>
            <div className="row">
              <Item name="silver-gauntlets" token={token} />
              <Item name="mirror-shield" token={token} />
              <Item name="spirit-map" image="map" token={token} />
              <Item name="spirit-compass" image="compass" token={token} />
              <Item name="spirit-bk" image="bk" token={token} />
            </div>
          </div>
        </div>
        <div className="popout-button" onClick={this.openPopout}>Open Bingo-sized popout</div>
      </div>
    );
  }
}
