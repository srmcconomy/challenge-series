// @flow

import React from 'react';

type Props = {
  name: string,
  onClick: () => void,
}

export default function EnemyCard(props: Props) {
  const {
    name,
    onClick,
  } = props;
  const enemyID = name.replace(/\s/g, '-');
  return (
    <div
      className={`EnemyCard${props.selected ? ' selected' : ''}`}
      style={{ backgroundImage: `url(/images/${enemyID}.png)` }}
      onClick={onClick}
    >
      <div className="name">{name}</div>
    </div>
  );
}
