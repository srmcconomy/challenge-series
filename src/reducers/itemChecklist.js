// @flow

import { Map, Set, List } from 'immutable';

import type { CreateNewItemPlayerAction } from '../actions/createNewItemPlayer';
import type { AddItemToPlayerAction } from '../actions/addItemToPlayer';
import type { RemoveItemFromPlayerAction } from '../actions/removeItemFromPlayer';
import type { IncrementHeartsAction } from '../actions/incrementHearts';
import type { DecrementHeartsAction } from '../actions/decrementHearts';
import type { IncrementRupeesAction } from '../actions/incrementRupees';
import type { DecrementRupeesAction } from '../actions/decrementRupees';
import type { SetSRLAction } from '../actions/setSRL';


export type ItemChecklistState = {
  playerList: Map<
    string,
    {
      score: number,
      hearts: number,
      rupees: number,
      items: Set<string>,
    }
  >,
  srlPlayers: List<{
    name: string,
    time: number,
  }>
};

export type ItemChecklistAction = AddItemToPlayerAction |
  RemoveItemFromPlayerAction |
  IncrementHeartsAction |
  DecrementHeartsAction |
  IncrementRupeesAction |
  DecrementRupeesAction |
  CreateNewItemPlayerAction |
  SetSRLAction;

export default function itemChecklist(
  state: ItemChecklistState = {
    playerList: new Map(),
    srlPlayers: new List(),
  },
  action: ItemChecklistAction
): ItemChecklistState {
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
    case 'add-item-to-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            score: state.playerList.get(action.player).score + 1,
            items: state.playerList.get(action.player).items.add(action.item),
          }
        ),
      };

    case 'remove-item-from-player':
      if (!state.playerList.get(action.player).items.has(action.item)) {
        return state;
      }
      return {
        ...state,
        playerList: state.playerList.set(
          action.player,
          {
            ...state.playerList.get(action.player),
            score: state.playerList.get(action.player).score - 1,
            items: state.playerList.get(action.player).items.delete(action.item),
          }
        ),
      };

    case 'create-new-item-player':
      return {
        ...state,
        playerList: state.playerList.set(
          action.name,
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
