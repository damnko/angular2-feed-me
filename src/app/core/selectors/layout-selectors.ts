import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Layout, AppState } from '../models';

export function getLayoutState(store$: Store<AppState>): Observable<Layout> {
  return store$.select(appState => appState.layout)
    .distinctUntilChanged();
}

export function getSidebarOpened(store$: Store<AppState>): Observable<boolean> {
  return store$.let(getLayoutState)
    .map(layout => layout.sidebarOpened)
    .distinctUntilChanged();
}
