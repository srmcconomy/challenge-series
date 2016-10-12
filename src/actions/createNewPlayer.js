// @flow

export type CreateNewPlayerAction = {
  type: 'create-new-player',
  name: string,
};

export default function createNewPlayer(name: string): CreateNewPlayerAction {
  return {
    type: 'create-new-player',
    name,
  };
}
