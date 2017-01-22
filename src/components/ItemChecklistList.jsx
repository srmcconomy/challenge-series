// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Item from './Item';
import HeartsDisplay from './HeartsDisplay';
import addItemToPlayer from '../actions/addItemToPlayer';
import removeItemFromPlayer from '../actions/removeItemFromPlayer';

@connect(
  (state, ownProps) => ({
    playerItems: state.itemChecklist.playerList.get(
      ownProps.params.name
    )
  }),
  (dispatch, ownProps) => bindActionCreators({
    addItem: (enemy) => (
      addItemToPlayer(ownProps.params.name, enemy)
    ),
    removeItem: (enemy) => (
      removeItemFromPlayer(ownProps.params.name, enemy)
    ),
  }, dispatch),
)
export default class ItemChecklistList extends Component {
  render() {
    const { playerItems } = this.props;
    return (
      <div className="ItemChecklistList">
        <HeartsDisplay
          name={this.props.params.name}
          hearts={playerItems.hearts}
          magic={playerItems.items.contains('magic')}
          doubleMagic={playerItems.items.contains('double-magic')}
          doubleDefense={playerItems.items.contains('double-defense')}
          rupees={playerItems.rupees}
        />
        <div className="status">
          <div className="misc">
            <div className="row">
              <Item name="stone-of-agony" player={this.props.params.name} />
              <Item name="gerudo-card" player={this.props.params.name} />
            </div>
          </div>
          <div className="songs">
            <div className="row">
              <Item name="zeldas-lullaby" player={this.props.params.name} />
              <Item name="eponas-song" player={this.props.params.name} />
              <Item name="sarias-song" player={this.props.params.name} />
              <Item name="suns-song" player={this.props.params.name} />
              <Item name="song-of-time" player={this.props.params.name} />
              <Item name="song-of-storms" player={this.props.params.name} />
            </div>
            <div className="row">
              <Item name="minuet" player={this.props.params.name} />
              <Item name="bolero" player={this.props.params.name} />
              <Item name="serenade" player={this.props.params.name} />
              <Item name="requiem" player={this.props.params.name} />
              <Item name="nocturne" player={this.props.params.name} />
              <Item name="prelude" player={this.props.params.name} />
            </div>
          </div>
          <div className="medallions">
            <div className="light">
              <Item name="light-medallion" player={this.props.params.name} />
            </div>
            <div className="forest">
              <Item name="forest-medallion" player={this.props.params.name} />
            </div>
            <div className="fire">
              <Item name="fire-medallion" player={this.props.params.name} />
            </div>
            <div className="water">
              <Item name="water-medallion" player={this.props.params.name} />
            </div>
            <div className="shadow">
              <Item name="spirit-medallion" player={this.props.params.name} />
            </div>
            <div className="spirit">
              <Item name="shadow-medallion" player={this.props.params.name} />
            </div>
          </div>
          <div className="stones">
            <div className="row">
              <Item name="kokiri-emerald" player={this.props.params.name} />
              <Item name="goron-ruby" player={this.props.params.name} />
              <Item name="zora-sapphire" player={this.props.params.name} />
            </div>
          </div>
        </div>
        <div className="equipment">
          <div className="equipment-left">
            <div className="equipment-row">
              <Item name="slingshot" alt player={this.props.params.name} />
              <Item name="bullet-bag-40" player={this.props.params.name} />
              <Item name="bullet-bag-50" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="bow" alt player={this.props.params.name} />
              <Item name="quiver-40" player={this.props.params.name} />
              <Item name="quiver-50" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="bomb" alt player={this.props.params.name} />
              <Item name="bomb-bag-30" player={this.props.params.name} />
              <Item name="bomb-bag-40" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="goron-bracelet" player={this.props.params.name} />
              <Item name="silver-gauntlets" player={this.props.params.name} />
              <Item name="gold-gauntlets" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="silver-scale" player={this.props.params.name} />
              <Item name="gold-scale" player={this.props.params.name} />
            </div>
          </div>
          <div className="equipment-right">
            <div className="equipment-row">
              <Item name="kokiri-sword" player={this.props.params.name} />
              <Item name="master-sword" player={this.props.params.name} />
              <Item name="giants-knife" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="deku-shield" player={this.props.params.name} />
              <Item name="hylian-shield" player={this.props.params.name} />
              <Item name="mirror-shield" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="kokiri-tunic" defaultSelected player={this.props.params.name} />
              <Item name="goron-tunic" player={this.props.params.name} />
              <Item name="zora-tunic" player={this.props.params.name} />
            </div>
            <div className="equipment-row">
              <Item name="kokiri-boots" defaultSelected player={this.props.params.name} />
              <Item name="iron-boots" player={this.props.params.name} />
              <Item name="hover-boots" player={this.props.params.name} />
            </div>
          </div>
        </div>
        <div className="inventory">
          <div className="container">
            <div className="inventory-row">
              <Item name="deku-stick" player={this.props.params.name} />
              <Item name="deku-nut" player={this.props.params.name} />
              <Item name="bomb" player={this.props.params.name} />
              <Item name="bow" player={this.props.params.name} />
              <Item name="fire-arrows" player={this.props.params.name} />
              <Item name="dins-fire" player={this.props.params.name} />
            </div>
            <div className="inventory-row">
              <Item name="slingshot" player={this.props.params.name} />
              <div style={{ height: 64, width: 64, position: 'relative', margin: 8 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, margin: -8 }}>
                  <Item name="ocarina" player={this.props.params.name} small />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, margin: -8 }}>
                  <Item name="oot" player={this.props.params.name} small />
                </div>
              </div>
              <Item name="bombchu" player={this.props.params.name} />
              <div style={{ height: 64, width: 64, position: 'relative', margin: 8 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, margin: -8 }}>
                  <Item name="hookshot" player={this.props.params.name} small />
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, margin: -8 }}>
                  <Item name="longshot" player={this.props.params.name} small />
                </div>
              </div>
              <Item name="ice-arrows" player={this.props.params.name} />
              <Item name="farores-wind" player={this.props.params.name} />
            </div>
            <div className="inventory-row">
              <Item name="boomerang" player={this.props.params.name} />
              <Item name="lens-of-truth" player={this.props.params.name} />
              <Item name="beans" player={this.props.params.name} />
              <Item name="hammer" player={this.props.params.name} />
              <Item name="light-arrows" player={this.props.params.name} />
              <Item name="nayrus-love" player={this.props.params.name} />
            </div>
            <div className="inventory-row">
              <Item name="bottle1" player={this.props.params.name} />
              <Item name="bottle2" player={this.props.params.name} />
              <Item name="bottle3" player={this.props.params.name} />
              <Item name="bottle4" player={this.props.params.name} />
              <Item name="adult-trade" player={this.props.params.name} label="any" />
              <Item name="child-trade" player={this.props.params.name} label="any" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
