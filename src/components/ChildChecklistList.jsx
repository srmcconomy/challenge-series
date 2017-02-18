// @flow

import React, { Component } from 'react';

import Item from './ChildItem';
import Skull from './ChildSkull';

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
            <div className="place-name ice">Ice Cavern</div>
            <div className="place-name ganon">Ganon's Castle</div>
            <div className="place-name forest">Forest Temple</div>
            <div className="place-name fire">Fire Temple</div>
            <div className="place-name water">Water Temple</div>
            <div className="place-name shadow">Shadow Temple</div>
            <div className="place-name spirit">Spirit Temple</div>
          </div>
          <div className="items">
            <div className="row ice">
              <Item name="iron-boots" token={token} />
              <div className="spacer-64" />
              <Item name="ice-map" image="map" token={token} />
              <Item name="ice-compass" image="compass" token={token} />
              <div className="spacer-64" />
              <Skull name="ice" total={3} token={token} />
            </div>
            <div className="row ganon">
              <Item name="gold-gauntlets" token={token} />
              <div className="spacer-64" />
              <div className="spacer-64" />
              <div className="spacer-64" />
              <Item name="ganon-bk" image="bk" token={token} />
            </div>
            <div className="row forest">
              <Item name="bow" token={token} />
              <div className="spacer-64" />
              <Item name="forest-map" image="map" token={token} />
              <Item name="forest-compass" image="compass" token={token} />
              <Item name="forest-bk" image="bk" token={token} />
              <Skull name="forest" total={5} token={token} />
            </div>
            <div className="row fire">
              <Item name="hammer" token={token} />
              <div className="spacer-64" />
              <Item name="fire-map" image="map" token={token} />
              <Item name="fire-compass" image="compass" token={token} />
              <Item name="fire-bk" image="bk" token={token} />
              <Skull name="fire" total={5} token={token} />
            </div>
            <div className="row water">
              <Item name="longshot" token={token} />
              <div className="spacer-64" />
              <Item name="water-map" image="map" token={token} />
              <Item name="water-compass" image="compass" token={token} />
              <Item name="water-bk" image="bk" token={token} />
              <Skull name="water" total={5} token={token} />
            </div>
            <div className="row shadow">
              <Item name="hover-boots" token={token} />
              <div className="spacer-64" />
              <Item name="shadow-map" image="map" token={token} />
              <Item name="shadow-compass" image="compass" token={token} />
              <Item name="shadow-bk" image="bk" token={token} />
              <Skull name="shadow" total={5} token={token} />
            </div>
            <div className="row spirit">
              <Item name="silver-gauntlets" token={token} />
              <Item name="mirror-shield" token={token} />
              <Item name="spirit-map" image="map" token={token} />
              <Item name="spirit-compass" image="compass" token={token} />
              <Item name="spirit-bk" image="bk" token={token} />
              <Skull name="spirit" total={5} token={token} />
            </div>
          </div>
        </div>
        <div className="popout-button" onClick={this.openPopout}>Open Bingo-sized popout</div>
      </div>
    );
  }
}
