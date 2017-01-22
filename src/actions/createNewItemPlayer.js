// @flow

export type CreateNewItemPlayerAction = {
  type: 'create-new-item-player',
  name: string,
};

export default function createNewPlayer(name: string): CreateNewItemPlayerAction {
  return {
    type: 'create-new-item-player',
    name,
  };
}
