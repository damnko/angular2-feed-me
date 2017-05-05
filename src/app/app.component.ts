import { Store } from '@ngrx/store';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Layout, AppState } from './core/models';
import { LayoutActions } from './core/actions';
import { config } from './config';

@Component({
  selector: 'app',
  styleUrls: [
    `./app.component.scss`
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-sidebar-container>
      <ng-sidebar
        [(opened)]="_opened"
        mode="push">
        <sidebar></sidebar>
      </ng-sidebar>
      <section>
        <toolbar></toolbar>
        <router-outlet></router-outlet>
      </section>
    </ng-sidebar-container>
  `
})
export class AppComponent {

  constructor(
    private store: Store<AppState>,
    private layoutActions: LayoutActions
  ) { }

  public _opened: boolean = false;

  public ngOnInit() {
    this.store.select('layout')
      .map((layout: Layout) => layout.sidebarOpened)
      .subscribe(sidebarOpened => {
        this.openSidebar(sidebarOpened);
      });

    setTimeout(() => {
      this.store.dispatch(
        this.layoutActions.openSidebar(true)
      );
    }, 1000);
  }

  public openSidebar(open: boolean): void {
      this._opened = open;
  }
}
