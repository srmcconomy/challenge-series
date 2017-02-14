export default function (name, logo, token, code) {
  return {
    type: 'set-user',
    name,
    logo,
    code,
    token,
  };
}
