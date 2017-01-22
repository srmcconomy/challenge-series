import React, { Component } from 'react';
import { connect } from 'react-redux';

import addItemToPlayer from '../actions/addItemToPlayer';
import removeItemFromPlayer from '../actions/removeItemFromPlayer';

@connect(
  (state, ownProps) => ({
    selected: state.itemChecklist.playerList.get(ownProps.player).items.contains(ownProps.name),
  }),
  {
    addItemToPlayer,
    removeItemFromPlayer,
  }
)
export default class Item extends Component {

  onClick = () => {
    const { selected, player, name } = this.props;
    if (selected) {
      this.props.removeItemFromPlayer(player, name);
    } else {
      this.props.addItemToPlayer(player, name);
    }
  }

  render() {
    const { selected, name, alt, defaultSelected, image, small, label} = this.props;
    const background = image ?
      `url(/images/${image}.png)` :
      `url(/images/${name}${alt ? '-alt' : ''}.png)`;
    if (defaultSelected) {
      return (
        <div
          className={`item selected${small ? ' small' : ''}`}
          style={{ backgroundImage: background }}
        />
      );
    }
    return (
      <div
        className={`item${selected ? ' selected' : ''}${small ? ' small' : ''}`}
        style={{ backgroundImage: background }}
        onClick={this.onClick}
      >{label ? label : ''}</div>
    );
  }
}
