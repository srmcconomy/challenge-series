import { Map } from 'immutable';

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'increase-key-count':
      return state.set(action.name, state.get(action.name) + 1);
    case 'decrease-key-count':
      return state.set(action.name, state.get(action.name) - 1);
    default:
      return state;
  }
}
