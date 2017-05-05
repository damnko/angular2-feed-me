import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

export const OPEN_SIDEBAR = 'OPEN_SIDEBAR',
             TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

@Injectable()
export class LayoutActions {

  openSidebar(openIt: boolean): Action {
    return {
      type: OPEN_SIDEBAR,
      payload: openIt
    };
  }

  toggleSidebar(): Action {
    return {
      type: TOGGLE_SIDEBAR
    };
  }
}
