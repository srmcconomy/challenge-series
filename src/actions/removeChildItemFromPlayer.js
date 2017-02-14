// @flow

export type RemoveChildItemFromPlayerAction = {
  type: 'remove-child-item-from-player',
  token: string,
  item: string,
};

export default function removeChildItemFromPlayer(
  token: string,
  item: string,
): RemoveChildItemFromPlayerAction {
  return {
    type: 'remove-child-item-from-player',
    token,
    item,
  };
}
