// @flow

import { Map, Set, List } from 'immutable';

function calculateScore(player) {
  return player.items.size + player.skulls.reduce((r, v) => r + v);
}

export default function itemChecklist(
  state = {
    playerList: new Map(),
    srlPlayers: new List(),
    time: 0,
  },
  action,
) {
  switch (action.type) {
    case 'add-child-skull-to-player': {
      if (!state.playerList.has(action.token)) {
        return state;
      }
      const player = state.playerList.get(action.token);
      player.skulls = player.skulls.set(action.name, player.skulls.get(action.name) + 1);
      player.score = calculateScore(player);
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          player,
        )
      };
    }
    case 'reset-child-player-skulls': {
      if (!state.playerList.has(action.token)) {
        return state;
      }
      const player = state.playerList.get(action.token);
      player.skulls = player.skulls.set(action.name, 0);
      player.score = calculateScore(player);
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          player,
        )
      };
    }
    case 'add-child-item-to-player': {
      if (!state.playerList.has(action.token)) {
        return state;
      }
      const player = state.playerList.get(action.token);
      if (player.items.has(action.item)) {
        return state;
      }
      player.items = player.items.add(action.item);
      player.score = calculateScore(player);
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          player,
        ),
      };
    }
    case 'remove-child-item-from-player': {
      if (!state.playerList.has(action.token)) {
        return state;
      }
      const player = state.playerList.get(action.token);
      if (!player.items.has(action.item)) {
        return state;
      }
      player.items = player.items.delete(action.item);
      player.score = calculateScore(player);
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          player,
        ),
      };
    }
    case 'create-new-child-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          {
            score: 0,
            skulls: new Map({
              ice: 0,
              forest: 0,
              fire: 0,
              water: 0,
              shadow: 0,
              spirit: 0,
            }),
            items: new Set()
          }
        ),
      };

    case 'set-srl':
      return {
        ...state,
        time: action.time,
        srlPlayers: new List(action.srlPlayers),
      };

    default:
      return state;
  }
}
