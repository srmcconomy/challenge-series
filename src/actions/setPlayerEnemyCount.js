// @flow

export type SetPlayerEnemyCountAction = {
  type: 'set-player-enemy-count',
  player: string,
  enemy: string,
  count: number,
};

export default function setPlayerEnemyCount(
  player: string,
  enemy: string,
  count: number
): SetPlayerEnemyCountAction {
  return {
    type: 'set-player-enemy-count',
    player,
    enemy,
    count,
  };
}
