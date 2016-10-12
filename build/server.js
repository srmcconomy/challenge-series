'use strict';

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _serverSockets = require('./util/serverSockets');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./util/routes');

var _routes2 = _interopRequireDefault(_routes);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.navigator = { navigator: 'all' };

const app = (0, _express2.default)();
app.use('/assets/', _express2.default.static(_path2.default.join(__dirname, '../build/static')));

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${ _config2.default.files.client.out }/${ _config2.default.files.client.outFile }`;
} else {
  jsFile = `http://localhost:${ _config2.default.ports.webpack }/${ _config2.default.files.client.out }/${ _config2.default.files.client.outFile }`;
}

const store = (0, _redux.createStore)(_reducers2.default, (0, _serverSockets.socketMiddleware)());

app.use((req, res) => {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, (error, redirectLocation, renderProps) => {
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
              <script>window.DEFAULT_STATE =
              <script async defer src="${ jsFile }"></script>
            </body>
          </html>`);
    }
  });
});

app.listen(_config2.default.ports.express, () => {
  console.log(`Listening on port ${ _config2.default.ports.express }`);
});
//# sourceMappingURL=server.js.map
