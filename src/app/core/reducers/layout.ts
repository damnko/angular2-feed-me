import { Action } from '@ngrx/store';

import { OPEN_SIDEBAR, TOGGLE_SIDEBAR } from '../actions';
import { Layout } from '../models';

export function layout(state: Layout, action: Action): Layout {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return Object.assign({}, state, { sidebarOpened: action.payload });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, { sidebarOpened: !state.sidebarOpened });
    default:
      return state;
  }
}
