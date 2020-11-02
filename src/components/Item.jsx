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

  render() {
    const { selected, name, alt, defaultSelected, image, small, label } = this.props;
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
        onClick={() => {
          if (selected) {
            this.props.removeItemFromPlayer(this.props.player, this.props.name);
          } else {
            this.props.addItemToPlayer(this.props.player, this.props.name);
          }
        }}
      >{label ? label : ''}</div>
    );
  }
}
