// @flow

export type AddChildItemToPlayerAction = {
  type: 'add-child-item-to-player',
  token: string,
  item: string,
};

export default function addChildItemToPlayer(
  token: string,
  item: string,
): AddChildItemToPlayerAction {
  return {
    type: 'add-child-item-to-player',
    token,
    item,
  };
}
