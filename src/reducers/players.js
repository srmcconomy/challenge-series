import { Map } from 'immutable';

export default function (state = new Map(), action) {
  console.log(action);
  switch (action.type) {
    case 'set-user':
      return state.filter(
        v => v.name !== action.name
      ).set(
        action.code,
        {
          ...state.get(action.code),
          token: action.token,
          name: action.name,
          logo: action.logo,
        },
      );
    default:
      return state;
  }
}
