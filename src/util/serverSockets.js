// @flow

import type { Store } from 'redux';
import type { State, Action } from '../reducers';

export function socketMiddleware(socket: any) {
  return () => (next: (action: Action) => null) => (action: Action) => {
    const newAction = action;
    if (newAction.type.startsWith('socket-')) {
      newAction.type = newAction.type.replace('socket-', '');
    } else {
      socket.emit('action', newAction);
    }
    next(newAction);
  };
}

export function connectStoreWithSocket(store: Store<State, Action>, socket: any) {
  socket.on('action', action => {
    store.dispatch({
      ...action,
      type: `socket-${action.type}`,
    });
  });
}
