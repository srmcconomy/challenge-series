// @flow

export type DecrementHeartsAction = {
  type: 'decrement-hearts',
  player: string,
}

export default function (player: string) {
  return {
    type: 'decrement-hearts',
    player
  };
}
