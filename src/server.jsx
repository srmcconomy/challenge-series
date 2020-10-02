// @flow


import 'source-map-support/register';
import { createStore, applyMiddleware } from 'redux';
import { Map, List } from 'immutable';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import express from 'express';
import socketio from 'socket.io';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import http from 'http';
import request from 'request';
import cookieParser from 'cookie-parser';

import { socketMiddleware, connectStoreWithSocket } from './util/storeSockets';
import config from '../config';
import reducers from './reducers';
import routes from './util/routes';
import srl from './util/SRL';

import elist from './scripts/enemyList';

global.navigator = { navigator: 'all' };

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/assets/', express.static(path.join(__dirname, '../build/static')));
app.use('/images/', express.static(path.join(__dirname, '../assets/images')));
app.use('/fonts/', express.static(path.join(__dirname, '../assets/fonts')));
app.use(cookieParser());

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${config.files.client.out}/${config.files.client.outFile}`;
} else {
  jsFile = `http://localhost:${config.ports.webpack}/${config.files.client.out}/${config.files.client.outFile}`;
}

const store = createStore(
  reducers,
  {
    enemyChecklist: {
      playerList: new Map(),
      enemyList: new Map(elist),
      srlPlayers: new List(),
    },
  },
  applyMiddleware(socketMiddleware(io)), //, dbMiddleware)
);

srl(store);

app.use((req, res) => {
  const token = req.cookies.token;

  match(
    { routes: routes(store, token, request), location: req.url },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        console.log('redirect')
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
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
              <script>window.PRELOADED_STATE=${JSON.stringify(store.getState())};</script>
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
