// @flow

export type IncrementHeartsAction = {
  type: 'increment-hearts',
  player: string,
}

export default function (player: string) {
  return {
    type: 'increment-hearts',
    player
  };
}
