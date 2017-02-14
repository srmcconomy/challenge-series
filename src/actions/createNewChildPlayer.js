// @flow

export type CreateNewChildPlayerAction = {
  type: 'create-new-child-player',
  token: string,
};

export default function createNewChildPlayer(token: string): CreateNewChildPlayerAction {
  return {
    type: 'create-new-child-player',
    token,
  };
}
