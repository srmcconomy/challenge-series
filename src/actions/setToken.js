export default function (token, code) {
  return {
    type: 'set-token',
    token,
    code,
  };
}
