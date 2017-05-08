import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Layout, AppState } from '../models';

@Injectable()
export class LayoutService {
  layout$: Observable<Layout>;

  constructor(
    private store: Store<AppState>
  ) {
    this.layout$ = this.store.map((appState: AppState) => appState.layout).distinctUntilChanged();
  }
}
