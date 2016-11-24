import { Map } from 'immutable';

export default function (state = new Map(), action) {
  switch (action.type) {
    case 'create-new-key-player':
      return state.set(action.name, 0);
    case 'increase-key-count': {
      const count = state.get(action.name);
      if (count < 30) {
        return state.set(action.name, state.get(action.name) + 1);
      }
      return state;
    }
    case 'decrease-key-count': {
      const count = state.get(action.name);
      if (count > 0) {
        return state.set(action.name, state.get(action.name) - 1);
      }
      return state;
    }
    default:
      return state;
  }
}
