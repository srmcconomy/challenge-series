// @flow

export default function (name: string) {
  return {
    type: 'decrease-key-count',
    name
  };
}
