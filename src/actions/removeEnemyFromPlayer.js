// @flow

export type RemoveEnemyFromPlayerAction = {
  type: 'remove-enemy-from-player',
  player: string,
  enemy: string,
};

export default function removeEnemyFromPlayer(
  player: string,
  enemy: string,
): RemoveEnemyFromPlayerAction {
  return {
    type: 'remove-enemy-from-player',
    player,
    enemy,
  };
}
