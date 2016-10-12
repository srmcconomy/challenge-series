// @flow

import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { socketMiddleware } from './util/serverSockets';
import config from '../config';
import routes from './util/routes';
import reducers from './reducers';

global.navigator = { navigator: 'all' };

const app = express();
app.use('/assets/', express.static(path.join(__dirname, '../build/static')));

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${config.files.client.out}/${config.files.client.outFile}`;
} else {
  jsFile = `http://localhost:${config.ports.webpack}/${config.files.client.out}/${config.files.client.outFile}`;
}

const store = createStore(reducers, socketMiddleware());


app.use((req, res) => {
  match(
    { routes, location: req.url },
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
              <script>window.DEFAULT_STATE =
              <script async defer src="${jsFile}"></script>
            </body>
          </html>`
        );
      }
    }
  );
});

app.listen(config.ports.express, () => {
  console.log(`Listening on port ${config.ports.express}`);
});
