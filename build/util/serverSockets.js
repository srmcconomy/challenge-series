'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.socketMiddleware = socketMiddleware;
exports.connectStoreWithSocket = connectStoreWithSocket;
function socketMiddleware(socket) {
  return () => next => action => {
    const newAction = action;
    if (newAction.type.startsWith('socket-')) {
      newAction.type = newAction.type.replace('socket-', '');
    } else {
      socket.emit('action', newAction);
    }
    next(newAction);
  };
}

function connectStoreWithSocket(store, socket) {
  socket.on('action', action => {
    store.dispatch(_extends({}, action, {
      type: `socket-${ action.type }`
    }));
  });
}
//# sourceMappingURL=serverSockets.js.map
