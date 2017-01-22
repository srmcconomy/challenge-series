// @flow

export type RemoveItemFromPlayerAction = {
  type: 'remove-item-from-player',
  player: string,
  item: string,
};

export default function removeItemFromPlayer(
  player: string,
  item: string,
): RemoveItemFromPlayerAction {
  return {
    type: 'remove-item-from-player',
    player,
    item,
  };
}
