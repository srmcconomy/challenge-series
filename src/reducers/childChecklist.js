// @flow

import { Map, Set, List } from 'immutable';

export default function itemChecklist(
  state = {
    playerList: new Map(),
    srlPlayers: new List(),
  },
  action,
) {
  switch (action.type) {
    case 'increment-hearts':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            hearts: state.playerList.get(action.player).hearts + 1,
            score: state.playerList.get(action.player).score + 1,
          }
        )
      };
    case 'decrement-hearts':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            hearts: state.playerList.get(action.player).hearts - 1,
            score: state.playerList.get(action.player).score - 1,
          }
        )
      };
    case 'increment-rupees':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            rupees: state.playerList.get(action.player).rupees + 1,
            score: state.playerList.get(action.player).score + 1,
          }
        )
      };
    case 'decrement-rupees':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            rupees: state.playerList.get(action.player).rupees - 1,
            score: state.playerList.get(action.player).score - 1,
          }
        )
      };
    case 'add-child-item-to-player':
      if (!state.playerList.has(action.token)) {
        return state;
      }
      if (state.playerList.get(action.token).items.has(action.item)) {
        return state;
      }
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          {
            ...state.playerList.get(action.token),
            score: state.playerList.get(action.token).items.size + 1,
            items: state.playerList.get(action.token).items.add(action.item),
          }
        ),
      };

    case 'remove-child-item-from-player':
      if (!state.playerList.has(action.token)) {
        return state;
      }
      if (!state.playerList.get(action.token).items.has(action.item)) {
        return state;
      }
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          {
            ...state.playerList.get(action.token),
            score: state.playerList.get(action.token).items.size - 1,
            items: state.playerList.get(action.token).items.delete(action.item),
          }
        ),
      };

    case 'create-new-child-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.token,
          {
            score: 0,
            hearts: 3,
            rupees: 0,
            items: new Set()
          }
        ),
      };

    case 'set-srl':
      return {
        ...state,
        srlPlayers: new List(action.srlPlayers),
      };

    default:
      return state;
  }
}
