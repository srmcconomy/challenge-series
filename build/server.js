'use strict';

require('source-map-support/register');

var _redux = require('redux');

var _immutable = require('immutable');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _storeSockets = require('./util/storeSockets');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _routes = require('./util/routes');

var _routes2 = _interopRequireDefault(_routes);

var _db = require('./util/db');

var _dbMiddleware = require('./util/dbMiddleware');

var _dbMiddleware2 = _interopRequireDefault(_dbMiddleware);

var _SRL = require('./util/SRL');

var _SRL2 = _interopRequireDefault(_SRL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.navigator = { navigator: 'all' };

const app = (0, _express2.default)();
const server = _http2.default.createServer(app);
const io = (0, _socket2.default)(server);

app.use('/assets/', _express2.default.static(_path2.default.join(__dirname, '../build/static')));
app.use('/images/', _express2.default.static(_path2.default.join(__dirname, '../assets/images')));
app.use('/fonts/', _express2.default.static(_path2.default.join(__dirname, '../assets/fonts')));

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${ _config2.default.files.client.out }/${ _config2.default.files.client.outFile }`;
} else {
  jsFile = `http://localhost:${ _config2.default.ports.webpack }/${ _config2.default.files.client.out }/${ _config2.default.files.client.outFile }`;
}

(0, _db.getInitialState)().then(initialState => {
  const store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)((0, _storeSockets.socketMiddleware)(io), _dbMiddleware2.default));

  (0, _SRL2.default)(store);

  app.use((req, res) => {
    (0, _reactRouter.match)({ routes: (0, _routes2.default)(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.log(error);
        res.status(500).send('An internal error has occurred');
      } else if (!renderProps) {
        res.status(404).send('Not Found');
      } else {
        const content = _server2.default.renderToString(_react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(_reactRouter.RouterContext, renderProps)
        ));
        res.send(`<html>
              <head>
                <link rel="stylesheet" href="/assets/css/main.css" />
              </head>
              <body>
                <div id="react-root">${ content }</div>
                <script>window.PRELOADED_STATE = ${ JSON.stringify(store.getState()) }</script>
                <script async defer src="${ jsFile }"></script>
              </body>
            </html>`);
      }
    });
  });

  io.on('connection', socket => {
    (0, _storeSockets.connectStoreWithSocket)(store, socket);
    socket.on('action', action => {
      socket.broadcast.emit('action', action);
    });
  });

  server.listen(_config2.default.ports.express, () => {
    console.log(`Listening on port ${ _config2.default.ports.express }`);
  });
});
//# sourceMappingURL=server.js.map
