import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Layout, AppState } from '../models';
import { getLayoutState, getSidebarOpened } from '../selectors/layout-selectors';

@Injectable()
export class LayoutService {
  layout$: Observable<Layout>;
  sidebarOpened$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {
    this.layout$ = getLayoutState(store);
    this.sidebarOpened$ = getSidebarOpened(store);
  }
}
