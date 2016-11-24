// @flow

export type CreateNewKeyPlayerAction = {
  type: 'create-new-player',
  name: string,
};

export default function createNewPlayer(name: string): CreateNewKeyPlayerAction {
  return {
    type: 'create-new-key-player',
    name,
  };
}
