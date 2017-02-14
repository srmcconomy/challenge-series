export default function (state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case 'set-token':
      return action.token;
    default:
      return state;
  }
}
