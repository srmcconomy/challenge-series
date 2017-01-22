// @flow

export type IncrementRupeesAction = {
  type: 'increment-rupees',
  player: string,
}

export default function (player: string) {
  return {
    type: 'increment-rupees',
    player
  };
}
