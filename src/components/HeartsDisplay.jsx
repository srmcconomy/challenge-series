import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './Item';

import incrementHearts from '../actions/incrementHearts';
import incrementRupees from '../actions/incrementRupees';
import decrementHearts from '../actions/decrementHearts';
import decrementRupees from '../actions/decrementRupees';
import addItemToPlayer from '../actions/addItemToPlayer';
import removeItemFromPlayer from '../actions/removeItemFromPlayer';


@connect(
  undefined,
  {
    incrementHearts,
    decrementHearts,
    incrementRupees,
    decrementRupees,
    addItemToPlayer,
    removeItemFromPlayer,
  },
)
export default class HeartsDisplay extends Component {

  onMagicClick = () => {
    if (this.props.magic && this.props.doubleMagic) {
      this.props.removeItemFromPlayer(this.props.name, 'magic');
      this.props.removeItemFromPlayer(this.props.name, 'double-magic');
    } else if (this.props.magic) {
      this.props.addItemToPlayer(this.props.name, 'double-magic');
    } else {
      this.props.addItemToPlayer(this.props.name, 'magic');
    }
  }
  render() {
    const { hearts: count, magic, doubleMagic, doubleDefense, rupees } = this.props;
    const heartElements1 = Array.apply(null, { length: Math.min(count, 10) }).map(() => (
      <div className="heart" key={Math.random()}/>
    ));
    const heartElements2 = Array.apply(null, { length: count - 10 }).map(() => (
      <div className="heart" key={Math.random()}/>
    ));
    return (
      <div className="HeartsDisplay">
        <div className="left">
          <div className="hearts-container row">
            <div className="hearts">
              <div className="row">
                {heartElements1}
              </div>
              <div className="row">
                {heartElements2}
              </div>
            </div>
            <button onClick={() => this.props.incrementHearts(this.props.name)}>+</button>
            <button onClick={() => { if (count > 3) this.props.decrementHearts(this.props.name); }}>-</button>
          </div>
          <div className="magic-display" onClick={this.onMagicClick}>
            <div className={`magic${magic ? ' selected' : ''}`} />
            <div className={`double-magic${doubleMagic ? ' selected' : ''}`} />
          </div>
          <div className="rupees row">
            <div className="rupee" />
            <div className="rupee-count">{rupees * 100}</div>
            <button onClick={() => { if (rupees < 5) this.props.incrementRupees(this.props.name); }}>+</button>
            <button onClick={() => { if (rupees > 0) this.props.decrementRupees(this.props.name); }}>-</button>
          </div>
          <div
            className={`double-defense${doubleDefense ? ' selected' : ''}`}
            onClick={() => {
              if (this.props.doubleDefense) {
                this.props.removeItemFromPlayer(this.props.name, 'double-defense');
              } else {
                this.props.addItemToPlayer(this.props.name, 'double-defense');
              }
            }}
          >
            Double Defense
          </div>
          <div className="wallets row">
            <Item name="adults-wallet" player={this.props.name} />
            <Item name="giants-wallet" player={this.props.name} />
          </div>
        </div>
        <div className="map-table">
          <div className="row">
            <div className="place-name">Deku Tree</div>
            <Item name="deku-map" player={this.props.name} image="map" small />
            <Item name="deku-compass" player={this.props.name} image="compass" small />
            <div className="spacer-32" />
          </div>
          <div className="row">
            <div className="place-name">Dodongo's Cavern</div>
            <Item name="dc-map" player={this.props.name} image="map" small />
            <Item name="dc-compass" player={this.props.name} image="compass" small />
            <div className="spacer-32" />
          </div>
          <div className="row">
            <div className="place-name">Jabu-Jabu's Belly</div>
            <Item name="jabu-map" player={this.props.name} image="map" small />
            <Item name="jabu-compass" player={this.props.name} image="compass" small />
            <div className="spacer-32" />
          </div>
          <div className="row">
            <div className="place-name">Bottom of the Well</div>
            <Item name="botw-map" player={this.props.name} image="map" small />
            <Item name="botw-compass" player={this.props.name} image="compass" small />
            <div className="spacer-32" />
          </div>
          <div className="row">
            <div className="place-name">Ice Cavern</div>
            <Item name="ice-map" player={this.props.name} image="map" small />
            <Item name="ice-compass" player={this.props.name} image="compass" small />
            <div className="spacer-32" />
          </div>
          <div className="row">
            <div className="place-name">Forest Temple</div>
            <Item name="forest-map" player={this.props.name} image="map" small />
            <Item name="forest-compass" player={this.props.name} image="compass" small />
            <Item name="forest-bk" player={this.props.name} image="bk" small />
          </div>
          <div className="row">
            <div className="place-name">Fire Temple</div>
            <Item name="fire-map" player={this.props.name} image="map" small />
            <Item name="fire-compass" player={this.props.name} image="compass" small />
            <Item name="fire-bk" player={this.props.name} image="bk" small />
          </div>
          <div className="row">
            <div className="place-name">Water Temple</div>
            <Item name="water-map" player={this.props.name} image="map" small />
            <Item name="water-compass" player={this.props.name} image="compass" small />
            <Item name="water-bk" player={this.props.name} image="bk" small />
          </div>
          <div className="row">
            <div className="place-name">Shadow Temple</div>
            <Item name="shadow-map" player={this.props.name} image="map" small />
            <Item name="shadow-compass" player={this.props.name} image="compass" small />
            <Item name="shadow-bk" player={this.props.name} image="bk" small />
          </div>
          <div className="row">
            <div className="place-name">Spirit Temple</div>
            <Item name="spirit-map" player={this.props.name} image="map" small />
            <Item name="spirit-compass" player={this.props.name} image="compass" small />
            <Item name="spirit-bk" player={this.props.name} image="bk" small />
          </div>
          <div className="row">
            <div className="place-name">Ganon's Tower</div>
            <div className="spacer-32" />
            <div className="spacer-32" />
            <Item name="ganon-bk" player={this.props.name} image="bk" small />
          </div>
        </div>
      </div>
    );
  }
}
