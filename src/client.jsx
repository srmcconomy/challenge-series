// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, browserHistory } from 'react-router';

import reducers from './reducers';
import routes from './util/routes';

const preloadedState = window.PRELOADED_STATE;

const store = createStore(reducers, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('react-root')
);
