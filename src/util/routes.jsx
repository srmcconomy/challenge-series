// @flow

import { Route, IndexRoute } from 'react-router';
import React from 'react';
import type { Store } from 'redux';

import App from '../components/App';
import TwitchAuthenticate from '../components/TwitchAuthenticate';
import Bingo from '../components/Bingo';

import setToken from '../actions/setToken';
import setCode from '../actions/setCode';
import setUser from '../actions/setUser';
import ChildChecklist from '../components/ChildChecklist';
import ChildChecklistHeader from '../components/ChildChecklistHeader';
import ChildChecklistList from '../components/ChildChecklistList';
import Validate from '../components/Validate';
import createNewChildPlayer from '../actions/createNewChildPlayer';
import ChildPopout from '../components/ChildPopout';
// import createNewPlayer from '../actions/createNewPlayer';
// import createNewKeyPlayer from '../actions/createNewKeyPlayer';
// import createNewItemPlayer from '../actions/createNewItemPlayer';
// import ItemChecklistHeader from '../components/ItemChecklistHeader';
// import ItemChecklist from '../components/ItemChecklist';
// import ItemChecklistList from '../components/ItemChecklistList';
// import ItemChecklistIndex from '../components/ItemChecklistIndex';
// import ItemChecklistLeaderboard from '../components/ItemChecklistLeaderboard';
// import EnemyChecklistHeader from '../components/EnemyChecklistHeader';
// import EnemyCounter from '../components/EnemyChecklist';
// import EnemyCounterChecklist from '../components/EnemyChecklistList';
// import EnemyCounterIndex from '../components/EnemyCounterIndex';
// import EnemyChecklistLeaderboard from '../components/EnemyChecklistLeaderboard';
// import KeyCounter from '../components/KeyCounter';
// import KeyCounterIndex from '../components/KeyCounterIndex';
// import KeyCounterContainer from '../components/KeyCounterContainer';
// import KeyCounterHeader from '../components/KeyCounterHeader';
// import KeyCounterLeaderboard from '../components/KeyCounterLeaderboard';

export default function (store: Store, token: ?string, request) {
  // function onPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().enemyChecklist.playerList.has(name)) {
  //     store.dispatch(createNewPlayer(name));
  //   }
  // }
  //
  // function onKeyPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().keyCounter.has(name)) {
  //     store.dispatch(createNewKeyPlayer(name));
  //   }
  // }
  //
  // function onItemPlayerEnter(nextState) {
  //   const { name } = nextState.params;
  //   if (!store.getState().itemChecklist.playerList.has(name)) {
  //     store.dispatch(createNewItemPlayer(name));
  //   }
  // }

  function validate(nextState, replace) {
    const { code } = nextState.location.query;
    if (typeof document !== 'undefined') {
      document.cookie = `token=${code}`;
      token = code;
    } else {
      request.post(`https://api.twitch.tv/kraken/oauth2/token?client_id=rpj60fikezo717h9d7lka7zq7r1w97&client_secret=j4jbu16f73hkksncxfspvzx6q770dz&grant_type=authorization_code&redirect_uri=http://localhost:3000/redirect&code=${code}`,
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            request.get({
              url: 'https://api.twitch.tv/kraken/user',
              headers: {
                'Client-ID': 'rpj60fikezo717h9d7lka7zq7r1w97',
                Authorization: `OAuth ${data.access_token}`,
              },
            }, (error2, response2, body2) => {
              const data2 = JSON.parse(body2);
              store.dispatch(setUser(data2.name, data2.logo, data.access_token, code));
            });
          }
        }
      );
    }
  }

  function redirectNonUser(nextState, replace) {
    console.log(store.getState().players.toJS());
    console.log(token);
    if (!token || !store.getState().players.has(token)) {
      replace({
        pathname: '/auth',
      });
    }
  }

  return (
    <Route component={App} path="/">
      <Route component={TwitchAuthenticate} path="auth" />
      <Route path="redirect" onEnter={validate} component={() => <Validate token={token} />} />
      <Route component={ChildChecklist} path="childrace" onEnter={redirectNonUser}>
        <IndexRoute
          onEnter={() => {
            if (!store.getState().childChecklist.playerList.has(token)) {
              store.dispatch(createNewChildPlayer(token));
            }
          }}
          components={{
            header: () => <ChildChecklistHeader token={token} />,
            body: () => <ChildChecklistList token={token} />,
          }}
        />
        <Route path="popout" components={{ body: () => <ChildPopout token={token} /> }} />
      </Route>
      {/* <Route component={KeyCounterContainer} path="key-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: KeyCounterIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: KeyCounterHeader,
            body: KeyCounter,
          }}
          onEnter={onKeyPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: KeyCounterLeaderboard,
          }}
        />
      </Route>

      <Route component={EnemyCounter} path="enemy-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: EnemyCounterIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: EnemyChecklistHeader,
            body: EnemyCounterChecklist,
          }}
          onEnter={onPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: EnemyChecklistLeaderboard,
          }}
        />
      </Route>

      <Route component={ItemChecklist} path="item-counter">
        <IndexRoute
          components={{
            header: () => <div />,
            body: ItemChecklistIndex,
          }}
        />
        <Route
          path="user/:name"
          components={{
            header: ItemChecklistHeader,
            body: ItemChecklistList,
          }}
          onEnter={onItemPlayerEnter}
        />
        <Route
          path="leaderboard"
          components={{
            header: null,
            body: ItemChecklistLeaderboard,
          }}
        />
      </Route> */}
    </Route>
  );
}
