// @flow

export type DecrementRupeesAction = {
  type: 'decrement-rupees',
  player: string,
}

export default function (player: string) {
  return {
    type: 'decrement-rupees',
    player
  };
}
