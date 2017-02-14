import React, { Component } from 'react';
import { connect } from 'react-redux';

import addItemToPlayer from '../actions/addChildItemToPlayer';
import removeItemFromPlayer from '../actions/removeChildItemFromPlayer';

@connect(
  (state, ownProps) => ({
    selected: state.childChecklist.playerList.get(ownProps.token).items.contains(ownProps.name),
  }),
  {
    addItemToPlayer,
    removeItemFromPlayer,
  }
)
export default class Item extends Component {

  onClick = () => {
    const { selected, token, name } = this.props;
    if (selected) {
      this.props.removeItemFromPlayer(token, name);
    } else {
      this.props.addItemToPlayer(token, name);
    }
  }

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
        onClick={this.onClick}
      >{label ? label : ''}</div>
    );
  }
}
