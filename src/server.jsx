// @flow


import 'source-map-support/register';
import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import express from 'express';
import socketio from 'socket.io';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import http from 'http';

import { socketMiddleware, connectStoreWithSocket } from './util/storeSockets';
import config from '../config';
import reducers from './reducers';
import routes from './util/routes';
import { getInitialState } from './util/db';
import dbMiddleware from './util/dbMiddleware';
import srl from './util/SRL';

global.navigator = { navigator: 'all' };

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/assets/', express.static(path.join(__dirname, '../build/static')));
app.use('/images/', express.static(path.join(__dirname, '../assets/images')));
app.use('/fonts/', express.static(path.join(__dirname, '../assets/fonts')));

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${config.files.client.out}/${config.files.client.outFile}`;
} else {
  jsFile = `http://localhost:${config.ports.webpack}/${config.files.client.out}/${config.files.client.outFile}`;
}

getInitialState().then(initialState => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(socketMiddleware(io), dbMiddleware)
  );

  srl(store);

  app.use((req, res) => {
    match(
      { routes: routes(store), location: req.url },
      (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.log(error);
          res.status(500).send('An internal error has occurred');
        } else if (!renderProps) {
          res.status(404).send('Not Found');
        } else {
          const content = ReactDOMServer.renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          res.send(
            `<html>
              <head>
                <link rel="stylesheet" href="/assets/css/main.css" />
              </head>
              <body>
                <div id="react-root">${content}</div>
                <script>window.PRELOADED_STATE = ${JSON.stringify(store.getState())}</script>
                <script async defer src="${jsFile}"></script>
              </body>
            </html>`
          );
        }
      }
    );
  });

  io.on('connection', socket => {
    connectStoreWithSocket(store, socket);
    socket.on('action', action => {
      socket.broadcast.emit('action', action);
    });
  });

  server.listen(process.env.PORT || config.ports.express, () => {
    console.log(`Listening on port ${config.ports.express}`);
  });
});
