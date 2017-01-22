// @flow

export type AddItemToPlayerAction = {
  type: 'add-item-to-player',
  player: string,
  item: string,
};

export default function addItemToPlayer(
  player: string,
  item: string,
): AddItemToPlayerAction {
  return {
    type: 'add-item-to-player',
    player,
    item,
  };
}
