// @flow

import React, { Component } from 'react';

import Item from './Item';

export default class Beta extends Component {
  renderItem = (name) => {
    return <Item name={name} checked={this.state[name]} onClick={() => this.setState({ [name]: !this.state[name] })} />;
  }

  renderCounter = (name) => {
    return (
      <div>
        <div class="counter" style={{ backgroundImage: `url(${name}` }} onClick={() => this.setState({ [name]: this.state.name + 1 })} />
        <div>
          {this.state.name}
        </div>
      </div>
    );

  }

  render() {
    return (
      <div className="ItemChecklistList">
        <div className="status">
          <div className="songs">
            <div className="row">
              {
                ['zeldas-lullaby', 'eponas-song', 'sarias-song', 'suns-song', 'song-of-time', 'song-of-storms'].map(this.renderItem)
              }
            </div>
            <div className="row">
              {
                ['minuet', 'bolero', 'serenade', 'requiem', 'nocturne', 'prelude'].map(this.renderItem)
              }
            </div>
          </div>
          <div className="maps">
            <div className="row">
              {
                ['deku-map', 'dc-map', 'jabu-map', 'ice-map', 'well-map'].map(this.renderItem)
              }
            </div>
            <div className="row">
              {
                ['forest-map', 'fire-map', 'water-map', 'spirit-map', 'shadow-map'].map(this.renderItem)
              }
            </div>
          </div>
          <div className="compasses">
            <div className="row">
              {
                ['deku-compass', 'dc-compass', 'jabu-compass', 'ice-compass', 'well-compass'].map(this.renderItem)
              }
            </div>
            <div className="row">
              {
                ['forest-compass', 'fire-compass', 'water-compass', 'spirit-compass', 'shadow-compass'].map(this.renderItem)
              }
            </div>
          </div>
          <div className="bks">
            <div className="row">
              {
                ['deku-bk', 'dc-bk', 'jabu-bk', 'ganon-bk'].map(this.renderItem)
              }
            </div>
            <div className="row">
              {
                ['forest-bk', 'fire-bk', 'water-bk', 'spirit-bk', 'shadow-bk'].map(this.renderItem)
              }
            </div>
          </div>
          <div className="swords">
            {
              ['kokiri-sword', 'master-sword', 'giants-knife'].map(this.renderItem)
            }
          </div>
          <div className="shields">
            {
              ['deku-shield', 'hylian-shield', 'mirror-shield'].map(this.renderItem)
            }
          </div>
          <div className="tunics">
            {
              ['kokiri-tunic', 'goron-tunic', 'zora-tunic'].map(this.renderItem)
            }
          </div>
          <div className="boots">
            {
              ['kokiri-boots', 'iron-boots', 'hover-boots'].map(this.renderItem)
            }
          </div>
          <div className="fairy-spells">
            {
              ['dins-fire', 'farores-wind', 'nayrus-love'].map(this.renderItem)
            }
          </div>
          <div className="elemental-arrows">
            {
              ['fire-arrows', 'ice-arrows', 'light-arrows'].map(this.renderItem)
            }
          </div>
          <div className="child-skulls">
            {
              ['deku-skull', 'dc-skull', 'jabu-skull'].map(this.renderItem)
            }
          </div>
          <div className="adult-skulls">
            {
              ['forest-skull', 'fire-skull', 'water-skull', 'spirit-skull', 'shadow-skull'].map(this.renderItem)
            }
          </div>
          <div className="adult-keys">
            {
              ['forest-key', 'fire-key', 'water-key', 'spirit-key', 'shadow-key'].map(this.renderItem)
            }
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
