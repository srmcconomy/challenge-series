// @flow

import React from 'react';

type Props = {
  enemy: string,
  name: string,
  count: number,
  values: Array<number>,
  onIncrementClicked: () => void,
  onDecrementClicked: () => void,
}

export default function EnemyCard(props: Props) {
  const {
    enemy,
    name,
    count,
    values,
    onIncrementClicked,
    onDecrementClicked
  } = props;
  return (
    <div className="EnemyCard">
      <div
        className="image"
        style={{ backgroundImage: `images/${enemy}.png` }}
      />
      <div className="count">{count}</div>
      <div className="values">{values}</div>
      <div className="name">{name}</div>
      <div className="buttons">
        <button onClick={onIncrementClicked}>+</button>
        <button onClick={onDecrementClicked}>-</button>
      </div>
    </div>
  );
}
