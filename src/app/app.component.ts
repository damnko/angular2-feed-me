import { AppState } from './models/app-state';
import { Store } from '@ngrx/store';
import { Layout } from './models/layout';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
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
      <section id="main-content">
        <toolbar></toolbar>
        <router-outlet></router-outlet>
      </section>
    </ng-sidebar-container>
  `
})
export class AppComponent {

  constructor(
    private store: Store<AppState>
  ) { }

  public _opened: boolean = false;

  public ngOnInit() {
    this.store.select('layout')
      .map((layout: Layout) => layout.sidebarOpened)
      .subscribe(sidebarOpened => {
        this.openSidebar(sidebarOpened);
      });
  }

  public openSidebar(open: boolean): void {
    this._opened = open;
  }
}
