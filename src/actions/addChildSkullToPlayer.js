// @flow

export type AddChildSkullToPlayerAction = {
  type: 'add-child-skull-to-player',
  token: string,
  name: string,
};

export default function addChildSkullToPlayer(
  token: string,
  name: string,
): AddChildSkullToPlayerAction {
  return {
    type: 'add-child-skull-to-player',
    token,
    name,
  };
}
