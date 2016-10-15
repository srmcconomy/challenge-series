// @flow

export type AddEnemyToPlayerAction = {
  type: 'add-enemy-to-player',
  player: string,
  enemy: string,
};

export default function addEnemyToPlayer(
  player: string,
  enemy: string,
): AddEnemyToPlayerAction {
  return {
    type: 'add-enemy-to-player',
    player,
    enemy,
  };
}
