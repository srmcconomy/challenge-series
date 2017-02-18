// @flow

export type ResetChildPlayerSkullsAction = {
  type: 'reset-child-player-skulls',
  token: string,
  name: string,
};

export default function resetChildPlayerSkulls(
  token: string,
  name: string,
): ResetChildPlayerSkullsAction {
  return {
    type: 'reset-child-player-skulls',
    token,
    name,
  };
}
