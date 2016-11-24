// @flow

export default function (name: string) {
  return {
    type: 'increase-key-count',
    name
  };
}
