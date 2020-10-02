import React, { Component } from 'react';

export default class Item extends Component {

  render() {
    const { checked, name, alt, defaultSelected, image, small, label } = this.props;
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
        className={`item${checked ? ' selected' : ''}${small ? ' small' : ''}`}
        style={{ backgroundImage: background }}
        onClick={this.props.onClick}
      >{label ? label : ''}</div>
    );
  }
}
